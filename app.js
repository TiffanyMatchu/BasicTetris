let gridArray = [];
function makeGrid(l,w) {
    let gridDiv = document.getElementById("gameGrid");
    for (let i = 0; i < l; i++) {
      let row = document.createElement("div");
      let rowID = "row" + i;
      row.id = rowID;
      row.className = "row"
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
document.addEventListener('DOMContentLoaded', () => {
  makeGrid(25, 30);
  console.log(gridArray);
})


