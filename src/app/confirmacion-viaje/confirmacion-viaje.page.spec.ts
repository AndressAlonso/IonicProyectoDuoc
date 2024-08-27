import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacionViajePage } from './confirmacion-viaje.page';

describe('ConfirmacionViajePage', () => {
  let component: ConfirmacionViajePage;
  let fixture: ComponentFixture<ConfirmacionViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
