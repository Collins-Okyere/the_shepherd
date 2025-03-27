import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit{

  @Input() listData:any = {
    searchValue: '',
    showIcon: true,
    loopArray: []
  };
  loopData:any = this.listData.loopArray
  searchValue:string = ''
  selectAllCheckbox:any ;
  selectedItem:any;
  @Output() toggleSelectAll = new EventEmitter<string>()
  @Output() selectObject = new EventEmitter<any>();

  ngOnInit(){
    this.loopData = this.listData.loopArray;
  }

  toggleAll() {
    this.selectAllCheckbox = !this.selectAllCheckbox; 
    this.listData.loopArray.forEach((item:any) => {
      item.checkboxSelected = this.selectAllCheckbox;
    });
  }

  selected(itm: any) {
    this.listData.selectedItem = itm;
    this.selectObject.emit(itm);
  }

  onSearch() {
    const lowVal = this.listData.searchValue.toLowerCase();
  
    this.loopData = this.listData.loopArray.filter((item: any) =>
      item.first_name?.toLowerCase().includes(lowVal) ||
      item.last_name?.toLowerCase().includes(lowVal) ||
      item.other_names?.toLowerCase().includes(lowVal) ||
      item.name?.toLowerCase().includes(lowVal)
    );
  }
  
  


}
