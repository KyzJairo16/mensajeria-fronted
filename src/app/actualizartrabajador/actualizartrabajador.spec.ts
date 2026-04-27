import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actualizartrabajador } from './actualizartrabajador';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Actualizartrabajador', () => {
  let component: Actualizartrabajador;
  let fixture: ComponentFixture<Actualizartrabajador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Actualizartrabajador],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                // Simulamos que la URL es /actualizar/Administrador/1
                get: (key: string) => {
                  if (key === 'tipo') return 'Administrador';
                  if (key === 'id') return '1';
                  return null;
                }
              }
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Actualizartrabajador);
    component = fixture.componentInstance;

    // Espiamos el servicio de Administrador ya que es el 'tipo' por defecto en nuestro mock
    vi.spyOn(component['sAdmin'], 'getAdministradores').mockReturnValue(of({
      body: [{ id: 1, nombre: 'Admin Test', cedula: '123' }]
    } as any));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con el tipo e id de la ruta', () => {
    expect(component.tipo).toBe('Administrador');
    expect(component.id).toBe('1');
  });

  it('debería cargar los datos del modelo al iniciar', () => {
    // Al ser ID 1, el find() debería haber encontrado al admin del mock
    expect(component.modelo.nombre).toBe('Admin Test');
  });
});
