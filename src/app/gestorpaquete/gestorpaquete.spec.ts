import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gestorpaquete } from './gestorpaquete';

describe('Gestorpaquete', () => {
  let component: Gestorpaquete;
  let fixture: ComponentFixture<Gestorpaquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gestorpaquete],
    }).compileComponents();

    fixture = TestBed.createComponent(Gestorpaquete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
