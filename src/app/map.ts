export class Map {

    tiles;
    columns: number;
    rows: number;

    constructor(width: number, height: number) {
        this.rows = height;
        this.columns = width;
        this.tiles = [];
    }

    print(): void {
        console.log(`${this.columns}x${this.rows}`)
        for (let row of this.tiles) {
            console.log(row)
        }
    }
}
