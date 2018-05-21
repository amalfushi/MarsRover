export class Map {

    tiles: number[][];
    columns: number;
    rows: number;

    constructor(width: number, height: number) {
        this.rows = height;
        this.columns = width;
        this.generateTiles(width, height);
    }

    generateTiles(width: number, height: number): Map {
        this.tiles = [];
        let i = 0;
        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++) {
                row.push(i++);
            }
            this.tiles.push(row);
        }

        return this;
    }

    print(): void {
        console.log(`${this.columns}x${this.rows}`)
        for (let row of this.tiles) {
            console.log(row)
        }
    }

    getColumns(): number { return this.columns }
    getRows(): number { return this.rows }
}
