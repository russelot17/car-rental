import { Component, OnInit } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  static carList: Array<Car> = [];

  constructor(private store: AngularFirestore) {}

  ngOnInit(): void {
    let db = this.store.collection('cars');
    CarsComponent.carList = [];

    db.get().subscribe((ss) => {
      ss.docs.forEach((doc) => {
        let car = new Car(
          doc.get('id'),
          doc.get('name'),
          doc.get('type'),
          doc.get('transmission'),
          doc.get('fuel'),
          doc.get('costPerDay'),
          doc.get('image')
        );
        CarsComponent.carList.push(car);
      });
    });
  }
  staticList() {
    return CarsComponent.carList;
  }

  rentCar(e: Number[]) {
    let car = CarsComponent.carList.find((car: any) => e[0] == car.carID);
    if (e[2] == 1) {
      car!.setDays(e[1]);
    } else {
      let daysRented = <number>car!.getDays;
      let costPerDay = <number>car!.getCost;
      let pay = daysRented * costPerDay;
      if (<number>e[1] - daysRented > 0) {
        // Penalty is 10% if return date exceeds
        let penalty = 0.1;
        pay += (<number>e[1] - daysRented) * (costPerDay * penalty);
      }
      alert('Your bill is ₱' + pay);
    }
  }
}
