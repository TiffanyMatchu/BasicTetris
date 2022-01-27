class Tetrimino {
  constructor(xChange, yChange, color,shape) {
    this.xChange = xChange;
    this.yChange = yChange;
    this.shape = shape;
    this.shapeCoordinates = [];
    this.color = color;
  }
  getShape() {
    return this.shape;
  }
  getShapeCoordinates() {
    return this.shapeCoordinates;
  }
  getColor() {
    return this.color;
  }
  getCoordinates(rotation) {
    return this.shapeCoordinates;
  }
  addXChange(x) {
    return (this.xChange += x);
  }
  addYChange(y) {
    return (this.yChange += y);
  }
}
export { Tetrimino };
