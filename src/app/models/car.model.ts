export class Car {
  id: string;
  name: string;
  type: string;
  transmission: string;
  fuel: string;
  img: string;
  costPerDay: number;
  isRented: boolean;
  averageStars: Array<number>;
  reviews: Array<string>;
  daysRented?: Number;

  constructor(
    id: string,
    name: string,
    type: string,
    transmission: string,
    fuel: string,
    cost: number,
    img: string,
    averageStars: Array<number>,
    reviews: Array<string>,
    isRented: boolean
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.transmission = transmission;
    this.fuel = fuel;
    this.img = img;
    this.costPerDay = cost;
    this.averageStars = averageStars;
    this.reviews = reviews;
    this.isRented = isRented;
  }

  get carID() {
    return this.id;
  }

  get carName() {
    return this.name;
  }

  get getDays() {
    return this.daysRented;
  }

  get getCost() {
    return this.costPerDay;
  }

  setDays(days: Number) {
    this.daysRented = days;
  }
}
