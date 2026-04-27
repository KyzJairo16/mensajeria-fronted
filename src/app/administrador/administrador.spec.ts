import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Administrador } from './administrador';
import { RouterTestingModule } from '@angular/router/testing';

describe('Administrador', () => {
  let component: Administrador;
  let fixture: ComponentFixture<Administrador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Administrador],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Administrador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
