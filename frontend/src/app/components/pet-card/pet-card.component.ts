import { Component, Input } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { TypographyComponent } from '../typography/typography.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [TypographyComponent, CommonModule, NgOptimizedImage],
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
    img: '',
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
    _wormed: false
  };
}
