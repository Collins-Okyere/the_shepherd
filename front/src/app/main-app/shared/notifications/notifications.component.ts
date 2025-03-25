import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalDbService } from '../../../services/local-db.service';

@Component({
  standalone: true,
  imports: [CommonModule,],
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent  implements OnInit {

  unread:boolean = true;
  notifShow:boolean = false;
  switchNav: string = 'unread';
  // mainPage: string = this.admin.mainPage;
  // slideOver:boolean = this.admin.slideOver;
  notifications:any = []
  selectedNotif:any;

  // constructor(private readonly admin: AdminComponent, private readonly mainService: MainService, private readonly dataService: DataService) { }
  constructor(private readonly noDB: LocalDbService) { }

  ngOnInit() { 
    this.notifications = this.noDB.notifications
  }

  filter(val: string){
    this.switchNav = val;
  }
  
  selected(obj:any){
    this.notifShow = !this.notifShow;
    this.selectedNotif = obj;
  }
  
  close(){
    this.notifShow = false;;
  }

  options(val:string){
    
  }

}
