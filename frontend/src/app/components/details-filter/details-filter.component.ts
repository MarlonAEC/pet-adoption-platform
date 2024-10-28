import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypographyComponent } from '../typography/typography.component';
import { CommonModule } from '@angular/common';
import { AvailableDetails } from '../../models/filter.model';

type DetailsFilter = {
  [key in AvailableDetails]: boolean;
};

@Component({
  selector: 'app-details-filter',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TypographyComponent, CommonModule],
  templateUrl: './details-filter.component.html',
  styleUrl: './details-filter.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> DetailsFilterComponent),
      multi: true
    }
  ]
})
export class DetailsFilterComponent extends ControlValueAccessorDirective<DetailsFilter> {
  @Input() options: string [] = [];
  @Input() label: string = '';
  @Input() detailsFilterId: string = '';

  override ngOnInit(): void {
    super.ngOnInit();
    
    this.options = Object.values(AvailableDetails);
  }

  override writeValue(value: DetailsFilter): void {
    super.writeValue(value);
  }
}
