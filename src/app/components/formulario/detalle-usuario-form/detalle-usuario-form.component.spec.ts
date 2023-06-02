import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUsuarioFormComponent } from './detalle-usuario-form.component';

describe('DetalleUsuarioFormComponent', () => {
  let component: DetalleUsuarioFormComponent;
  let fixture: ComponentFixture<DetalleUsuarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleUsuarioFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleUsuarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
