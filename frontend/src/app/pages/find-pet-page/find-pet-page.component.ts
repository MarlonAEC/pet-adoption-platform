import { Component } from '@angular/core';
import { TypographyComponent } from '../../components/typography/typography.component';
import { FilterMenuComponent } from '../../components/filter-menu/filter-menu.component';
import { Pet } from '../../models/pet.model';
import { PetCardComponent } from '../../components/pet-card/pet-card.component';

@Component({
  selector: 'app-find-pet-page',
  standalone: true,
  imports: [TypographyComponent, FilterMenuComponent, PetCardComponent],
  templateUrl: './find-pet-page.component.html',
  styleUrl: './find-pet-page.component.css'
})
export class FindPetPageComponent {
  pets: Pet[] = [
    {
      id: 1,
      name: 'Fluffy',
      breed: 'Tabby',
      species: 'Cat',
      age: 3,
      description: 'Fluffy is a friendly cat who loves to play and cuddle.',
      adopted: false,
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
      address: '123 Main St.',
      img: 'assets/gallery-1.jpg'
    }
  ];
}
