import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInComponent } from '../sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalDbService } from '../../services/local-db.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  resetInfo: any = {};
  storedUser: any = {};
  acceptTerms: boolean = true;
  toastData: any = {};
  userConfirmed: boolean = false;
  otpAccepted: boolean = false;
  otp: any = ''
  user: any = {}
  
  constructor(private readonly auth: SignInComponent, private readonly router: Router, private readonly noDB: LocalDbService, private readonly api: ApiService){}
  

  // ngOnInit(){
  //   this.toastData = { ...this.toastData, showIcon: true, isVisible: true, showCloseBtn: true, message: 'Yeah' }
  //   this.api.toast.showToast(this.toastData.message, this.toastData.status);
  // }

  async confirmUsername(data:string){
    if(data){
      const findUser: any = await this.noDB.users.find((usr:any) => usr.username === data || usr.email === data);
      if(findUser){
        this.user = findUser;
        this.otp = 1234;
        let message: any = '';
        if(this.user.email === data){
          message = `An OTP has been sent to ${this.user.email}`
        }else{ 
          message = "Please wait. You will receive an OTP shortly."
        };
        this.toastData = { showIcon: true, isVisible: true, showCloseBtn: true, status: 'warning', message }
        this.api.toast.showToast(this.toastData.message, this.toastData.status);
        setTimeout(() => {
          if(this.user.username === data){
            this.toastData = {showIcon: true, isVisible: true, showCloseBtn: true, status: 'success', time: 5000, message: `OTP: ${this.otp}` }
            this.api.toast.showToast(this.toastData.message, this.toastData.status);
          };
        }, 3200);
        setTimeout(() => {
          this.userConfirmed = !this.userConfirmed;
        }, 4000);      
      }else{
        this.toastData = {showIcon: true, isVisible: true, showCloseBtn: true, status: 'danger', message: `User does not exist.` }
        this.api.toast.showToast(this.toastData.message, this.toastData.status);
      };
    }else{
      this.toastData = { isVisible: true, showIcon: true, showCloseBtn: true, status: 'warning', message: `Enter your Username / Email.` }
      this.api.toast.showToast(this.toastData.message, this.toastData.status);
    }
  }

  otpEntered(otp:any){
    setTimeout(() => {
      if(otp && otp !== ''){
        this.toastData = {showIcon: true, isVisible: true, showCloseBtn: true, status: 'warning', time:4000, message: `Confirming OTP. Please wait.` }
        this.api.toast.showToast(this.toastData.message, this.toastData.status);
        if(this.otp === otp){
          setTimeout(() => {
            this.toastData = {showIcon: true, isVisible: true, showCloseBtn: true, status: 'success', time:5000, message: `OTP confirmed. Enter new password.` }
            this.api.toast.showToast(this.toastData.message, this.toastData.status);
            this.otpAccepted = !this.otpAccepted;
          }, 4300);  
        }else{ 
          this.toastData = {showIcon: true, isVisible: true, showCloseBtn: true, status: 'danger', message: `Incorrect OTP.` }
          this.api.toast.showToast(this.toastData.message, this.toastData.status);
        }
      }else{
        this.toastData = {showIcon: true, isVisible: true, showCloseBtn: true, status: 'warning', message: `Enter OTP.` }
        this.api.toast.showToast(this.toastData.message, this.toastData.status);
      }
    }, 1500);
  }

  async resetPassword(resetInfo: any){
    if(resetInfo.newPassword && resetInfo.confirmPassword && resetInfo.newPassword !== '' && resetInfo.confirmPassword !== ''){
      if(resetInfo.newPassword === resetInfo.confirmPassword){
        if(!this.acceptTerms){
          this.toastData = {showIcon: true, isVisible: true, showCloseBtn: true, status: 'danger', message: 'Please accept Terms and Conditions to continue.' };
          this.api.toast.showToast(this.toastData.message, this.toastData.status);
        }else{
          this.user = { ...this.user, password: resetInfo.confirmPassword };
          const userIndex = this.noDB.users.findIndex((usr: any) => usr.username === resetInfo.username || usr.email === resetInfo.username );
          if (userIndex !== -1) {
            this.noDB.users[userIndex] = { ...this.noDB.users[userIndex], ...this.user };
            this.toastData = {showIcon: true, isVisible: true, showCloseBtn: true, status: 'success', time: 5000, message: 'Password reset succesful! Sign in to continue.' };
            this.api.toast.showToast(this.toastData.message, this.toastData.status);
          } else {
            this.toastData = {showIcon: true, isVisible: true, showCloseBtn: true, status: 'danger', time: 4000, message: 'Password reset usucessful. Contact Admin.' };
            this.api.toast.showToast(this.toastData.message, this.toastData.status);
          };
          this.auth.reset();
          this.router.navigateByUrl(`auth/signIn`);
        }
      }else{
        this.toastData = {showIcon: true, isVisible: true, showCloseBtn: true, status: 'danger', message: 'Passwords do not match. Try again.' };
        this.api.toast.showToast(this.toastData.message, this.toastData.status);
      }
    }else{
      let message =''
      message = resetInfo.newPassword && !resetInfo.confirmPassword ? 'Confirm password' : 'Password cannot be empty.';
      this.toastData = {showIcon: true, isVisible: true, showCloseBtn: true, status: 'warning', message };
      this.api.toast.showToast(this.toastData.message, this.toastData.status);
    }
  }
    
  toggleAcceptTerms(){
    this.acceptTerms = !this.acceptTerms;
  }
    
  changeStatus(){
    if(this.toastData.status == 'danger' && (this.resetInfo.usename || this.resetInfo.newPassword || this.resetInfo.confirmPassword || this.otp)){
      this.toastData.showToast = false
    }  
    
  }

  goToSignIn(){
    this.auth.signOut();
  }

}
