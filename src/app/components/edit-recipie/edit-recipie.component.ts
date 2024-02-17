import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipiesService } from '../../services/recipies.service';
import { Recipe } from '../../../definitions/recipie';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-recipie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-recipie.component.html',
  styleUrl: './edit-recipie.component.scss'
})
export class EditRecipieComponent implements OnInit {

  id!: string;
  recipe!: Recipe;
  editForm!: FormGroup;

  constructor(private route: ActivatedRoute,private recipiesService: RecipiesService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.recipe =this.recipiesService.getItem(+this.id) as Recipe;
    this.editForm = this.formBuilder.group({
      title: [this.recipe.title, Validators.required],
      summary: [this.recipe.summary, Validators.required],
      extendedIngredients: [this.formatExtendedIngredients(this.recipe.extendedIngredients), Validators.required],
      instructions: [this.recipe.instructions, Validators.required]
    });
  }

  formatExtendedIngredients(extendedIngredients: any[]): string {
    return extendedIngredients.map(ingredient => {
      const formattedAisle = ingredient.aisle ? `(${ingredient.aisle})` : ''; 
      return `${ingredient.name} ${formattedAisle}`;
    }).join('\n');
  }

  onSubmit() {
    const extendedIngredientsArray = this.editForm.value.extendedIngredients.split('\n');
    const extendedIngredientsFormatted = extendedIngredientsArray.map((ingredient:string, index:number) => {
      const aisleMatch = ingredient.match(/\(([^)]+)\)/); 
      const aisle = aisleMatch ? aisleMatch[1] : ''; 
      const name = ingredient.replace(/\([^)]+\)/, '').trim(); 
  
      return {
        id: index,
        aisle: aisle, 
        image: '', 
        consistency: '', 
        name: name
      };
    });

    const updatedRecipe = {
      ...this.recipe, 
      title: this.editForm.value.title,
      summary:this.editForm.value.summary,
      extendedIngredients:extendedIngredientsFormatted ,
      instructions:this.editForm.value.instructions
    };
    this.recipiesService.updateItem(+this.id, updatedRecipe);
    this.router.navigate(['/']);
  } 
  

}
