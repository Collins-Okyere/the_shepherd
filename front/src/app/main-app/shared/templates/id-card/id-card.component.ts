import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { MainService } from '../../../services/main.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-id-card',
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.scss'],
})
export class IdCardComponent  implements OnInit {

  theme:string = 'indigo';
  school:any = this.dataService.school;
  @Input() idCardData:any = {
    cardTitle: '',
    certType: '',
    selectedItem: {}
  }
  @Input() cardTitle:any = {};

  constructor(private readonly dataService: DataService, private readonly mainService: MainService) {}

  ngOnInit(){
    this.mainService.themedAs$.subscribe(theme => this.theme = theme);
    this.cardTitle = this.idCardData.cardTitle;
  }

}
