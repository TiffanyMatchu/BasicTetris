import { Tetrimino } from "./Tetrimino.js";

class TetriminoZ extends Tetrimino {
  constructor(xChange, yChange, color) {
    super(xChange, yChange, color);
    this.rotation = 0;
    this.shape = "Z";
  }
  getCoordinates() {
    switch (this.rotation) {
      case 0:
        this.shapeCoordinates = [
          [0 + this.yChange, 0 + this.xChange],
          [1 + this.yChange, 1 + this.xChange],
          [0 + this.yChange, 1 + this.xChange],
          [1 + this.yChange, 2 + this.xChange],
        ];
        break;
      case 1:
        this.shapeCoordinates = [
          [2 + this.yChange, 1 + this.xChange],
          [1 + this.yChange, 1 + this.xChange],
          [1 + this.yChange, 2 + this.xChange],
          [0 + this.yChange, 2 + this.xChange],
        ];
        break;
      case 2:
        this.shapeCoordinates = [
          [1 + this.yChange, 0 + this.xChange],
          [1 + this.yChange, 1 + this.xChange],
          [2 + this.yChange, 1 + this.xChange],
          [2 + this.yChange, 2 + this.xChange],
        ];
        break;
      case 3:
        this.shapeCoordinates = [
          [0 + this.yChange, 1 + this.xChange],
          [1 + this.yChange, 1 + this.xChange],
          [1 + this.yChange, 0 + this.xChange],
          [2 + this.yChange, 0 + this.xChange],
        ];
        break;
      default:
        break;
    }
    return this.shapeCoordinates;
  }
}
export { TetriminoZ };
