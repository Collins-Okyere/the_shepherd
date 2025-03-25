import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-floating-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './floating-nav.component.html',
  styleUrl: './floating-nav.component.scss'
})
export class FloatingNavComponent {

  page: string = '';

  constructor(private readonly router: Router) { }

  ngOnInit(){
    const url = this.router.url.split("/");
    const page = url[url.length - 1];
    this.page = page;
    this.selected(this.page || 'sign_in');
  }

  selected(val: string) {
    if (val === 'sign_in') {
      this.router.navigateByUrl(`auth/${val}`);
    }else{
      this.router.navigateByUrl(`pages/${val}`);
    }
    this.page = val;
  }

}
