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
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        row.push(`${x}, ${y}`);
      }
      this.map.tiles.unshift(row);
    }

    return this;
  }

  resetMap(): MapService {
    this.map = null;
    return this;
  }

  addRover(rover: Rover): MapService {
    if (rover.column > -1 && rover.column < this.getColCount() + 1
      && rover.row > -1 && rover.row < this.getRowCount() + 1) {

      if (this.map.tiles[this.getRowCount() -rover.row][rover.column] instanceof Array) {
        this.map.tiles[this.getRowCount() - rover.row][rover.column].push(rover);
      } else {
        this.map.tiles[this.getRowCount() - rover.row][rover.column] = [rover];
      }
    }
    return this;
  }

  removeRover(rover: Rover): MapService {
    if (this.map.tiles[this.getRowCount() -rover.row] && this.map.tiles[this.getRowCount() -rover.row][rover.column]) {
      if (this.map.tiles[this.getRowCount() -rover.row][rover.column].length > 1) {
        this.map.tiles[this.getRowCount() -rover.row][rover.column] = this.map.tiles[this.getRowCount() -rover.row][rover.column].filter(r => r.id !== rover.id)
      } else {
        this.map.tiles[this.getRowCount() -rover.row][rover.column] = `${rover.column}, ${rover.row} `;
      }
    }
    return this;

  }

  getMap(): Map {
    return this.map;
  }

  getTiles(): string[][] {
    return this.map.tiles;
  }

  getRowCount(): number {
    return this.map.tiles.length - 1;
  }

  getColCount(): number {
    return this.map.tiles[0].length - 1;
  }
}
