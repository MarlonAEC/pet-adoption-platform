import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { TypographyComponent } from "../../typography/typography.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MainLayoutComponent, TypographyComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
