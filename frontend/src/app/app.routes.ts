import { Routes } from '@angular/router';
import { FindPetPageComponent } from './pages/find-pet-page/find-pet-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { PetDetailsPageComponent } from './pages/pet-details-page/pet-details-page.component';
import { AdminDashboardPageComponent } from './pages/admin-dashboard-page/admin-dashboard-page.component';
import { PetsDashboardComponent } from './pages/pets-dashboard/pets-dashboard.component';
import { ApplicationsDashboardComponent } from './pages/applications-dashboard/applications-dashboard.component';

export const routes: Routes = [
    {
        path: 'find-pets', component: FindPetPageComponent
    },
    {
        path: 'login', component: LoginPageComponent
    },
    {
        path: 'logout', component: LogoutPageComponent
    },
    {
        path: 'dashboard', component: AdminDashboardPageComponent
    },
    {
        path: 'pets-dashboard', component: PetsDashboardComponent
    },
    {
        path: 'applications-dashboard', component: ApplicationsDashboardComponent
    },
    {
        path: 'pets/:id', component: PetDetailsPageComponent
    },
    {
        path: '', component: HomePageComponent
    }
];
