import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPetPageComponent } from './find-pet-page.component';

describe('FindPetPageComponent', () => {
  let component: FindPetPageComponent;
  let fixture: ComponentFixture<FindPetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindPetPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindPetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
