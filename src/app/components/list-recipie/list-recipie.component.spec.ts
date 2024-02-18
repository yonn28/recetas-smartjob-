import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRecipieComponent } from './list-recipie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router, RouterLink, convertToParamMap } from '@angular/router';
import { mockRecipe } from '../../../mocks/mock-recipe';
import { RecipiesService } from '../../services/recipies.service';
import { MockRecipiesService } from '../../../mocks/mock-recipies.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatIconHarness } from '@angular/material/icon/testing';

describe('ListRecipieComponent', () => {
  let component: ListRecipieComponent;
  let fixture: ComponentFixture<ListRecipieComponent>;
  let recipeService:RecipiesService;
  let loader: HarnessLoader;
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
    loader = TestbedHarnessEnvironment.loader(fixture);
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteRecipe method when delete button is clicked', async () => {
    spyOn(component, 'deleteRecipe'); 

    const deleteButton = await loader.getHarness(MatIconHarness.with({ name: 'delete' })); 
    const deleteButtonElement = await deleteButton.host(); 
    await deleteButtonElement.click(); 

    await fixture.detectChanges();

    expect(component.deleteRecipe).toHaveBeenCalledWith(mockRecipe.recipes[0].id);
  });
});
