import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FloatingNavComponent } from '../../reusable-comps/floating-nav/floating-nav.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatingNavComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  user: any = {};
  rememberUser: boolean = false;
  statusSubscription:any
  status: string = '';

  constructor(private readonly api: ApiService, private readonly router: Router){}

  ngOnInit(){
    this.statusSubscription = this.api.status.subscribe((status) => {
      this.status = status;
    });
    this.router.navigate(['pages']);
  }

  signIn(usrObj: any){
    this.api.signIn(usrObj, 'sign_in');
  }

  toggleRememberMe() {
    this.rememberUser = !this.rememberUser;
    localStorage.setItem('rememberUser', String(this.rememberUser));
  }

  resetPassword(){
    this.router.navigate(['auth/reset_password']);
  }

  reset(){
    this.user = {}
    this.api.resetLocalStorage();
  }
  
  signOut(){
    this.api.signOut();
  }
  
  lockScreen(){
    this.api.lockScreen();
  }

  startTrial(){
    this.router.navigate(['pages/sign_up']);
  }

  ngOnDestroy() {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }
  



}
