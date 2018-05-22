export class Map {

    tiles;
    columns: number;
    rows: number;

    constructor(width: number, height: number) {
        this.rows = height;
        this.columns = width;
        this.tiles = [];
    }
}
