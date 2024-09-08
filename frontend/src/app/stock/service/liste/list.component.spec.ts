import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeStockComponent } from './list.component';

describe('AjoutDepotComponent', () => {
  let component: ListeStockComponent;
  let fixture: ComponentFixture<ListeStockComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
