import { Component, OnInit } from '@angular/core';
import { TypographyComponent } from '../../components/typography/typography.component';
import { FilterMenuComponent } from '../../components/filter-menu/filter-menu.component';
import { Pet } from '../../models/pet.model';
import { PetCardComponent } from '../../components/pet-card/pet-card.component';
import { SideFilterComponent } from "../../components/side-filter/side-filter.component";
import { FilterService } from '../../services/filter.service';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-find-pet-page',
  standalone: true,
  imports: [TypographyComponent, FilterMenuComponent, PetCardComponent, SideFilterComponent],
  templateUrl: './find-pet-page.component.html',
  styleUrl: './find-pet-page.component.css'
})
export class FindPetPageComponent implements OnInit {
  pets: Pet[] = [];

  constructor(
    private readonly filterService: FilterService,
    private readonly petService: PetService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.petService.getAllPets().subscribe({
      next: (response) => {
          this.pets = response.content;
      }
    })
  }
}
