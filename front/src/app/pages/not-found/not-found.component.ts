import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../reusable-comps/toast/toast.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit{

  constructor(private readonly toast: ToastService){}

  ngOnInit(){
    this.showToast();
  }

  showToast(){
    setTimeout(() => {
      this.toast.showToast('Sorry, page was not found.', 'danger' );
    }, 200);
  }
}
