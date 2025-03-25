import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conatct-us',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './conatct-us.component.html',
  styleUrl: './conatct-us.component.scss'
})
export class ConatctUsComponent {

  selectedOption:string = 'support';
  isLoggedIn: boolean = false;
  contactInfo:any = {};

  constructor(){}

  ngOnInit(){
    localStorage.getItem('isLoggedIn') === 'true' ? this.isLoggedIn = true : this.isLoggedIn = false;
  }

  selected(){
    this.selectedOption = this.selectedOption;
  }

  submit(){

  }

}
