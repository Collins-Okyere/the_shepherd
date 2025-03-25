import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
type   Orientation = 'portrait' | 'landscape'
@Injectable({
  providedIn: 'root',
})
export class Generators {


  constructor() {}

  exportFile(data: { type: string; orientation: Orientation; size: string; title: string; formData: any }) {
    if (data.type === 'pdf') {
      this.exportAsPDF(data.title, data.formData, data.orientation, data.size);
    } else if (data.type === 'word') {
      this.exportAsWord(data.title, data.formData);
    }
  }

  exportAsPDF(title: string, formData: any, orientation:Orientation, size?: string) {
    const doc = new jsPDF({ orientation: orientation, format: size });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(title, 14, 20);

    let rowData: any[] = [];
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        rowData.push([this.formatTitle(key), formData[key].join(', ')]);
      } else {
        rowData.push([this.formatTitle(key), formData[key]]);
      }
    });

    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: rowData,
      theme: 'grid',
      styles: { fontSize: 10 },
    });

    doc.save(`${title}.pdf`);
  }

  exportAsWord(title: string, formData: any) {
    let content = `# ${title}\n\n`;

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        content += `**${this.formatTitle(key)}:** ${formData[key].join(', ')}\n\n`;
      } else {
        content += `**${this.formatTitle(key)}:** ${formData[key]}\n\n`;
      }
    });

    const blob = new Blob([content], { type: 'application/msword' });
    saveAs(blob, `${title}.doc`);
  }

  private formatTitle(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  }
}
