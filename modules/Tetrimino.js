class Tetrimino {
  constructor(xChange, yChange, shape) {
    this.xChange = xChange;
    this.yChange = yChange;
    this.shape = shape;
    this.shapeArr = [];
  }
  getShape() {
    return this.shape;
  }
  getShapeArray() {
    switch (this.shape) {
      case "square":
        this.shapeArr = [
          [0 + this.yChange, 0 + this.xChange],
          [0 + this.yChange, 1 + this.xChange],
          [1 + this.yChange, 0 + this.xChange],
          [1 + this.yChange, 1 + this.xChange],
        ];
        break;
      case "line":
        this.shapeArr = [
          [0 + this.yChange, 0 + this.xChange],
          [1 + this.yChange, 0 + this.xChange],
          [2 + this.yChange, 0 + this.xChange],
          [3 + this.yChange, 0 + this.xChange],
        ];
        break;
      case "l":
         this.shapeArr = [
           [0 + this.yChange, 0 + this.xChange],
           [1 + this.yChange, 0 + this.xChange],
           [2 + this.yChange, 0 + this.xChange],
           [2 + this.yChange, 1 + this.xChange],
         ];
         break;
      default:
        break;
    }
    return this.shapeArr;
  }
  addXChange(x) {
    return (this.xChange += x);
  }
  addYChange(y){
    return this.yChange += y;
  }
}
export { Tetrimino };
