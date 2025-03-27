import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.dev';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from '../reusable-comps/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl: string = environment.apiUrl
  authToken:any;
  toastData: any = {};
  allowLogin: any = false
  status = new BehaviorSubject<string>('');

  constructor( private http: HttpClient, private location: Location, private readonly router: Router, public readonly toast: ToastService) {
    this.initData()
  }

  initData() {
    this.authToken = localStorage.getItem('authToken');
    const allow = localStorage.getItem('isLoggedIn')
    this.allowLogin = allow ?? false ;
    const currentUrl = this.location.path();
    const segments = currentUrl.split('/');
    if(!this.authToken && ( segments[1] === 'admin' || segments[1] === 'member' ) ){
      this.resetLocalStorage();
      return this.signOut();  
    };
  }

  // Helper function to read cookies
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    console.log(match)

    return match ? match[2] : null;
  }

  async makeRequest(verb: string, path: string, params: any, unique_url?:string) {
    this.initData();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });
    let req: any;
    const baseUrl = ( unique_url ?? this.apiUrl ) + path
    if (verb === 'GET') {
      req = this.http.get(baseUrl, { params, headers });
    }else if (verb === 'POST') {
      req = this.http.post(baseUrl, params, { headers });
    } else if (verb === 'PUT') {
      req = this.http.put(baseUrl, params, { headers });
    }else if (verb === 'DELETE') {
      req = this.http.delete(baseUrl, { headers });
    } else {
      console.error('Invalid HTTP method:', verb);
    }
    return req.toPromise().then((data: any) => {
      let msg = data.message
      if(data.user){
        this.addLocalStorage('userRole', data.user.user_role);
        this.addLocalStorage('currUser', data.user);
        this.addLocalStorage('churchInfo', data.churchInfo);
      };
      if (data.reload) {
        window.location.reload() 
      };
      try {
        this.toast.showToast(msg.message,msg.status);
        if (data.haltAction) {
          return data.logUserOut ? this.signOut() : {};
        }
        return data;
      } catch (error) {
        console.error('Request failed:', error);
        this.toast.showToast('An error occurred','danger');
        return {};
      }
    });
  }

  signIn(user: any, type: string){
    let msg: any
    if(user.username && user.password){
      this.makeRequest('POST', 'auth', { action: type, user}).then( async (data: any) => {     
        localStorage.setItem('authToken', data.authToken);
        if(data?.user?.user_role){
          localStorage.setItem('userRole', data.user.user_role)
          const path: string = data.user.user_role;
          this.router.navigate([`${path}/dashboard`]);
          localStorage.setItem('isLoggedIn', 'true');
        };
        if (data.message) {
          msg = data.message
          this.toast.showToast(msg.message, msg.status)
        }
      })
    }else{
      let emptyParam = !user.username && user.password ? 'Username' : !user.password && user.username ? 'Password' : 'Username and Password';
      msg = { message: `${emptyParam} cannot be empty.`, status: 'warning' };
      this.toast.showToast(msg.message, msg.status)
    }
    this.status.next(this.toastData.status)
  }

  signOut(){
    this.resetLocalStorage()
    this.addLocalStorage('isLoggedIn', 'false');
    this.router.navigate(['auth/sign_in']);
    setTimeout(() => {
      let msg:any = { message: 'Sign in to continue', status: 'warning' };
      this.toast.showToast(msg.message, msg.status)
    }, 100);
  }

  resetLocalStorage(){
    const keysToKeep = [ 'uiSetts', 'rememberUser' ];
    Object.keys(localStorage).forEach((key) => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  }
  
  lockScreen(){
    this.addLocalStorage('isLoggedIn', 'false');
    this.router.navigate(['auth/lock_screen']);
    setTimeout(() => {
      this.toastData = { status: 'warning', message: 'Screen Locked. Sign in to unlock',  showIcon: true, showCloseBtn: true, isVisible: true }
      let msg:any = { status: 'warning', message: 'Screen Locked. Sign in to unlock' }
      this.toast.showToast(msg.message, msg.status)
    }, 100);
  }

  public addLocalStorage(key: string, value: any) {
    const valStr = JSON.stringify(value)
    localStorage.setItem(key, valStr);
  }

  public getLocalStorage(key: string) {
    let data: any = localStorage.getItem(key)|| "";
    data = data === 'true' ? data = true : data === 'false' ? data = false : data;
    return data && JSON.parse(data)
  }

}
