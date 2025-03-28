import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { FabBtnComponent } from '../../../../reusable-comps/fab-btn/fab-btncomponent';
import { ItemsListComponent } from '../../../../reusable-comps/items-list/items-list.component';
import { LocalDbService } from '../../../../services/local-db.service';
import { UserDetailsComponent } from '../../../../reusable-comps/user-details/user-details.component';

@Component({
    selector: 'app-manage-members',
    standalone: true,
    imports: [CommonModule, FormsModule, ItemsListComponent, FabBtnComponent, UserDetailsComponent],
    templateUrl: './manage-members.component.html',
    styleUrl: './manage-members.component.scss'
})
export class ManageMembersComponent {

  selectedItem:any = {};
  @Input() listData:any = {
    list_type: 'Members',
    loopArray: [],
  }
  members:any = [];
  isShowingDetails:any = false
  fabData:any = {
    icon: {
      color: 'text-white',
      path: 'm11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
    },
    bgColor: 'bg-violet-600'
  };

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
      this.listData.loopArray = this.members
      this.selectedItem = this.listData.loopArray[this.listData.loopArray.length - 1];
      this.listData.selectedItem = this.selectedItem;
    //   }   
    // })
  }
  
  selectObject(obj:any, val?:string){
    this.selectedItem = obj;
    this.isShowingDetails = true
  }

  updateMember(obj:any){
    this.selectedItem = obj;
    // this.api.makeRequest('POST', 'members', this.selectedItem).then((data: any) => { });
    alert('Member details updated!')
  }
  
  handleFabClick() {
    this.isShowingDetails = !this.isShowingDetails;
  }

}
