import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vetitesek } from './vetitesek';

describe('Vetitesek', () => {
  let component: Vetitesek;
  let fixture: ComponentFixture<Vetitesek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vetitesek],
    }).compileComponents();

    fixture = TestBed.createComponent(Vetitesek);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
