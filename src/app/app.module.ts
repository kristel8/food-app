import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './base/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { FoodCardComponent } from './ui/partials/food-card/food-card.component';
import { FoodFormComponent } from './ui/views/food-form/food-form.component';
import { FoodListComponent } from './ui/views/food-list/food-list.component';
import { ConfirmationDialogComponent } from './ui/partials/confirmation-dialog/confirmation-dialog.component';

const routes: Routes = [{ path: '', component: FoodListComponent }];

@NgModule({
  declarations: [
    AppComponent,
    FoodListComponent,
    FoodCardComponent,
    FoodFormComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
