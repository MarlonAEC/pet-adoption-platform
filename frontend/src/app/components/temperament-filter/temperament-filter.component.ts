import { Component, Input } from '@angular/core';
import { TypographyComponent } from "../typography/typography.component";
import { LineSelectorComponent } from "../line-selector/line-selector.component";
import { TemperamentFilter, AvailableTemperamentFilters } from '../../models/filter.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-temperament-filter',
  standalone: true,
  imports: [TypographyComponent, LineSelectorComponent],
  templateUrl: './temperament-filter.component.html',
  styleUrl: './temperament-filter.component.css'
})
export class TemperamentFilterComponent {
  @Input() temperamentFilter: FormControl<TemperamentFilter | null> = new FormControl<TemperamentFilter | null>({
    [AvailableTemperamentFilters.AMOUNT_OF_EXERCISE]: 1,
    [AvailableTemperamentFilters.ATTENTION_SEEKING]: 1,
    [AvailableTemperamentFilters.HOW_CALMED]: 1,
    [AvailableTemperamentFilters.HOW_LOUD]: 1,
    [AvailableTemperamentFilters.HOW_SOCIAL]: 1,
  });
}
