import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'pet-adoption-frontend';
  isButtonDisabled: boolean = true;
  pets: Pet[] = [];

  constructor(
    private readonly petService: PetService,
    private readonly authService: AuthService
  ) {

  }
  // Function to handle the click event
  handleClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('App component initialized');
    this.petService.getAllPets(0, 10).subscribe({
        next: (data) => this.pets = data.content,
        error: (error) => console.error(error)
    });

    this.authService.login({
        username: 'user1',
        password: 'password1'
    }).subscribe({
        next: (data) => {
            console.log(data);
            this.isButtonDisabled = false;
        },
        error: (error) => console.error(error)
    });
  }
}
