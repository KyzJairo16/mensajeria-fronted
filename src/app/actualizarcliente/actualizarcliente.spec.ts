import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { Actualizarpaquete } from '../actualizarpaquete/actualizarpaquete';

describe('Actualizarpaquete', () => {
  let component: Actualizarpaquete;
  let fixture: ComponentFixture<Actualizarpaquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Actualizarpaquete],
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

                get: (key: string) => (key === 'tipo' ? 'Carta' : '1')
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Actualizarpaquete);
    component = fixture.componentInstance;

    vi.spyOn(component['sCarta'], 'buscarPorId').mockReturnValue(of({ body: {} } as any));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar el tipo e id desde la URL', () => {
    expect(component.tipo).toBe('Carta');
    expect(component.id).toBe('1');
  });
});
