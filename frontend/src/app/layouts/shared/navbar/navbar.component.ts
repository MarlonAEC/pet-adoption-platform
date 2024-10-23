import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TypographyComponent } from '../../../components/typography/typography.component';
import { AuthService } from '../../../services/auth.service';

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
    this.authService.isLogged.subscribe(status => {
      this.isLoggedIn = status; // Update the logged-in status
      if(this.isLoggedIn){
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
