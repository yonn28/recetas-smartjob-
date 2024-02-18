import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Recipe } from '../definitions/recipie';
import { mockRecipe } from './mock-recipe';

@Injectable({
  providedIn: 'root'
})
export class MockRecipiesService {

  private recipiesSubject = new BehaviorSubject<Recipe[]>([]);

  constructor() { }

  getRecipies(){
    let mockRecipes = mockRecipe.recipes as unknown as Recipe[];
    this.recipiesSubject.next(mockRecipes);
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
