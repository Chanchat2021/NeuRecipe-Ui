import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipe } from '../models/IRecipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpClient: HttpClient) {}
  getRecipes() {
    return this.httpClient.get<IRecipe[]>('http://localhost:7262/api/Recipe');
  }
  getImage(id: string) {
    return this.httpClient.get(`http://localhost:7262/api/Recipe/Image/${id}`);
  }
  addRecipe(data: any) {
    return this.httpClient.post('http://localhost:7262/api/Recipe', data, {
      responseType: 'text',
    });
  }
  editRecipe(data: any) {
    return this.httpClient.put('http://localhost:7262/api/Recipe', data, {
      responseType: 'text',
    });
  }
  deleteRecipe(id: number) {
    return this.httpClient.delete(`http://localhost:7262/api/Recipe?id=${id}`, {
      responseType: 'text',
    });
  }
}
