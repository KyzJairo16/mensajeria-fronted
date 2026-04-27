import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Gestoractualizar } from './gestoractualizar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Gestoractualizar', () => {
  let component: Gestoractualizar;
  let fixture: ComponentFixture<Gestoractualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Como es standalone: true, lo ponemos en imports, no en declarations
      imports: [
        Gestoractualizar,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  const params: any = {
                    categoria: 'paquete',
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

    fixture = TestBed.createComponent(Gestoractualizar);
    component = fixture.componentInstance;

    // Espiamos el servicio que se llamará según el tipo 'Carta' definido arriba
    vi.spyOn(component['sCarta'], 'buscarPorId').mockReturnValue(of({ body: {} } as any));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con los parámetros de la ruta', () => {
    expect(component.categoria).toBe('paquete');
    expect(component.tipo).toBe('Carta');
    expect(component.id).toBe('1');
  });
});
