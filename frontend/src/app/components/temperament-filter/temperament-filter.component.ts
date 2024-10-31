import { Component, OnInit } from '@angular/core';
import { TypographyComponent } from "../typography/typography.component";
import { LineSelectorComponent } from "../line-selector/line-selector.component";
import { FilterService } from '../../services/filter.service';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TemperamentFilter } from '../../models/filter.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-temperament-filter',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TypographyComponent, LineSelectorComponent],
  templateUrl: './temperament-filter.component.html',
  styleUrl: './temperament-filter.component.css'
})
export class TemperamentFilterComponent implements OnInit{
  constructor(private readonly filterService: FilterService){}

  temperamentHowCalmed = new FormControl<number | null>( null);
  temperamentHowSocial = new FormControl<number | null>( null);
  temperamentHowAttentionSeeking = new FormControl<number | null>( null);
  temperamentHowActive = new FormControl<number | null>( null);
  temperamentHowLoud = new FormControl<number | null>( null);

  private readonly temperamentSource = new BehaviorSubject<TemperamentFilter>({
    temperament_how_calmed: null,
    temperament_how_social: null,
    temperament_how_attention_seeking: null,
    temperament_how_active: null,
    temperament_how_loud: null
  });

  temperament = this.temperamentSource.asObservable();

  ngOnInit(): void {
    this.temperamentHowActive.valueChanges.subscribe((value) => {
      this.temperamentSource.next({
        ...this.temperamentSource.value,
        temperament_how_active: value
      })
    });
    this.temperamentHowAttentionSeeking.valueChanges.subscribe((value) => {
      this.temperamentSource.next({
        ...this.temperamentSource.value,
        temperament_how_attention_seeking: value
      })
    });
    this.temperamentHowCalmed.valueChanges.subscribe((value) => {
      this.temperamentSource.next({
        ...this.temperamentSource.value,
        temperament_how_calmed: value
      })
    });
    this.temperamentHowLoud.valueChanges.subscribe((value) => {
      this.temperamentSource.next({
        ...this.temperamentSource.value,
        temperament_how_loud: value
      })
    });
    this.temperamentHowSocial.valueChanges.subscribe((value) => {
      this.temperamentSource.next({
        ...this.temperamentSource.value,
        temperament_how_social: value
      })
    });

    // Updating the service and calling the API
    this.temperamentSource.subscribe({
      next: (value) => {
        this.filterService.updateFilter(value)
      }
    })
  }
}
