import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalDbService } from '../../../../services/local-db.service';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.css'
})
export class MarkAttendanceComponent {

  selectedSession: any
  selectedClass: any
  selectedDepartment: any
  selectedDate: any = new Date()
  sessions:any
  classes:any
  students: any
  employees: any
  loopArray: any = []
  departments: any
  showRegister: boolean = false
  attendance:any = {
    category: 'for_students',
    type: 'reporting',
    records: []
  }
  nonDB:any = inject(LocalDbService)
  mapi:any = inject(ApiService)

  ngOnInit(){
    this.sessions = this.nonDB.sessions;
    this.classes = this.nonDB.classes;
    this.departments = this.nonDB.departments
    this.fetchUsers()
  }

  onSelectionChange(val: string){
    this.showRegister = false
    this.clearUsers()
    this.fetchUsers()
    if(val === 'class'){
      this.loopArray = this.students
    }
    if(val === 'department'){
      this.loopArray = this.employees;
    }
    console.log(this.loopArray)
  }

  fetchUsers(){
    this.students = this.nonDB.students
    this.employees = this.nonDB.employees
  }

  clearUsers(){
    this.loopArray = []
    this.students = []
    this.employees = []
  }

  saveAttendance(){
    this.mapi.showToast({ status: 'success', message: 'Attendance sucessfully saved!'});
    this.resetAll();
  }

  mark(student: any) {
    let index = this.attendance.records.findIndex((st: any) => st.studentId === student.studentId);
    if (index === -1) {
      this.attendance.records.push({ ...student });
    } else {
      this.attendance.records[index] = { ...student };
    }
    console.log(this.attendance.records);
  }
  

  resetAll(){
    this.reset();
    this.attendanceClear()
  }

  reset(){
    this.loopArray = []
    this.selectedClass = null
    this.selectedDepartment = null
    this.selectedSession = null
  }

  attendanceClear(){
    this.attendance = {
      category: 'for_students',
      type: 'reporting'
    }
  }

}