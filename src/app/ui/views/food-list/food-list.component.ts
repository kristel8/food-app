import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodService } from 'src/app/data/services/food.service';
import { FoodFormComponent } from '../food-form/food-form.component';
import { Food } from 'src/app/data/models';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent {
  foods$ = this.service.foods$;
  foods: Food[] = [];

  constructor(private service: FoodService, public dialog: MatDialog) {
    this.listFoods();
  }

  listFoods(): void {
    this.service.searchFood().subscribe((response) => {
      this.service._foods.next(response);
      this.foods = response;
    });
  }

  createItem(): void {
    this.openFormDialog();
  }

  updateList(): void {
    localStorage.clear();
    this.listFoods();
  }

  updateItem(id: string): void {
    const foodSelected = this.foods.find((item) => item.id === id);
    this.openFormDialog(foodSelected);
  }

  deleteItem(id: string): void {
    const listFoods = this.foods.filter((item) => item.id != id);
    localStorage.setItem('foods', JSON.stringify(listFoods));
    this.listFoods();
  }

  openFormDialog(data?: Food): void {
    const dialogRef = this.dialog.open(FoodFormComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listFoods();
    });
  }
}
