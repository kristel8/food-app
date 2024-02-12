import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FormFieldName } from 'src/app/base/form-field-name.enum';
import { Food } from '../models/food.model';
import { EMPTY_VALUE } from 'src/app/base';
import { URL_SEARCH_FOOD } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  apiUrl = environment.apiUrl;

  _foods = new BehaviorSubject<Food[]>([]);
  get foods$(): Observable<Food[]> {
    return this._foods.asObservable();
  }

  constructor(private http: HttpClient) {}

  searchFood(param: string = EMPTY_VALUE): Observable<Food[]> {
    const url = this.apiUrl + URL_SEARCH_FOOD;
    const listFoodStorage = localStorage.getItem('foods');
    if (listFoodStorage) return of(JSON.parse(listFoodStorage));

    return this.http.get<any>(`${url}?query=${param}`).pipe(
      map((response) => response.results),
      tap((foods) => this.updateStoreFood(foods))
    );
  }

  createFood(food: Food): void {
    const listFoods = this._foods.value;

    const newItem = {
      id: Math.random().toString(),
      [FormFieldName.Image]: food.image,
      [FormFieldName.Title]: food.title,
      [FormFieldName.Price]: food.price ?? 0,
    };

    listFoods.unshift(newItem);
    this.updateStoreFood(listFoods);
  }

  updateFood(id: string, food: Food): void {
    const listFoods = this._foods.value as Food[];

    listFoods.map((item) => {
      if (item.id === id) {
        item.image = food.image;
        item.title = food.title;
        item.price = food.price;
      }
    });

    this.updateStoreFood(listFoods);
  }

  updateStoreFood(listFoods: Food[]): void {
    this._foods.next(listFoods);
    localStorage.setItem('foods', JSON.stringify(listFoods));
  }
}
