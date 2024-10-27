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
    img: ''
  };
}
