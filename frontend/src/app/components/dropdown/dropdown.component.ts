import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TypographyComponent } from '../typography/typography.component';
import { SelectOption } from '../../models/ui.model';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, TypographyComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent<T> extends ControlValueAccessorDirective<T>{
  @Input() options: SelectOption[] = [];
  @Input() label: string = '';
  @Input() selectId: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  isDropdownOpen: boolean = false;
}
