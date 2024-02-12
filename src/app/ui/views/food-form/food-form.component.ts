import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CREATE_FORM,
  EDIT_FORM,
  EMPTY_IMAGE,
  FormFieldName,
  NULL_VALUE,
} from 'src/app/base';
import { Food } from 'src/app/data/models';
import { FoodService } from 'src/app/data/services/food.service';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css'],
})
export class FoodFormComponent {
  image = EMPTY_IMAGE;
  titleForm = CREATE_FORM;

  form = this.fb.group({
    [FormFieldName.Image]: [NULL_VALUE, [Validators.required]],
    [FormFieldName.Title]: [NULL_VALUE, [Validators.required]],
    [FormFieldName.Price]: [NULL_VALUE, [Validators.required]],
  });

  get imageCtrl(): AbstractControl {
    return this.form.controls[FormFieldName.Image];
  }

  get titleCtrl(): AbstractControl {
    return this.form.controls[FormFieldName.Title];
  }

  get priceCtrl(): AbstractControl {
    return this.form.controls[FormFieldName.Price];
  }

  constructor(
    private fb: UntypedFormBuilder,
    private service: FoodService,
    public dialogRef: MatDialogRef<FoodFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food
  ) {
    this.loadFoodData();
  }

  loadFoodData(): void {
    if (this.data) {
      const { image, title, price } = this.data;

      this.titleForm = EDIT_FORM;
      this.form.patchValue({
        [FormFieldName.Image]: image,
        [FormFieldName.Title]: title,
        [FormFieldName.Price]: price,
      });
      this.uploadImage();
    }
  }

  uploadImage(): void {
    if (this.imageCtrl.invalid) {
      this.imageCtrl.markAllAsTouched();
      return;
    }

    this.image = this.imageCtrl.value;
  }

  saveItem(): void {
    if (this.form.invalid) return;

    if (this.data) {
      this.service.updateFood(this.data.id, this.form.value);
      this.closeDialog();
      return;
    }

    this.service.createFood(this.form.value);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
