import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Inicioadministrador } from './inicioadministrador';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdministradorService } from '../services/administrador.service';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('Inicioadministrador', () => {
  let component: Inicioadministrador;
  let fixture: ComponentFixture<Inicioadministrador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Inicioadministrador],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AdministradorService]
    }).compileComponents();

    fixture = TestBed.createComponent(Inicioadministrador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar las credenciales vacías', () => {
    expect(component.credenciales.usuario).toBe('');
    expect(component.credenciales.contrasenia).toBe('');
  });
});
