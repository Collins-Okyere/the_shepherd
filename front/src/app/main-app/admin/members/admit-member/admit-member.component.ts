import { LocalDbService } from './../../../../services/local-db.service';
import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DownloadButtonComponent } from '../../../../reusable-comps/download-button/download-button.component';
import { SelectInputComponent } from '../../../../reusable-comps/select-input/select-input.component';
import { MembershipFormComponent } from "../../../shared/templates/membership-form/membership-form.component";
import { ModalService } from '../../../../services/modal.service';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { MediaUploadComponent } from '../../../../reusable-comps/media-upload/media-upload.component';


@Component({
  selector: 'app-admit-member',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectInputComponent, DownloadButtonComponent, MembershipFormComponent ],
  providers: [DatePipe],
  templateUrl: './admit-member.component.html',
  styleUrl: './admit-member.component.scss'
})

export class AdmitMemberComponent {

  data:any = inject(LocalDbService)
  memberImage: string = '';
  member: any = {
    member_id: 'LIS02',
    canReceiveSms: true,
    canReceiveSms2: true,
    canReceiveEmail: true,
    dob: new Date(),
    membership_date: new Date(),
    photo: this.data.avatar,
    relations: []
  };

  constructor(private datePipe: DatePipe, private readonly api: ApiService, private readonly toast: ToastService, private modal: ModalService) {
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

  onSelectionChanged(event: any) {

  }

  saveMember(){
    this.data.members.push(this.member);
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
      photo: this.data.avatar,
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
    this.modal.openModal({
      component: MediaUploadComponent,
      title: 'Upload Avatar',
      closeLabel: 'Cancel',
      okLabel: 'Upload',
      closeOnOutsideClick: true,
      width: '2xl',
      okAction: () => null,
    });
  }

  // showtoast(){
  //   this.toast.showToast('Upload Completed!', 'success')  
  // }

}
