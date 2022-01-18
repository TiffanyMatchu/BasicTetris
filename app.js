let gridArray = [];
function makeGrid(l,w) {
    let gridDiv = document.getElementById("gameGrid");
    for (let i = 0; i < l; i++) {
      let row = document.createElement("div");
      row.id = "row" + i;
      row.className = "row"
      gridDiv.appendChild(row);
      let currentRow = document.getElementById("row" + i);
      for (let j = 0; j < w; j++) {
        let col = document.createElement("div");
        col.id = "col" + j;
        col.className = "col";
        currentRow.appendChild(col);
      }
    }
}
document.addEventListener('DOMContentLoaded', () => {    
    makeGrid(25,30);
})
