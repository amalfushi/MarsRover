import { Injectable } from '@angular/core';
import { Rover } from './rover';
import { Facing } from './direction.enum';

@Injectable()
export class RoverService {

  lastId: number = 0;
  rovers: Rover[] = [];

  constructor() { }

  addRover(xStart: number, yStart: number, dir: string): Rover {
    // switch dir from a letter to a proper cardinal direction
    const direction = dir == "N" ? Facing.north : dir == "E" ? Facing.east : dir == "S" ? Facing.south : Facing.west;
    const rover = new Rover(xStart, yStart, direction, this.lastId++);
    this.rovers.push(rover);
    return rover;
  }

  getRovers(): Rover[] {
    return this.rovers;
  }

  deleteRoverById(id: number): RoverService {
    this.rovers = this.rovers.filter(r => r.id !== id);
    this.lastId--;
    return this;
  }

  executeInstructionsById(id: number, xMax: number, yMax: number): RoverService {
    let rover = this.rovers[id];
    if (rover.instructions) {
      let tokens = rover.instructions.split("");
      for (let token of tokens) {
        if (rover.status) {
          rover.operate(token);
          rover.checkForBoundaries(xMax, yMax);
        }
      }
    }
    rover.instructions = "";
    return this;
  }
}
