import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCamionFormComponent } from './detalle-camion-form.component';

describe('DetalleCamionFormComponent', () => {
  let component: DetalleCamionFormComponent;
  let fixture: ComponentFixture<DetalleCamionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCamionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCamionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
