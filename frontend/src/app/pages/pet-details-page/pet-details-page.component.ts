import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TypographyComponent } from '../../components/typography/typography.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Pet } from '../../models/pet.model';
import { ButtonComponent } from "../../components/button/button.component";
import { LineSelectorComponent } from '../../components/line-selector/line-selector.component';
import { CarouselImagesComponent } from "../../components/carousel-images/carousel-images.component";

@Component({
  selector: 'app-pet-details-page',
  standalone: true,
  imports: [TypographyComponent, CommonModule, NgOptimizedImage, RouterLink, ButtonComponent, LineSelectorComponent, CarouselImagesComponent],
  templateUrl: './pet-details-page.component.html',
  styleUrl: './pet-details-page.component.css'
})
export class PetDetailsPageComponent implements OnInit {
  constructor(
    private readonly petService: PetService,
    private readonly route: ActivatedRoute
  ) {}
  petId = null;
  pet: Pet = {} as Pet;
  favoriteThings: string[] = [];
  requirementsForNewHome: string[] = [];
  slides: { src: string; alt: string; id: string; }[] = [];
  currentImageDisplaying: number = 0;
  detailedInformation: {
      key: string;
      value: boolean;
    }[] = [];

  ngOnInit() {
    this.petId = this.route.snapshot.params['id'];
    this.slides = [
      {
        src: "/assets/gallery-1.jpg",
        alt: "Slide 1",
        id: "slide-1"
      },
      {
        src: "/assets/gallery-2.jpg",
        alt: "Slide 2",
        id: "slide-2"
      },
      {
        src: "/assets/gallery-3.jpg",
        alt: "Slide 3",
        id: "slide-3"
      }
    ];
    if(this.petId) {
      this.petService.getPetById(this.petId).subscribe(pet => {
        console.log(pet);
        this.pet = pet;
        this.favoriteThings = pet?.favourite_things ?? [];
        this.requirementsForNewHome = pet?.requirements_for_new_home ?? [];
        this.detailedInformation = this.collectDetailedInformation(pet);
      });
    }
  }


  onCurrentSlideChange(currentSlide: number) {
    this.currentImageDisplaying = currentSlide;
  }
  private collectDetailedInformation(pet: Pet){
    const detailedInformation: {
      key: string;
      value: boolean;
    }[] = [];
    detailedInformation.push({
      key: "Declawed",
      value: pet._declawed
    });
    detailedInformation.push({
      key: "House Trained",
      value: pet._house_trained
    });
    detailedInformation.push({
      key: "Good with Cats",
      value: pet._good_with_cats
    });
    detailedInformation.push({
      key: "Good with Kids",
      value: pet._good_with_kids
    });
    detailedInformation.push({
      key: "Good with Dogs",
      value: pet._good_with_dogs
    });
    detailedInformation.push({
      key: "Spayed",
      value: pet._spayed
    });
    detailedInformation.push({
      key: "Wormed",
      value: pet._wormed
    });
    detailedInformation.push({
      key: "Vaccinated",
      value: pet._vaccinated
    });

    return detailedInformation;
  };

}
