import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TypographyComponent } from '../../../typography/typography.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TypographyComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItems = [
    {
      id: 1,
      text: 'Home',
      path: '',
    },
    {
      id: 2,
      text: 'Find Pets',
      path: '/find-pets',
    },
    {
      id: 3,
      text: 'Login',
      path: '/login',
    },
  ];
}
