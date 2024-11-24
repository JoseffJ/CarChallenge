// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// The Motorbike class extends the Vehicle class
class Motorbike extends Vehicle {
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
    super(vin, color, make, model, year, weight, topSpeed);
    this.wheels = wheels.length === 2 ? wheels : [new Wheel('GenericBrand', 18), new Wheel('GenericBrand', 18)];
  }

  // Method to perform a wheelie
  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  // Override the printDetails method from the Vehicle class
  printDetails(): void {
    super.printDetails();
    console.log(
      `Wheels: ${this.wheels
        .map((wheel) => (wheel.brand && wheel.diameter ? `${wheel.brand}, Diameter: ${wheel.diameter} inches` : 'Unknown Wheel'))
        .join('; ')}`
    );
  }
}

// Export the Motorbike class as the default export
export default Motorbike;
