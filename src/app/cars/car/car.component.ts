import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  @Input() id: any;
  @Input() name: string = '';
  @Input() type: string = '';
  @Input() transmission: string = '';
  @Input() fuel: string = '';
  @Input() cost: Number = 0;
  @Input() image: string = '';
  @Input() isAvailable: boolean = true;
  @Output() days = new EventEmitter<Number[]>();

  constructor(private router: Router, private store: AngularFirestore) {}

  ngOnInit(): void {}

  onClick() {
    if (this.isAvailable) {
      let days = prompt('How many days to rent?');
      if (days == null) return;
      this.days.emit([this.id, +days, 1]);
    } else {
      let days = prompt('How many days did you return?');
      if (days == null) return;
      this.days.emit([this.id, +days, 0]);
    }
    this.isAvailable = !this.isAvailable;
  }

  getColor() {
    return this.isAvailable ? 'yellowgreen' : 'Tomato';
  }

  getValue() {
    return this.isAvailable ? 'Rent' : 'Return';
  }

  editCar() {
    this.router.navigate(['/edit', this.id]);
  }

  deleteCar() {
    if (confirm("Delete this car?") == false) return;
    const db = this.store.collection('cars');
    db.snapshotChanges().subscribe((actions) => {
      return actions.map((a) => {
        const dc = db.doc(a.payload.doc.id);
        dc.get().subscribe((ss) => {
          if (ss.get('id') == this.id) {
            dc.delete();
          }
        });
      });
    });
    alert("Car has been deleted! Please refresh the page to see changes...");
  }
  
}
