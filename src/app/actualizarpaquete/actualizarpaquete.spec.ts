import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actualizarpaquete } from './actualizarpaquete';

describe('Actualizarpaquete', () => {
  let component: Actualizarpaquete;
  let fixture: ComponentFixture<Actualizarpaquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Actualizarpaquete],
    }).compileComponents();

    fixture = TestBed.createComponent(Actualizarpaquete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
