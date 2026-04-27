import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gestoractualizar } from './gestoractualizar';

describe('Gestoractualizar', () => {
  let component: Gestoractualizar;
  let fixture: ComponentFixture<Gestoractualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gestoractualizar],
    }).compileComponents();

    fixture = TestBed.createComponent(Gestoractualizar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
