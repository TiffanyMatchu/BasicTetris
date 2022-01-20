import {Tetrimino} from "./modules/Tetrimino.js";

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
function moveRight() {
  
}
const tetriminoSquare = new Tetrimino(0, 0, "square").buildShapeArray();
let currentShape = tetriminoSquare;
let moveRight3 = new Tetrimino(0, 0, "square").buildShapeArray();
console.log(moveRight);
document.addEventListener("DOMContentLoaded", () => {
  makeGrid(25, 30);
  draw(moveRight3);



});
