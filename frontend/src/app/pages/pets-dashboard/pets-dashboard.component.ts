import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { BehaviorSubject } from 'rxjs';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';
import { ButtonComponent } from "../../components/button/button.component";
import { TypographyComponent } from "../../components/typography/typography.component";
import { CommonModule } from '@angular/common';
import { CreatePetModalComponent } from '../../modals/create-pet-modal/create-pet-modal.component';

@Component({
  selector: 'app-pets-dashboard',
  standalone: true,
  imports: [TableComponent, ButtonComponent, TypographyComponent, CommonModule, CreatePetModalComponent],
  templateUrl: './pets-dashboard.component.html',
  styleUrl: './pets-dashboard.component.css'
})
export class PetsDashboardComponent implements OnInit{
  elements = new BehaviorSubject<Pet[]>([]);
  showCreatePetForm: boolean = true;

  constructor(
    private readonly petService: PetService
  ) { }

  toggleShowCreatePetForm(): void {
    this.showCreatePetForm = !this.showCreatePetForm;
  }

  ngOnInit(): void {
      this.petService.getAllPets().subscribe({
        next: (data) => {
          this.elements.next(data.content);
        },
      });
  }

  handleCreatePet(pet: Pet): void {
    console.log("🚀 ~ PetsDashboardComponent ~ handleCreatePet ~ pet:", pet)
    if(pet){
      try{
        this.petService.createPetByAdmin(pet).subscribe({
          next: () => {
            alert("Pet created successfully!");
          },
          error: (error) => {
            console.error(error);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
