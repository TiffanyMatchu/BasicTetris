import { TetriminoO } from "./modules/TetriminoO.js";
import { TetriminoI } from "./modules/TetriminoI.js";
import { TetriminoJ } from "./modules/TetriminoJ.js";
import { TetriminoL } from "./modules/TetriminoL.js";
import { TetriminoS } from "./modules/TetriminoS.js";
import { TetriminoZ } from "./modules/TetriminoZ.js";
import { TetriminoT } from "./modules/TetriminoT.js";

let currentShape;
let currentShapeArr;
let timerId;
let numberRows = 24;
let numberCols = 16;
let shapeStartingX = (numberCols/2) - 1;

const tetriminoO = new TetriminoO(shapeStartingX, 0, "#FAE60C");
const tetriminoI = new TetriminoI(shapeStartingX, 0, "#22a1f5");
const tetriminoJ = new TetriminoJ(shapeStartingX, 0, "#001cf0");
const tetriminoL = new TetriminoL(shapeStartingX, 0, "#f07800");
const tetriminoS = new TetriminoS(shapeStartingX, 0, "#33ed09");
const tetriminoZ = new TetriminoZ(shapeStartingX, 0, "#ed2630");
const tetriminoT = new TetriminoT(shapeStartingX, 0, "#8d09e6");

const allTetrimons = [
  tetriminoO,
  tetriminoI,
  tetriminoJ,
  tetriminoL,
  tetriminoS,
  tetriminoZ,
  tetriminoT,
];

function getRandomShape(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomShape = Math.floor(Math.random() * (max - min + 1) + min);
  return allTetrimons[randomShape];
}
function startCurrentShape() {
  currentShape = getRandomShape(0, allTetrimons.length - 1);
  currentShape.xChange = shapeStartingX; //reset x and y for new shapes
  currentShape.yChange = 0;
  currentShapeArr = currentShape.getCoordinates();
}
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
  }
}

function draw() {
  for (let i = 0; i < currentShapeArr.length; i++) {
    let row = "row" + currentShapeArr[i][0];
    let col = currentShapeArr[i][1];
    let box = document.getElementById(row).querySelectorAll(".col");
    box[col].style.backgroundColor = currentShape.color;
    box[col].className = "taken col"; //sets id to taken if shape occupys it
  }
}
function undraw() {
  for (let i = 0; i < currentShapeArr.length; i++) {
    let row = "row" + currentShapeArr[i][0];
    let col = currentShapeArr[i][1];
    let box = document.getElementById(row).querySelectorAll(".col");
    box[col].style.backgroundColor = "#EBEBEB";
    box[col].className = "col"; //undos taken if shape occupys it
  }
}
function isOutOfBounds() {
  for (let i = 0; i < currentShapeArr.length; i++) {
    if (
      currentShapeArr[i][1] > numberCols - 1 ||
      currentShapeArr[i][1] < 0 ||
      currentShapeArr[i][0] > numberRows - 1
    ) {
      return true;
    }
  }
  return false;
}
function moveRight() {
  currentShape.addXChange(1); //add 1 to x value of current shape object
  undraw(currentShapeArr); //undraw current shape
  currentShapeArr = currentShape.getCoordinates(); //get new array values
  if (isOutOfBounds() || isTaken()) {
    currentShape.addXChange(-1);
    currentShapeArr = currentShape.getCoordinates();
  }
  draw(currentShapeArr); //draw shape in new location
}
function moveLeft() {
  currentShape.addXChange(-1); //minus 1 to x value of current shape object
  undraw(currentShapeArr); //undraw current shape
  currentShapeArr = currentShape.getCoordinates(); //get new array values
  if (isOutOfBounds() || isTaken()) {
    //checks if x values are out of bounds
    currentShape.addXChange(1); //puts x back to previous value
    currentShapeArr = currentShape.getCoordinates();
  }
  draw(currentShapeArr); //draw shape in new location
}
function moveDown() {
  currentShape.addYChange(1);
  undraw(currentShapeArr);
  currentShapeArr = currentShape.getCoordinates();
  if (isOutOfBounds()) {
    //if reaches bottom of grid
    currentShape.addYChange(-1);
    currentShapeArr = currentShape.getCoordinates();
    draw(currentShapeArr);
    startCurrentShape();
  }
  if (isTaken()) {
    currentShape.addYChange(-1);
    currentShapeArr = currentShape.getCoordinates();
    draw(currentShapeArr);
    startCurrentShape();
  } else {
    draw(currentShapeArr);
  }
}
function rotate() {
  let previousRotation = currentShape.rotation;
  currentShape.rotation++;
  if (currentShape.rotation > currentShapeArr.length - 1) {
    currentShape.rotation = 0;
  }
  undraw();
  currentShapeArr = currentShape.getCoordinates();
  if (isOutOfBounds() || isTaken()) {
    currentShape.rotation = previousRotation;
    currentShapeArr = currentShape.getCoordinates();
  }
  draw();
}
function isTaken() {
  for (let i = 0; i < currentShapeArr.length; i++) {
    let row = "row" + currentShapeArr[i][0];
    console.log(row);
    let col = currentShapeArr[i][1];
    let rowChildren = document.getElementById(row).querySelectorAll(".col");
    if (rowChildren[col].className === "taken col") {
      return true;
    }
  }
  return false;
}
//assign functions to keyCodes
function control(e) {
  if (e.keyCode === 37) {
    //left key
    moveLeft();
  } else if (e.keyCode === 38) {
    //upkey
    rotate();
  } else if (e.keyCode === 39) {
    //right key
    moveRight();
  } else if (e.keyCode === 40) {
    //down ley
    moveDown();
  }
}

document.getElementById("start-button").addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    startCurrentShape();
    draw();
    timerId = setInterval(moveDown, 1000);
  }
});
document.addEventListener("keyup", control);
document.addEventListener("DOMContentLoaded", () => {
  makeGrid(24, 16);
});
