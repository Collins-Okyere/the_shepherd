import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import  *  as CryptoJS from  'crypto-js';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import { environment } from '../environments/environment';
import { ToastService } from './toast.service';
import { NonDbService } from '../../../services/nondb.service';


@Injectable({
  providedIn: 'root'
})
  
export class MapiService  {

  private userData = new BehaviorSubject(<any> {});  
  currentUserData = this.userData.asObservable();

  headers = new HttpHeaders();
  allowLogin: boolean = true;
  currentRole: string = ''
  authToken:string = ''
  currentClient: any;
  curRedactorFile = ""
  api_version: string = 'api'
  secretKey: string = 'hfjhgjf1123';
  public apiUrl = "";
  // public apiUrl = environment.apiUrl;
  public appUrl = window.location.origin

  toast = inject(ToastService)
  router = inject(Router)
  http = inject(HttpClient)
  nonDb = inject(NonDbService)

  constructor() {
    this.initData();
  }

  changeUserData(value: any) {
    this.userData.next(value);
  }

  async initData(){
    this.makeRequest('GET', 'users/init_data', {}).then((data: any) => {
      if (data && data.user) {
        this.allowLogin = false
        this.currentClient = data.client
        this.nonDb.currentClient = data.client
        const user = data.user
        this.changeUserData(user)
        this.nonDb.user = user
        const userRole = user.user_type.toLowerCase()
        const rootPath = this.router.url.split('/')[2];
        if (rootPath !== userRole) {
          this.router.navigate([`/main/${userRole}`]);
        }
        this.addStoreItem('currentClient', data.client)
        this.currentRole = userRole
      } else {
        this.logOut()
      }
    });
  }

  async makeRequest(verb: string, path: string, params: any, opts?:any) {

    this.authToken = this.getStoreItem('authToken');
    if (!this.authToken && this.router.url !=="/auth/sign_in") {
       return this.logOut()
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    }
    // this.headers.set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.authToken}`)
    let req: any;
    const baseUrl = ( opts?.base_url ?? this.apiUrl ) + `${opts?.api_v ?? this.api_version}/${path}`
    if (verb === 'POST') {
      req = this.http.post(baseUrl, params, {headers});
    }else if (verb === 'GET') {
      req = this.http.get(baseUrl, {params, headers});
    }else {
      console.log('bad request');
    };

    return req.toPromise().then((data: any) => {
      if (data.reload) {
        window.location.reload() 
      }
      if (data.flash_messages) {
        this.showToast(data.flash_messages)
      }
      if (data.haltAction) {
        if (data.logUserOut) {
          return this.logOut()
        } else {
          return <any>{}
        }
      } else {
        return data
      }
    });

  }

  public addStoreItem(key: string, value: any, secure?: boolean) {
    const valStr = JSON.stringify(value)
    // const vData = secure ? this.encrypt(valStr) : valStr
    const vData =  valStr
    localStorage.setItem(key, vData);
  }

  public getStoreItem(key: string, secure?: boolean) {
    let data = localStorage.getItem(key)|| "";
    // data = secure ? this.decrypt(data) : data
    data =  data
    return data && JSON.parse(data)
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  // private encrypt(txt: string): string {
  //   return CryptoJS.AES.encrypt(txt, this.secretKey).toString();
  // }

  // private decrypt(txtToDecrypt: string) {
  //   return CryptoJS.AES.decrypt(txtToDecrypt, this.secretKey).toString(CryptoJS.enc.Utf8);
  // }

  async showToast(opts: any){
    let msgs = opts
    if (msgs.constructor === Object) {
      msgs = [opts]
    }
    let i = 0
    const msgLen = msgs.length
    console.log(msgs)
    while (i < msgLen) {
      const msg = msgs[i]
      this.toast.showToast({ status: (msg.type || msg.status), message: (msg.msg || msg.message)});
      i++
    }

    // msgs.forEach( async (msg: any) => {
    //   await this.toast.showToast({ status: msg.type, message: msg.msg,  showIcon: true, showCloseBtn: true, isVisible: true });
    // });
  }

  async logOut(){
    this.removeData('authToken')
    this.removeData('currentClient')
    this.removeData('domain')
    this.removeData('pageName')
    this.allowLogin = true
    this.router.navigate(['/auth/sign_in']);
    this.authToken = ''
  }

  
}







