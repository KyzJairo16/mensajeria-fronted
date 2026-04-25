import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gestortrabajador } from './gestortrabajador';

describe('Gestortrabajador', () => {
  let component: Gestortrabajador;
  let fixture: ComponentFixture<Gestortrabajador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gestortrabajador],
    }).compileComponents();

    fixture = TestBed.createComponent(Gestortrabajador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
