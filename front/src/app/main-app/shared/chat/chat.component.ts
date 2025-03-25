import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../admin/admin.component';

@Component({
  standalone: true,
  imports:[CommonModule,
    // AdminComponent 
  ],
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {

  chatList: boolean = true
  contactList: boolean = true
  chatShow:boolean = false
  chatHead:boolean = true
  unread: boolean = false
  clicked: boolean = false
  notifHide = true
  chatProfile = false
  userProfileTab = 1
  replyBox = false
  forwardBox = false
  pushForward = false
  switchNav: string = 'unread_msgs';
  slide:boolean = false;
  // slideOver:boolean = this.admin.slideOver;
  // mainPage: string = this.admin.mainPage;
  currentChat:any;

  // constructor(private readonly admin: AdminComponent, private readonly mainService: MainService) { }

  ngOnInit() { 
  }

  slideNav(val: string){
    this.switchNav = val;
    if(this.switchNav === 'unread_msgs' || this.switchNav === 'all_msgs'){
      this.chatList = true
    };
    if(this.switchNav === 'contacts'){
      this.contactList = true
    };
  }

  chatBackTab(){
    this.chatProfile = false
    this.chatHead = true;
    this.chatShow = false
    this.chatList = true
    this.contactList = true
  }

  viewProfile(){
    this.chatProfile = true
    this.contactList = false
    this.chatList = false
    this.chatHead = false
    this.chatShow = false
  }

  profileBackTab(){
    if (this.switchNav === 'unread_msgs' || this.switchNav === 'all_msgs'){
      this.chatHead = false;
      this.chatShow = true
      this.chatList = false
    };
    if (this.switchNav === 'contacts'){
      this.chatHead = true;
      this.chatShow = false
      this.contactList = true
    };
    this.chatProfile = false
  }

  messageView(){
    this.chatProfile = false
    this.contactList = false
    this.chatList = false
    this.chatHead = false
    this.chatShow = true
  }
      
  replyChat(){
    this.replyBox = !this.replyBox
    this.forwardBox = false
  }
      
  forwardChat(){
    this.replyBox = false
    this.forwardBox = !this.forwardBox
  }

  sendMessage(){
    this.replyBox = false
    this.forwardBox = false
    this.pushForward = false
  }


}
