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

const tetriminoLine = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
];
//need a condition to prevent  0 =< col > grid.width - 1 && 0 =< row > grid.length -1
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
let currentShape = tetriminoSquare.buildShapeArray();

function moveRight() {
  let temp = currentShape;
  undraw(currentShape);
  for (let i = 0; i < temp.length; i++) {
    let xValue = temp[i][1] + 1;
    temp[i][1] = xValue;
  }
  draw(currentShape);
}
function moveLeft() {
  let temp = currentShape;
  undraw(currentShape);
  for (let i = 0; i < temp.length; i++) {
    let xValue = temp[i][1] - 1;
    temp[i][1] = xValue;
  }
  draw(currentShape);
}
function moveDown() {
  let temp = currentShape;
  undraw(currentShape);
  for (let i = 0; i < temp.length; i++) {
    let xValue = temp[i][0] + 1;
    temp[i][0] = xValue;
  }
  draw(currentShape);
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
  draw(currentShape);
});
