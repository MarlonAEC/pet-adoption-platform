import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PetFilter, DatabasePetFilter } from '../models/filter.model';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private readonly filterSource = new BehaviorSubject<PetFilter>({
    breed: '',
    age: '',
    postalCode: '',
  });
  currentFilter = this.filterSource.asObservable();

  constructor(private readonly http: HttpClient) { }

  updateFilter(filterName: string, value: string) {
    const newFilter = {
      ...this.filterSource.getValue(),
      [filterName]: value
    };
    this.filterSource.next(newFilter);
  }

  createOrGetFilterHash(filter: DatabasePetFilter) {
    return this.http.post<string>(`${API_BASE_URL}/pets/filter`, filter);
  }
}
