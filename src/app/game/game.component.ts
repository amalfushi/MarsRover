import { Component, OnInit } from '@angular/core';
import { Rover } from '../rover';
import { Map } from '../map'
import { Facing } from '../direction.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  rovers: Rover[];
  start: string;
  newMapSize: string;
  map: Map;

  constructor() {
    this.rovers = [];
    this.start = "";
    this.newMapSize = "";
  }

  ngOnInit() {
  }

  createMap(): void {
    const mapSpecs = this.parseCoordinates(this.newMapSize, /^[2-9][2-9]$/);
    if (mapSpecs) {
      this.map = new Map(mapSpecs[0], mapSpecs[1])
      this.newMapSize = "";
    }
    // this.map.print();
  }

  addRover(): void {
    const coords = this.parseCoordinates(this.start, /^\d{2}[NESW]$/);
    if (coords && coords.length === 3) {
      // change the rover direction from a character to a proper Facing
      coords[2] = coords[2] == "N" ? Facing.north : coords[2] == "E" ? Facing.east : coords[2] == "S" ? Facing.south : Facing.west;
      const rover = new Rover(coords[0], coords[1], coords[2]);
      this.rovers.push(rover);
      this.start = "";
    }
  }

  parseCoordinates(str: string, reg: RegExp): any {
    const noSpaces = this.removeSpaces(str);
    if (noSpaces.match(reg)) {
      return this.toIntegers(this.removeSpaces(noSpaces).split(""));
    }
    return null;
  }

  executeInstructions(): void {
    this.rovers.forEach((rover) => {

      // console.log(rover.instructions)
      if (rover.instructions) {
        const instArray = this.removeSpaces(rover.instructions).split("");
        // console.log(instArray)
        instArray.forEach((instruction) => {
          if (rover.status) {
            rover.executeInstruction(instruction);
            rover.checkForBoundaries(this.map.columns + 1, this.map.rows + 1)
          }
        });
        rover.instructions = "";
      }
    });
  }

  removeSpaces(str: string): string {
    return str.toUpperCase().replace(/\ /g, "");
  }

  toIntegers(arr): any {
    arr[0] = parseInt(arr[0]);
    arr[1] = parseInt(arr[1]);
    return arr;
  }
}
