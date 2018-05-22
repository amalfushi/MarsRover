import { Injectable } from '@angular/core';
import { Map } from './map';
import { Rover } from './rover';

@Injectable()
export class MapService {

  map: Map;

  constructor() { }

  generateTiles(width: number, height: number): MapService {
    this.map = new Map(width, height);
    this.map.tiles = [];
    let i = 0;
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        row.push(i++);
      }
      this.map.tiles.unshift(row);
    }

    return this;
  }

  addRover(rover: Rover): MapService {
    // console.log(rover.row-1, this.getColCount()-rover.row-1);
    this.map.tiles[this.getRowCount()-rover.row-1][rover.column - 1] = rover;
    return this;
  }

  removeRover(rover: Rover): MapService{
    this.map.tiles[this.getRowCount()-rover.row-1][rover.column - 1] = -1;
    return this;
  }

  getMap(): Map {
    return this.map;
  }

  getTiles(): string[][] {
    return this.map.tiles;
  }

  getRowCount(): number {
    return this.map.tiles.length + 1;
  }

  getColCount(): number {
    return this.map.tiles[0].length + 1;
  }
}
