import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { Pet } from './models/pet.model';
import { PetService } from './services/pet.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pet-adoption-frontend';
  isButtonDisabled: boolean = true;
  pets: Pet[] = [];

  constructor(
    private readonly petService: PetService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
      this.authService.retrieveCredentials();
  }
}
