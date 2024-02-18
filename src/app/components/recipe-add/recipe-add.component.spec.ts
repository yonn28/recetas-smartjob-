import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeAddComponent } from './recipe-add.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterTestingModule } from '@angular/router/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RecipiesService } from '../../services/recipies.service';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { mockRecipe } from '../../../mocks/mock-recipe';
import { MockRecipiesService } from '../../../mocks/mock-recipies.service';

describe('RecipeAddComponent', () => {
  let component: RecipeAddComponent;
  let fixture: ComponentFixture<RecipeAddComponent>;
  let recipeService:RecipiesService;
  let loader: HarnessLoader;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RecipeAddComponent, 
        HttpClientTestingModule, 
        NoopAnimationsModule,
        HttpClientTestingModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        NoopAnimationsModule,
        RouterTestingModule
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
    
    fixture = TestBed.createComponent(RecipeAddComponent);
    recipeService = TestBed.inject(RecipiesService);
    component = fixture.componentInstance;
    recipeService.getRecipies();
    loader = TestbedHarnessEnvironment.loader(fixture);
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form to add', waitForAsync(async () => {

    const titleFormField = await getFormFieldByLabelText('Title');
    const summaryFormField = await getFormFieldByLabelText('Summary');
    const extendedIngredientsFormField = await getFormFieldByLabelText('Extended Ingredients');
    const instructionsFormField = await getFormFieldByLabelText('Instructions');
    const imageURL = await getFormFieldByLabelText('Image URL');

    await setFormFieldValue(titleFormField, 'New Recipe Title');
    await setFormFieldValue(summaryFormField, 'New Recipe Summary');
    await setFormFieldValue(extendedIngredientsFormField, 'Ingredient 1\nIngredient 2\nIngredient 3');
    await setFormFieldValue(instructionsFormField, 'Cooking instructions...');
    await setFormFieldValue(imageURL, 'http://my-image.com');

    const submitButton = await getSubmitButton();
    await submitButton.click();

    await fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  }));

  async function getFormFieldByLabelText(labelText: string): Promise<MatFormFieldHarness> {
    const formFields = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: labelText}));
    return formFields;
  }

  async function setFormFieldValue(formField: MatFormFieldHarness, value: string): Promise<void> {
    const input = await formField.getControl(MatInputHarness);
    await input!.setValue(value);
  }

  async function getSubmitButton(): Promise<MatButtonHarness> {
    return await loader.getHarness(MatButtonHarness.with({ text: 'Add' }));
  }
});
