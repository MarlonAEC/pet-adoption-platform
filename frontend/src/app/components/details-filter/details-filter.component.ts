import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TypographyComponent } from '../typography/typography.component';
import { CommonModule } from '@angular/common';
import { AvailableDetails, MapAvailableDetails } from '../../models/filter.model';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { BehaviorSubject, combineLatest, debounceTime, merge } from 'rxjs';
import { FilterService } from '../../services/filter.service';

type DetailsFilter = {
  [key in AvailableDetails]: boolean | null;
};

@Component({
  selector: 'app-details-filter',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TypographyComponent, CommonModule, CheckboxComponent],
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
export class DetailsFilterComponent implements OnInit {
  @Input() options: string [] = [];
  @Input() label: string = '';
  @Input() detailsFilterId: string = '';

  constructor(private readonly filterService: FilterService){}

  is_good_with_kids = new FormControl<boolean | null>(false);
  is_good_with_cats = new FormControl<boolean | null>(null);
  is_good_with_dogs = new FormControl<boolean | null>(null);
  is_house_trained = new FormControl<boolean | null>(null);
  is_declawed = new FormControl<boolean | null>(null);
  is_spayed = new FormControl<boolean | null>(null);
  is_vaccinated = new FormControl<boolean | null>(null);
  is_wormed = new FormControl<boolean | null>(null);
  needs_experienced_owner = new FormControl<boolean | null>(null);

  private readonly detailsSource = new BehaviorSubject<DetailsFilter>({
    is_good_with_kids: null,
    is_good_with_cats: null,
    is_good_with_dogs: null,
    is_house_trained: null,
    is_declawed: null,
    is_spayed: null,
    is_vaccinated: null,
    is_wormed: null,
    needs_experienced_owner: null
  });
  detailsFilter = this.detailsSource.asObservable();

  ngOnInit(): void {
    merge(
      this.is_good_with_kids.valueChanges,
      this.is_good_with_cats.valueChanges,
      this.is_good_with_dogs.valueChanges,
      this.is_house_trained.valueChanges,
      this.is_declawed.valueChanges,
      this.is_spayed.valueChanges,
      this.is_vaccinated.valueChanges,
      this.is_wormed.valueChanges,
      this.needs_experienced_owner.valueChanges
    ).pipe(
      debounceTime(300) // Adjust the debounce time as needed
    ).subscribe(() => {
      const newDetails: DetailsFilter = {
        is_good_with_kids: this.is_good_with_kids.value,
        is_good_with_cats: this.is_good_with_cats.value,
        is_good_with_dogs: this.is_good_with_dogs.value,
        is_house_trained: this.is_house_trained.value,
        is_declawed: this.is_declawed.value,
        is_spayed: this.is_spayed.value,
        is_vaccinated: this.is_vaccinated.value,
        is_wormed: this.is_wormed.value,
        needs_experienced_owner: this.needs_experienced_owner.value
      };
      this.detailsSource.next(newDetails);
    });
    this.detailsSource.subscribe({
      next: value => {
        this.filterService.updateFilter(value);
      }
    })
  }
}
