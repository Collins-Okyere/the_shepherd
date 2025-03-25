import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  private subject = new Subject<any>();

  constructor(){}

  confirm(message: string,siFn:()=>void,noFn:()=>void){
    this.setConfirmation(message,siFn,noFn);
  }

  setConfirmation(message: string,siFn:()=>void,noFn:()=>void) {
    let that = this;
    this.subject.next({ type: "confirm",
                text: message,
                siFn:() => {
                    siFn();
                    that.subject.next(''); //this will close the modal
                },
                noFn:() => {
                    noFn();
                    that.subject.next(''); //this will close the modal
                }
              });

          }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }


}
