import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  image: string = '';
  args: any;
  constructor(
    private route: ActivatedRoute,
    private store: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    let db = this.store.collection('cars');
    this.args = this.route.snapshot.params;

    db.get().subscribe((ss) => {
      ss.docs.forEach((doc) => {
        if (doc.id == this.args['id']) {
          (<HTMLInputElement>(
            document.getElementById('carName')
          )).value = doc.get('name');
          (<HTMLInputElement>(
            document.getElementById('carCost')
          )).value = doc.get('costPerDay');
          (<HTMLInputElement>(
            document.getElementById('carType')
          )).value = doc.get('type');
          (<HTMLInputElement>(
            document.getElementById('carTrans')
          )).value = doc.get('transmission');
          (<HTMLInputElement>(
            document.getElementById('carFuel')
          )).value = doc.get('fuel');
          this.image = doc.get('image');
          return;
        }
      });
    });
  }

  editCar() {
    const db = this.store.collection('cars');
    this.args = this.route.snapshot.params;
    let name = (<HTMLInputElement>document.getElementById('carName')).value;
    let cost = +(<HTMLInputElement>document.getElementById('carCost')).value;
    let type = (<HTMLInputElement>document.getElementById('carType')).value;
    let transmission = (<HTMLInputElement>document.getElementById('carTrans'))
      .value;
    let fuel = (<HTMLInputElement>document.getElementById('carFuel')).value;
    if (this.image == '') {
      alert('Please upload an image!');
      return;
    }
    db.doc(this.args['id']).update({
      name: name,
      fuel: fuel,
      image: this.image,
      transmission: transmission,
      type: type,
      costPerDay: cost,
    })

    alert('Edit successful!');
    
    
  }

  back() {
    this.router.navigate(['/']);
  }

  displayImage() {
    let img = (<HTMLInputElement>document.getElementById('img-input')).value;
    this.image = (<HTMLImageElement>(
      document.getElementById('image-container')
    )).src = img;
  }
}
