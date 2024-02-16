import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecipieComponent } from './list-recipie.component';

describe('ListRecipieComponent', () => {
  let component: ListRecipieComponent;
  let fixture: ComponentFixture<ListRecipieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRecipieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRecipieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
