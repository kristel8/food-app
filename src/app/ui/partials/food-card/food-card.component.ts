import { Component, EventEmitter, Input, Output } from "@angular/core";
import { EMPTY_IMAGE } from "src/app/base";
import { Food } from "src/app/data/models";

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css'],
})
export class FoodCardComponent {
  @Input() data!: Food;
  @Output() updateEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  imageEmpty = EMPTY_IMAGE;

  updateItem(id: string): void {
    this.updateEvent.emit(id);
  }

  deleteItem(id: string): void {
    this.deleteEvent.emit(id);
  }
}
