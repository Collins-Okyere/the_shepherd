import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { FabBtnComponent } from '../../../../reusable-comps/fab-btn/fab-btncomponent';
import { ItemsListComponent } from '../../../../reusable-comps/items-list/items-list.component';
import { LocalDbService } from '../../../../services/local-db.service';
import { SelectInputComponent } from '../../../../reusable-comps/select-input/select-input.component';

@Component({
    selector: 'app-manage-members',
    standalone: true,
    imports: [CommonModule, FormsModule, ItemsListComponent, FabBtnComponent, SelectInputComponent],
    templateUrl: './manage-members.component.html',
    styleUrl: './manage-members.component.scss'
})
export class ManageMembersComponent {

  loopArray:any =[];
  selectedItem:any = {};
  @Input() listData:any = {
    checkbox: false,
    list_type: 'Members',
    loopArray: this.loopArray,
  }
  @Input() searchData:any = {
    searchValue: '',
    showIcon: true
  };
  edit:boolean = false;
  mainTab:string = 'profile';
  members:any = [];
  isShowingDetails:any = false
  fabData:any = {
    icon: {
      color: 'text-white',
      path: 'm11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
    },
    bgColor: 'bg-violet-600'
  };
  subItemMobile:boolean = false;
  selectedSubItem:any;
  subItem:any = [];

  constructor(private api: ApiService, public nonDB: LocalDbService) {}

  ngOnInit(){
    this.fetchMembers();
    this.presets();
  }

  async presets() {
    this.selectObject(this.selectedItem);
  }

  fetchMembers(){
    // this.api.makeRequest('GET', 'members', {}).then((data: any) => {
    //   if (data) {
    //     this.selectedItems = data.members;
      this.members = this.nonDB.members;
      this.loopArray = this.members
      this.listData.loopArray = this.loopArray
      this.selectedItem = this.listData.loopArray[this.listData.loopArray.length - 1];
      this.listData.selectedItem = this.selectedItem;
    //   }   
    // })
  }

  get admissionDate() {
    return this.selectedItem.admission_date || this.selectedItem.membership_date;
  }
  
  set admissionDate(value: string) {
    if (this.selectedItem.admission_date) {
      this.selectedItem.admission_date = value;
    } else {
      this.selectedItem.membership_date = value;
    }
  }
  
  selectObject(obj:any, val?:string){
    this.selectedItem = obj;
    this.edit = false;
    this.changeTab('profile');
    this.isShowingDetails = true
    if(val === 'subItems'){
      this.selectedSubItem = null;
      this.selectedSubItem = obj;
      this.subItemMobile = true;
    };
  }

  changeTab(val:string){
    this.mainTab = val;
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
    // this.api.makeRequest('POST', 'members', this.selectedItem).then((data: any) => { });
    this.edit = false;
  }
  
  handleFabClick() {
    this.isShowingDetails = !this.isShowingDetails;
  }

  onSelectionChanged(field: string, value: any) {
    this.selectedItem[field] = value;
    if(field === 'gender'){
      if(this.selectedItem.phot0 !== (this.nonDB.avatar || this.nonDB.avatar_female)){
        if(value.name === 'Female'){
          this.selectedItem = { ...this.selectedItem, photo: this.nonDB.avatar_female  };
        }else{
          this.selectedItem = { ...this.selectedItem, photo: this.nonDB.avatar  };
        }
      }
    };
    if (field === 'user_type') {
      if(value.name === 'Member'){
        this.selectedItem = { ...this.selectedItem, departments: [], positions: [], supervisors: [], groups_led: [], privlleges: [] };
      }
    }
  }

  

}
