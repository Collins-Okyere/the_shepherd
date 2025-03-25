import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { IonicModule, ToastController } from '@ionic/angular';
import { AdminComponent } from '../../admin.component';
import { MessagesComponent } from '../../shared-comps/messages/messages.component';
import { CertificateComponent } from '../../templates/certificate/certificate.component';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule, IonicModule, CertificateComponent],
  providers: [MessagesComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})

export class ManageComponent {

  @Input() member:any;
  @Input() textTheme:string = this.admin.textTheme$;
  @Input() bgTheme:string = this.admin.bgTheme$
  openFilters:boolean = false;
  mobile:boolean = false;
  soulsMobile:boolean = false;
  relationsMobile:boolean = false;
  shepherdsMobile:boolean = false;
  higherAdmin:boolean = false;
  theme:string = 'default';
  sideNav: boolean = this.admin.sideNav;
  membersType: string = '';
  sexFilter:string = '';
  searchValue:string = '';
  branch:any;
  territory:any;
  ministry:any;
  status:any;
  region:any;
  members:any = []
  souls:any = [];
  siblings:any = [];
  shepherds:any = [];
  loopObject:any =[];
  continent:any;
  group:any;
  cellGroup:any;
  data:any = this.noDb;
  edit:boolean = false;
  selectedItem:any;
  selectedSoul:any;
  selectedRelation:any;
  selectedShepherd:any;
  mainTab:string = 'profile';  
  action:string = 'profile';
  group_action:string = '';
  checkBoxes:boolean = false;
  selectAllCheckbox:boolean = false;
  modal:boolean = false;
  newData:any = {};
  color:string = ''

  constructor(private noDb: DataService, private admin: AdminComponent, private msgComp: MessagesComponent, private readonly toast: ToastController) {}

  ngOnInit(){
    this.presets();
  }

  async presets(){
    this.admin.themedAs$.subscribe(theme => {
      this.theme = theme;
    });
    this.filter('all_gender');
    this.members = this.noDb.members.filter((mem:any) => !mem.is_archived);
    await this.members;
    this.sexFilter = 'all_gender';
    this.membersType = 'active';
    this.onStatusChange();
    this.selectedItem = this.members[this.members.length-1];
    this.selected(this.selectedItem, 'member');
    this.fabBtn('member_back');
  }

  filter(val:string){
    if(val === 'all_gender' || val === 'male' || val === 'female'){
      this.sexFilter = val;
      return
    };
    if(val === 'main'){
      this.collapse();
      return
    };
  }

  collapse(){
    this.openFilters = !this.openFilters
  }

  search(){
    
  }

  onStatusChange() {
    if(this.membersType === 'active'){
      this.members = this.noDb.members.filter((mem:any) => !mem.is_archived);
    };
    if(this.membersType === 'archived'){
      this.members = this.noDb.members.filter((mem:any) => !mem.is_archived);
    }  }

  selected(obj:any, val:string){
    if(this.action === 'profile' && val === ''){
      this.souls = [];
      this.siblings = [];
      this.shepherds = [];
      this.selectedItem = obj;
      this.souls = this.selectedItem.souls;
      this.siblings = this.selectedItem.siblings;
      this.shepherds = this.selectedItem.shepherds;
      this.edit = false;
      this.mobile = true;
      this.changeTab('profile');
      return
    };
    if(val === 'soul'){
      this.selectedSoul = obj;
      this.soulsMobile = true;
      return
    };
    if(val === 'relation'){
      this.selectedRelation = obj;
      this.relationsMobile = true;
      return
    };
    if(val === 'shepherd'){
      this.selectedShepherd = obj;
      this.shepherdsMobile = true;
      return
    };
    if(this.action !== 'profile' && val === ''){
      this.selectedItem = obj;
      this.member = this.selectedItem;
      this.mobile = true;
      this.checkBoxes = false;
      this.selectAllCheckbox = false;
      this.toggleSelectAll();
      this.cancelNewData('checkbox');
      return
    };
  }

