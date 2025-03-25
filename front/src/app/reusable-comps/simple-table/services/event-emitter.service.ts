

import { Injectable, EventEmitter } from '@angular/core';    
import { BehaviorSubject, Subscription } from 'rxjs'; 
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeCallFunction = new EventEmitter();    
  subsVar: Subscription[] = <any>[]; 
  // tabSubcription = new Subscription(); 
  
  private currentEmittedData = new BehaviorSubject<any>({});
  emittedData = this.currentEmittedData.asObservable();
    
  constructor() {}  

  changeEmittedData(newData: any) {
    this.currentEmittedData.next(newData)
  }
    
  onComponentCall(fnx: any) { 
    console.log("Event Emitted")   
    this.invokeCallFunction.emit(fnx); 
  }    
}  