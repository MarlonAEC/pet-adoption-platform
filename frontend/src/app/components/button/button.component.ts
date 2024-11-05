import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../typography/typography.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, TypographyComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string = 'Click Me'; // Button label
  @Input() customClass: string = '';   // Optional class for custom styling
  @Input() disabled: boolean = false;  // Disabled state

  @Output() onButtonClick: EventEmitter<void> = new EventEmitter<void>(); // Event emitter for click

  handleClick() {
    this.onButtonClick.emit(); // Emit the click event
  }
}