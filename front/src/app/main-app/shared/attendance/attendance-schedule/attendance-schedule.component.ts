import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataService } from '../../../../../services/data.service';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';

@Component({
  selector: 'app-attendance-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, AddScheduleComponent],
  templateUrl: './attendance-schedule.component.html',
  styleUrls: ['./attendance-schedule.component.css'],
})
export class AttendanceScheduleComponent implements OnInit { 

  addNew:boolean = false
  schedules: any[] = [];
  data: any = inject(DataService)
  sendObj: any = { schedule: null }

  ngOnInit(){
    this.schedules = this.data.schedules
  }

  addSchedule() {    
    this.addNew = !this.addNew;
    this.sendObj = { schedule: null }
  }

  editSchedule(obj: any) {
    const index = this.schedules.indexOf(obj);
    this.addNew = true
    this.sendObj = { schedule: obj, updating: true}
    if (index !== -1) {
      this.schedules[index] = { ...this.schedules[index], ...obj };
    }
  }

  deleteSchedule(obj: any) {
    const index = this.schedules.indexOf(obj);
    if (index !== -1) {
      this.schedules.splice(index, 1);
    }
  }

}
