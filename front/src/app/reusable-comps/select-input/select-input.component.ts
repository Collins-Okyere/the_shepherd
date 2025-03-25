import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent {
  @Input() selectInputData:any = {
    items: [],
    placeholder: 'Select items',
    displayProperty: 'name',
    searchProperty: 'name',
    multiple: false,
    autoClose: false,
    toastData: null,
    defaultValue: null
  }
  @Output() selectionChanged = new EventEmitter<any[]>();
  selectedItems: any[] = [];
  selectedItem: any;
  filteredItems: any[] = [];
  searchQuery: string = '';
  dropdownOpen: boolean = false;

  ngOnInit() {
    if(this.selectInputData.defaultValue){
      if(this.selectInputData.multiple){
        this.selectedItems = this.selectInputData.defaultValue;
      }else{
        this.selectedItem = this.selectInputData.defaultValue;
      }
    }
    this.filteredItems = [...this.selectInputData.items];
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  filterItems(): void {
    if (!this.searchQuery) {
      this.filteredItems = [...this.selectInputData.items];
    } else {
      this.filteredItems = this.selectInputData.items.filter((item:any) =>
        item[this.selectInputData.searchProperty]?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  
  toggleItemSelection(item: any): void {
    if (this.selectInputData.multiple) {
      if (this.selectedItems.includes(item)) {
        this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
      } else {
        this.selectedItems.push(item);
      }
      if(this.selectInputData.autoClose){
        this.dropdownOpen = false;
      }
      this.selectionChanged.emit(this.selectedItems);
    } else {
      this.selectedItem = item;
      this.dropdownOpen = false;
      this.selectionChanged.emit(this.selectedItem);
    }
  }

  removeItem(item: any): void {
    this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
    this.selectionChanged.emit(this.selectedItems);
  }

  clearSelection(): void {
    this.selectedItems = [];
    this.selectionChanged.emit(this.selectedItems);
    this.dropdownOpen = false;
  }

  getSelectedItemsText(): string {
    return this.selectedItems.map(item => item[this.selectInputData.displayProperty]).join(', ');
  }

}
