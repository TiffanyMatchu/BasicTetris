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
let numberRows = 20;
let numberCols = 14;
let shapeStartingX = numberCols / 2 - 1;
let gameBoardDiv = document.getElementById("gameGrid");
let rowsToClear = [];
let score = 0;
let defaultColColor = "#a06ab4de";
let startButton = document.getElementById("start-button");

const tetriminoO = new TetriminoO(shapeStartingX, 0, "#FBC740");
const tetriminoI = new TetriminoI(shapeStartingX, 0, "#FF0BAC");
const tetriminoJ = new TetriminoJ(shapeStartingX, 0, "#009CDF");
const tetriminoL = new TetriminoL(shapeStartingX, 0, "#AAE23B");
const tetriminoS = new TetriminoS(shapeStartingX, 0, "#36D6E7");
const tetriminoZ = new TetriminoZ(shapeStartingX, 0, "#E6694C");
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
/*CLEARING MORE THAN ONE ROW TRIGGERS GAME OVER;*/ 
function getRandomShape(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomShape = Math.floor(Math.random() * (max - min + 1) + min);
  return allTetrimons[randomShape];
}
function startNewShape() {
  currentShape = getRandomShape(0, allTetrimons.length - 1);
  currentShape.xChange = shapeStartingX; //reset x and y for new shapes
  currentShape.yChange = 0;
  currentShapeArr = currentShape.getCoordinates();
   if (isTaken()) {
     clearInterval(timerId);
     draw();
     document.getElementById("gameOverIMG").style = "display: block;";
   }
}
function makeGrid(l, w) {
  for (let i = 0; i < l; i++) {
    let row = document.createElement("div");
    let rowID = "row" + i;
    row.id = rowID;
    row.className = "row";
    gameBoardDiv.appendChild(row);
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
  let rowNodeChildren = gameBoardDiv.querySelectorAll(".row");
  for (let i = 0; i < currentShapeArr.length; i++) {
    let row = rowNodeChildren[currentShapeArr[i][0]];
    let col = currentShapeArr[i][1];
    let box = row.querySelectorAll(".col");
    box[col].style.backgroundColor = currentShape.color;
    box[col].className = "taken col"; //sets id to taken if shape occupys it
  }
}
function undraw() {
  let rowNodeChildren = gameBoardDiv.querySelectorAll(".row");
  for (let i = 0; i < currentShapeArr.length; i++) {
    let row = rowNodeChildren[currentShapeArr[i][0]];
    let col = currentShapeArr[i][1];
    let box = row.querySelectorAll(".col");
    box[col].style.backgroundColor = defaultColColor;
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
function isTaken() {
  for (let i = 0; i < currentShapeArr.length; i++) {
    let row = "row" + currentShapeArr[i][0];
    let col = currentShapeArr[i][1];
    let rowChildren = document.getElementById(row).querySelectorAll(".col");
    if (rowChildren[col].className === "taken col") {
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
  if (isOutOfBounds() || isTaken()) {
    //if reaches bottom of grid
    currentShape.addYChange(-1);
    currentShapeArr = currentShape.getCoordinates();
    draw(currentShapeArr);
    if (rowsToBeCleared() === true) {
      clearRows();
    }
    startNewShape();
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

function rowsToBeCleared() {
  let maxYValue = Math.max(...currentShapeArr.flat());
  let rowNodeChildren = gameBoardDiv.querySelectorAll(".row");
  for (let i = maxYValue - 4; i <= maxYValue; i++) {
    let currenRow = rowNodeChildren[i];
    let colList = currenRow.querySelectorAll(".taken.col");
    if (colList.length === numberCols) {
      rowsToClear.push(i);
    }
  }
  if (rowsToClear.length > 0) {
    return true;
  }
  return false;
}
function clearColColors(row) {
  let rowNodeChildren = row.querySelectorAll(".col");
  rowNodeChildren.forEach((element) => {
    element.style.backgroundColor = defaultColColor;
    element.className = "col";
  });
}

function clearRows() {
  clearInterval(timerId);
  calculatePoints(rowsToClear.length);
  let rowNodeChildren = gameBoardDiv.querySelectorAll(".row");
  rowsToClear.forEach((element) => {
    let rowNum = element;
    let currentRow = rowNodeChildren[rowNum];
    clearColColors(currentRow);
    while (rowNum > -1) {
      let previousRow;
      if (rowNum === 0) {
        previousRow = rowNodeChildren[0];
      } else {
        previousRow = rowNodeChildren[rowNum - 1];
      }
      gameGrid.insertBefore(currentRow, previousRow);
      let tempID = currentRow.id;
      currentRow.id = previousRow.id;
      previousRow.id = tempID;
      rowNum--;
    }
  });
  updateScoreSpan();
  rowsToClear = [];
  startNewShape();
  timerId = setInterval(moveDown, 1000);
}
function calculatePoints(numRows) {
  switch (numRows) {
    case 1:
      return (score += 100);
    case 2:
      return (score += 200);
    case 3:
      return (score += 300);
    case 4:
      return (score += 600);
    default:
      break;
  }
}
function updateScoreSpan() {
  document.getElementById("score").textContent = score;
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

startButton.addEventListener("click", () => {
  if (timerId) {
    startButton.innerHTML = "Start";
    document.removeEventListener("keyup", control);
    clearInterval(timerId);
    timerId = null;
  } else if (timerId === null) {
    startButton.innerHTML = "Pause";
    document.addEventListener("keyup", control);
    timerId = setInterval(moveDown, 1000);
  } else {
    startNewShape();
    draw();
    document.addEventListener("keyup", control);
    startButton.innerHTML = "Pause";
    timerId = setInterval(moveDown, 1000);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  makeGrid(numberRows, numberCols);
});
