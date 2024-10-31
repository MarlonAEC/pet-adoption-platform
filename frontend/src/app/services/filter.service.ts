import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PetFilter, DatabasePetFilter, CompletePetFilter, TemperamentFilter, DetailsFilter } from '../models/filter.model';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private readonly filterSource = new BehaviorSubject<CompletePetFilter>({
    regularFilter: {
      breed: null,
      age: null,
      species: null,
      value: null,
      postalCode: null
    },
    detailsFilter: {
      is_declawed: null,
      is_good_with_cats: null,
      is_good_with_dogs: null,
      is_good_with_kids: null,
      is_house_trained: null,
      is_spayed: null,
      is_vaccinated: null,
      is_wormed: null,
      needs_experienced_owner: null,
    },
    temperamentFilter: {
      temperament_how_calmed: null,
      temperament_how_social: null,
      temperament_how_attention_seeking: null,
      temperament_how_active: null,
      temperament_how_loud: null
    }
  });
  currentFilter = this.filterSource.asObservable();
  private readonly filterHashSource = new BehaviorSubject<string>('');
  currentFilterHash  = this.filterHashSource.asObservable();

  constructor(private readonly http: HttpClient) { }

  isCurrentFilterEmpty(): boolean {
    if(this.filterSource.getValue() === null)
      return true;
    return Object.values(this.filterSource.getValue().regularFilter).every(value => value === null) &&
            Object.values(this.filterSource.getValue().detailsFilter).every(value => value === null) &&
            Object.values(this.filterSource.getValue().temperamentFilter).every(value => value === null);
  }

  getCurrentFilter(): CompletePetFilter {
    return this.filterSource.getValue();
  }

  getCurrentFilterHash(): string {
    return this.filterHashSource.getValue();
  }

  private mapUIFilterToDatabaseFilter(filter: CompletePetFilter): DatabasePetFilter {
    return {
      species: filter.regularFilter.species,
      breed: filter.regularFilter.breed,
      age: filter.regularFilter.age,
      value: filter.regularFilter.value,
      postal_code: filter.regularFilter.postalCode,
      temperament_how_calmed: filter.temperamentFilter.temperament_how_calmed,
      temperament_how_social: filter.temperamentFilter.temperament_how_social,
      temperament_how_attention_seeking: filter.temperamentFilter.temperament_how_attention_seeking,
      temperament_how_active: filter.temperamentFilter.temperament_how_active,
      temperament_how_loud: filter.temperamentFilter.temperament_how_loud,
      is_vaccinated: filter.detailsFilter.is_vaccinated,
      is_declawed: filter.detailsFilter.is_declawed,
      is_good_with_cats: filter.detailsFilter.is_good_with_cats,
      is_good_with_dogs: filter.detailsFilter.is_good_with_dogs,
      is_good_with_kids: filter.detailsFilter.is_good_with_kids,
      is_house_trained: filter.detailsFilter.is_house_trained,
      is_spayed: filter.detailsFilter.is_spayed,
      is_wormed: filter.detailsFilter.is_wormed,
      needs_experienced_owner: filter.detailsFilter.needs_experienced_owner
    };
  }

  updateFilter(partialFilter: TemperamentFilter | PetFilter | DetailsFilter) {
    const currentFilter = this.filterSource.getValue();
    let newFilter = {} as CompletePetFilter;

    if(this.isDetailsFilter(partialFilter)) {
      newFilter = {
        ...currentFilter,
        detailsFilter: {
          ...currentFilter.detailsFilter,
          ...(partialFilter as DetailsFilter)
        }
      }
    } else if(this.isPetFilter(partialFilter)) {
      newFilter = {
        ...currentFilter,
        regularFilter: {
          ...currentFilter.regularFilter,
          ...(partialFilter as PetFilter)
        }
      }
    } else if(this.isTemperamentFilter(partialFilter)) {
      newFilter = {
        ...currentFilter,
        temperamentFilter: {
          ...currentFilter.temperamentFilter,
          ...(partialFilter as TemperamentFilter)
        }
      }
    }

    console.log("NEW FILTER: ",newFilter);
    this.createOrGetFilterHash(this.mapUIFilterToDatabaseFilter(newFilter));
    this.filterSource.next(newFilter);
  }

  private createOrGetFilterHash(filter: DatabasePetFilter) {
    this.http.post<{
      hash: string
    }>(`${API_BASE_URL}/pets/filter`, filter).subscribe({
      next: (response) => {
        this.filterHashSource.next(response.hash);
      }
    });
  }

  private isPetFilter(filter: any): boolean {
    return Object.keys(filter).includes('breed') && 
            Object.keys(filter).includes('age') &&
            Object.keys(filter).includes('species') &&
            Object.keys(filter).includes('value') &&
            Object.keys(filter).includes('postalCode');
  }

  private isDetailsFilter(filter: any): boolean {
    return Object.keys(filter).includes('is_declawed') && 
            Object.keys(filter).includes('is_good_with_cats') &&
            Object.keys(filter).includes('is_good_with_dogs') &&
            Object.keys(filter).includes('is_good_with_kids') &&
            Object.keys(filter).includes('is_house_trained') &&
            Object.keys(filter).includes('is_spayed') &&
            Object.keys(filter).includes('is_vaccinated') &&
            Object.keys(filter).includes('is_wormed') &&
            Object.keys(filter).includes('needs_experienced_owner');
  }

  private isTemperamentFilter(filter: any): boolean {
    return Object.keys(filter).includes('temperament_how_calmed') && 
            Object.keys(filter).includes('temperament_how_social') &&
            Object.keys(filter).includes('temperament_how_attention_seeking') &&
            Object.keys(filter).includes('temperament_how_active') &&
            Object.keys(filter).includes('temperament_how_loud');
  }
}
