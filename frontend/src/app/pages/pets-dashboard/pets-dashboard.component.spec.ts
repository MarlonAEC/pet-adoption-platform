import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsDashboardComponent } from './pets-dashboard.component';

describe('PetsDashboardComponent', () => {
  let component: PetsDashboardComponent;
  let fixture: ComponentFixture<PetsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
