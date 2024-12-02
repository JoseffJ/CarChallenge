// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// The Motorbike class extends the Vehicle class
class Motorbike extends Vehicle {
  vin: string;
    color: string;
    make: string;
    model: string;
    year: number;
    weight: number;
    topSpeed: number;
  wheels: Wheel[];

  // Constructor to initialize the properties of the Motorbike class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    super(); // Updated to match the Vehicle class constructor
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.wheels = wheels.length === 2 ? wheels : [new Wheel(18,'GenericBrand'), new Wheel(18,'GenericBrand')];
  }

  // Method to perform a wheelie
  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    super.printDetails();
    console.log(
      `Wheels: ${this.wheels
        .map((wheel) => (wheel.getTireBrand && wheel.getDiameter ? `${wheel.getTireBrand}, Diameter: ${wheel.getDiameter} inches` : 'Unknown Wheel'))
        .join('; ')}`
    );
  }
}


// Export the Motorbike class as the default export
export default Motorbike;
