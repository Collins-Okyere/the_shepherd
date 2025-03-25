import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from '../sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-lock-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.scss'
})
export class LockScreenComponent {

  user: any;
  rememberUser: boolean = false;
  statusSubscription:any
  status: string = '';
    
  constructor(private readonly auth: SignInComponent, private readonly api: ApiService){}
  
  ngOnInit(){
   this.statusSubscription = this.api.status.subscribe((status) => {
      this.status = status;
    });
    this.initData();
  }
  
  initData(){
    const user:any = localStorage.getItem('user');
    this.rememberUser = this.api.getLocalStorage('rememberUser');
    this.user = { username: user.username, password: '' };
    if (user) {
      this.rememberUser = user  === 'true';
    } else {
      this.rememberUser = false;
    }
  }

  async unlock(pass: any){
    this.user = { ...this.user,password: pass };
    this.api.signIn(this.user, 'unlock');
  }
    
  toggleRememberMe(){
    this.auth.toggleRememberMe();
  }
  
  forgotPassword(){
    this.auth.resetPassword();
  }
  signOut(){
    this.api.signOut();
  }

}
