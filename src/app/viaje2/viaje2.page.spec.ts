import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Viaje2Page } from './viaje2.page';

describe('Viaje2Page', () => {
  let component: Viaje2Page;
  let fixture: ComponentFixture<Viaje2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Viaje2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
