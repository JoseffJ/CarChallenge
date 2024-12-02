// Import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// The Truck class extends Vehicle and implements the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
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
    // Call the parent constructor from Vehicle class with no arguments
    super();

    // Initialize Truck-specific properties
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;

    // Ensure the truck has 4 wheels; create default wheels if not provided
    this.wheels = wheels.length === 4 ? wheels : [
      new Wheel(18, 'GenericBrand'),
      new Wheel(18, 'GenericBrand'),
      new Wheel(18, 'GenericBrand'),
      new Wheel(18, 'GenericBrand')
    ];
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
  override printDetails(): void {
    super.printDetails();
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
    console.log(
      `Wheels: ${this.wheels
        .map((wheel) => `${wheel.getTireBrand}, Diameter: ${wheel.getDiameter} inches`)
        .join('; ')}`
    );
  }
}

// Export the Truck class as the default export
export default Truck;
