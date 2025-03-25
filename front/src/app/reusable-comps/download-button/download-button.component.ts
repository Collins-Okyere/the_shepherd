import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss'],
})
export class DownloadButtonComponent  {

  @Input() downloadData:any = {
    componentId: '',
    bulkDownload: false,
    noOptions: false,
    modalView: false
  }

  constructor() { }

  print(format: string, orientation: string) {
    window.open('', '_blank')
  }
  


}
