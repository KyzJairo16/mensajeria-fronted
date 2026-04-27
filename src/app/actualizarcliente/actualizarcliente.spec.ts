import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actualizarcliente } from './actualizarcliente';

describe('Actualizarcliente', () => {
  let component: Actualizarcliente;
  let fixture: ComponentFixture<Actualizarcliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Actualizarcliente],
    }).compileComponents();

    fixture = TestBed.createComponent(Actualizarcliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
