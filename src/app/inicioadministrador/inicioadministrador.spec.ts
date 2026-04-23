import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inicioadministrador } from './inicioadministrador';

describe('Inicioadministrador', () => {
  let component: Inicioadministrador;
  let fixture: ComponentFixture<Inicioadministrador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Inicioadministrador],
    }).compileComponents();

    fixture = TestBed.createComponent(Inicioadministrador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
