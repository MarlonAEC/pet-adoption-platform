import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
export type TypographyType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
export type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | 'initial' | 'inherit';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.css'
})
export class TypographyComponent {
  @Input() type: TypographyType = 'p';
  @Input() fontWeight: FontWeight = 'normal';
  @Input() text: string = '';
  @Input() customClass: string = '';

  get fontWeightClass(): string {
    return `font-${this.fontWeight}`;
  }
}
