import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Gestortrabajador } from './gestortrabajador';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Gestortrabajador', () => {
  let component: Gestortrabajador;
  let fixture: ComponentFixture<Gestortrabajador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gestortrabajador],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA] // Para ignorar los iconos de FontAwesome y errores de template
    }).compileComponents();

    fixture = TestBed.createComponent(Gestortrabajador);
    component = fixture.componentInstance;

    // MOCK DE LOS 3 SERVICIOS: Esto evita que ngOnInit falle al intentar cargar las listas
    vi.spyOn(component['administradorService'], 'getAdministradores').mockReturnValue(of({ body: [] } as any));
    vi.spyOn(component['conductorService'], 'getConductores').mockReturnValue(of({ body: [] } as any));
    vi.spyOn(component['manipuladorService'], 'getManipuladores').mockReturnValue(of({ body: [] } as any));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería calcular las iniciales correctamente', () => {
    const iniciales = component.getIniciales('Carlos Perez');
    expect(iniciales).toBe('CP');
  });

  it('debería devolver el tipo de texto correcto para Manipulador', () => {
    const texto = component.getTipoTexto('Manipulador');
    expect(texto).toBe('Manipulador de Paquete');
  });
});
