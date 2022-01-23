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
    //      this.shapeCoordinates = [
    //        [0 + this.yChange, 0 + this.xChange],
    //        [1 + this.yChange, 0 + this.xChange],
    //        [2 + this.yChange, 0 + this.xChange],
    //        [2 + this.yChange, 1 + this.xChange],
 
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
