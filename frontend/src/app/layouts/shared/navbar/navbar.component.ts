import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TypographyComponent } from '../../../components/typography/typography.component';
import { AuthService } from '../../../services/auth.service';
import { combineLatest, merge } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TypographyComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  constructor(private readonly authService: AuthService) {}

  menuItems: {id: number, text: string, path: string}[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    combineLatest([
      this.authService.isLogged,
      this.authService.isAdmin
    ]).subscribe(([isLogged, isAdmin]) => {
      this.isLoggedIn = isLogged; // Update the logged-in status
      if(isLogged && !isAdmin){
        this.menuItems = [
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
            text: 'Logout',
            path: '/logout',
          },
        ];
      } else if(isLogged && isAdmin){
        this.menuItems = [
          {
            id: 1,
            text: 'Home',
            path: '',
          },
          {
            id: 2,
            text: 'Dashboard',
            path: '/dashboard',
          },
          {
            id: 3,
            text: 'Logout',
            path: '/logout',
          },
        ];
      } else {
        this.menuItems = [
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
    });
  }

}
