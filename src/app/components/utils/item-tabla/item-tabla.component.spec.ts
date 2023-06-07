import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTablaComponent } from './item-tabla.component';

describe('ItemTablaComponent', () => {
  let component: ItemTablaComponent;
  let fixture: ComponentFixture<ItemTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
