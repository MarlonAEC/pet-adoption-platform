import { Component } from '@angular/core';
import { TypographyComponent } from '../../components/typography/typography.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [TypographyComponent, FormsModule, NgOptimizedImage],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  address: string = '';
  email: string = '';
  name: string = '';
  isSignIn: boolean = true;
  errorSigningIn: string = '';
  errorCreatingAccount: string = '';

  constructor(private readonly authService: AuthService) {}

  toggleSignIn() {
    this.isSignIn = !this.isSignIn;
  }

  handleCreateAccount() {
    console.log('Create account clicked');
  }

  handleSignIn() {
    console.log(this.username, this.password);
    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      error: (error) => this.errorSigningIn = error
    });
  }
}
