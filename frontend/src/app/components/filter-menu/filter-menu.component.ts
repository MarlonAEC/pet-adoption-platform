import { Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypographyComponent } from '../typography/typography.component';
import { PetFilter, PetFilterName } from '../../models/filter.model';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FilterMenu, FilterType } from '../../models/ui.model';
import { InputWithIconComponent } from "../input-with-icon/input-with-icon.component";
import { ButtonComponent } from "../button/button.component";


@Component({
  selector: 'app-filter-menu',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TypographyComponent, DropdownComponent, InputWithIconComponent, ButtonComponent],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.css'
})
export class FilterMenuComponent {
  petFilter: PetFilter = {
    breed: 'as',
    age: '',
    postalCode: '',
  };

  breed = new FormControl('');
  age = new FormControl('');
  postalCode = new FormControl('');
  buttonLabel = 'Filter';

  filterTopMenu: FilterMenu[] = [
    {
      type: FilterType.SELECT,
      label: 'Breed',
      name: PetFilterName.BREED,
      control: this.breed,
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
      control: this.age,
      options: [
        {value: '', label: 'Select an option'},
        {value: 'puppy', label: 'less than 1 year'},
        {value: 'young', label: '1 year to 4 years'},
        {value: 'adult', label: '4 years to 8 years'},
        {value: 'senior', label: '8 years or older'},
      ]
    },
    {
      type: FilterType.INPUT,
      name: PetFilterName.POSTAL_CODE,
      label: 'Postal Code',
      control: this.postalCode,
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
