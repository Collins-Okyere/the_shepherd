import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PolicyComponent } from './policy/policy.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { TAndCsComponent } from './t-and-cs/t-and-cs.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ConatctUsComponent } from './conatct-us/conatct-us.component';
import { PricingComponent } from './pricing/pricing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'policy',
        component: PolicyComponent
      },
      {
        path: 'user_guide',
        component: UserGuideComponent
      },
      {
        path: 'terms_and_conditions',
        component: TAndCsComponent
      },
      {
        path: 'sign_up',
        component: SignUpComponent
      },
      {
        path: 'about_us',
        component: AboutUsComponent
      },
      {
        path: 'contact_us',
        component: ConatctUsComponent
      },
      {
        path: 'pricing',
        component: PricingComponent
      },
      {
        path: 'upgrade',
        component: UpgradeComponent
      },
      {
        path: 'not_found',
        component: NotFoundComponent
      },
      {
        path: '',
        redirectTo: 'contact_us',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'contact_us',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
