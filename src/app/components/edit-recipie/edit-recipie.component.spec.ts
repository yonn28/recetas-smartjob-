import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditRecipieComponent } from './edit-recipie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { mockRecipe } from '../../../mocks/mock-recipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RecipiesService } from '../../services/recipies.service';
import { MockRecipiesService } from '../../../mocks/mock-recipies.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditRecipieComponent', () => {
  let component: EditRecipieComponent;
  let fixture: ComponentFixture<EditRecipieComponent>;
  let recipeService:RecipiesService;
  let loader: HarnessLoader;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditRecipieComponent, 
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
    
    fixture = TestBed.createComponent(EditRecipieComponent);
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
  it('should submit the form to update', waitForAsync(async () => {

    const titleFormField = await getFormFieldByLabelText('Title');
    const summaryFormField = await getFormFieldByLabelText('Summary');
    const extendedIngredientsFormField = await getFormFieldByLabelText('Extended Ingredients');
    const instructionsFormField = await getFormFieldByLabelText('Instructions');

    await setFormFieldValue(titleFormField, 'New Recipe Title');
    await setFormFieldValue(summaryFormField, 'New Recipe Summary');
    await setFormFieldValue(extendedIngredientsFormField, 'Ingredient 1\nIngredient 2\nIngredient 3');
    await setFormFieldValue(instructionsFormField, 'Cooking instructions...');

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
    return await loader.getHarness(MatButtonHarness.with({ text: 'edit' }));
  }
  
});
