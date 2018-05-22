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

  addRover(rover: Rover, yPos, xPos): MapService {
    if (rover.column > -1 && rover.column < this.getColCount()+1
      && rover.row > -1 && rover.row < this.getRowCount()+1) {

      if (this.map.tiles[yPos][xPos] instanceof Array) {
        this.map.tiles[yPos][xPos].push(rover);
      } else {
        this.map.tiles[yPos][xPos] = [rover];
      }
    }
    return this;
  }

  removeRover(rover: Rover, xPos: number, yPos: number): MapService {
    console.log(xPos, yPos)
      if (rover.column > -1 && rover.column < this.getColCount()+1
      && rover.row > -1 && rover.row < this.getRowCount()+1) {

      if (this.map.tiles[yPos][xPos].length > 1) {
        this.map.tiles[yPos][xPos] = this.map.tiles[yPos][xPos].filter(r => r.id !== rover.id)
      } else {
        this.map.tiles[yPos][xPos] = `${xPos}, ${yPos}`;
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
