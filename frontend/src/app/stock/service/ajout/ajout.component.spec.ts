import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutStockComponent } from './ajout.component';

describe('AjoutDepotComponent', () => {
  let component: AjoutStockComponent;
  let fixture: ComponentFixture<AjoutStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
