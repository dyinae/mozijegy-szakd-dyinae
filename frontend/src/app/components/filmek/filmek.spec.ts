import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filmek } from './filmek';

describe('Filmek', () => {
  let component: Filmek;
  let fixture: ComponentFixture<Filmek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filmek],
    }).compileComponents();

    fixture = TestBed.createComponent(Filmek);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
