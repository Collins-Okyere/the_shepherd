import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

type Orientation = 'portrait' | 'landscape';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})

export class CertificateComponent {
  
  @Input() member:any = {};
  @Input() textTheme:string = '';
  @Input() bgTheme:string = '';
    
  generatePDF(size: string, orientation: Orientation): void {
    const element:any = document.getElementById('cert');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF(orientation, 'mm', size);
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('cert.pdf');
    });
  }

  // generatePDF(size: string, orientation: Orientation): void {
  //   const element: any = document.getElementById('cert');
  //   html2canvas(element).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jspdf.jsPDF(orientation, 'mm', size);
  //     const imgWidth = pdf.internal.pageSize.getWidth();
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //     pdf.save('cert.pdf');
  //   });
  // }

}
