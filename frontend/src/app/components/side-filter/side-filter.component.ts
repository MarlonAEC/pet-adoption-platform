import { Component } from '@angular/core';
import { DetailsFilterComponent } from "../details-filter/details-filter.component";
import { TemperamentFilterComponent } from "../temperament-filter/temperament-filter.component";
import { FormControl } from '@angular/forms';
import { AvailableTemperamentFilters, TemperamentFilter } from '../../models/filter.model';



@Component({
  selector: 'app-side-filter',
  standalone: true,
  imports: [DetailsFilterComponent, TemperamentFilterComponent],
  templateUrl: './side-filter.component.html',
  styleUrl: './side-filter.component.css'
})
export class SideFilterComponent {
  temperament = new FormControl<TemperamentFilter | null>({
    [AvailableTemperamentFilters.AMOUNT_OF_EXERCISE]: 1,
    [AvailableTemperamentFilters.ATTENTION_SEEKING]: 1,
    [AvailableTemperamentFilters.HOW_CALMED]: 1,
    [AvailableTemperamentFilters.HOW_LOUD]: 1,
    [AvailableTemperamentFilters.HOW_SOCIAL]: 1,
  });
}
