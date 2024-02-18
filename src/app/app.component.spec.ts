import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { mockRecipe } from '../mocks/mock-recipe';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [
        { 
          provide: ActivatedRoute,          
          useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: mockRecipe.recipes[0].id }) 
              }
          } 
        } 
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement.querySelector('.app-header-name');
    expect(compiled.textContent).toContain('Recipe app');
  });
});
