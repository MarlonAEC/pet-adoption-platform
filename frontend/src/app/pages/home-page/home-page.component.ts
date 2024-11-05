import { Component, OnInit } from '@angular/core';
import { TypographyComponent } from "../../components/typography/typography.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TypographyComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  isAdmin: boolean = false;
  constructor(
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
}
