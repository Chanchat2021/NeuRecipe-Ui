import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() recipe!: any;
  @Output() onDelete = new EventEmitter<{ id: number }>();
  image!: any;
  isActive: boolean = false;
  constructor(private service: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.service.getImage(this.recipe.id).subscribe({
      next: (res) => {
        this.image = res;
      },
      error(error: HttpErrorResponse) {
        throw Error(error.message);
      },
    });
    this.disableButton();
  }
  delete() {
    this.service.deleteRecipe(this.recipe.id).subscribe({
      next: () => {
        alert(`Recipe Deleted :  ${this.recipe.title}`);
        this.onDelete.emit({ id: this.recipe.id });
      },
      error(error: HttpErrorResponse) {
        throw Error(`Something Went Wrong :  ${error.name}`);
      },
    });
  }
  edit() {
    this.router.navigateByUrl('/create-recipe', {
      state: {
        id: this.recipe.id,
        title: this.recipe.title,
        description: this.recipe.description,
        ingredients: this.recipe.ingredients,
        directions: this.recipe.directions,
        recipeTips: this.recipe.recipeTips,
        image: this.recipe.image,
        nutritionFacts: this.recipe.nutritionFacts,
        createdBy: this.recipe.createdBy,
      },
    });
  }
  disableButton() {
    if (this.recipe.createdBy == sessionStorage.getItem('email')) {
      this.isActive = true;
    }
  }
}
