import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PetFilter } from '../models/filter.model';

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

  constructor() { }

  updateFilter(filterName: string, value: string) {
    const newFilter = {
      ...this.filterSource.getValue(),
      [filterName]: value
    };
    console.log("🚀 ~ FilterService ~ updateFilter ~ newFilter:", newFilter);
    this.filterSource.next(newFilter);
  }
}
