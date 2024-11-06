import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> InputComponent),
      multi: true
    }
  ]
})
export class InputComponent<T> extends ControlValueAccessorDirective<T>{
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() error: string = '';
  @Input() name: string = '';
}
