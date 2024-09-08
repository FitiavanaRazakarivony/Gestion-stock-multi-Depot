import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProduitComponent } from './ajout.component';

describe('AjoutDepotComponent', () => {
  let component: AjoutProduitComponent;
  let fixture: ComponentFixture<AjoutProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutProduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
