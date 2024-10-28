import { Component, forwardRef, Input} from '@angular/core';
import {  FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from "../typography/typography.component";

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

@Component({
  selector: 'app-input-with-icon',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TypographyComponent],
  templateUrl: './input-with-icon.component.html',
  styleUrl: './input-with-icon.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> InputWithIconComponent),
      multi: true
    }
  ]
})
export class InputWithIconComponent<T> extends ControlValueAccessorDirective<T>{
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() type: InputType = 'text';
  @Input() svgPath: string = '';
  @Input() placeholder: string = '';
}
