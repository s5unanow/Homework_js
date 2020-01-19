class Spiral {
  constructor (width, height) {
    this.table = this.constructSpiralTable(width, height);
  }

  constructSpiralTable(width, height) {
    let table = createTableWithZeroes(width, height);
    let data = createSpiralData(width, height);
    let xStart = 0;
    let yStart = 0;
    let xEnd = width - 1;
    let yEnd = height - 1;

    while (data.length > 0) {

      if (data.length > 0) {
        for (let i = 0; i < width; i++) {
          if (!table[yStart][i]) {
            table[yStart][i] = data.shift();
          }
        }
      }
      yStart++;

      if (data.length > 0) {
        for (let i = 0; i < height; i++) {
          if (!table[i][xEnd]) {
            table[i][xEnd] = data.shift();
          }
        }
      }
      xEnd--;

      if (data.length > 0) {
        for (let i = width - 1; i >= 0; i--) {
          if (!table[yEnd][i]) {
            table[yEnd][i] = data.shift();
          }
        }
      }
      yEnd--;

      if (data.length > 0) {
        for (let i = height - 1; i >= 0; i--) {
          if (!table[i][xStart]) {
            table[i][xStart] = data.shift();
          }
        }
      }
      xStart++;
    }
    return table
  }

  getSpiralTable() { return this.table }
}

function createTableWithZeroes(width, height) {
  let table = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let i = 0; i < width; i++) {
      row.push(null);
    }
    table.push(row);
  }
  return table
}

function createSpiralData (width, height) {
  let data = [];
  let size = width * height;
  for (let i = 1; i <= size; i++) {
    data.push(i);
  }
  return data
}

class DOMtableDraw {
  constructor(DOMparent, table) {
    this.table = table;
    this.dom = this.DOMcreate();
    this.DOMparent = DOMparent;
  }

  DOMcreate () {
    let tableContainer = createDomElement("div", {"class": "container-table"});
    this.table.forEach(row => {
      let DOMrow = createDomElement("div", {"class": "row"});
        row.forEach(cellNum => {
          let DOMcell = createDomElement("div", {"class": "cell", "data-num" : cellNum});
          DOMrow.appendChild(DOMcell);
        });
      tableContainer.append(DOMrow);
    });
    return tableContainer;
  }

  draw(table) {
    console.log("table really drawn");
    this.remove();
    this.table = table;
    this.dom = this.DOMcreate();
    this.DOMparent.appendChild(this.dom);
  }
  remove() {
    this.dom.remove();
  }
}


function createDomElement (tag, attrs) {
  let elem = document.createElement(tag);
  for (let attr in attrs) {
    elem.setAttribute(attr, attrs[attr]);
  }
  return elem
}

const tableDraw = new DOMtableDraw(document.body, []);

const widthField = document.getElementById("width");
const heightField = document.getElementById("height");
const btnDrawTable = document.getElementById("btn-draw-table");

btnDrawTable.addEventListener("click", () => {
  const width = parseInt(widthField.value, 10);
  const height = parseInt(heightField.value, 10);
  console.log(width, height);
  if (!isNaN(width) && !isNaN(height)) {
    console.log("table drawn");
    const spiral = new Spiral(width, height);
    tableDraw.draw(spiral.getSpiralTable());
  }
});