import { Injectable } from '@angular/core';
import { Rover } from './rover';
import { Facing } from './direction.enum';
import { MapService } from './map.service';

@Injectable()
export class RoverService {

  lastId: number = 0;
  rovers: Rover[] = [];

  constructor(private mapService: MapService) { }

  getRovers(): Rover[] {
    return this.rovers;
  }

  resetRovers(): RoverService {
    this.rovers = [];
    this.lastId = 0;
    return this;
  }

  addRover(xStart: number, yStart: number, dir: string): Rover {
    // switch dir from a letter to a proper cardinal direction
    const direction = dir == "N" ? Facing.north : dir == "E" ? Facing.east : dir == "S" ? Facing.south : Facing.west;
    const rover = new Rover(xStart, yStart, direction, this.lastId++);
    this.rovers.push(rover);
    rover.checkForBoundaries(this.mapService.getRowCount()-1, this.mapService.getColCount()-1);
    return rover;
  }

  deleteRoverById(id: number): RoverService {
    this.rovers = this.rovers.filter(r => r.id !== id);
    this.lastId--;
    return this;
  }

  executeInstructionsById(id: number): RoverService {
    
    let rover = this.rovers[id];
    if (rover.instructions) {
      let tokens = rover.instructions.split("").reverse();
      while (tokens.length && rover.status === true) {
        if (rover.status) {
          rover.operate(tokens.pop());
          rover.checkForBoundaries(this.mapService.getRowCount()-1, this.mapService.getColCount()-1);
        }
      }
    }
    rover.instructions = "";
    return this;
  }
}
