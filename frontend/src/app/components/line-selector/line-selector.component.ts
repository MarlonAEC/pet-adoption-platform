import { Component, forwardRef, Inject, Injector, Input } from '@angular/core';
import { TypographyComponent } from "../typography/typography.component";
import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

@Component({
  selector: 'app-line-selector',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TypographyComponent],
  templateUrl: './line-selector.component.html',
  styleUrl: './line-selector.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> LineSelectorComponent),
      multi: true
    }
  ]
})
export class LineSelectorComponent extends ControlValueAccessorDirective<number> {
  @Input() labelStart: string = '';
  @Input() labelEnd: string = '';
  @Input() rangeId: string = '';
  @Input() name: string = '';
  @Input() disabled;
  @Input() value: number | null = null;
  min: number = 1;
  max: number = 5;
  steps: number[] = [1, 2, 3, 4, 5];

  constructor(@Inject(Injector) protected override readonly injector: Injector) {
    super(injector);
    this.disabled = false;
  }

  override ngOnInit(): void {
    super.ngOnInit();
      if(this.value){
        this.control?.setValue(this.value);
      }
  }
}
