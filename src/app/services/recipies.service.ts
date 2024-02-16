import { Injectable } from '@angular/core';
import { Recipe, RecipeService } from '../../definitions/recipie';
import { BehaviorSubject, of } from 'rxjs';
import { mockRecipe } from '../../definitions/mock-recipe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipiesService {

  recipiesSubject = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient) { }

  getRecipies(){
        // this.http.get<RecipeService>('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',{
    //   headers: {
    //     'X-RapidAPI-Key': '7ce1dae268msh5322cb6b341c755p114df9jsn6d348f726931',
    //     'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    //   },
    //   params: {
    //     tags: 'vegetarian,dessert',
    //     number: '20'
    //   },
    // }).subscribe({
    //   next: (res) => {
    //     this.recipies = res.recipes;
    //   }
    // });

    of<RecipeService>(mockRecipe as RecipeService).subscribe({
      next: (res) => {
        this.recipiesSubject.next(res.recipes);
      }
    })
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
    currentItems.push(newItem);
    this.recipiesSubject.next(currentItems);
  }
}
