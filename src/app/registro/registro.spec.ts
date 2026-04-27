import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registro } from './registro';
import { FormsModule } from '@angular/forms'; // Para arreglar el error de ngModel
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para simular los servicios de clientes
import { RouterTestingModule } from '@angular/router/testing'; // Prevención para navegación futura

describe('Registro', () => {
  let component: Registro;
  let fixture: ComponentFixture<Registro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Registro],
      imports: [
        FormsModule,             // <--- IMPORTANTE: Esto quita el error de 'ngModel'
        HttpClientTestingModule, // <--- IMPORTANTE: Esto provee los servicios (Normal, Concurrente, Premium)
        RouterTestingModule      // <--- Buena práctica por si usas rutas
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Registro);
    component = fixture.componentInstance;

    // Forzamos la detección de cambios inicial para que Angular procese el HTML
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test adicional para verificar que el flujo de pasos funciona
  it('debería cambiar al paso 2 cuando los datos básicos están llenos', () => {
    component.datos = {
      nombre: 'Juan Perez',
      cedula: '12345',
      correo: 'juan@test.com',
      telefono: '300123',
      tipoCliente: '',
      contrasenia: ''
    };
    component.irAlPaso2();
    expect(component.paso).toBe(2);
  });
});
