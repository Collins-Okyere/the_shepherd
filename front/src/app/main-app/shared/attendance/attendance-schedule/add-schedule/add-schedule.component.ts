import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataService } from '../../../../../../services/data.service';
import { AttendanceScheduleComponent } from '../attendance-schedule.component';

@Component({
  selector: 'app-add-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css'],
})
export class AddScheduleComponent implements OnInit { 
  
  @Input() incomingSched:any = {
    updating: false,
    schedule: null
  }
  schedule: any = {
    forStudents: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    eventList: [
      {
        name: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        classes: [],
        departments: [],
        isHoliday: false
      }
    ]
  }
  classes:any = []
  days:any = []
  departments:any = []
  data: any = inject(DataService)
  schedules: any = inject(AttendanceScheduleComponent)

  ngOnInit(){
    if(this.incomingSched.schedule !== null){
      this.schedule = this.incomingSched.schedule
    }else{
      this.schedule = {
        forStudents: true,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
      }
      this.resetEvents()
    }
    this.days = this.data.days
    this.classes = this.data.classes
    this.departments = this.data.departments
  }

  addEvent() {    
    this.schedule.eventList.push({});
  }

  removeEvent(event: any) {
    if(this.schedule.eventList.length === 1){
      this.resetEvents()
    }else{
      this.schedule.eventList = this.schedule.eventList.filter((e:any) => e !== event);
    }
  }

  resetEvents(){
    this.schedule.eventList = [
      {
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
      }
    ]
  }

  save() {
    alert('Schedule saved successfully!');
    this.data.schedules.push(this.schedule);
    console.log(this.schedule.eventList)
    console.log(this.data.schedules)
    this.resetEvents()
    this.back()
  }

  clear(){
    this.resetEvents()
  }

  back(){
    this.schedules.addNew = false
    this.incomingSched = {
      updating: false,
      schedule: null
    }
  }


}
