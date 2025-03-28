import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { ProfileComponent } from '../shared/profile/profile.component';
import { UserSettingsComponent } from '../shared/user-settings/user-settings.component';
import { AdmitMemberComponent } from './members/admit-member/admit-member.component';
import { ManageMembersComponent } from './members/manage-members/manage-members.component';
import { MembersSettingsComponent } from './members/members-settings/members-settings.component';
import { AdmitStaffComponent } from './staff/admit-staff/admit-staff.component';
import { ManageStaffComponent } from './staff/manage-staff/manage-staff.component';
import { ChurchInfosComponent } from './general-setup/church-infos/church-infos.component';
import { ChurchSetupComponent } from './general-setup/church-setup/church-setup.component';
import { UserPrivillegesComponent } from './general-setup/user-privilleges/user-privilleges.component';
import { AttendanceReportsComponent } from '../shared/attendance/attendance-reports/attendance-reports.component';
import { AttendanceSettingsComponent } from '../shared/attendance/attendance-settings/attendance-settings.component';
import { ConatctUsComponent } from '../../pages/conatct-us/conatct-us.component';
import { PolicyComponent } from '../../pages/policy/policy.component';
import { TAndCsComponent } from '../../pages/t-and-cs/t-and-cs.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { UserGuideComponent } from '../../pages/user-guide/user-guide.component';
import { BillingComponent } from '../shared/help-center/billing/billing.component';
import { BulkDataComponent } from '../shared/more/bulk-data/bulk-data.component';
import { StaffSettingsComponent } from './staff/staff-settings/staff-settings.component';
import { MarkAttendanceComponent } from '../shared/attendance/mark-attendance/mark-attendance.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'members',
        children: [
          {
            path: 'admit_member',
            component: AdmitMemberComponent,
          },
          {
            path: 'manage_members',
            component: ManageMembersComponent,
          },
          {
            path: 'member_settings',
            component: MembersSettingsComponent,
          },
          {
            path: '',
            redirectTo: 'admit_member',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'attendance',
        children: [
          {
            path: 'mark_attendance',
            component: MarkAttendanceComponent,
          },
          {
            path: 'attendance_reports',
            component: AttendanceReportsComponent,
          },
          {
            path: 'attendance_settings',
            component: AttendanceSettingsComponent,
          },
          {
            path: '',
            redirectTo: 'mark_attendance',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'staff',
        children: [
          {
            path: 'admit_staff',
            component: AdmitStaffComponent,
          },
          {
            path: 'manage_staff',
            component: ManageStaffComponent,
          },
          {
            path: 'staff_setup',
            component: StaffSettingsComponent,
          },
          {
            path: '',
            redirectTo: 'admit_staff',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'general_setup',
        children: [
          {
            path: 'church_info',
            component: ChurchInfosComponent,
          },
          {
            path: 'church_setup',
            component: ChurchSetupComponent,
          },
          {
            path: 'user_privilleges',
            component: UserPrivillegesComponent,
          },
          {
            path: '',
            redirectTo: 'church_info',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'help_center',
        children: [
          {
            path: 'conatct_us',
            component: ConatctUsComponent,
          },
          {
            path: 'billing',
            component: BillingComponent,
          },
          {
            path: 'upgrade',
            component: UpgradeComponent,
          },
          {
            path: 'user_guide',
            component: UserGuideComponent,
          },
          {
            path: 'policy',
            component: PolicyComponent,
          },
          {
            path: 'terms_and_conditions',
            component: TAndCsComponent,
          },
          {
            path: '',
            redirectTo: 'conatct_us',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'more',
        children: [
          {
            path: 'bulk_data',
            component: BulkDataComponent,
          },
          {
            path: '',
            redirectTo: 'bulk_data',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'settings',
        component: UserSettingsComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
