import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { TypographyComponent } from '../../../components/typography/typography.component';
import { filter, combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterModule, TypographyComponent, CommonModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent implements OnInit {
  menuItems: { 
      id: string,
      title: string,
      icon: string, 
      path: string,
      shouldShow: boolean
  }[] = [];
  currentUrl: string = '/';
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });

      combineLatest([
        this.authService.isAdmin,
        this.authService.isLogged
      ]).subscribe(([isAdmin, isLogged]) => {
        this.menuItems = [
          { 
            id: "home",
            title: 'Home',
            icon: 'dashboard', 
            path: '/dashboard',
            shouldShow: true,
          },
          { 
            id: "process-applications",
            title: 'Applications',
            icon: 'document-plus', 
            path: '/applications-dashboard',
            shouldShow: isAdmin && isLogged,
          },
          { 
            id: "create-pet",
            title: 'Pets',
            icon: 'pet-icon', 
            path: '/pets-dashboard',
            shouldShow: isAdmin && isLogged,
          },
          { 
            id: "logout",
            title: 'Logout',
            icon: 'logout', 
            path: '/logout',
            shouldShow: isLogged,
          },
          { 
            id: "login",
            title: 'Login',
            icon: 'login', 
            path: '/login',
            shouldShow: !isLogged,
          },
        ];
      });
  }
}
