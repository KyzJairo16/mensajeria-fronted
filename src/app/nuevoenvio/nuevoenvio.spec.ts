import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nuevoenvio } from './nuevoenvio';

describe('Nuevoenvio', () => {
  let component: Nuevoenvio;
  let fixture: ComponentFixture<Nuevoenvio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Nuevoenvio],
    }).compileComponents();

    fixture = TestBed.createComponent(Nuevoenvio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
