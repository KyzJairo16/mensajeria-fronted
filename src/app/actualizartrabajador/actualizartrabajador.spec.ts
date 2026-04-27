import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actualizartrabajador } from './actualizartrabajador';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest'; // Imprescindible para Vitest

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
                // Simulamos que estamos editando un Administrador con ID 1
                get: (key: string) => (key === 'tipo' ? 'Administrador' : '1')
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Actualizartrabajador);
    component = fixture.componentInstance;

    // Mockeamos la respuesta del servicio para que cargarDatos() no de error
    // Usamos 'as any' para evitar el lío de tipos con HttpResponse
    vi.spyOn(component['sAdmin'], 'getAdministradores').mockReturnValue(of({ body: [] } as any));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con el tipo e id de la ruta', () => {
    expect(component.tipo).toBe('Administrador');
    expect(component.id).toBe('1');
  });
});
