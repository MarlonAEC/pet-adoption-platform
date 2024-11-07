import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { TableComponent } from "../../components/table/table.component";
import { ApplicationService } from '../../services/application.service';
import { AdoptionApplication } from '../../models/applicaiton.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-applications-dashboard',
  standalone: true,
  imports: [ButtonComponent, TableComponent],
  templateUrl: './applications-dashboard.component.html',
  styleUrl: './applications-dashboard.component.css'
})
export class ApplicationsDashboardComponent implements OnInit {
  constructor(private readonly applicationService: ApplicationService) { }
  elements = new BehaviorSubject<AdoptionApplication[]>([]);
  ngOnInit(): void {
    try{
      this.applicationService.fetchApplications().subscribe({
        next: (data) => {
          this.elements.next(data.content);
        },
      })
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

  handleSecondaryAction(application: AdoptionApplication): void {
    console.log("🚀 ~ ApplicationsDashboardComponent ~ handleSecondaryAction ~ application", application);
  }
}
