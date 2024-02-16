import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipiesService } from '../../services/recipies.service';
import { mockRecipe } from '../../../definitions/mock-recipe';
import { Recipe } from '../../../definitions/recipie';

@Component({
  selector: 'app-recipe-add',
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
  templateUrl: './recipe-add.component.html',
  styleUrl: './recipe-add.component.scss'
})
export class RecipeAddComponent {
  addForm!: FormGroup;

  constructor(private route: ActivatedRoute,private recipiesService: RecipiesService,private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      extendedIngredients: ['', Validators.required],
      instructions: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit() {
    const newRecipe = {
      ...mockRecipe.recipes[0],
      id: Math.floor(Math.random() * 1000),
      title: this.addForm.value.title,
      summary: this.addForm.value.summary,
      extendedIngredients: this.addForm.value.extendedIngredients.split('\n'),
      instructions: this.addForm.value.instructions.split('\n').join(''),
      image: this.addForm.value.image
    } as unknown as Recipe;
    this.recipiesService.addItem(newRecipe);
    console.log(newRecipe);
    this.router.navigate(['/']);
  } 
}
