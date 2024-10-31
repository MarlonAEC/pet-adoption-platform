import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypographyComponent } from '../typography/typography.component';
import { CommonModule } from '@angular/common';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TypographyComponent, CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent extends ControlValueAccessorDirective<boolean> {
  @Input() label: string = '';
  @Input() checkboxId: string = '';
  @Input() name: string = '';
}
