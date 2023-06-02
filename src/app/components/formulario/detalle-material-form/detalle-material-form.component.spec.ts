import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMaterialFormComponent } from './detalle-material-form.component';

describe('DetalleMaterialFormComponent', () => {
  let component: DetalleMaterialFormComponent;
  let fixture: ComponentFixture<DetalleMaterialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleMaterialFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleMaterialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
