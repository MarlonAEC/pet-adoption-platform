import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from "../../components/dashboard-card/dashboard-card.component";
import { IconType } from '../../models/ui.model';
import { MetricsService } from '../../services/metrics.service';
import { TypographyComponent } from "../../components/typography/typography.component";

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent, TypographyComponent],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.css'
})
export class AdminDashboardPageComponent implements OnInit {
  totalPets: number = 0;
  totalAvailablePets: number = 0;
  totalAdoptedPets: number = 0;
  allIconTypes = IconType;
  totalApprovedApplications: number = 0;
  totalApplications: number = 0;
  totalCanceledApplications: number = 0;
  totalPendingApplications: number = 0;
  totalAdminUsers: number = 0;
  totalRegularUsers: number = 0;
  totalUsers: number = 0;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly metricsService: MetricsService
  ) {}
  
  ngOnInit(): void {
    this.metricsService.fetchPetMetrics().subscribe({
      next: (metrics) => {
        this.totalPets = metrics.totalPets;
        this.totalAvailablePets = metrics.totalAvailablePets;
        this.totalAdoptedPets = metrics.totalAdoptedPets;
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.metricsService.fetchApplicationMetrics().subscribe({
      next: (metrics) => {
        this.totalApplications = metrics.totalApplications;
        this.totalApprovedApplications = metrics.totalApprovedApplications;
        this.totalCanceledApplications = metrics.totalCanceledApplications;
        this.totalPendingApplications = metrics.totalPendingApplications;
        console.log(metrics);
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.metricsService.fetchUserMetrics().subscribe({
      next: (metrics) => {
        this.totalAdminUsers = metrics.totalAdminUsers;
        this.totalRegularUsers = metrics.totalRegularUsers;
        this.totalUsers = metrics.totalUsers;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
