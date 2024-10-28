import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFilterComponent } from './details-filter.component';

describe('DetailsFilterComponent', () => {
  let component: DetailsFilterComponent;
  let fixture: ComponentFixture<DetailsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
