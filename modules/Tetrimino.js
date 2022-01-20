class Tetrimino {
  constructor(xChange, yChange, shape) {
    this.xChange = xChange;
    this.yChange = yChange;
    this.shape = shape;
    this.shapeArr = [];
  }
  buildShapeArray() {
    switch (this.shape) {
      case "square":
        this.shapeArr = [
          [0 + this.yChange, 0 + this.xChange],
          [0 + this.yChange, 1 + this.xChange],
          [1 + this.yChange, 0 + this.xChange],
          [1 + this.yChange, 1 + this.xChange],
        ];
        break;
      default:
        break;
    }
    return this.shapeArr;
  }
}
export { Tetrimino };
