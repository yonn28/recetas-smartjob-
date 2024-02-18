import { Component, OnInit } from '@angular/core';
import { RecipiesService } from '../../services/recipies.service';
import { Recipe } from '../../../definitions/recipie';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-recipie',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './list-recipie.component.html',
  styleUrl: './list-recipie.component.scss'
})
export class ListRecipieComponent implements OnInit {

  recipies = [] as unknown as Observable<Recipe[]>;

  constructor(
    private recipiesService: RecipiesService,
  ){}
  
  ngOnInit(): void {
    this.recipies = this.recipiesService.recipies();
  }

  deleteRecipe(index: number):void{
    this.recipiesService.removeItem(index);
  }

}
