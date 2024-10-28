import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperamentFilterComponent } from './temperament-filter.component';

describe('TemperamentFilterComponent', () => {
  let component: TemperamentFilterComponent;
  let fixture: ComponentFixture<TemperamentFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperamentFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperamentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
