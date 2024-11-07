import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { ApplicationService } from '../../services/application.service';
import { AdoptionApplication } from '../../models/applicaiton.model';
import { BehaviorSubject } from 'rxjs';
import { PageHandlerComponent } from "../../components/page-handler/page-handler.component";

@Component({
  selector: 'app-applications-dashboard',
  standalone: true,
  imports: [TableComponent, PageHandlerComponent],
  templateUrl: './applications-dashboard.component.html',
  styleUrl: './applications-dashboard.component.css'
})
export class ApplicationsDashboardComponent implements OnInit {
  private readonly currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();
  elements = new BehaviorSubject<AdoptionApplication[]>([]);
  size: number = 12;
  totalPages: number = 0;

  set currentPage(value: number) {
    this.currentPageSubject.next(value);
  }

  get currentPage(): number {
    return this.currentPageSubject.value;
  }

  constructor(private readonly applicationService: ApplicationService) { }
  
  ngOnInit(): void {
    try{
      this.currentPage$.subscribe({
        next: (page) => {
          this.applicationService.fetchApplications(page - 1, this.size).subscribe({
            next: (page) => {
              this.elements.next(page.content);
              this.totalPages = page.totalPages;
            },
            error: (error) => {
              console.error(error);
            }
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleMainAction(application: AdoptionApplication): void {
    this.applicationService.approveApplication(application).subscribe({
      next: () => {
        alert("Application approved successfully!");
        this.applicationService.fetchApplications();
      },
      error: (error) => {
        console.error(error);
      }
    })
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

  handleSecondaryAction(application: AdoptionApplication): void {
    console.log("🚀 ~ ApplicationsDashboardComponent ~ handleSecondaryAction ~ application", application);
  }
}
