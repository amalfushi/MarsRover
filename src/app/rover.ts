import { Facing } from "./direction.enum";

export class Rover {


    row: number;
    column: number;
    direction: Facing;
    instructions: string;

    constructor(xStart: number, yStart: number, dir: Facing) {
        this.row = xStart;
        this.column = yStart;
        this.direction = dir;
    }

    move() {
        switch (this.direction) {
            case Facing.north: {
                this.row++;
                break;
            }
            case Facing.east: {
                this.column++;
                break;
            }
            case Facing.south: {
                this.row--;
                break;
            }
            case Facing.west: {
                this.column--;
                break;
            }
        }
        return this;
    }

    turn(direction: string) {
        if (direction === "L") this.left();
        if (direction === "R") this.right();
        return this;
    }

    left() {
        switch (this.direction) {
            case Facing.north: {
                this.direction = Facing.west;
                break;
            }
            case Facing.east: {
                this.direction = Facing.north;
                break;
            }
            case Facing.south: {
                this.direction = Facing.east;
                break;
            }
            case Facing.west: {
                this.direction = Facing.south;
                break;
            }
        }
    }

    right() {
        switch (this.direction) {
            case Facing.north: {
                this.direction = Facing.east;
                break;
            }
            case Facing.east: {
                this.direction = Facing.south;
                break;
            }
            case Facing.south: {
                this.direction = Facing.west;
                break;
            }
            case Facing.west: {
                this.direction = Facing.north;
                break;
            }
        }
    }

    getPosition() {
        return `${this.column} ${this.row} ${this.direction}`;
    }
}