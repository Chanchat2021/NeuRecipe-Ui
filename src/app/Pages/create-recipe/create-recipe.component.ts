import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateRecipe } from 'src/app/models/ICreateRecipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
})
export class CreateRecipeComponent implements OnInit {
  dataToEdit = {
    id: 0,
    title: '',
    description: '',
    ingredients: '',
    directions: '',
    recipeTips: '',
    image: '',
    nutritionFacts: '',
    createdBy: '',
  };
  receivedData: any;
  createRecipes: ICreateRecipe = {
    title: '',
    description: '',
    ingredients: '',
    directions: '',
    recipeTips: '',
    nutritionFacts: '',
    image: '',
    createdBy: '',
  };
  imageData: any;
  createRecipe = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required]],
    ingredients: ['', [Validators.required, Validators.minLength(10)]],
    directions: ['', [Validators.required]],
    recipeTips: ['', [Validators.required, Validators.minLength(10)]],
    image: [''],
    nutritionFacts: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: RecipeService
  ) {}

  ngOnInit(): void {
    this.receivedData = window.history.state;
    this.createRecipe.patchValue({
      title: this.receivedData.title,
      description: this.receivedData.description,
      ingredients: this.receivedData.ingredients,
      directions: this.receivedData.directions,
      recipeTips: this.receivedData.recipeTips,
      image: this.receivedData.image,
      nutritionFacts: this.receivedData.nutritionFacts,
    });
  }
  onSelect(selectEvent: any): void {
    if (selectEvent.target.files[0]) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(selectEvent.target.files[0]);
    }
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageData = reader.result;
  }

  submit() {
    console.log(this.createRecipe.value);
    if (this.receivedData.title) {
      this.dataToEdit.title = String(this.createRecipe.value.title);

      this.dataToEdit.createdBy = this.receivedData.createdBy;

      this.dataToEdit.id = this.receivedData.id;

      this.dataToEdit.description = String(this.createRecipe.value.description);

      this.dataToEdit.directions = String(this.createRecipe.value.directions);

      this.dataToEdit.image = String(this.createRecipe.value.image);
      this.dataToEdit.ingredients = String(this.createRecipe.value.ingredients);

      this.dataToEdit.nutritionFacts = String(
        this.createRecipe.value.nutritionFacts
      );

      this.dataToEdit.recipeTips = String(this.createRecipe.value.recipeTips);
      this.service.editRecipe(this.dataToEdit).subscribe({
        next: (res: any) => {
          alert('Recipe Edited successfully');

          this.router.navigate(['/home']);
        },

        error(error: HttpErrorResponse) {
          throw Error('Something went wrong');
        },
      });
    } else {
      this.createRecipe.value.image = this.imageData.split(',')[1];
      this.createRecipes.title = String(this.createRecipe.value.title);
      this.createRecipes.description = String(
        this.createRecipe.value.description
      );
      this.createRecipes.ingredients = String(
        this.createRecipe.value.ingredients
      );
      this.createRecipes.directions = String(
        this.createRecipe.value.directions
      );
      this.createRecipes.nutritionFacts = String(
        this.createRecipe.value.nutritionFacts
      );
      this.createRecipes.recipeTips = String(
        this.createRecipe.value.recipeTips
      );
      this.createRecipes.image = this.createRecipe.value.image;
      this.createRecipes.createdBy = sessionStorage.getItem('email');
      this.service.addRecipe(this.createRecipes).subscribe({
        next: (res: any) => {
          alert('Recipe added successfully');
          this.router.navigate(['/home']);
        },
        error(error: HttpErrorResponse) {
          throw Error('Something Went Wrong Please try again');
        },
      });
      this.createRecipe.reset();
    }
  }
}
