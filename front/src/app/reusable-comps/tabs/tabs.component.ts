import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {

  theme: string = 'indigo';
  @Input() tabsData: any = {
    page: 1
  };
  @Output() switchForm = new EventEmitter<number>();

  constructor(private readonly mainService: MainService) { }

  ngOnInit() {
    this.mainService.themedAs$.subscribe(theme => this.theme = theme);
  }

  switch(val: number) {
    this.tabsData.page = val;
    this.switchForm.emit(val);
  }
}