import Entity from "./Entity.js";
import Tile from "./Tile.js";

class PacmanGrid {
  width;
  height;
  rows = [];
  specialTiles = {};
  constructor(height, width) {
    this.width = width;
    this.height = height;

    for (let y = 0; y < height + 1; y++) {
      const row = [];
      for (let x = 0; x < width + 1; x++) {
        const tile = new Tile();
        tile.x = x;
        tile.y = y;
        tile.empty = true;
        tile.up = false;
        tile.down = false;
        tile.left = false;
        tile.right = false;
        row.push(tile);
      }
      this.rows.push(row);
    }

    const tunnelTileA = new Tile();
    tunnelTileA.x = 0;
    tunnelTileA.y = 18;
    tunnelTileA.right = true;
    tunnelTileA.left = true;

    const tunnelTileB = new Tile();
    tunnelTileB.x = 29;
    tunnelTileB.y = 18;
    tunnelTileB.right = true;
    tunnelTileB.left = true;

    this.specialTiles["0,18"] = tunnelTileA;
    this.specialTiles["29,18"] = tunnelTileB;

    let tileMapper = {
      5: ["2-13", "16-27"],
      6: [2, 7, 13, 16, 22, 27],
      7: [2, 7, 13, 16, 22, 27],
      8: [2, 7, 13, 16, 22, 27],
      9: ["2-27"],
      10: [2, 7, 10, 19, 22, 27],
      11: [2, 7, 10, 19, 22, 27],
      12: ["2-7", "10-13", "16-19", "22-27"],
      13: [7, 13, 16, 22],
      14: [7, 13, 16, 22],
      15: [7, "10-19", 22],
      16: [7, 10, 19, 22],
      17: [7, 10, 19, 22],
      18: ["1-10", "19-28"],
      19: [7, 10, 19, 22],
      20: [7, 10, 19, 22],
      21: [7, "10-19", 22],
      22: [7, 10, 19, 22],
      23: [7, 10, 19, 22],
      24: ["2-13", "16-27"],
      25: [2, 7, 13, 16, 22, 27],
      26: [2, 7, 13, 16, 22, 27],
      27: ["2-4", "7-22", "25-27"],
      28: [4, 7, 10, 19, 22, 25],
      29: [4, 7, 10, 19, 22, 25],
      30: ["2-7", "10-13", "16-19", "22-27"],
      31: [2, 13, 16, 27],
      32: [2, 13, 16, 27],
      33: ["2-27"],
    };

    // let rowNum = 5;
    // for (let x = 2; x < 14; x++) {
    //   this.rows[rowNum][x].empty = false;
    // }

    // for (let x = 17; x < 27; x++) {
    //     this.rows[rowNum][x].empty = false;

    Object.keys(tileMapper).forEach((key) => {
      tileMapper[key].forEach((mapping) => {
        console.log(typeof mapping);
        if (typeof mapping === "number") {
          this.rows[key][mapping].empty = false;
        } else if (typeof mapping == "string") {
          const [start, end] = mapping.split("-");
          for (let x = Number(start); x < Number(end) + 1; x++) {
            this.rows[key][x].empty = false;
          }
        }
      });
    });

    for (let y = 1; y < height; y++) {
      for (let x = 1; x < width; x++) {
        this.rows[y][x].up = !this.rows[y - 1][x].empty;
        this.rows[y][x].down = !this.rows[y + 1][x].empty;
        this.rows[y][x].left = !this.rows[y][x - 1].empty;
        this.rows[y][x].right = !this.rows[y][x + 1].empty;
      }
    }

    //TUNNEL SPACES
    this.rows[18][1].left = true;
    this.rows[18][1].right = true;

    this.rows[18][28].left = true;
    this.rows[18][28].right = true;
  }

  getTile(x, y) {
    if (x >= 1 && x <= this.width && y >= 1 && y <= this.height) {
      return this.rows[y][x];
    } else if (this.specialTiles[`${x},${y}`]) {
      return this.specialTiles[`${x},${y}`];
    } else {
      const tile = new Tile();
      tile.x = x;
      tile.y = y;
      tile.up = true;
      tile.down = true;
      tile.right = true;
      tile.left = true;
      return tile;
    }
  }
}

export default PacmanGrid;
