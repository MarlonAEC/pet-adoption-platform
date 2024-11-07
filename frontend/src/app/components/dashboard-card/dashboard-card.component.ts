import { Component, Input } from '@angular/core';
import { CountUpModule } from 'ngx-countup';
import { IconType } from '../../models/ui.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [CountUpModule, CommonModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() icon: IconType = IconType.DEFAULT;
  allIconTypes = IconType;
}
