import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

type Orientation = 'portrait' | 'landscape';


@Component({
  selector: 'app-membership-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membership-form.component.html',
  styleUrl: './membership-form.component.css'
})

export class MembershipFormComponent implements OnInit{

  constructor() {}

  ngOnInit(){}
    
  // generatePDF(size: string, orientation: Orientation): void {
  //   const element:any = document.getElementById('membership_form');
  //   html2canvas(element).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jspdf.jsPDF(orientation, 'mm', size);
  //     const imgWidth = pdf.internal.pageSize.getWidth();
  //     const imgHeight = pdf.internal.pageSize.getHeight();
  //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //     pdf.save('membership_form.pdf');
  //   });
  // }

  generatePDF(size: string, orientation: Orientation): void {
    const element: any = document.getElementById('membership_form');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF(orientation, 'mm', size);
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('membership_form.pdf');
    });
  }

}


