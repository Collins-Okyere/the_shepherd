import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<any>();

  constructor(){}

  showToast(toastData: any,clBkFn?:()=>void){
    this.setToast(toastData,clBkFn);
  }

  setToast(toastData: any,clBkFn?:()=>void) {
    let that = this;
    const toastId = setTimeout(() => {
      that.toastSubject.next('')
    }, (toastData.time || 5000));

    this.toastSubject.next({
      message: toastData.message,
      status: toastData.status || 'info',
      stayFn:() => {
        if (clBkFn) {
          clBkFn();
        }
        clearTimeout(toastId);
        // that.toastSubject.next(''); //this will close the modal
      },
      closeFn:() => {
          that.toastSubject.next(''); //this will close the modal
      }
    });
   
    

  }

  getToast(): Observable<any> {
      return this.toastSubject.asObservable();
  }


}
