import { Component, Input, SimpleChanges } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { TypographyComponent } from '../typography/typography.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { API_BASE_URL } from '../../constants/api';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [TypographyComponent, CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './pet-card.component.html',
  styleUrl: './pet-card.component.css'
})
export class PetCardComponent {
  @Input() pet: Pet = {
    id: 1,
    name: '',
    breed: '',
    species: '',
    age: 0,
    description: '',
    adopted: false,
    createdAt: '',
    updatedAt: '',
    address: '',
    images: [],
    value: 0,
    temperament_how_calmed: 0,
    temperament_how_social: 0,
    temperament_how_attention_seeking: 0,
    temperament_how_active: 0,
    temperament_how_loud: 0,
    needs_experienced_owner: false,
    postal_code: '',
    _house_trained: false,
    _declawed: false,
    _good_with_kids: false,
    _good_with_dogs: false,
    _good_with_cats: false,
    _spayed: false,
    _vaccinated: false,
    _wormed: false,
    favourite_things: [],
    requirements_for_new_home: [],
    weight: 0,
    color: '',
    background: '',
    health: '',
    sex: ''
  };
  imageToDisplay: string = '/assets/placeholder.svg';

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['pet']) {
      this.updateImageToDisplay();
    }
  }

  private updateImageToDisplay(): void {
    this.imageToDisplay = this.pet.images[0] ? `${API_BASE_URL}${this.pet.images[0]}` : '/assets/placeholder.svg';
  }
}
