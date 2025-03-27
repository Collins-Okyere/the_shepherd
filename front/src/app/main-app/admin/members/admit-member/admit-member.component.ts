import { LocalDbService } from './../../../../services/local-db.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DownloadButtonComponent } from '../../../../reusable-comps/download-button/download-button.component';
import { SelectInputComponent } from '../../../../reusable-comps/select-input/select-input.component';
import { MembershipFormComponent } from "../../../shared/templates/membership-form/membership-form.component";
import { ApiService } from '../../../../services/api.service';
import { MediaUploadService } from '../../../../reusable-comps/media-upload/media-upload.service';
import { MainAppComponent } from '../../../main-app.component';


@Component({
  selector: 'app-admit-member',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectInputComponent, DownloadButtonComponent, MembershipFormComponent ],
  providers: [DatePipe],
  templateUrl: './admit-member.component.html',
  styleUrl: './admit-member.component.scss'
})

export class AdmitMemberComponent implements OnInit {

  noDB:any = []
  lastMemberId: string = ''
  isChurchWorker: boolean = false
  member: any = {
    canReceiveSms: true,
    canReceiveSms2: true,
    canReceiveEmail: true,
    dob: new Date(),
    membership_date: new Date(),
    photo: this.noDB.avatar,
    relations: []
  };

  constructor(private datePipe: DatePipe, private readonly api: ApiService, private nonDB: LocalDbService, private mediaService: MediaUploadService, private main: MainAppComponent) {}

  ngOnInit(): void {
    this.noDB = this.nonDB;
    this.setMember();
  }

  setMember(){
    this.lastMemberId = 'LIS01',
    this.member.member_id = 'LIS02',
    this.member.photo = this.noDB.avatar,
    this.member.membership_date = this.datePipe.transform(this.member.membership_date, 'yyyy-MM-dd');
    this.member.dob = this.datePipe.transform(this.member.dob, 'yyyy-MM-dd');
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
    this.member[field] = value;
    if(field === 'gender'){
      if(value.name === 'Female'){
        this.member = { ...this.member, photo: this.noDB.avatar_female  };
      }else{
        this.member = { ...this.member, photo: this.noDB.avatar  };
      }
    };
    if (field === 'user_type') {
      if(value.name === 'Member'){
        this.isChurchWorker = false;
        this.member = { ...this.member, departments: [], positions: [], supervisors: [], groups_led: [], privlleges: [] };
      }else{
        this.isChurchWorker = true
      }
    }
  }

  saveMember(){
    this.noDB.members.push(this.member);
    this.reset();
    this.main.getPage('manage_members');
  }

  reset(){
    this.member = null;
    this.member = {
      member_id: 'LIS02',
      canReceiveSms: true,
      canReceiveSms2: true,
      canReceiveEmail: true,
      dob: new Date(),
      membership_date: new Date(),
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
      image: this.member.photo,
      okAction: (croppedImage: any) => this.saveImage(croppedImage)
    });
  }
  
  saveImage(event: any) {
    this.member.photo = event;
  }

}
