import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { FormsModule } from '@angular/forms'; // Para [ngModel]
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Login],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar las credenciales vacías', () => {
    expect(component.credencial.cedula).toBe('');
    expect(component.credencial.pass).toBe('');
  });
});
