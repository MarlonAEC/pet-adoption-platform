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
  currentPage: number = 0;
  size: number = 12;

  constructor(
    private readonly filterService: FilterService,
    private readonly petService: PetService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.filterService.currentFilterHash.subscribe({
      next: (hash) => {
        if(hash){
          console.log("HASH: ",hash);
          if(this.filterService.isCurrentFilterEmpty()){
            this.petService.getAllPets(this.currentPage, this.size).subscribe({
              next: (response) => {
                  this.pets = response.content;
                  console.log(this.pets);
              }
            });
          } else {
            this.petService.getPetsByFilter(hash, this.currentPage, this.size).subscribe({
              next: (response) => {
                console.log("🚀 ~ FindPetPageComponent ~ this.petService.getPetsByFilter ~ response:", response)
                this.pets = response.content;
                console.log("PETS: ",this.pets);
              }
            }); 
          }
        }
      }
    })
  }
}
