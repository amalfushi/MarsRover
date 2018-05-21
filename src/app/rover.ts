import { Facing } from "./direction.enum";

export class Rover {


    row: number;
    column: number;
    direction: Facing;
    instructions: string;
    status: boolean;

    constructor(xStart: number, yStart: number, dir: Facing) {
        this.row = xStart;
        this.column = yStart;
        this.direction = dir;
        this.status = true;
    }

    executeInstruction(str: string): Rover {
        switch (str) {
            case "L": {
                this.left();
                break;
            }
            case "R": {
                this.right();
                break;
            }
            case "M": {
                this.move();
                break;
            }
        }
        return this;
    }

    move(): Rover {
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

    turn(direction: string): Rover {
        if (direction === "L") this.left();
        if (direction === "R") this.right();
        return this;
    }

    left(): Rover {
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
        return this;
    }

    right(): Rover {
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
        return this;
    }

    checkForBoundaries(xMax, yMax): boolean {
        if (this.column < 0 || this.column > xMax || this.row < 0 || this.row > yMax) {
            this.status = false;
        }
        return this.status
    }

    getPosition(): string {
        return `${this.column} ${this.row} ${this.direction}`;
    }
}