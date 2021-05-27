import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() type: string = '';
  @Input() transmission: string = '';
  @Input() fuel: string = '';
  @Input() cost: Number = 0;
  @Input() image: string = '';
  @Input() starRatings: Array<number> = [];
  @Input() review: Array<string> = [];
  @Input() isRented: boolean = true;
  @Output() days = new EventEmitter<[string, number, number]>();
  @Output() delete = new EventEmitter<string>();

  constructor(private router: Router, private store: AngularFirestore) {}

  ngOnInit(): void {}

  rentReturn() {
    let db = this.store.collection('cars');
    if (!this.isRented) {
      let days = prompt('How many days to rent?');
      if (days == null) return;
      this.days.emit([this.id, +days, 1]);
    } else {
      let days = prompt('How many days did you return?');
      if (days == null) return;
      this.days.emit([this.id, +days, 0]);
      this.router.navigate(['/review', this.id]);
    }
    this.isRented = !this.isRented;
    db.doc(this.id).update({ isRented: this.isRented });
  }

  getColor() {
    return !this.isRented ? 'yellowgreen' : 'Tomato';
  }

  getValue() {
    return !this.isRented ? 'Rent' : 'Return';
  }

  editCar() {
    this.router.navigate(['/edit', this.id]);
  }

  deleteCar() {
    if (confirm('Delete this car?') == false) return;
    this.delete.emit(this.id);
  }

  reviewScreen() {
    this.router.navigate(['/reviews', this.id, this.name]);
  }
}
