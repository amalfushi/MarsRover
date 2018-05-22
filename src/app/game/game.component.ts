import { Component, OnInit } from '@angular/core';
import { Rover } from '../rover';
import { Map } from '../map'
import { Facing } from '../direction.enum';
import { RoverService } from '../rover.service';
import { MapService } from '../map.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [RoverService, MapService]
})
export class GameComponent implements OnInit {

  rovers: Rover[];
  start: string = "";
  newMapSize: string = "";
  map: Map;

  constructor(private roverService: RoverService, private mapService: MapService) {
  }

  ngOnInit() {
    this.getRovers();
  }



  resetAll(): void {
    this.rovers = [];
    this.map = null;
  }


  // Map Manipulation
  getMap():void {
    this.map = this.mapService.getMap();
  }

  createMap(): void {
    const mapSpecs = this.parseCoordinates(this.newMapSize, /^[2-9][2-9]$/);
    if (mapSpecs) {
      this.mapService.generateTiles(mapSpecs[0], mapSpecs[1]);
      this.getMap();
    }
  }


  // Rover Manipulation
  getRovers() {
    this.rovers = this.roverService.getRovers();
  }

  addRover(): void {
    const coords = this.parseCoordinates(this.start, /^\d{2}[NESW]$/);
    if (coords && coords.length === 3) {
      const rover = this.roverService.addRover(coords[0], coords[1], coords[2]);
      this.mapService.addRover(rover)
      this.getRovers();
      this.getMap();
      this.start = "";
    }
  }

  deleteRover(rover: Rover): void {
    this.roverService.deleteRoverById(rover.id);
    this.getRovers();
  }

  executeInstructions(): void {
    for (let rover of this.rovers) {
      if (rover.instructions && rover.status) {
        // to replace rove on map
        // const start = [rover.row, rover.column];
        this.mapService.removeRover(rover);
        rover.instructions = this.removeSpaces(rover.instructions);
        this.roverService.executeInstructionsById(rover.id, this.map.columns, this.map.rows);
        this.mapService.addRover(rover);
        this.getMap();
      }
    }
  }


  // String parsing
  parseCoordinates(str: string, reg: RegExp): any {
    const noSpaces = this.removeSpaces(str);
    if (noSpaces.match(reg)) {
      return this.toIntegers(this.removeSpaces(noSpaces).split(""));
    }
    return null;
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
