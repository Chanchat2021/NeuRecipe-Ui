import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/models/IRecipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  receivedData!: IRecipe[];
  recipeToDisplay!: IRecipe[];
  constructor(private service: RecipeService) {}
  ngOnInit(): void {
    this.service.getRecipes().subscribe({
      next: (response: IRecipe[]) => {
        this.receivedData = response;
        this.recipeToDisplay = this.receivedData;
      },
      error(error: HttpErrorResponse) {
        throw Error(error.message);
      },
    });
  }
  deleteHandler(recipeId: { id: number }) {
    for (let recipe of this.recipeToDisplay) {
      if (recipe.id == recipeId.id) {
        const index = this.recipeToDisplay.indexOf(recipe);
        this.recipeToDisplay.splice(index, 1);
      }
    }
  }
}
