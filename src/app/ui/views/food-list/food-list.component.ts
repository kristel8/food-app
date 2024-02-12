import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodService } from 'src/app/data/services/food.service';
import { FoodFormComponent } from '../food-form/food-form.component';
import { Food } from 'src/app/data/models';
import { ConfirmationDialogComponent } from '../../partials/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';
import { MessageDeleteFood } from 'src/app/base';

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
    this.openValidation(MessageDeleteFood.Title, MessageDeleteFood.Text).subscribe((resp) => {
      if (resp) {
        const listFoods = this.foods.filter((item) => item.id != id);
        localStorage.setItem('foods', JSON.stringify(listFoods));
        this.listFoods();
      }
    });
  }

  openFormDialog(data?: Food): void {
    this.dialog.open(FoodFormComponent, {
      data: data,
    }).afterClosed().subscribe(() => {
      this.listFoods();
    });
  }

  openValidation(title: string, text: string): Observable<any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: title,
        text: text,
      },
    }).afterClosed();
  }
}
