import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CarsComponent } from '../cars/cars.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  img: string = '';

  constructor(private router: Router, private store: AngularFirestore) {}

  ngOnInit(): void {}

  addCar() {
    let db = this.store.collection('cars');
    let name = (<HTMLInputElement>document.getElementById('carName')).value;
    let cost = +(<HTMLInputElement>document.getElementById('carCost')).value;
    let type = (<HTMLInputElement>document.getElementById('carType')).value;
    let transmission = (<HTMLInputElement>document.getElementById('carTrans'))
      .value;
    let fuel = (<HTMLInputElement>document.getElementById('carFuel')).value;
    if (this.img == '') {
      alert('Please upload an image!');
      return;
    }
    db.add({
      name: name,
      costPerDay: cost,
      type: type,
      transmission: transmission,
      fuel: fuel,
      image: this.img,
      isRented: false,
      review: [],
      starRatings: [],
    });
    this.router.navigate(['/']);
    alert('Car has been added');
  }

  displayImage() {
    let image = (<HTMLInputElement>document.getElementById('img-input')).value;
    this.img = (<HTMLImageElement>(
      document.getElementById('image-container')
    )).src = image;
  }
}
