import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectInputComponent } from '../select-input/select-input.component';
import { LocalDbService } from '../../services/local-db.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectInputComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  @Input() user: any
  @Output() update = new EventEmitter<any>()
  subUser: any
  mainTab = 'profile';
  edit = false;
  fabData:any = {
    icon: {
      color: 'text-white',
      path: 'm11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
    },
    bgColor: 'bg-violet-600'
  };
  noDB:any
  selectData:any = {}
  relations:any = []

  constructor(private readonly nonDB: LocalDbService){}

  ngOnInit(){
    this.noDB = this.nonDB;
    this.selectData = { items: this.noDB.members, placeholder: 'Select Relation(s)', displayProperty: 'full_name', multiple: true, searchProperty: 'full_name' }
  }

  get userId() {
    return this.user.menber_id || this.user.staff_id;

  }
  
  set userId(value: string) {
    if (this.user.member_id) {
      this.user.member_id = value;
    } else {
      this.user.staff_id = value;
    }
  }

  changeTab(val:string){
    this.mainTab = val;
    this.edit = false;
  }

  editOrUpdateMember() {
    if (this.edit) {
      this.updateMember(this.user);
    } else {
      this.editMember(this.user);
    }
  }

  editMember(obj:any){
    this.user = obj;
    this.edit = true
  }

  updateMember(obj:any){
    this.user = obj;
    this.update.emit(this.user);
    this.edit = false;
  }

  onSelectionChanged(field: string, value: any) {
    this.user[field] = value;
    if(field === 'gender'){
      if(this.user.photo !== (this.nonDB.avatar || this.nonDB.avatar_female)){
        if(value.name === 'Female'){
          this.user = { ...this.user, photo: this.nonDB.avatar_female  };
        }else{
          this.user = { ...this.user, photo: this.nonDB.avatar  };
        }
      }
    };
    if (field === 'user_type') {
      if(value.name === 'Member'){
        this.user = { ...this.user, departments: [], positions: [], supervisors: [], groups_led: [], privlleges: [] };
      }
    };
    if(field === 'relations'){
      this.relations = [...this.relations, ...value];
    };
  }

  trackByName(index: number, item: any): string {
    return item.name;
  }
  
  updatePrivilleges(event: Event, priv: any): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      if (!this.user.privilleges.includes(priv.name)) {
        this.user.privilleges.push(priv.name);
      }
    } else {
      this.user.privilleges = this.user.privilleges.filter((p:any) => p.name !== priv.name);
    }
  }

  addRelations() {
    if (!this.relations.length) {
      alert('Please select at least one relation.');
      return;
    }
  
    // Ensure `this.user.relations` is an array before updating
    this.user.relations = this.user.relations ?? [];
  
    // Add selected relations to user's relations
    this.user.relations.push(...this.relations);
  
    // Reset the selected relations
    this.relations = [];
  
    // Explicitly clear the selection in the select input
    this.selectData.defaultValue = null;
    this.selectData = {}
  
    // Use a timeout to trigger change detection
    setTimeout(() => {
      this.selectData = {
        items: this.noDB.members ,
        placeholder: 'Select Relation(s)',
        displayProperty: 'full_name',
        multiple: true,
        searchProperty: 'full_name',
        defaultValue: null,  // Ensure defaultValue is null
      };
    }, 100);
  
    // Emit updated user data
    this.update.emit(this.user);
  }
  
  
  

  removeRelation(index: number) {
    this.user.relations.splice(index, 1);
    this.update.emit(this.user);
  }
  
  

}