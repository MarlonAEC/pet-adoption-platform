import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Slide {
  src: string;
  alt: string;
  id: string;
}

@Component({
  selector: 'app-carousel-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-images.component.html',
  styleUrl: './carousel-images.component.css'
})
export class CarouselImagesComponent {
  @Input() slides: Slide[] = [];
  currentSlide: number = 0;
  @Output() currentSlideChange =  new EventEmitter<number>();
  private slideInterval: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.startAutoSlide();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.currentSlideChange.emit(this.currentSlide);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.currentSlideChange.emit(this.currentSlide);
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  clearAutoSlide() {
    if(this.slideInterval)
      clearInterval(this.slideInterval);
  }
}
