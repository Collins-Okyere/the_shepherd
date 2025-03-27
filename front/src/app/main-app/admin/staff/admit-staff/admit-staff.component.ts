import { LocalDbService } from './../../../../services/local-db.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DownloadButtonComponent } from '../../../../reusable-comps/download-button/download-button.component';
import { SelectInputComponent } from '../../../../reusable-comps/select-input/select-input.component';
import { ApiService } from '../../../../services/api.service';
import { MediaUploadService } from '../../../../reusable-comps/media-upload/media-upload.service';
import { MainAppComponent } from '../../../main-app.component';
import { AdmitStaffFormComponent } from '../../../shared/templates/admission-form/admit-staff-form.component';


@Component({
  selector: 'app-admit-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectInputComponent, DownloadButtonComponent, AdmitStaffFormComponent ],
  providers: [DatePipe],
  templateUrl: './admit-staff.component.html',
  styleUrl: './admit-staff.component.scss'
})

export class AdmitStaffComponent implements OnInit {

  noDB:any = []
  lastStaffId: string = ''
  staff: any = {
    canReceiveSms: true,
    canReceiveSms2: true,
    canReceiveEmail: true,
    dob: new Date(),
    admission_date: new Date(),
    photo: this.noDB.avatar,
    relations: []
  };

  constructor(private datePipe: DatePipe, private readonly api: ApiService, private nonDB: LocalDbService, private mediaService: MediaUploadService, private main: MainAppComponent) {}

  ngOnInit(): void {
    this.noDB = this.nonDB;
    this.setStaff();
  }

  setStaff(){
    this.lastStaffId = 'LIS01',
    this.staff.staff_id = 'LIS02',
    this.staff.photo = this.noDB.avatar,
    this.staff.admission_date = this.datePipe.transform(this.staff.admission_date, 'yyyy-MM-dd');
    this.staff.dob = this.datePipe.transform(this.staff.dob, 'yyyy-MM-dd');
  }

  handleToggle(propertyPath: string, value: boolean): void {
    const properties = propertyPath.split('.');
    if (properties.length === 1) {
      (this as any)[properties[0]] = value;
    } else if (properties.length === 2) {
      ((this as any)[properties[0]] as any)[properties[1]] = value;
    };
  }

  onSelectionChanged(field: string, value: any) {
    this.staff[field] = value;
    if(field === 'gender'){
      if(value.name === 'Female'){
        this.staff = { ...this.staff, photo: this.noDB.avatar_female  };
      }else{
        this.staff = { ...this.staff, photo: this.noDB.avatar  };
      }
    };
  }

  saveStaff(){
    this.noDB.staff.push(this.staff);
    this.reset();
    this.main.getPage('manage_staff');
  }

  reset(){
    this.staff = null;
    this.staff = {
      staff_id: 'LIS02',
      canReceiveSms: true,
      canReceiveSms2: true,
      canReceiveEmail: true,
      dob: new Date(),
      admission_date: new Date(),
      photo: this.noDB.avatar,
      relations: [],
      groups: [],
      groups_led: [],
      positions: [],
      departments: [],
      privilleges: [],
      supervisors: []
    };
  }

  openUploadModal() {
    this.mediaService.openModal({
      title: 'Upload Avatar',
      image: this.staff.photo,
      okAction: (croppedImage: any) => this.saveImage(croppedImage)
    });
  }
  
  saveImage(event: any) {
    this.staff.photo = event;
  }

}