  changeTab(val:string){
    this.mainTab = val;
    this.soulsMobile = false;
    this.relationsMobile = false;
    this.shepherdsMobile = false;
    this.edit = false;
  }

  editOrUpdateMember() {
    if (this.edit) {
      this.updateMember(this.selectedItem);
    } else {
      this.editMember(this.selectedItem);
    }
  }

  editMember(obj:any){
    this.selectedItem = obj;
    this.edit = true
  }

  updateMember(obj:any){
    this.selectedItem = obj;
    this.edit = false;
    this.presentToast('Member details updated!', this.theme);
  }

  fabBtn(val:string){
    if(val === 'filters'){
      this.collapse();
    };
    if(val === 'member_back'){
      // if(this.action === 'profile'){
        this.actions(this.action);
        this.mobile = false;
        return
      // };
    };
    if(val === 'souls_back'){
      this.soulsMobile = false;
      this.mobile = true;
    };
    if(val === 'relations_back'){
      this.relationsMobile = false;
      this.mobile = true;
    };
    if(val === 'shepherds_back'){
      this.shepherdsMobile = false;
      this.mobile = true;
    };
  }

  print(val:string, val2:string){
    this.modal = false;

  }

  actions(val:string){
    if(val === 'download' ){
      this.group_action = val;
      if(this.group_action === 'download' ){
        this.modal = true;
      };
      return
    }else{
      this.action = val;
      this.mobile = false
      this.cancelNewData('checkbox');
    };
    if(val === 'profile'){
      this.loopObject = this.members;
      this.selectedItem = this.loopObject[this.loopObject.length-1];
      this.selected(this.selectedItem, '');
      return
    };
    if(val === 'cells' || val === 'ministries' || val === 'groups'){
      if(val === 'cells'){
        this.loopObject = this.data.cell_groups;
      };
      if(val === 'ministries'){
        this.loopObject = this.data.ministries;
      };
      if(val === 'groups'){
        this.loopObject = this.data.member_groups;
      };
      this.selectedItem = this.loopObject[0];
      this.selected(this.selectedItem, 'add_new');
      return
    }
    if(val === 'transfer' || val === 'archive' || val === 'revert'){
      this.loopObject = this.data.branches;
      this.selectedItem = this.data.branches[0];
      this.selected(this.selectedItem, 'add_new');
      return
    };
  }

  groupActions(val:string){
    this.group_action = val;
    this.checkBoxes = true;
    this.selectAllCheckbox = false;
    this.toggleSelectAll()
  }

  done(val:string){
    this.modal = true;
    this.checkBoxes = true;
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
      position: 'top',
      color: color
    });
    await toast.present();
  }

  message(obj:any){
    this.admin.slideOver = true;
    this.admin.isMsgs = true;
    this.msgComp.currentChat = obj;
    this.msgComp.messageView();
  }

  addNewData(val:string){
    this.group_action = val;
    this.modal = true;
  }

  saveNewData(newData:any){
    this.newData = newData;
    if(this.group_action === 'add_members'){
      this.getSelectedValues()
    };
    if(this.action === 'ministry'){
      newData.group_type = 1
    };
    if(this.action === 'cells'){
      newData.group_type = 2
    }
    if(this.action === 'other'){
      newData.group_type = 3
    };
    this.modal = false; 
    this.newData = {};
    this.checkBoxes = false;
  }
  
  cancelNewData(val:string){
    if(val === 'checkbox'){
      this.checkBoxes = false;
      this.selectAllCheckbox = false;
      this.group_action = '';
    };
    if(val === 'modal'){
      this.modal = false;
      this.newData = {};
    }
  }

  toggleSelectAll() {
    this.members.forEach((item:any) => {item.selected = this.selectAllCheckbox});
  }

  getSelectedValues() {
    const selectedItems = this.members.filter((item:any) => item.selected).map((item:any) => item.name);
  }
 
}
