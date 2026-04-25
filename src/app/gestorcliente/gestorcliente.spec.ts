import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gestorcliente } from './gestorcliente';

describe('Gestorcliente', () => {
  let component: Gestorcliente;
  let fixture: ComponentFixture<Gestorcliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gestorcliente],
    }).compileComponents();

    fixture = TestBed.createComponent(Gestorcliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
