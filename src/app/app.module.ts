import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { CarsComponent } from './cars/cars.component';
import { AddComponent } from './add/add.component';
import { CarComponent } from './cars/car/car.component';
import { HeaderComponent } from './header/header.component';
import { environment } from 'src/environments/environment';
import { EditComponent } from './edit/edit.component';
import { ReviewComponent } from './review/review.component';
import { HttpClientModule } from '@angular/common/http';
import { ReviewsComponent } from './reviews/reviews.component';


@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    AddComponent,
    CarComponent,
    HeaderComponent,
    EditComponent,
    ReviewComponent,
    ReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
