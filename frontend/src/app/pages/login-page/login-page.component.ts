import { Component } from '@angular/core';
import { TypographyComponent } from '../../components/typography/typography.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  toggleSignIn() {
    this.isSignIn = !this.isSignIn;
  }

  handleCreateAccount() {
    this.authService.createAccount({
      username: this.username,
      password: this.password,
      name: this.name,
      email: this.email,
      address: this.address
    }).subscribe({
      next: (res) => {
        if(this.authService.isAdminUser(res.roles))
          this.router.navigate(['/dashboard']);
        else
          this.router.navigate(['/find-pets']);
      },
      error: (error) => this.errorCreatingAccount = error.error.message,
    })
  }

  handleSignIn() {
    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        if(this.authService.isAdminUser(res.roles))
          this.router.navigate(['/dashboard']);
        else
          this.router.navigate(['/find-pets']);
      },
      error: (error) => this.errorSigningIn = error.error.message,
    });
  }
}
