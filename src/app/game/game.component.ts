import { Component, OnInit } from '@angular/core';
import { Rover } from '../rover';
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
  map: string;

  constructor() {
    this.rovers = [];
    this.start = "";
    this.newMapSize = "";
  }

  ngOnInit() {
  }

  createMap() {
    // this.parseMapSize()
    console.log("create map")
    const mapSpecs = this.parseCoordinates(this.newMapSize, /^\d{2}$/);
    if (mapSpecs) {
      this.map = "ima map";
      this.newMapSize = "";
    }
  }

  addRover(): void {
    console.log("Add Rover")
    const coords = this.parseCoordinates(this.start, /^\d{2}[NESW]$/);
    console.log(coords);
    if (coords && coords.length === 3) {
      // change the direction from a character to a proper Facing
      coords[2] =  coords[2] == "N" ? Facing.north : coords[2] == "E" ? Facing.east : coords[2] == "S" ? Facing.south : Facing.west;
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
    this.rovers.forEach((r) => {
      console.log(r.instructions);
      r.instructions = "";
    })
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
