import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { Pet } from './models/pet.model';
import { PetService } from './services/pet.service';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { BehaviorSubject, combineLatest } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent, CommonModule, AdminLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pet-adoption-frontend';
  isButtonDisabled: boolean = true;
  pets: Pet[] = [];
  isAdmin$ = new BehaviorSubject<boolean>(false);
  isLogged$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly petService: PetService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.authService.retrieveCredentialsFromLocalStorage();

    combineLatest([
      this.authService.isAdmin,
      this.authService.isLogged
    ]).subscribe(([isAdmin, isLogged]) => {
      this.isAdmin$.next(isAdmin ?? false);
      this.isLogged$.next(isLogged ?? false);
      this.cdr.detectChanges();
    });
  }
}
