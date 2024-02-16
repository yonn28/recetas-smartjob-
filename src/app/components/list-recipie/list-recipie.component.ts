import { Component, OnInit } from '@angular/core';
import { RecipiesService } from '../../services/recipies.service';
import { Recipe } from '../../../definitions/recipie';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-recipie',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './list-recipie.component.html',
  styleUrl: './list-recipie.component.scss'
})
export class ListRecipieComponent implements OnInit {

  recipies = [] as Recipe[];

  constructor(
    private recipiesService: RecipiesService,
  ){}
  
  ngOnInit(): void {
    this.recipiesService.recipies().subscribe({
      next:(recipies)=>{
        this.recipies=recipies;
      }
    });
  }

  deleteRecipe(index: number):void{
    this.recipiesService.removeItem(index);
  }

}
