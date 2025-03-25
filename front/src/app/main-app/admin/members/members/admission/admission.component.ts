import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImageCroppedEvent, ImageCropperModule, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Cropper from 'cropperjs';
import { AdminComponent } from '../../admin.component';


@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, ImageCropperModule, HttpClientModule],
  providers: [DatePipe],
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.css'
})

export class AdmissionComponent implements OnInit {

  @ViewChild('fileInput') fileInput:any = ElementRef<HTMLInputElement>;
  
  page:number = 1;
  jsonData: any = {};
  staff_checked:boolean = false;
  baseUrl:string = environment.apiUrl;
  path:string = 'members';  
  user_perms:any = [];
  user:any = {
    permissions: this.user_perms
  };
  staff_object:any = {};
  credentials:any = {};
  data:any = this.noDb;
  imageChangedEvent: any = '';
  croppedImage: SafeUrl | null = this.data.avatar;
  cropper!: Cropper;
  newImage: SafeUrl | null = '';
  staff:any = {};
  member: any = {
    birth_date: new Date(),
    join_date: new Date(),
    photo: this.croppedImage,
  };
  quick_add:boolean = this.data.quick_add;
  selectedPermissions: number[] = [];
  modal:boolean = false;
  savedImage:any;

  constructor(private sanitizer: DomSanitizer, private readonly toast: ToastController, private noDb: DataService, private datePipe: DatePipe, private http: HttpClient, private readonly admin: AdminComponent) {
    this.member.join_date = this.datePipe.transform(this.member.join_date, 'yyyy-MM-dd');
    this.member.birth_date = this.datePipe.transform(this.member.birth_date, 'yyyy-MM-dd');
  }

  ngOnInit(){
    this.fetchData();
  }

  async fetchData(){
    await this.http.get(this.baseUrl + this.path, { params: { action: 'init_data' } }).toPromise().then((data:any) => {
      if(data){      
        this.jsonData = data;
      }
      this.member.member_id = this.jsonData.new_member_id
    });
  }
  
  togglePermissions(permissionId: number) {
    if (this.selectedPermissions.includes(permissionId)) {
      this.selectedPermissions = this.selectedPermissions.filter(id => id !== permissionId);
    } else {
      this.selectedPermissions.push(permissionId);
    }
    this.user.permissions = this.selectedPermissions;
  }


  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
  }
  
  loadExistingImage(): void {
    this.fileInput.nativeElement.click();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.objectUrl ? this.sanitizer.bypassSecurityTrustUrl(event.objectUrl) : null;
  }

  saveImg(){
    if (this.croppedImage) {
      this.savedImage = this.croppedImage;
      this.member.photo = this.savedImage.value;
    }
    this.openModal()
  }

  openModal(){ 
    this.modal = !this.modal;
  }

  cancelImg(){    
    this.imageChangedEvent = '';
    this.openModal()
  }

  imageLoaded(image: LoadedImage) {

  }

  cropperReady() {

  }

  loadImageFailed() { 
    this.presentToast('Invalid file type!', 'danger')
  }

  onCropperReady(cropper: Cropper): void {
    this.cropper = cropper;
  }

  ngOnDestroy(): void {
    if (this.cropper) {
      this.cropper.destroy();
    }
  }
  
  clear(){
    this.staff_object = {}
    this.credentials = {}
    this.staff ={}
  }

  switchFormPage(page: number){
    this.page = page;
  }

  quickToggle(){
    this.quick_add = !this.quick_add;
    if(this.quick_add){
      this.page = 1;
    }
  }

  changeUser(){
    if(!this.quick_add && this.page === 4){
      this.page = 3
      return
    };
    if(this.quick_add && this.page === 2){
      this.page = 1;
      return
    };
    if(this.staff_checked){
      this.staff.staff_id = this.jsonData.new_staff_id;
    }else{      
      this.staff = {};
    };
  }

  move(val:string){
    if(val === 'next'){
      if(!this.quick_add){
        if(this.page === 1){
          this.page = 2;
          return
        };
        if(this.page === 2){
          this.page = 3;
          return
        };
        if(this.page === 3){
          this.page = 4;
          return
        };
        if(this.quick_add){
          this.page = 2;
          return
        }
        return
      };
      if(this.quick_add){
        this.page = 2;
        return
      }
    };
    if(val === 'previous'){
      if(this.page === 2){
        this.page = 1;
      };
      if(this.page === 3){
        this.page = 2;
      };
      if(this.page === 4){
        this.page = 3;
      };
      if(this.quick_add){
        this.page = 1;
      }
      return
    };
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
      position: 'top',
      color: color
    });
    await toast.present();
  }

  reset(){
    this.member = {}
    this.page === 1;
    this.staff_checked = false;
    this.staff = {}
    if(this.quick_add){
      this.quick_add = true;
      this.switchFormPage(1);
    }else{
      this.quick_add = false
    }
  }

  objCreator(data: any){
    if(this.staff_checked){
      const { first_name, last_name, other_names, gender, photo, birth_date, join_date, title, phone1, phone2, email, local_church, ministries, marital_status, edu_level, nationality, resid_address } = data;
      this.staff_object = { first_name, last_name, other_names, gender, photo, birth_date, join_date, title, phone1, phone2, email, local_church, ministries, marital_status, edu_level, nationality, resid_address };
      this.staff = { ...this.staff, ...this.staff_object}
      this.user = { username: this.staff.staff_id, password: `${this.staff.staff_id}123`, permissions: this.selectedPermissions, first_name: this.staff_object.first_name, last_name: this.staff_object.last_name, user_type:  'staff', is_member: this.staff_checked, member_id: this.member.member_id };
    } else {
      this.user = { username: this.member.member_id, password: `${this.member.member_id}123`, first_name: this.member.first_name, last_name: this.member.last_name,  user_type:  'member' };
    };
    this.member = { ...this.member, is_staff: this.staff_checked, staff_id: this.staff.staff_id }
  }

  async saveMember(){
    this.jsonData = {};
    this.objCreator(this.member);
    await this.http.post(this.baseUrl + this.path, { action: 'create_member', member: this.member, user: this.user, ...(this.staff ? { staff: this.staff } : {}) }).toPromise().then((data:any) => {
      if(data){
        this.jsonData = data;
        if(this.jsonData.success){
          this.presentToast(this.jsonData.msg,'tertiary');
          this.admin.selected('membership','manage');
        }else{
          this.presentToast(this.jsonData.msg,'danger');
          this.fetchData()
        };
      }
    });
  }

  print(paper: string, orientation:any){
    
  }

}
