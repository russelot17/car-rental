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
    let id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    while (this.checkDuplicateID(id)) {
      id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }
    this.store.collection('cars').add({
      id: id,
      name: name,
      costPerDay: cost,
      type: type,
      transmission: transmission,
      fuel: fuel,
      image: this.img,
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

  checkDuplicateID(id: number) {
    for (let i = 0; i < CarsComponent.carList.length; i++) {
      if (id == CarsComponent.carList[i].id) return true;
    }
    return false;
  }
}
