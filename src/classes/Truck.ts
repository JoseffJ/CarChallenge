// Import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// The Truck class extends the Vehicle class and implements the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  towingCapacity: number;
  wheels: Wheel[];

  // Constructor to initialize the properties of the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    super(vin, color, make, model, year, weight, topSpeed);
    this.towingCapacity = towingCapacity;
    this.wheels = wheels.length === 4 ? wheels : [new Wheel('GenericBrand', 18), new Wheel('GenericBrand', 18), new Wheel('GenericBrand', 18), new Wheel('GenericBrand', 18)];
  }

  // Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    const vehicleDescription = `${vehicle.make} ${vehicle.model}`;
    if (vehicle.weight <= this.towingCapacity) {
      console.log(`Truck ${this.make} ${this.model} is towing ${vehicleDescription}.`);
    } else {
      console.log(`Truck ${this.make} ${this.model} cannot tow ${vehicleDescription} because it is too heavy.`);
    }
  }

  // Override the printDetails method from the Vehicle class
  printDetails(): void {
    super.printDetails();
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
    console.log(
      `Wheels: ${this.wheels
        .map((wheel) => (wheel.brand && wheel.diameter ? `${wheel.brand}, Diameter: ${wheel.diameter} inches` : 'Unknown Wheel'))
        .join('; ')}`
    );
  }
}

// Export the Truck class as the default export
export default Truck;
