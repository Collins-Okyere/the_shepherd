import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LocalDbService } from '../services/local-db.service';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../reusable-comps/dropdown/dropdown.component';
import { ChatComponent } from './shared/chat/chat.component';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { ApiService } from '../services/api.service';
// import { UiSettingsButtonComponent } from '../reusable-comps/ui-settings-button/ui-settings-button.component';

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DropdownComponent, ChatComponent, NotificationsComponent, 
    // UiSettingsButtonComponent
  ],
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.scss'
})
export class MainAppComponent implements OnInit {

  currUser: any = {};
  currChurch: any = {};
  currBranch: any = {};
  menu: any = [];
  userMenu:any = [];
  breadcrumbs:any = []
  isDrawerOpen: boolean = true;
  navShow:boolean = false;
  filled: boolean = true;
  notifIndicator: boolean = false;
  messageIndicator: boolean = false;
  pageName: string = '';
  userRole: any = '';
  currPage: any = 'dashboard'
  activeIndex: number | null = null;
  showToggler:number = 1

  constructor(
    private readonly api: ApiService, 
    private readonly router: Router, 
    private readonly noDB: LocalDbService
  ) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    let churchInfo:any = this.api.getLocalStorage('churchInfo') || {};
    let user = this.api.getLocalStorage('currUser') || {};
    this.userRole = localStorage.getItem('userRole') || '';
    this.currChurch = churchInfo.church;
    this.currBranch = churchInfo.branch;
    this.currUser = user.userInfo;
    this.currUser.fullName = `${this.currUser.first_name || ''} ${this.currUser.other_names || ''} ${this.currUser.last_name || ''}`.trim();
    if (this.userRole && this.noDB?.menu) {
      this.menu = this.noDB.menu.map((m: any) => ({ 
        ...m, subPages: m.subPages?.filter((sub: any) => sub.roles?.includes(this.userRole)) || []
      })).filter((m: any) => m.roles?.includes(this.userRole))
      const url = this.router.url.split("/");
      const page = url[url.length - 1];
      this.getPage(page);
      this.userMenu = this.noDB.userMenu
    } 
    let uiSetts = localStorage.getItem('uiSetts')
    if (uiSetts){
      this.filled = JSON.parse(uiSetts).filled;
      this.isDrawerOpen = JSON.parse(uiSetts).isDrawerOpen;
      this.navShow = JSON.parse(uiSetts).navShow
    }
  }

  uiControls(val: string) {
    switch (val) {
      case 'fill':
        this.filled = !this.filled;
      break;
      case 'drawer':
        this.isDrawerOpen = !this.isDrawerOpen
      break;
      case 'navShow':
        this.navShow = !this.navShow
      break;
      // case 'mobileNavShow':
      //   if(this.isDrawerOpen){
      //     this.isDrawerOpen = false
      //     this.navShow = false
      //   }else{
      //     this.isDrawerOpen = true
      //     this.navShow = true
      //   }
      // break;
    }
    localStorage.setItem('uiSetts', JSON.stringify({filled: this.filled, isDrawerOpen: this.isDrawerOpen, navShow: this.navShow}));
  }

  toggleDrawer(event?: Event) {
    if (event) {
      const checkbox = event.target as HTMLInputElement;
      this.isDrawerOpen = checkbox.checked;
    } else {
      this.isDrawerOpen = !this.isDrawerOpen;
    }
    // if(this.isDrawerOpen === true){
    //   this.isDrawerOpen = !this.isDrawerOpen;

      // this.navShow = false
    // }
  }

  toggleMenu(index: number, mainPage?: any) {
    this.activeIndex = this.activeIndex === index ? null : index;
    if(mainPage?.subPages?.length < 1){
      this.getPage(mainPage.page);
    }
  }

  optionSelected(selectedOption: any) {
    switch (selectedOption.action) {
      case 'lock_screen':
        this.api.lockScreen();
      break;
      case 'sign_out':
        this.api.signOut();
      break;
      default:
        this.userMenu.forEach((item: any) => {
          item.isActive = item.action === selectedOption.action;
        })
        this.pageName = 'Profile';
        this.breadcrumbs = [];
        this.breadcrumbs.push({ pageName: 'User', page: '' });
        this.breadcrumbs.push({ pageName: selectedOption.pageName, page: selectedOption.page });
        let openPage = `/${this.userRole}/${selectedOption.action}`
        this.router.navigate([openPage]);
      break;
    }
  }

  getPage(page: string) {
    this.menu.forEach((item: any) => {
      item.isActive = item.page === page;
      item.subPages?.forEach((subPage: any) => {
        subPage.isActive = subPage.page === page;
        if (subPage.isActive && !item.isActive) {
          item.isActive = true;
        }
      });
    });
    let currentPage = this.menu.find((item: any) => item.isActive);
    if (currentPage) {
      this.pageName = currentPage.pageName;
      let currentSubPage = currentPage.subPages?.find((item: any) => item.isActive);
      this.breadcrumbs = [];
      this.breadcrumbs.push({ pageName: currentPage.pageName, page: currentPage.page });
      if (currentSubPage) {
        this.breadcrumbs.push({ pageName: currentSubPage.pageName, page: currentSubPage.page });
      }
      let openPage = `/${this.userRole}/${currentPage.page}`;
      if (currentPage.subPages?.length && page !== currentPage.page) {
        openPage += `/${page}`;
      }
      this.router.navigate([openPage]);
    }
  }
  


}
