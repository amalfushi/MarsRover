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
    this.mapService.resetMap();
    this.roverService.resetRovers();
    this.getMap();
    this.getRovers();
  }


  // Map Manipulation
  getMap(): void {
    this.map = this.mapService.getMap();
  }

  createMap(): void {
    const mapSpecs = this.parseCoordinates(this.newMapSize, /^[2-9][2-9]$/);
    if (mapSpecs) {
      this.mapService.generateTiles(mapSpecs[0], mapSpecs[1]);
      this.getMap();
      this.newMapSize = "";
    }
  }


  // Rover Manipulation
  getRovers() {
    this.rovers = this.roverService.getRovers();
  }

  addRover(): void {
    const coords = this.parseCoordinates(this.start, /^\d{2}[NESW]$/);
    if (coords && coords.length === 3) {
      console.log(coords)
      const rover = this.roverService.addRover(coords[0], coords[1], coords[2]);

      this.mapService.addRover(rover);

      rover.checkForBoundaries(this.mapService.getRowCount()-1, this.mapService.getColCount()-1)
      this.getRovers();
      this.getMap();
      this.start = "";
    }
  }

  deleteRover(rover: Rover): void {
    this.mapService.removeRover(rover);
    this.roverService.deleteRoverById(rover.id);
    this.getRovers();
    this.getMap();
    console.log(this.rovers)
  }

  executeInstructions(): void {
    for (let rover of this.rovers) {
      if (rover.instructions && rover.status) {
        // remove rover from the map
        this.mapService.removeRover(rover);

        // move rover as per the instrucitons
        rover.instructions = this.removeSpaces(rover.instructions);
        this.roverService.executeInstructionsById(rover.id);

        // Re-add the rover in the appropriate positon (unless it's outside the boundaries)
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
