import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Gestorpaquete } from './gestorpaquete';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Gestorpaquete', () => {
  let component: Gestorpaquete;
  let fixture: ComponentFixture<Gestorpaquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gestorpaquete],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Gestorpaquete);
    component = fixture.componentInstance;

    // Espiamos los 3 servicios de paquetes para que ngOnInit -> recargarPaquetes() no falle
    vi.spyOn(component['paqueteAlimenticioService'], 'getPaquetesAlimenticios').mockReturnValue(of({ body: [] } as any));
    vi.spyOn(component['paqueteNoAlimenticioService'], 'getPaquetesNoAlimenticios').mockReturnValue(of({ body: [] } as any));
    vi.spyOn(component['paqueteCartaService'], 'getPaquetesCartas').mockReturnValue(of({ body: [] } as any));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería filtrar paquetes correctamente cuando cambia el filtro', () => {
    component.paquetes = [
      { id: 1, tipo: 'Carta' } as any,
      { id: 2, tipo: 'Alimenticio' } as any
    ];
    component.filtroActual = 'Carta';
    component.aplicarFiltro();
    expect(component.paquetesFiltrados.length).toBe(1);
    expect(component.paquetesFiltrados[0].tipo).toBe('Carta');
  });
});
