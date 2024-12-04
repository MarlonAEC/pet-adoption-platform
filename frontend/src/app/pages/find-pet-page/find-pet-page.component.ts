import { Component, OnInit } from '@angular/core';
import { TypographyComponent } from '../../components/typography/typography.component';
import { FilterMenuComponent } from '../../components/filter-menu/filter-menu.component';
import { Pet } from '../../models/pet.model';
import { PetCardComponent } from '../../components/pet-card/pet-card.component';
import { SideFilterComponent } from "../../components/side-filter/side-filter.component";
import { FilterService } from '../../services/filter.service';
import { PetService } from '../../services/pet.service';
import { PageHandlerComponent } from '../../components/page-handler/page-handler.component';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-find-pet-page',
  standalone: true,
  imports: [TypographyComponent, FilterMenuComponent, PetCardComponent, SideFilterComponent, PageHandlerComponent],
  templateUrl: './find-pet-page.component.html',
  styleUrl: './find-pet-page.component.css'
})
export class FindPetPageComponent implements OnInit {
  pets: Pet[] = [];
  size: number = 12;
  totalPages: number = 0;

  private readonly currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(
    private readonly filterService: FilterService,
    private readonly petService: PetService,
  ) {}

  set currentPage(value: number) {
    this.currentPageSubject.next(value);
  }

  get currentPage(): number {
    return this.currentPageSubject.value;
  }

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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    combineLatest([
    this.filterService.currentFilterHash,
    this.currentPage$
  ]).subscribe(([hash, page]) => {
    this.fetchPets(hash);
  });
  }

  private fetchPets(hash: string): void {
    if(hash){
      if(this.filterService.isCurrentFilterEmpty()){
        this.petService.getAllPets(this.currentPage, this.size).subscribe({
          next: (response) => {
              this.pets = response.content;
              this.totalPages = response.totalPages;
          }
        });
      } else {
        this.petService.getPetsByFilter(hash, this.currentPage, this.size).subscribe({
          next: (response) => {
            this.pets = response.content;
            this.totalPages = response.totalPages;
          }
        }); 
      }
    }
  }
}
