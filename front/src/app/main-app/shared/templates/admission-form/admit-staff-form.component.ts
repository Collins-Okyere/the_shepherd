import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

type Orientation = 'portrait' | 'landscape';


@Component({
  selector: 'app-admit-staff-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admit-staff-form.component.html',
  styleUrl: './admit-staff-form.component.css'
})

export class AdmitStaffFormComponent implements OnInit{


  ngOnInit(){}
  
  @ViewChild('staffForm', { static: false }) staffForm!: ElementRef;

  generatePDF(format: 'a4', orientation: Orientation): void {
    const data = this.staffForm.nativeElement;
    
    html2canvas(data, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF(orientation, 'mm', format);
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('staff-admission-form.pdf');
    });
  }
  // generatePDF(size: string, orientation: Orientation, elementId: string){
  //   this.generator.generatePDF(size, orientation, elementId);
  // }
    
  // generatePDF(size: string, orientation: Orientation): void {
  //   const element:any = document.getElementById('staff_form');
  //   html2canvas(element).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jspdf.jsPDF(orientation, 'mm', size);
  //     const imgWidth = pdf.internal.pageSize.getWidth();
  //     const imgHeight = pdf.internal.pageSize.getHeight();
  //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //     pdf.save('staff_form.pdf');
  //   });
  // }

  // generatePDF(size: string, orientation: Orientation): void {
  //   const element: any = document.getElementById('staff_form');
  //   html2canvas(element).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jspdf.jsPDF(orientation, 'mm', size);
  //     const imgWidth = pdf.internal.pageSize.getWidth();
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     const scaleFactor = 1.1;
  //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight * scaleFactor);
  //     pdf.save('staff_form.pdf');
  //   });
  // }


}


