import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCategoriasFormComponent } from './detalle-categorias-form.component';

describe('DetalleCategoriasFormComponent', () => {
  let component: DetalleCategoriasFormComponent;
  let fixture: ComponentFixture<DetalleCategoriasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCategoriasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCategoriasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
