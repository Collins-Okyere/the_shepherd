import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  
  @Input() icon: { fill?: string; viewBox?: string; strokeWidth?: string; path: string } | null = null;
  @Input() image: string | null = null;
  @Input() isTextButton: boolean = false;
  @Input() hasDropTitle: boolean = false;
  @Input() indicator: boolean = false;
  @Input() dropDownType: string = 'hover';
  @Input() dropDownTitle: string | null = null;
  @Input() buttonText: string | null = null;
  @Input() dropdownWidth: 'wide' | 'narrow' = 'wide';
  @Input() tabs: string[] = [];
  @Input() options: { title: string, pageName?: string, action?: string, href?: string, target?: string }[] = [];
  @Output() tabClick = new EventEmitter<string>();
  @Output() optionClick = new EventEmitter<any>(); 
  @Input() activeTab: string = '';

  onTabClick(tab: string) {
    this.activeTab = tab;
    this.tabClick.emit(tab);
  }

  onOptionClick(option: any) {
    this.optionClick.emit(option);
  }

}
