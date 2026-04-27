import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nuevoenvio } from './nuevoenvio';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { vi } from 'vitest';

describe('Nuevoenvio', () => {
  let component: Nuevoenvio;
  let fixture: ComponentFixture<Nuevoenvio>;

  beforeEach(async () => {
    // Simulamos un usuario en localStorage para que idCliente no de error
    const mockUser = JSON.stringify({ id: 123 });
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(mockUser);

    await TestBed.configureTestingModule({
      declarations: [Nuevoenvio],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Nuevoenvio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con el tipo de paquete alimenticio por defecto', () => {
    expect(component.tipoSeleccionado).toBe('alimenticio');
  });

  it('debería mostrar error si no se completa la dirección', () => {
    component.paquete.ciudadDestino = 'Bogotá';
    component.paquete.direccionDestino = '';
    component.guardarEnvio();
    expect(component.mensajeError).toBe('Por favor completa la ciudad y dirección de destino.');
  });
});
