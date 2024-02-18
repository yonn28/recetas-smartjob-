import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipiesService } from '../../services/recipies.service';
import { Recipe } from '../../../definitions/recipie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  id!: string;
  recipe!: Recipe;

  constructor(
      private route: ActivatedRoute,
      private recipiesService: RecipiesService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.recipe =this.recipiesService.getItem(+this.id) as Recipe;
  }


}