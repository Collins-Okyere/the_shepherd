import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersRoutingModule } from './members-routing.module';
import { MembershipFormComponent } from '../templates/membership-form/membership-form.component';
import { AdmissionComponent } from './admission/admission.component';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, MembersRoutingModule, AdmissionComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {

}
