import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { CarsComponent } from './cars/cars.component';
import { EditComponent } from './edit/edit.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: '',
    component: CarsComponent
  },
  {
    path: 'review/:id',
    component: ReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
