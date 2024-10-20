import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TypographyComponent } from './typography/typography.component';
import { ButtonComponent } from './button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TypographyComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pet-adoption-frontend';
  isButtonDisabled: boolean = true;

  // Function to handle the click event
  handleClick() {
    console.log('Button clicked');
  }
}
