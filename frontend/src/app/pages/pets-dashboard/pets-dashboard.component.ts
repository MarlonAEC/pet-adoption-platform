import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { BehaviorSubject } from 'rxjs';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';
import { TypographyComponent } from "../../components/typography/typography.component";
import { CommonModule } from '@angular/common';
import { CreatePetModalComponent } from '../../modals/create-pet-modal/create-pet-modal.component';
import { PageHandlerComponent } from "../../components/page-handler/page-handler.component";

@Component({
  selector: 'app-pets-dashboard',
  standalone: true,
  imports: [TableComponent, TypographyComponent, CommonModule, CreatePetModalComponent, PageHandlerComponent],
  templateUrl: './pets-dashboard.component.html',
  styleUrl: './pets-dashboard.component.css'
})
export class PetsDashboardComponent implements OnInit{
  size: number = 12;
  totalPages: number = 0;
  elements = new BehaviorSubject<Pet[]>([]);
  showCreatePetForm: boolean = false;
  private readonly currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();

  set currentPage(value: number) {
    this.currentPageSubject.next(value);
  }

  get currentPage(): number {
    return this.currentPageSubject.value;
  }

  constructor(
    private readonly petService: PetService
  ) { }

  incrementPage(): void {
    if(this.currentPage < this.totalPages - 1)
      this.currentPageSubject.next(this.currentPage + 1);
  }

  decrementPage(): void {
    if(this.currentPage > 0)
      this.currentPageSubject.next(this.currentPage - 1);
  }

  navigateToPage(page: number): void {
    if(page <= this.totalPages && page > 0)
      this.currentPageSubject.next(page);
  }

  toggleShowCreatePetForm(): void {
    this.showCreatePetForm = !this.showCreatePetForm;
  }

  ngOnInit(): void {
      this.currentPage$.subscribe({
        next: (page) => {
          console.log(page);
          this.petService.getAllPets(page - 1, this.size).subscribe({
            next: (response) => {
              this.elements.next(response.content);
              this.totalPages = response.totalPages;
            },
            error: (error) => {
              console.error(error);
            }
          });
        }
      });
  }

  handleCreatePet(pet: Pet): void {
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
