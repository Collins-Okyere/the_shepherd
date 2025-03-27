import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    imports: [CommonModule, FormsModule],
    standalone: true,
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent  implements OnInit {

  @Input() searchData:any = {
    searchValue: '',
    showIcon: true
  };
  @Output() search = new EventEmitter<string>();
  theme:string = 'indigo';
  searchValue:string = '';

  constructor() { }

  ngOnInit() {
    this.searchValue = this.searchData.searchValue
  }

  onSearch(val:string) {
    this.search.emit(val);
  }

}
