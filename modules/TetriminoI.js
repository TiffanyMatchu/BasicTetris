import { Tetrimino } from "./Tetrimino.js";

class TetriminoI extends Tetrimino {
  constructor(xChange, yChange, color) {
    super(xChange, yChange, color);
    this.rotation = 1;
    this.shape = "I"; //aka Line
  }
  getCoordinates() {
    switch (this.rotation) {
      case 0:
        this.shapeCoordinates = [
          [1 + this.yChange, 0 + this.xChange],
          [1 + this.yChange, 1 + this.xChange],
          [1 + this.yChange, 2 + this.xChange],
          [1 + this.yChange, 3 + this.xChange],
        ];
        break;
      case 1:
        this.shapeCoordinates = [
          [0 + this.yChange, 2 + this.xChange],
          [1 + this.yChange, 2 + this.xChange],
          [2 + this.yChange, 2 + this.xChange],
          [3 + this.yChange, 2 + this.xChange],
        ];
        break;
      case 2:
        this.shapeCoordinates = [
          [2 + this.yChange, 0 + this.xChange],
          [2 + this.yChange, 1 + this.xChange],
          [2 + this.yChange, 2 + this.xChange],
          [2 + this.yChange, 3 + this.xChange],
        ];
        break;
      case 3:
        this.shapeCoordinates = [
          [0 + this.yChange, 1 + this.xChange],
          [1 + this.yChange, 1 + this.xChange],
          [2 + this.yChange, 1 + this.xChange],
          [3 + this.yChange, 1 + this.xChange],
        ];
        break;
      default:
        break;
    }
    return this.shapeCoordinates;
  }
}
export { TetriminoI };
