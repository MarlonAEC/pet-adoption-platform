import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-page-handler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-handler.component.html',
  styleUrl: './page-handler.component.css'
})
export class PageHandlerComponent implements OnInit, OnChanges {
  @Input({required: true}) totalPages: number = 1;
  @Input({required: true}) currentPage: number = 1;
  @Output() incrementPage = new EventEmitter<void>();
  @Output() decrementPage = new EventEmitter<void>();
  @Output() navigateToPage = new EventEmitter<number>();
  buttonsToRender: string[] = [];

  generateButtons(): void {
    this.buttonsToRender = [];
    if(this.totalPages <= 5){
      for(let i = 1; i <= this.totalPages; i++){
        this.buttonsToRender.push(i.toString());
      }
    } else {
      if (this.currentPage > 3) {
        this.buttonsToRender.push("<<");
        this.buttonsToRender.push("<");
      }
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          this.buttonsToRender.push(i.toString());
        }
        this.buttonsToRender.push(">");
        this.buttonsToRender.push(">>");
      } else if (this.currentPage >= this.totalPages - 2) {
        for (let i = this.totalPages - 2; i <= this.totalPages; i++) {
          this.buttonsToRender.push(i.toString());
        }
      } else {
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          this.buttonsToRender.push(i.toString());
        }
        this.buttonsToRender.push(">");
        this.buttonsToRender.push(">>");
      }
  }}

  ngOnInit(): void {
    this.generateButtons();
    this.currentPage = 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['currentPage'] || changes['totalPages']){
      this.generateButtons();
    }
  }

  onIncrementPage(): void {
    this.incrementPage.emit();
  }

  onDecrementPage(): void {
    this.decrementPage.emit();
  }

  onNavigateToPage(page: number): void {
    this.navigateToPage.emit(page);
  }
}
