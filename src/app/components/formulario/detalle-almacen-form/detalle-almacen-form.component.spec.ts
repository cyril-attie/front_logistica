import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlmacenFormComponent } from './detalle-almacen-form.component';

describe('DetalleAlmacenFormComponent', () => {
  let component: DetalleAlmacenFormComponent;
  let fixture: ComponentFixture<DetalleAlmacenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAlmacenFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAlmacenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
