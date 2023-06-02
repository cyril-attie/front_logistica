import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePedidoFormComponent } from './detalle-pedido-form.component';

describe('DetallePedidoFormComponent', () => {
  let component: DetallePedidoFormComponent;
  let fixture: ComponentFixture<DetallePedidoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePedidoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePedidoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
