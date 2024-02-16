import { Routes } from '@angular/router';
import { ListRecipieComponent } from './components/list-recipie/list-recipie.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { EditRecipieComponent } from './components/edit-recipie/edit-recipie.component';
import { RecipeAddComponent } from './components/recipe-add/recipe-add.component';

export const routes: Routes = [
    {path:'', component: ListRecipieComponent},
    {path:'add', component: RecipeAddComponent},
    {path:'edit/:id', component: EditRecipieComponent},
    {path:'item/:id', component: RecipeItemComponent},
    {
      path: '**',
      redirectTo: '',
    },
];
