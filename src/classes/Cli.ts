// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck";
import Car from "./Car";
import Motorbike from "./Motorbike";
import Wheel from "./Wheel";

// define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle['vin']} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle['vin'],
            };
          }),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year, 10),
          parseInt(answers.weight, 10),
          parseInt(answers.topSpeed, 10),
          [new Wheel('Default', 16), new Wheel('Default', 16), new Wheel('Default', 16), new Wheel('Default', 16)]
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car['vin'];
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'towingCapacity', message: 'Enter Towing Capacity' },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year, 10),
          parseInt(answers.weight, 10),
          parseInt(answers.topSpeed, 10),
          [new Wheel('Default', 18), new Wheel('Default', 18), new Wheel('Default', 18), new Wheel('Default', 18)],
          parseInt(answers.towingCapacity, 10)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck['vin'];
        this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'frontWheelDiameter', message: 'Enter Front Wheel Diameter' },
        { type: 'input', name: 'frontWheelBrand', message: 'Enter Front Wheel Brand' },
        { type: 'input', name: 'rearWheelDiameter', message: 'Enter Rear Wheel Diameter' },
        { type: 'input', name: 'rearWheelBrand', message: 'Enter Rear Wheel Brand' },
      ])
      .then((answers) => {
        const frontWheel = new Wheel(answers.frontWheelBrand, parseInt(answers.frontWheelDiameter, 10));
        const rearWheel = new Wheel(answers.rearWheelBrand, parseInt(answers.rearWheelDiameter, 10));

        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year, 10),
          parseInt(answers.weight, 10),
          parseInt(answers.topSpeed, 10),
          [frontWheel, rearWheel]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike['vin'];
        this.performActions();
      });
  }

  // method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles
            .filter(vehicle => vehicle['vin'] !== truck['vin'])
            .map(vehicle => ({
              name: `${vehicle['vin']} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle['vin'],
            })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find(vehicle => vehicle['vin'] === answers.vehicleToTow);
        if (vehicleToTow) {
          console.log(`${truck.make} ${truck.model} is towing ${vehicleToTow.make} ${vehicleToTow.model}`);
        }
        this.performActions();
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    const selectedVehicle = this.vehicles.find(vehicle => vehicle['vin'] === this.selectedVehicleVin);
    if (!selectedVehicle) {
      console.log("Vehicle not found.");
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Tow vehicle',
            'Perform a wheelie',
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        if (answers.action === 'Print details') {
          selectedVehicle.printDetails();
        } else if (answers.action === 'Start vehicle') {
          selectedVehicle.start();
        } else if (answers.action === 'Accelerate 5 MPH') {
          selectedVehicle.accelerate(5);
        } else if (answers.action === 'Decelerate 5 MPH') {
          selectedVehicle.decelerate(5);
        } else if (answers.action === 'Stop vehicle') {
          selectedVehicle.stop();
        } else if (answers.action === 'Turn right') {
          selectedVehicle.turn('right');
        } else if (answers.action === 'Turn left') {
          selectedVehicle.turn('left');
        } else if (answers.action === 'Reverse') {
          selectedVehicle.reverse();
        } else if (answers.action === 'Tow vehicle') {
          if (selectedVehicle instanceof Truck) {
            this.findVehicleToTow(selectedVehicle);
            return;
          } else {
            console.log('Only trucks can tow vehicles.');
          }
        } else if (answers.action === 'Perform a wheelie') {
          if (selectedVehicle instanceof Motorbike) {
            selectedVehicle.performWheelie();
          } else {
            console.log('Only motorbikes can perform a wheelie.');
          }
        } else if (answers.action === 'Select or create another vehicle') {
          this.startCli();
          return;
        } else if (answers.action === 'Exit') {
          this.exit = true;
          return;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}
// export the Cli class

export default Cli;
