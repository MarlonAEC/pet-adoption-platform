import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { ActivatedRoute } from '@angular/router';
import { TypographyComponent } from '../../components/typography/typography.component';
import { CommonModule } from '@angular/common';
import { Pet } from '../../models/pet.model';
import { ButtonComponent } from "../../components/button/button.component";
import { LineSelectorComponent } from '../../components/line-selector/line-selector.component';
import { CarouselImagesComponent } from "../../components/carousel-images/carousel-images.component";
import { API_BASE_URL } from '../../constants/api';
import { BehaviorSubject } from 'rxjs';
import { ApplicationStatus } from '../../models/application.model';

@Component({
  selector: 'app-pet-details-page',
  standalone: true,
  imports: [TypographyComponent, CommonModule, ButtonComponent, LineSelectorComponent, CarouselImagesComponent],
  templateUrl: './pet-details-page.component.html',
  styleUrl: './pet-details-page.component.css'
})
export class PetDetailsPageComponent implements OnInit {
  constructor(
    private readonly petService: PetService,
    private readonly route: ActivatedRoute
  ) {}
  petId = null;
  pet = new BehaviorSubject<Pet | null>(null);
  pet$ = this.pet.asObservable();
  favoriteThings: string[] = [];
  requirementsForNewHome: string[] = [];
  applicationStatuses = ApplicationStatus;

  slides = new BehaviorSubject<{ src: string; alt: string; id: string; }[]>([]);
  slides$ = this.slides.asObservable();

  currentImageDisplaying: number = 0;
  detailedInformation: {
      key: string;
      value: boolean;
    }[] = [];

  ngOnInit() {
    this.petId = this.route.snapshot.params['id'];
    if(this.petId) {
      this.petService.getPetById(this.petId).subscribe(pet => {
        this.pet.next(pet);
        this.favoriteThings = pet?.favourite_things ?? [];
        this.requirementsForNewHome = pet?.requirements_for_new_home ?? [];
        this.detailedInformation = this.collectDetailedInformation(pet);
        this.slides.next(pet.images.map((image, index) => {
          return {
            src: `${API_BASE_URL}${image}`,
            alt: `Slide ${index + 1}`,
            id: `slide-${index}`
          };
        }));
      });
    }
  }

  onApplyToAdopt() {
    if(this.petId){
      this.petService.applyToAdoptPet(this.petId).subscribe({
        next: (res) => {
          this.pet.next(res.pet);
          alert("Application submitted successfully: " + JSON.stringify(res, null, 2));
        },
        error: () => {
          alert("Failed to submit application");
        }
      });
    }
  }

  onWithdrawApplication() {
    if(this.petId){
      this.petService.withdrawApplication(this.petId).subscribe({
        next: (res) => {
          this.pet.next(res.pet);
          alert("Application withdrawn successfully: " + JSON.stringify(res, null, 2));
        },
        error: () => {
          alert("Failed to withdraw application");
        }
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
