import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
export type TypographyType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.css'
})
export class TypographyComponent {
  @Input() type: TypographyType = 'p';
  @Input() text: string = '';
  @Input() customClass: string = '';
}
