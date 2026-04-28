import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registro } from './registro';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('Registro', () => {
  let component: Registro;
  let fixture: ComponentFixture<Registro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Registro],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Registro);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
