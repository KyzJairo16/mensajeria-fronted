import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actualizarpaquete } from './actualizarpaquete';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Actualizarpaquete', () => {
  let component: Actualizarpaquete;
  let fixture: ComponentFixture<Actualizarpaquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Actualizarpaquete],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  const params: any = {
                    tipo: 'Carta',
                    id: '1'
                  };
                  return params[key];
                }
              }
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Actualizarpaquete);
    component = fixture.componentInstance;

    // MOCK DEL SERVICIO: Como en el ActivatedRoute pusimos 'Carta', espiamos ese servicio
    vi.spyOn(component['sCarta'], 'buscarPorId').mockReturnValue(of({ body: { id: 1, direccionDestino: 'Calle 1' } } as any));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar el modelo al iniciar', () => {
    expect(component.modelo.id).toBe(1);
    expect(component.tipo).toBe('Carta');
  });
});
