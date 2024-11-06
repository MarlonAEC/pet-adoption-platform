import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePetModalComponent } from './create-pet-modal.component';

describe('CreatePetModalComponent', () => {
  let component: CreatePetModalComponent;
  let fixture: ComponentFixture<CreatePetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePetModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
