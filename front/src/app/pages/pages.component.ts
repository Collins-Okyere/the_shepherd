import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FloatingNavComponent } from '../reusable-comps/floating-nav/floating-nav.component';
import { FooterComponent } from '../reusable-comps/footer/footer.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterOutlet, FloatingNavComponent, FooterComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {

}
