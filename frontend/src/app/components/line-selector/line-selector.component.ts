import { Component, Input } from '@angular/core';
import { TypographyComponent } from "../typography/typography.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

@Component({
  selector: 'app-line-selector',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TypographyComponent],
  templateUrl: './line-selector.component.html',
  styleUrl: './line-selector.component.css'
})
export class LineSelectorComponent extends ControlValueAccessorDirective<number> {
  @Input() labelStart: string = '';
  @Input() labelEnd: string = '';
  @Input() rangeId: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() value: number | null = null;
  min: number = 1;
  max: number = 5;
  steps: number[] = [1, 2, 3, 4, 5];

  override ngOnInit(): void {
    super.ngOnInit();
      if(this.value){
        this.control?.setValue(this.value);
      }
  }
}
