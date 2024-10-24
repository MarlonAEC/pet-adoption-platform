import { Routes } from '@angular/router';
import { FindPetPageComponent } from './pages/find-pet-page/find-pet-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';

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
        path: '', component: HomePageComponent
    }
];
