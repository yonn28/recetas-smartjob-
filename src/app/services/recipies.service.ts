import { Injectable } from '@angular/core';
import { Recipe, RecipeService } from '../../definitions/recipie';
import { BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipiesService {

  private recipiesSubject = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient) { }

  getRecipies(){
    const recipiesStorage =localStorage.getItem('recipies');

    if(recipiesStorage){
      this.recipiesSubject.next(JSON.parse(recipiesStorage));
      return;
    }
    
    this.http.get<RecipeService>('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',{
      headers: {
        'X-RapidAPI-Key': '7ce1dae268msh5322cb6b341c755p114df9jsn6d348f726931',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      },
      params: {
        tags: 'vegetarian,dessert',
        number: '20'
      },
    }).subscribe({
      next: (res) => {
        this.recipiesSubject.next(res.recipes);
        localStorage.setItem('recipies', JSON.stringify(res.recipes));
      }
    });

  }


  recipies(){
    return this.recipiesSubject;
  }

  removeItem(index: number) {
    const currentItems = this.recipiesSubject.getValue();
    const updatedItems = currentItems.filter((itm) => itm.id !== index);
    this.recipiesSubject.next(updatedItems);
  }

  updateItem(index: number, newItem: Recipe) {
    const currentItems = this.recipiesSubject.getValue();
    const updatedItems = currentItems.map((item) => item.id === index ? newItem : item);
    this.recipiesSubject.next(updatedItems);
  }

  getItem(index: number) {
    const currentRecepies = this.recipiesSubject.getValue();
    const recipe = currentRecepies.find((itm) => itm.id == index);
    return recipe;
  }
  
  addItem(newItem: Recipe){
    const currentItems = this.recipiesSubject.getValue();
    currentItems.unshift(newItem);
    this.recipiesSubject.next(currentItems);
  }
}
