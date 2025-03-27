import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { ToastComponent } from './reusable-comps/toast/toast.component';
import { ModalComponent } from './reusable-comps/modal/modal.component';
import { MediaUploadComponent } from './reusable-comps/media-upload/media-upload.component';
import { ToastService } from './reusable-comps/toast/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, ModalComponent, MediaUploadComponent],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  toastData: any = {}
  title :string = 'theShepherd';
  mainPage: string = '';
  subPage: string = '';
  pageName: string = '';
  
  constructor(private readonly api: ApiService, private readonly toast: ToastService) { }

  ngOnInit() {
    this.api.initData();
    this.resetPricing()
  }

  showToast(data: any){
    this.toast.showToast(data.message, data.status);
  }

  resetPricing(){
    localStorage.removeItem('tryFree');
    localStorage.removeItem('selectedService');
    localStorage.removeItem('paytPeriod');
  }
  
}
