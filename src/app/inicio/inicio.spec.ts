import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Inicio } from './inicio';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Inicio', () => {
  let component: Inicio;
  let fixture: ComponentFixture<Inicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Inicio],
      imports: [
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Inicio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería alternar el modo oscuro', () => {
    expect(component.modoOscuro).toBe(false);
    component.alternarModo();
    expect(component.modoOscuro).toBe(true);
    component.alternarModo();
    expect(component.modoOscuro).toBe(false);
  });
});
