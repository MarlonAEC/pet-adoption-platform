import { Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypographyComponent } from '../typography/typography.component';
import { PetFilter, PetFilterName } from '../../models/filter.model';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FilterMenu, FilterType, SelectFilterMenu } from '../../models/ui.model';
import { InputWithIconComponent } from "../input-with-icon/input-with-icon.component";
import { ButtonComponent } from "../button/button.component";
import { BehaviorSubject, debounce, debounceTime, merge } from 'rxjs';
import { MetricsService } from '../../services/metrics.service';


@Component({
  selector: 'app-filter-menu',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, DropdownComponent, InputWithIconComponent, ButtonComponent],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.css'
})
export class FilterMenuComponent {
  petFilter: PetFilter = {
    breed: 'as',
    age: null,
    postalCode: '',
    species: null,
    value: null,
  };

  breed = new FormControl<string | null>('');
  age = new FormControl<number | null>(-1);
  postalCode = new FormControl<string | null>('');
  value = new FormControl<number | null>(-1);


  private readonly filterSource = new BehaviorSubject<PetFilter>({
    age: null,
    breed: null,
    postalCode: null,
    species: null,
    value: null
  });

  generalPetFilter = this.filterSource.asObservable();

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
        {value: -1, label: 'Select an option'},
        {value: 1, label: 'less than 1 year'},
        {value: 4, label: 'less than 4 years'},
        {value: 8, label: 'less than 8 years'},
        {value: 99, label: 'any age'},
      ]
    },
    {
      type: FilterType.INPUT,
      name: PetFilterName.POSTAL_CODE,
      label: 'Postal Code',
      control: this.postalCode,
    },
    {
      type: FilterType.SELECT,
      name: PetFilterName.VALUE,
      label: 'Value',
      control: this.value,
      options: [
        {value: -1, label: 'Select an option'},
        {value: 100, label: 'less than $100'},
        {value: 200, label: 'less than $200'},
        {value: 300, label: 'less than $300'},
        {value: 999999, label: 'any value'},
      ]
    },
  ];

  constructor(
    private readonly filterService: FilterService,
    private readonly metricsService: MetricsService,
  ) { 
  }

  ngOnInit(): void {

    this.metricsService.fetchBreedsAndSpeciesMetrics().subscribe((res) =>{
      const breeds: {
        value: string;
        label: string;
      }[] = [];
      breeds.push({value: '', label: 'Select an option'});
      (this.filterTopMenu[0] as SelectFilterMenu).options = [...breeds, ...res.breeds.map(breed => ({value: breed, label: breed}))];
      // (this.filterTopMenu[0] as SelectFilterMenu).options = res.breeds.map(breed => ({value: breed, label: breed}));
    });

    merge(
      this.age.valueChanges,
      this.breed.valueChanges,
      this.postalCode.valueChanges,
      this.value.valueChanges,
    ).pipe(
      debounceTime(300)
    ).subscribe(() => {
      const newGeneralFilter: PetFilter = {
        age: this.age.value,
        breed: this.breed.value,
        postalCode: this.postalCode.value,
        species: null,
        value: this.value.value,
      };
      this.filterSource.next(newGeneralFilter);
    });

    this.generalPetFilter.subscribe({
      next: (value) => {
        console.log("🚀 ~ FilterMenuComponent ~ this.generalPetFilter.subscribe ~ value", value);
        this.filterService.updateFilter(value);
      }
    });
  }
}
