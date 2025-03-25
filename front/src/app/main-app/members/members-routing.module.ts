import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members.component';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { ProfileComponent } from '../shared/profile/profile.component';
import { UserSettingsComponent } from '../shared/user-settings/user-settings.component';
import { ConatctUsComponent } from '../../pages/conatct-us/conatct-us.component';
import { UserGuideComponent } from '../../pages/user-guide/user-guide.component';
import { AttendanceReportsComponent } from '../shared/attendance/attendance-reports/attendance-reports.component';


const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'attendance',
        children:[
          {
            path: 'attendance_reports',
            component: AttendanceReportsComponent
          },
          {
            path: '',
            redirectTo: 'attendance_reports',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'help_center',
        children:[
          {
            path: 'conatct_us',
            component: ConatctUsComponent
          },
          {
            path: 'user_guide',
            component: UserGuideComponent
          },
          {
            path: '',
            redirectTo: 'conatct_us',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'settings',
        component: UserSettingsComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
