import Entity from "./Entity.js";

class Tile extends Entity {
  height = 8;
  width = 8;
  empty = true;
  x = 0;
  y = 0;

  getPosition() {
    return {
      x: this.x * this.width - (this.width - 1) / 2,
      y: this.y * this.height - (this.height - 1) / 2,
    };
  }
}

export default Tile;
