export class Car {
  id: number;
  name: string;
  type: string;
  transmission: string;
  fuel: string;
  img: string;
  costPerDay: number;
  isAvailable: boolean;
  daysRented?: Number;

  constructor(
    id: any,
    name: string,
    type: string,
    transmission: string,
    fuel: string,
    cost: number,
    img: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.transmission = transmission;
    this.fuel = fuel;
    this.img = img;
    this.costPerDay = cost;
    this.isAvailable = true;
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
