import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FloatingNavComponent } from './reusable-comps/floating-nav/floating-nav.component';
import { SelectInputComponent } from './reusable-comps/select-input/select-input.component';
import { ToastComponent } from './reusable-comps/toast/toast.component';
import { provideHttpClient } from '@angular/common/http';
import { ImageCropperComponent } from 'ngx-image-cropper';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    ImageCropperComponent,
    ToastComponent,
    FloatingNavComponent,
    SelectInputComponent,
    SignInComponent,
    SignUpComponent
  ]
};