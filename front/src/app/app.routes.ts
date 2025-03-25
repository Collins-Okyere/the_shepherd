import { Routes } from '@angular/router';
import { MainAppComponent } from './main-app/main-app.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule)
    },
    {
        path: 'admin',
        component: MainAppComponent,
        loadChildren: () => import('./main-app/admin/admin-routing.module').then((m) => m.AdminRoutingModule)
    },
    {
        path: 'member',
        component: MainAppComponent,
        loadChildren: () => import('./main-app/members/members-routing.module').then((m) => m.MembersRoutingModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('./pages/pages-routing.module').then((m) => m.PagesRoutingModule)
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'pages/not_found',
        pathMatch: 'full'    
    }
];
