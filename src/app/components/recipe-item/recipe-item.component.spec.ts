import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemComponent } from './recipe-item.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { mockRecipe } from '../../../mocks/mock-recipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { MockRecipiesService } from '../../../mocks/mock-recipies.service';
import { RecipiesService } from '../../services/recipies.service';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;
  let recipeService:RecipiesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RecipeItemComponent,
        HttpClientTestingModule,
        CommonModule 
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
    
    fixture = TestBed.createComponent(RecipeItemComponent);
    recipeService = TestBed.inject(RecipiesService);
    component = fixture.componentInstance;
    recipeService.getRecipies();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
