import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  ratings: any;
  stars: number = 0;
  args: any;
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private store: AngularFirestore
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    let revList: string[] = [];
    const starsEl = document.getElementById('stars');
    let db = this.store.collection('cars');
    this.args = this.route.snapshot.params;
    starsEl!.innerHTML = '';
    var textarea = <HTMLInputElement>document.getElementById('textarea');
    var submitBtn = (<HTMLInputElement>document.getElementById("submit"))
    var text = textarea.value;
    text = text.replace(
      /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/g,
      ''
    );
    text = text.replace(/[^A-Za-z0-9 ]/g, '');

    db.doc(this.args['id'])
      .get()
      .subscribe((res) =>
        res.get('review').map((rev: string) => revList.push(rev))
      );
    this.httpClient
      .get('http://127.0.0.1:1217/sentiment/' + text)
      .subscribe((data) => {
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = 'grey'
        this.ratings = data as JSON;
        this.starEquivalent();
        revList.push(textarea.value);
        setTimeout(() => {
          db.doc(this.args['id']).update({
            review: revList,
          });
        }, 1000);
      });
  }

  back() {
    this.router.navigate(['/']);
  }

  starEquivalent() {
    const starsEl = document.getElementById('stars');
    let db = this.store.collection('cars');
    this.args = this.route.snapshot.params;
    let scoreList: string[] = [];

    let pos: number = this.ratings['pos'];
    let neu: number = this.ratings['neu'];
    let total: number = (pos + neu) * 100;
    if (total >= 80) this.stars = 5;
    else if (total >= 60) this.stars = 4;
    else if (total >= 40) this.stars = 3;
    else if (total >= 20) this.stars = 2;
    else this.stars = 1;

    db.doc(this.args['id'])
      .get()
      .subscribe((res) =>
        res.get('starRatings').map((rev: string) => scoreList.push(rev))
      );

    setTimeout(() => {
      scoreList.push(total.toString())
      db.doc(this.args['id']).update({
        starRatings: scoreList,
      });
      console.log(scoreList);
    }, 1000);

    for (let i = 0; i < this.stars; i++) {
      const starEl = document.createElement('img');
      starEl.classList.add('star');
      starEl.src = '../../assets/Star.png';
      starsEl!.appendChild(starEl);
    }
  }
}
