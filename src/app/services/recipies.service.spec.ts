import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecipiesService } from './recipies.service';
import { mockRecipe } from '../../mocks/mock-recipe';
import { Recipe  } from '../../definitions/recipie';

describe('RecipiesService', () => {
  let service: RecipiesService;
  let httpTestingController: HttpTestingController;
  let mockRecipes = mockRecipe.recipes as unknown as Recipe[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(RecipiesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch recipes when localstorage is empty', fakeAsync(() => {
    localStorage.clear();
    service.getRecipies();
  
    const req = httpTestingController.expectOne(request =>
      request.method === 'GET' &&
      request.url === 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random' &&
      request.params.get('tags') === 'vegetarian,dessert' &&
      request.params.get('number') === '20'
    );
  
    req.flush({ recipes: mockRecipes });
  
    tick(); 
  
    expect(service.recipies().getValue()).toEqual(mockRecipes);
    expect(localStorage.getItem('recipies')).toEqual(JSON.stringify(mockRecipes));
  }));

  it('should fetch recipes from localStorage if available', fakeAsync(() => {
    
    localStorage.setItem('recipies', JSON.stringify(mockRecipes));
  
    service.getRecipies();
  
    tick(); 
  
    expect(service.recipies().getValue()).toEqual(mockRecipes);
  }));

  it('should add a recipe', () => {

    service.addItem(mockRecipes[0] as unknown as Recipe);

    expect(service.recipies().getValue()).toContain(mockRecipes[0]);
  });

  it('should remove a recipe', () => {

    service.addItem(mockRecipes[0]);

    service.removeItem(1);

    expect(service.recipies().getValue().length).toEqual(1);
    expect(service.recipies().getValue().find(recipe => recipe.id === 1)).toBeFalsy();
  });

  it('should update a recipe', () => {
    
    service.addItem(mockRecipes[0]);
    const updatedRecipe = {
      ...mockRecipes[0],
      title: "test"
    };

    service.updateItem(mockRecipes[0].id, updatedRecipe);

    expect(service.recipies().getValue().find(recipe => recipe.id === mockRecipes[0].id)).toEqual(updatedRecipe);
  });

  it('should get a recipe', () => {
    
    service.addItem(mockRecipes[0]);

    const recipe = service.getItem(mockRecipes[0].id);

    expect(recipe).toEqual(mockRecipes[0]);
  });
});
