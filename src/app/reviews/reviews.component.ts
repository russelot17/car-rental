import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  starRatings: Array<number> = [];
  reviews: Array<string> = [];
  args: any;
  constructor(
    private route: ActivatedRoute,
    private store: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    let db = this.store.collection('cars');
    this.args = this.route.snapshot.params;
    this.displayAverageStarRatings();

    db.doc(this.args['id'])
      .get()
      .subscribe((ss) => {
        this.starRatings = ss.get('starRatings');
        this.reviews = ss.get('review')
        console.log(this.reviews)
      });
  }

  displayAverageStarRatings() {
    let average = 0;
    let stars = -1;

    setTimeout(() => {
      for (let i in this.starRatings) average += +this.starRatings[i];
      average /= this.starRatings.length;
      console.log(average);

      if (average >= 80) stars = 5;
      else if (average >= 60) stars = 4;
      else if (average >= 40) stars = 3;
      else if (average >= 20) stars = 2;
      else if (average >= 0) stars = 1;

      const starsEl = document.getElementById('stars');
      for (let i = 0; i < stars; i++) {
        const starEl = document.createElement('img');
        starEl.classList.add('star');
        starEl.src = '../../assets/Star.png';
        starEl.style.width = '35px';
        starsEl!.appendChild(starEl);
      }
    }, 500);
  }

  back() {
    this.router.navigate(['/']);
  }
}
