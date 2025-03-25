import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { MapiService } from '../services/mapi.service';

@Component({
    imports: [CommonModule],
    standalone: true,
    selector: 'app-download-links',
    templateUrl: './download-links.component.html',
    styleUrls: ['./download-links.component.scss']
})
export class DownloadLinksComponent implements OnInit {
  // @Input('downloadData') downloadData: any;

  @Input()
  get downloadData(): any {
    return this._downloadData;
  }
  set downloadData(downloadData: any) {
    this._downloadData = downloadData === undefined ? {} : downloadData;
  }
  private _downloadData = {}; 

  downloadLinks: any
  dropdownOpen =  false
  
  a5: any = [
    // {name: 'A5', icon: 'pdf.png', o: 'Portrait',  title: 'A5 Portrait'},
    // {name: 'A5', icon: 'pdf.png', o: 'Landscape', title: 'A5 Landscape'}
  ]

  a4: any = [
    // {name: 'A4', icon: 'pdf.png', o: 'Portrait',  title: 'A4 Portrait'},
    // {name: 'A4', icon: 'pdf.png', o: 'Landscape', title: 'A4 Landscape'}
  ]

  a3: any = [
    // {name: 'A3', icon: 'pdf.png', o: 'Portrait',  title: 'A3 Portrait'},
    // {name: 'A3', icon: 'pdf.png', o: 'Landscape', title: 'A3 Landscape'}
  ]

  nonPdf: any = [
    {name: 'csv',  icon: 'csv.png',  title: 'CSV', o: '' }, 
    {name: 'xlsx', icon: 'xls.png',  title: 'Excel', o: '' },
    {name: 'doc',  icon: 'word.png', title: 'Word', o: '' } 
  ]

  constructor(private mapi: MapiService, private renderer: Renderer2) { }

  ngOnInit(): void {
    switch (this.downloadData.linkType) {
      case 'onlyPdf':
        this.downloadLinks = [...this.a5,...this.a4,...this.a3]
        break;
      case 'a5a4':
        this.downloadLinks = [...this.a5,...this.a4]
        break;
      case 'a4a3':
        this.downloadLinks = [...this.a4,...this.a3]
        break;
      case 'a5':
        this.downloadLinks = this.a5
        break;
      case 'a4':
        this.downloadLinks = this.a4
        break;
      case 'a3':
        this.downloadLinks = this.a3
        break;
      case 'nonPdf':
         this.downloadLinks = this.nonPdf
        break;
      default:
        this.downloadLinks = [...this.a5,...this.a4,...this.a3,...this.nonPdf]
        break;
    }
  }
 
  downloadFile(fileDetails: any){
    const html = document.getElementById(this.downloadData.fileId)
    // console.log(html)
    if (html) {
      const html_str = this.stripHtml(html.innerHTML,fileDetails.ps)
      
      if (fileDetails.o) {
        const win = window.open('about:blank', '_blank')
        if (win) {
          const params = {ref: this.downloadData.fileId,filename: this.downloadData.filename, options: fileDetails, pdf: html_str.outerHTML} 
           this.mapi.makeRequest('POST','pdfs', params).then((data: any) => {
            win.location.href = this.mapi.apiUrl.split('/api')[0] + '/' + data.saved_path
          })
        }
      } else {
        if (fileDetails.ps === 'xlsx' || fileDetails.ps === 'csv') {
          
          const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(html_str.getElementsByTagName('table')[0]);
          // generate workbook and add the worksheet
          const workbook: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
          XLSX.writeFile(workbook, `${this.downloadData.filename}.${fileDetails.ps}`, { bookType: fileDetails.ps });
        }
        if (fileDetails.ps === 'doc') {
          // console.log(html_str.innerHTML)
           const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word Document</title></head><body>";
       const footer = "</body></html>";
       const sourceHTML = header+html_str.innerHTML+footer;
       
       const source = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8,' + encodeURIComponent(sourceHTML);

      
          // dsfdsf
          // const url = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8,' + encodeURIComponent(html_str.innerHTML);
          const downloadLink = this.renderer.createElement('a');
          this.renderer.appendChild(html,downloadLink)
            downloadLink.href = source; // Create a link to the file
            downloadLink.download = `${this.downloadData.filename}.docx`; // Setting the file name
            downloadLink.click();  //triggering the function
            this.renderer.removeChild(html,downloadLink);
        }
      }
    }
    this.dropdownOpen = false
  }

  stripHtml(html_str: string, docType: string){
    html_str = html_str.replace(/(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/g, "")
    html_str = html_str.replace(/(_ngcontent.*?="")|(ng-.*?=".*?")/g, '')
    if (docType !== 'pdf') {
      html_str = html_str.replace(/class=".*?"/g, "").replace(/colspan=".*?"/g, "")
    }
    const parser = new DOMParser();
	  const doc = parser.parseFromString(html_str, 'text/html');
	  return doc.body;
  }

  callComponentFnc(){
  }

}
