import { Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { FormsModule } from '@angular/forms';
import { TypographyComponent } from '../typography/typography.component';
import { PetFilter, PetFilterName } from '../../models/filter.model';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FilterMenu, FilterType } from '../../models/ui.model';


@Component({
  selector: 'app-filter-menu',
  standalone: true,
  imports: [FormsModule, TypographyComponent, DropdownComponent],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.css'
})
export class FilterMenuComponent {
  petFilter: PetFilter = {
    breed: 'as',
    age: '',
  };

  filterTopMenu: FilterMenu[] = [
    {
      type: FilterType.SELECT,
      label: 'Breed',
      name: PetFilterName.BREED,
      options: [
        {value: '', label: 'Select an option'},
        {value: 'malamute', label: 'Malamute'},
        {value: 'husky', label: 'Husky'},
        {value: 'golden', label: 'Golden'},
        {value: 'lab', label: 'Lab'},
        {value: 'poodle', label: 'Poodle'},
      ]
    },
    {
      type: FilterType.SELECT,
      name: PetFilterName.AGE,
      label: 'Age',
      options: [
        {value: '', label: 'Select an option'},
        {value: 'puppy', label: 'less than 1 year'},
        {value: 'young', label: '1 year to 4 years'},
        {value: 'adult', label: '4 years to 8 years'},
        {value: 'senior', label: '8 years or older'},
      ]
    },
  ];

  constructor(private readonly filterService: FilterService) { 
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.filterService.currentFilter.subscribe(filter => {
      this.petFilter = filter;
    });
  }

  onUpdateFilter(filterName: string, value: string) {
    console.log("🚀 ~ FilterMenuComponent ~ onUpdateFilter ~ filterName", filterName);
    if (this.petFilter[filterName as keyof PetFilter] !== value) {
      this.filterService.updateFilter(filterName, value);
    }
  }
}
