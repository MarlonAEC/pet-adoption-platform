import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IntlRelativeTimePipe } from 'angular-ecmascript-intl';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [IntlRelativeTimePipe, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  @Input() elements = new BehaviorSubject<any[]>([]);
  @Output() handleMainAction = new EventEmitter();
  @Output() handleSecondaryAction = new EventEmitter();
  headElements: string[] = [];
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.elements.subscribe(data => {
      if (data.length > 0) {
        this.headElements = Object.keys(data[0]);
      } else {
        this.headElements = [];
      }
    });
  }

  mainAction(index: number) {
    this.handleMainAction.emit(this.elements.getValue()[index]);
  }

  secondaryAction(index: number) {
    this.handleSecondaryAction.emit(this.elements.getValue()[index]);
  }
}
