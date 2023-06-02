import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePerfilFormComponent } from './detalle-perfil-form.component';

describe('DetallePerfilFormComponent', () => {
  let component: DetallePerfilFormComponent;
  let fixture: ComponentFixture<DetallePerfilFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePerfilFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePerfilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
