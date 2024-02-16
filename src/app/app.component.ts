import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Recipe } from '../definitions/recipie';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import { RecipiesService } from './services/recipies.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,MatToolbarModule,MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'movies-app';
  recipies = [] as Recipe[];

  constructor(
    private recipiesService: RecipiesService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.recipiesService.getRecipies();
  }

  addNavigate():void{
    this.router.navigate(['/add']);
  }
}
