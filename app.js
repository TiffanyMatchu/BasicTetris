import { Tetrimino } from "./modules/Tetrimino.js";
let gridArray = [];
function makeGrid(l, w) {
  let gridDiv = document.getElementById("gameGrid");
  for (let i = 0; i < l; i++) {
    let row = document.createElement("div");
    let rowID = "row" + i;
    row.id = rowID;
    row.className = "row";
    gridDiv.appendChild(row);
    let currentRow = document.getElementById(rowID);
    for (let j = 0; j < w; j++) {
      let col = document.createElement("div");
      col.id = "col" + j;
      col.className = "col";
      currentRow.appendChild(col);
    }
    let rowString = "#" + rowID + " div";
    gridArray.push(Array.from(document.querySelectorAll(rowString)));
  }
}

function draw(shape) {
  for (let i = 0; i < shape.length; i++) {
    let row = "row" + shape[i][0];
    let col = shape[i][1];
    let box = document.getElementById(row).querySelectorAll(".col");
    box[col].style.backgroundColor = "#6EFCEB";
  }
}

function undraw(shape) {
  for (let i = 0; i < shape.length; i++) {
    let row = "row" + shape[i][0];
    let col = shape[i][1];
    let box = document.getElementById(row).querySelectorAll(".col");
    box[col].style.backgroundColor = "#EBEBEB";
  }
}

const tetriminoSquare = new Tetrimino(13, 0, "square");
const tetriminoLine = new Tetrimino(13, 0, "line");
const tetriminoL = new Tetrimino(13,0,"l");
let currentShape = tetriminoL;
let currentShapeArr = currentShape.getShapeArray();

function isXOutofBounds() {
  for (let i = 0; i < currentShapeArr.length; i++) {
    if (currentShapeArr[i][1] > gridArray[0].length - 1 || currentShapeArr[i][1] < 0) {
      return true;
    }
  }
  return false;
}
function isYOutOfBounds() {
  for (let i = 0; i < currentShapeArr.length; i++) {
    console.log(currentShapeArr[i][0]);
    if (currentShapeArr[i][0] > gridArray.length-1) {
      return true;
    }
  }
  return false;
}
function moveRight() {
  currentShape.addXChange(1); //add 1 to x value of current shape object
  undraw(currentShapeArr); //undraw current shape
  currentShapeArr = currentShape.getShapeArray(); //get new array values
  if (isXOutofBounds()) {
    currentShape.addXChange(-1);
    currentShapeArr = currentShape.getShapeArray();
  }
  draw(currentShapeArr); //draw shape in new location
}
function moveLeft() {
  currentShape.addXChange(-1); //minus 1 to x value of current shape object
  undraw(currentShapeArr); //undraw current shape
  currentShapeArr = currentShape.getShapeArray(); //get new array values
  if (isXOutofBounds()) { //checks if x values are out of bounds
    currentShape.addXChange(1);//puts x back to previous value
    currentShapeArr = currentShape.getShapeArray();
  }
  draw(currentShapeArr); //draw shape in new location
}
function moveDown() {
  currentShape.addYChange(1);
  undraw(currentShapeArr);
  currentShapeArr = currentShape.getShapeArray();
  if (isYOutOfBounds()) {
    currentShape.addYChange(-1);
    currentShapeArr = currentShape.getShapeArray();
  }
  draw(currentShapeArr);
}

//assign functions to keyCodes
function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    //rotate()
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  makeGrid(25, 30);
  document.addEventListener("keyup", control);
  draw(currentShapeArr);
});
