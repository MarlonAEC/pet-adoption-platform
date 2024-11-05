import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.css'
})
export class AdminDashboardPageComponent{
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  
}
