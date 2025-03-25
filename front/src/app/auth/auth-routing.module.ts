import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign_in',
        component: SignInComponent
      },
      {
        path: 'lock_screen',
        component: LockScreenComponent
      },
      {
        path: 'reset_password',
        component: ResetPasswordComponent
      },
      {
        path: '',
        redirectTo: 'sign_in',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'sign_in',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
