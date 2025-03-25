import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MainAppComponent } from '../../main-app/main-app.component';

@Component({
  selector: 'app-ui-settings-button',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './ui-settings-button.component.html',
  styleUrl: './ui-settings-button.component.scss'
})
export class UiSettingsButtonComponent {

  theme:string = ''
  fillType:string = 'outline'
  navbar:string = 'side'

  navbars:any = [ 
    {title: 'Top Nav', value: 'top', icon: ''}, 
    {title: 'Full Side Nav', value: 'side', icon: ''},
    {title: 'Narrow Side Nav', value: 'side-narrow', icon: ''} 
  ];
  fills:any = [ 
    {title: 'Filled', value: 'filled', icon: ''}, 
    {title: 'Outline', value: 'outline', icon: ''},
  ];
  themes: any = [ 
    { title: 'Priesthood', value: 'indigo', icon: 'M12 2L15 8H9L12 2ZM12 22L9 16H15L12 22ZM2 12L8 9V15L2 12ZM22 12L16 9V15L22 12Z' },
    { title: 'Eden', value: 'emerald', icon: 'M12 2C8 2 4 5 4 10C4 14 8 18 12 22C16 18 20 14 20 10C20 5 16 2 12 2Z' },
    { title: 'Waters', value: 'cyan', icon: 'M12 2C6 2 6 8 6 8C6 10 8 12 12 16C16 12 18 10 18 8C18 8 18 2 12 2Z' },
    { title: 'Manna', value: 'gray', icon: 'M4 12L12 4L20 12H16V20H8V12H4Z' },
    { title: 'Glory', value: 'purple', icon: 'M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z' },
    { title: 'Bush', value: 'violet', icon: 'M12 2C6 2 6 10 6 10C6 14 12 18 12 18C12 18 18 14 18 10C18 10 18 2 12 2Z' },
    { title: 'Fire', value: 'yellow', icon: 'M12 2C10 6 6 8 6 12C6 16 10 20 12 22C14 20 18 16 18 12C18 8 14 6 12 2Z' },
    { title: 'Rose', value: 'rose', icon: 'M12 2C10 4 6 8 6 12C6 16 10 20 12 22C14 20 18 16 18 12C18 8 14 4 12 2Z' }
  ];
  

  control(action: number, val: string){
    switch(action){
      case 1:
        this.navbar = val;
        break;
      case 2:
        this.fillType = val;
        break;
      case 3:
        this.theme = val;
        break;
    }
  }

}
