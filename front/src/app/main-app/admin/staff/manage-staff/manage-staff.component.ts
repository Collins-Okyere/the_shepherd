import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FabBtnComponent } from '../../../../reusable-comps/fab-btn/fab-btncomponent';
import { ItemsListComponent } from '../../../../reusable-comps/items-list/items-list.component';
import { UserDetailsComponent } from '../../../../reusable-comps/user-details/user-details.component';
import { ApiService } from '../../../../services/api.service';
import { LocalDbService } from '../../../../services/local-db.service';

@Component({
  selector: 'app-manage-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemsListComponent, FabBtnComponent, UserDetailsComponent],
  templateUrl: './manage-staff.component.html',
  styleUrl: './manage-staff.component.scss'
})
export class ManageStaffComponent {

  selectedItem:any = {};
  @Input() listData:any = {
    list_type: 'Staff',
    loopArray: [],
  }
  staff:any = [];
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
    this.fetchstaff();
    this.presets();
  }

  async presets() {
    this.selectObject(this.selectedItem);
  }

  fetchstaff(){
    // this.api.makeRequest('GET', 'staff', {}).then((data: any) => {
    //   if (data) {
    //     this.selectedItems = data.staff;
      this.staff = this.nonDB.staff;
      this.listData.loopArray = this.staff
      this.selectedItem = this.listData.loopArray[this.listData.loopArray.length - 1];
      this.listData.selectedItem = this.selectedItem;
    //   }   
    // })
  }
  
  selectObject(obj:any, val?:string){
    this.selectedItem = obj;
    this.isShowingDetails = true
  }

  updateStaff(obj:any){
    this.selectedItem = obj;
    // this.api.makeRequest('POST', 'staff', this.selectedItem).then((data: any) => { });
    alert('Staff details updated!')
  }
  
  handleFabClick() {
    this.isShowingDetails = !this.isShowingDetails;
  }

}
