import { Component, OnInit } from '@angular/core';
import { DetailsFilterComponent } from "../details-filter/details-filter.component";
import { TemperamentFilterComponent } from "../temperament-filter/temperament-filter.component";
import { FormControl } from '@angular/forms';
import { AvailableTemperamentFilters, TemperamentFilter } from '../../models/filter.model';
import { FilterService } from '../../services/filter.service';
@Component({
  selector: 'app-side-filter',
  standalone: true,
  imports: [DetailsFilterComponent, TemperamentFilterComponent],
  templateUrl: './side-filter.component.html',
  styleUrl: './side-filter.component.css'
})
export class SideFilterComponent{
  constructor(private readonly filterService: FilterService){}
}
