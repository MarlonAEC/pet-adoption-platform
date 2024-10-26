import { Component } from '@angular/core';
import { TypographyComponent } from '../../components/typography/typography.component';
import { FilterMenuComponent } from '../../components/filter-menu/filter-menu.component';

@Component({
  selector: 'app-find-pet-page',
  standalone: true,
  imports: [TypographyComponent, FilterMenuComponent],
  templateUrl: './find-pet-page.component.html',
  styleUrl: './find-pet-page.component.css'
})
export class FindPetPageComponent {

}
