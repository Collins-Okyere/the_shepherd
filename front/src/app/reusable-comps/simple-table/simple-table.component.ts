import { SumByPropertyPipe } from './../../services/table-services/sum-by-property.pipe';
import { Component, Input, AfterContentInit,ViewContainerRef, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmService } from '../../services/table-services/confirm.service';
import { CustomService } from '../../services/table-services/custom.service';
import { MapiService } from '../../services/table-services/mapi.service';
import { DownloadLinksComponent } from './download-links/download-links.component';

@Component({
    imports: [CommonModule, DownloadLinksComponent, 
      // NgSelectModule,
       FormsModule, SumByPropertyPipe],
    standalone: true,
    selector: 'app-simple-table',
    templateUrl: './simple-table.component.html',
    styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent  implements AfterContentInit {

  @Input() tableData = <any>{};



  // get tableData(): any {
  //   return this._tableData;
  // }
  // set tableData(tableData: any) {
  //   this._tableData = tableData === undefined ? <any>{} : tableData;
  // }
  
  tableParams: any={}; 
  newItem = <any>{}
  menuComponents = <any>[]
  addingNew = false
  originalData = []
  dropdownOpen = false
  isEditing = <any>{}
  groupSort = ''
  groupSearchParams = ''
  expanded = false
  getDownload = false
  loadingData: boolean = false
  isMobile = false
  addingFrom = <any>{top: false, table: false} 
  currentGroup = <any>{groupKey: '', groupArray: []}
  simpleModal: any;


  constructor(
    private mapi: MapiService, 
    public helper: CustomService,
    private confirmService: ConfirmService
    ) {
    
    this.getInitData()
     
  }
  
  @ViewChildren('itemMenu', { read: ViewContainerRef }) itemMenus!: QueryList<ViewContainerRef>;
  @ViewChild('itemMenu', { read: ViewContainerRef }) itemMenu!: ViewContainerRef;
  @ViewChild('commonFormModal', { read: ViewContainerRef }) commonFormModal!: ViewContainerRef;
  
  getInitData(){
    // this.isMobile = this.deviceInfo.deviceType === 'mobile'
  }

  ngAfterContentInit(): void {
    this.tableParams = {
      fields: this.tableData.fields, 
      groupedData: [], 
      railsCtrl: this.tableData.railsCtrl, 
      dataModel: this.tableData.dataModel,
      customForm: this.tableData.customForm,
      multiSave: this.tableData.multiSave
    }
    this.tableParams.allFields = this.tableData.fields?.concat(this.tableData.ex_fields) || []
    this.tableParams.customFields = this.tableParams.allFields.filter((u: any) => (!u.noGroup && u.v_column)) 
    this.tableParams.inputFields = this.tableParams.allFields.filter((u: any) => u.input)
    this.tableParams.totalFields = this.tableParams.fields.filter((u: any) => u.getTotal)
    if (this.isMobile && this.tableData.fields.length > 2){
      this.tableData.allowSelectedFields = true
      this.tableData.multiSave = false
      this.tableParams.fields = this.tableData.fields.slice(0,2)
    } 
    if (this.tableParams.inputFields.length){
      this.tableParams.allowEdit = true
    }
    this.tableParams.data = this.tableData.data
    this.originalData = this.tableData.data  
    this.getItems()
    this.createMenuComponents()
  } 

  createMenuComponents(){
    setTimeout(() => {
      // if (this.tableData.menuComponent) {
      //   this.menuComponents = this.itemMenus.toArray()
      //   let i = 0
      //   while (i < this.menuComponents.length) {
      //     const compRef: ComponentRef<typeof this.tableData.menuComponent> =  this.menuComponents[i].createComponent(this.tableData.menuComponent);
      //     compRef.instance.menuData = {index: i, data: this.tableParams.data}
      //   i++
      //   }
      // } 
      this.simpleModal = document.getElementById("simple_modal");
    },100);
  }

  apiData(data: any){
    Object.keys(data).forEach((dk) => {
        this.tableParams[dk] = data[dk]
    })
  }

  getItems(){
    this.loadingData = true
    if (!this.tableData.data.length) {
      const otherData:any = this.tableData.otherData
      this.mapi.makeRequest('GET',this.tableData.railsCtrl, {action_type: 'get_items', data_model: this.tableData.dataModel, ...otherData }).then((data: any)=>{ 
        this.apiData(data)
        this.tableParams.data = data.items
        this.originalData = data.items

        this.getGroupedData()
        const selectItems = this.tableParams.inputFields.filter((s: any) => (s.input === 'select' && typeof s.selectData === 'string'))
        selectItems.forEach((u: any) => { u.selectData = data[u.selectData] });
        this.loadingData = false
      });
    } else {
      this.tableParams.data = this.tableData.data
      this.originalData = this.tableParams.data
      this.getGroupedData()
      this.loadingData = false
    }
    
  }

  saveItem(item: any, i: number, group: any){
    this.mapi.makeRequest('POST',this.tableData.railsCtrl, {item: item, action_type: 'save_item', data_model: this.tableData.dataModel}).then((data: any)=>{
      this.apiData(data)
      if (!data.error && data.item) {
          // const hasTotal = this.tableParams.fields.find((u: any) => u.getTotal)
          if (this.tableData.isGroup) {
            if (!group) {
              group = this.tableParams.groupedData.find((u: any)=> u.groupKey == data.item[this.tableData.groupBy])
            } 
            if (group) {
              i = i < 0 ? group.groupArray.length : i
              group.groupArray[i] = data.item
              // hasTotal ? group.groupArray = this.helper.getNewArray(group.groupArray,data.item,i) : group.groupArray[i] = data.item
            } else {
                 group = {groupKey: data.item[this.tableData.groupBy], groupArray: [data.item]}
                 this.tableParams.groupedData.push(group) // This code must be commented for pure Pipes
                 // Uncoment code below is used for pure Pipes
                // i = this.tableParams.groupedData.length
                // hasTotal ? this.tableParams.groupedData = this.helper.getNewArray(this.tableParams.groupedData,group,i) : this.tableParams.groupedData[i] = group
            }
            this.getTableData(this.tableParams.groupedData,true)
          } else {
            this.tableParams.data[i] = data.item
            i = i < 0 ? this.tableParams.data.length : i
            this.tableParams.data = this.helper.getNewArray(this.tableParams.data,data.item,i)
            this.originalData = this.tableParams.data
          }
          item.isEditing = false
          this.newItem = <any>{}        
      }
    });
  }


  getItem(item: any, i: number){
    if (item.id) {
      this.mapi.makeRequest('GET',this.tableData.railsCtrl, {id: item.id, action_type: 'get_item', data_model: this.tableData.dataModel}).then((data: any)=>{
        this.apiData(data)
        this.tableParams.data[i] = data.item
        item.isEditing = false
      });
    } else {
      item.isEditing = false
    }
  }

  deleteItem(item: any, i: number, group: any){
    const name = item[this.tableParams.fields[0].v_column]
    const title = this.tableData.isGroup ? `${group.groupKey} group in ${this.tableData.title}` : this.tableData.title
    const message = `You are about to delete ${name}'s data from ${title}`
    this.confirmService.confirm(message,
    () => {
      this.mapi.makeRequest('GET',this.tableData.railsCtrl, {id: item.id, action_type: 'delete_item', data_model: this.tableData.dataModel}).then((data: any)=>{
        this.apiData(data)
        if (!data.error) {
          this.removeItem(i,group)
        }
      });
    },() => {})
    
  }

  // getNewArray(arr: any, replaceItem: any, i: number, hasTotal: boolean){
  //   if (hasTotal) {
  //     const index = (i >= 0) ? i : arr.length
  //     arr = this.helper.getNewArray(arr,replaceItem,index)
  //   } else {
  //     i >= 0 ? arr[i] = replaceItem : arr.push(replaceItem)
  //   }
  //   replaceItem.isEditing = false
  //   return arr
  // }

  addItem(i: number){
    let item = {isEditing: true, newData: true }
    this.addingNew = true
    if (this.tableParams.data.length <= i + 1){
      this.tableParams.data.splice(i+1,0,item)
    }
  }

  removeItem(i: number,group: any){
    if (this.tableData.isGroup) {
      // group.groupArray = group.groupArray.splice(i,((group.groupArray.length > 1) ? 1 : 0))
      // this.getTableData(this.tableParams.groupedData,true)
      // this.originalData = this.tableParams.data
      // this.tableParams.originalGroupedData = this.tableParams.groupedData
      this.getItems();
    } else {
      this.tableParams.data.splice(i,1);
      this.originalData = this.tableParams.data
    }
  }

  openForm(item: any, i: number, group: any, addingType?: any){
    const isEdit = i >= 0
    // if (addingType) {
    //   this.addingFrom = addingType
    // }
    const useModal = this.addingFrom.top || this.tableData.multiSave || this.tableData.customForm || this.isMobile || this.tableParams.inputFields.length > 5
    if (useModal) {
      this.commonFormModal.clear()
      this.newItem = <any>{}
      const comp = this.commonFormModal.createComponent(CommonFormModalComponent)
      comp.instance.formData = {
        index: i,
        item: item,
        title: `${isEdit ? 'Updating' : 'Adding'} ${this.tableData.title}`, 
        tableData: this.tableParams,
        originalData: this.originalData,
        isGroup: this.tableData.isGroup,
        groupBy: this.tableData.groupBy, 
        group: group,
        // addingFrom: this.addingFrom,
        isMobile: this.isMobile,
        modalSize: this.tableData.modalSize
      }
      this.simpleModal.showModal()
    } else {
      this.addingNew = !isEdit
      item.isEditing = isEdit
    }
    item.dropdownOpen = false
  }

  sortReport(field: any){
    if (this.tableData.isGroup) {
      // let groupedData = []
      if (!field) {
        const str = this.groupSort === 'asc' ? 'desc' : 'asc';
        this.groupSort = str;
        this.tableParams.groupedData = sort(this.tableParams.groupedData)[str]((u: any) => {return u.groupKey})
      } else {
        const str = field.sort === 'asc' ? 'desc' : 'asc';
        field.sort = str;
        let i = this.tableParams.groupedData.length
         while (i--) {
          this.tableParams.groupedData[i].groupArray = sort(this.tableParams.groupedData[i].groupArray)[str]((g: any) => g[field.v_column]) 
         }
      }
    } else if (field) {
      const str = field.sort === 'asc' ? 'desc' : 'asc';
      field.sort = str;
      this.tableParams.data = sort(this.tableParams.data)[str]((d: any) => {return d[field.v_column]})
    } 
  };

  searchReport(){
    let searchAttrs = <any>{}
    const fieldsWithSearch = this.tableParams.fields.filter((fd: any) => fd.searchParams)
    fieldsWithSearch.forEach((fd: any) => {
      searchAttrs[fd.v_column] = fd.searchParams
    });
    
    if (this.tableData.isGroup) {
      let groupedData = []
      if (this.groupSearchParams && !fieldsWithSearch.length) {
         groupedData = this.helper.searchByProperties(this.tableParams.originalGroupedData, {groupKey: this.groupSearchParams})
      } else {
        if (this.groupSearchParams) {
          searchAttrs[this.tableData.groupBy] = this.groupSearchParams
        }
        groupedData = this.helper.searchByProperties(this.originalData,searchAttrs);
        groupedData = this.helper.simpleGroupings(groupedData,this.tableData.groupBy);
      }
      this.tableParams.groupedData = groupedData
      this.getTableData(groupedData,false)
    } else {
      
      this.tableParams.data = this.helper.searchByProperties(this.originalData,searchAttrs);
    }
   
  }

  getGroupedData(){
    if (this.tableData.isGroup && this.originalData.length) {
      const groupBy = this.tableData.groupBy ?? this.tableData.fields[0].v_column
      this.tableParams.groupedField = this.tableData.fields.find((gf: any) => gf.v_column === groupBy)
      this.tableData.groupBy = groupBy      
      this.tableParams.groupedData = this.helper.simpleGroupings(this.tableParams.data,groupBy)
    } else {
      this.tableParams.groupedData = [{groupArray: []}]
    }
    this.tableParams.originalGroupedData = this.tableParams.groupedData
  }

  getTableData(groupedData: any[], addToOriginal: boolean){
    let g = groupedData.length
    let simpleData = <any>[]
    while (g--) {
      simpleData = [...simpleData, ...groupedData[g].groupArray]
    }
    this.tableParams.data = simpleData
    if (addToOriginal) {
      this.originalData = simpleData
    }
  }

  
  expandAll(){
   this.expanded = !this.expanded
   this.tableParams.groupedData.forEach((group: any) => {
     group.showRow = this.expanded
   });
  }

  callComponentFnc(otherData: any){
    if (otherData.fx){
      const cpm = new this.tableData.parentComponent
      if (cpm[otherData.fx]) {
        otherData.tableParams = this.tableParams
        otherData.tableData = this.tableData
        cpm[otherData.fx](otherData)
      }
    }
  }

  transformData(data: any){
    
  }

 

}
