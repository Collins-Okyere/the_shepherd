import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  private modalState = new BehaviorSubject<any>({ isOpen: false });
  modalState$ = this.modalState.asObservable();

  openModal(config: any) {
    this.modalState.next({ isOpen: true, ...config });
  }

  closeModal() {
    this.modalState.next({ isOpen: false });
  }
  
}
