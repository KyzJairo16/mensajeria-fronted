import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { FormsModule } from '@angular/forms'; // Para [ngModel]
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para los servicios de cliente
import { RouterTestingModule } from '@angular/router/testing'; // Para el inject(Router) y routerLink

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Login],
      imports: [
        FormsModule,             // Arregla el error de los inputs
        HttpClientTestingModule, // Simula las llamadas a la base de datos de los clientes
        RouterTestingModule      // Arregla el error del Router y los botones con routerLink
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta la detección de cambios inicial
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar las credenciales vacías', () => {
    expect(component.credencial.cedula).toBe('');
    expect(component.credencial.pass).toBe('');
  });
});
