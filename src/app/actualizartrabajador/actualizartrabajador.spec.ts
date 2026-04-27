import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actualizartrabajador } from './actualizartrabajador';

describe('Actualizartrabajador', () => {
  let component: Actualizartrabajador;
  let fixture: ComponentFixture<Actualizartrabajador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Actualizartrabajador],
    }).compileComponents();

    fixture = TestBed.createComponent(Actualizartrabajador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
