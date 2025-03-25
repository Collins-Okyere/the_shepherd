import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { LocalDbService } from '../../../services/local-db.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboard: any = {}
  attendances:any = []
  normalWeek:boolean = true;
  type:string = 'Day';


  constructor(private readonly noDB: LocalDbService) {}  

  ngOnInit(){
    this.dashboard = this.noDB.dashboard;
    this.loadCharts();
  }

  loadCharts() {

    new Chart("siteVisitChart", {
      type: 'pie',
      data: {
        // labels: [ 'Active', 'Passive', 'Church Workers', 'New Converts' ],
        datasets: [
          {
          data: [ 50, 20, 20, 10, 13 ],
          backgroundColor: [ 'rgba(153, 102, 255)','#EF4444', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)',
            // 'rgba(201, 203, 207, 0.2)'
            'rgb(201, 203, 207)' ],
          hoverOffset: 8
        }
      ]
      }
    });

    new Chart("financeChart", {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2','Week 3', 'Week 4','Week 5'],
        datasets: [
          {
            label: 'Sundays (Jan 2025)',
            data: [65, 59, 81, 56, 55],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(54, 162, 235, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              // 'rgb(255, 159, 64)',
              // 'rgb(75, 192, 192)',
              // 'rgb(54, 162, 235)',
              // 'rgb(153, 102, 255)',
            ],
            borderWidth: 1
          },
          {
            label: 'Wednesdys (Jan 2025)',
            data: [23, 44, 90, 13, 38],
            backgroundColor: [
              // 'rgba(255, 99, 132, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              // 'rgb(255, 99, 132)',
              // 'rgb(255, 159, 64)',
              // 'rgb(75, 192, 192)',
              // 'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
            ],
            borderWidth: 1
          },
        ]
      }
    });

  }

}
