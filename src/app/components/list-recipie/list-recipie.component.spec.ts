import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRecipieComponent } from './list-recipie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { mockRecipe } from '../../../mocks/mock-recipe';
import { RecipiesService } from '../../services/recipies.service';
import { MockRecipiesService } from '../../../mocks/mock-recipies.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


describe('ListRecipieComponent', () => {
  let component: ListRecipieComponent;
  let fixture: ComponentFixture<ListRecipieComponent>;
  let recipeService:RecipiesService;

  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListRecipieComponent,
        HttpClientTestingModule,
        CommonModule,
        MatIconModule, 
        RouterLink
      ],
      providers: [
        { 
          provide: ActivatedRoute,          
          useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: mockRecipe.recipes[0].id }) 
              }
          } 
        },
        {
          provide: RecipiesService,
          useClass: MockRecipiesService
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRecipieComponent);
    recipeService = TestBed.inject(RecipiesService);
    component = fixture.componentInstance;
    recipeService.getRecipies();
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteRecipe method when delete button is clicked', async () => {
    spyOn(component, 'deleteRecipe'); 

    let deleteBtn = fixture.nativeElement.querySelector('div.recipie-btns > mat-icon:nth-child(2)') as HTMLButtonElement; 
    deleteBtn.click();
    await fixture.detectChanges();

    expect(component.deleteRecipe).toHaveBeenCalledWith(mockRecipe.recipes[0].id);
  });
});
