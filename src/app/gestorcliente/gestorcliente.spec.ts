import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Gestorcliente } from './gestorcliente';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Gestorcliente', () => {
  let component: Gestorcliente;
  let fixture: ComponentFixture<Gestorcliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gestorcliente],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora errores de iconos o componentes extra
    }).compileComponents();

    fixture = TestBed.createComponent(Gestorcliente);
    component = fixture.componentInstance;

    // Mockeamos los 3 servicios de clientes para que recargarClientes() funcione al iniciar
    vi.spyOn(component['clienteNormalService'], 'getClientesNormales').mockReturnValue(of({ body: [] } as any));
    vi.spyOn(component['clienteConcurrenteService'], 'getClientesConcurrentes').mockReturnValue(of({ body: [] } as any));
    vi.spyOn(component['clientePremiumService'], 'getClientesPremium').mockReturnValue(of({ body: [] } as any));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con la lista de clientes vacía y cargando en false', () => {
    expect(component.clientes.length).toBe(0);
    expect(component.cargando).toBe(false);
  });

  it('debería generar iniciales correctamente', () => {
    const iniciales = component.getIniciales('Juan Perez');
    expect(iniciales).toBe('JP');
  });
});
