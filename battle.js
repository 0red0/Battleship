// ship1	Carrier	   5
// ship2	Battleship	4
// ship3	Cruiser	   3
// ship4	Submarine	3
// ship5	Destroyer	2

// [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 0, 6 ], [ 0, 7 ], [ 0, 8 ], [ 0, 9 ],
// [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 1, 6 ], [ 1, 7 ], [ 1, 8 ], [ 1, 9 ],
// [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 2, 6 ], [ 2, 7 ], [ 2, 8 ], [ 2, 9 ],
// [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ], [ 3, 6 ], [ 3, 7 ], [ 3, 8 ], [ 3, 9 ],
// [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 4, 6 ], [ 4, 7 ], [ 4, 8 ], [ 4, 9 ],
// [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 5, 6 ], [ 5, 7 ], [ 5, 8 ], [ 5, 9 ],
// [ 6, 0 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 6, 6 ], [ 6, 7 ], [ 6, 8 ], [ 6, 9 ],
// [ 7, 0 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 7, 6 ], [ 7, 7 ], [ 7, 8 ], [ 7, 9 ],
// [ 8, 0 ], [ 8, 1 ], [ 8, 2 ], [ 8, 3 ], [ 8, 4 ], [ 8, 5 ], [ 8, 6 ], [ 8, 7 ], [ 8, 8 ], [ 8, 9 ],
// [ 9, 0 ], [ 9, 1 ], [ 9, 2 ], [ 9, 3 ], [ 9, 4 ], [ 9, 5 ], [ 9, 6 ], [ 9, 7 ], [ 9, 8 ], [ 9, 9 ]

//DOM Calls
const myDiv = document.getElementById("myDiv");
const myShips = document.getElementById("myShips");
const boat = document.querySelector(".ship1");

class Ship {
   constructor(name, length) {
      this.name = name;
      this.length = length;
      this.hitsTaken = 0;
      this.sunk = false;
   }
   hit() {
      return ++this.hitsTaken;
   }
   isSunk() {
      if (this.hitsTaken === this.length) {
         this.sunk = true;
      }
      return this.sunk;
   }
}

let theCarrier = new Ship("carrier", 5);

class GameBoard {
   constructor() {
      this.cells = 100;
   }
   size() {
      let arr = [];
      for (let i = 0; i < 10; i++) {
         for (let j = 0; j < 10; j++) {
            arr.push([i, j]);
         }
      }
      return arr;
   }
   createBoard() {
      //array of cells coordinates [0,0] to [9,9]
      let cellsCoords = this.size();
      cellsCoords.forEach((cell) => {
         createCell(cell[0], cell[1]);
      });
   }
}

function createCell(x, y) {
   const cell = document.createElement("span");
   // cell.innerText = `[${x}, ${y}]`;
   cell.setAttribute("draggable", "true");
   cell.addEventListener("dragover", dragOver);
   cell.addEventListener("dragenter", dragEnter);
   cell.addEventListener("dragleave", dragLeave);
   cell.addEventListener("drop", dragDrop);
   myDiv.append(cell);
}

let myBoard = new GameBoard();

myBoard.createBoard();

//Dragging Action

let currTile;
let otherTile;

boat.addEventListener("dragstart", dragStart);
boat.addEventListener("dragend", dragEnd);

function dragStart() {
   currTile = this;
}
function dragOver(e) {
   e.preventDefault();
}
function dragEnter(e) {
   e.preventDefault();
}
function dragLeave() {}
function dragDrop() {
   otherTile = this;
}
function dragEnd() {
   // otherTile.innerText = "";
   otherTile.append(currTile);
   // cell.innerText = "";
   // let currImg = currTile;
   // let otherImg = otherTile;
   // currTile = otherImg;
   // otherTile = currImg;
}

// function dragonThis(thing) {
//    thing.addEventListener("dragstart", dragStart);
//    thing.addEventListener("dragover", dragOver);
//    thing.addEventListener("dragenter", dragEnter);
//    thing.addEventListener("dragleave", dragLeave);
//    thing.addEventListener("drop", dragDrop);
//    thing.addEventListener("dragend", dragEnd);
// }
