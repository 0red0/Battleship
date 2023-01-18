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
const myShips = document.getElementById("myShips");
const pcShips = document.getElementById("pcShips");
const info = document.querySelector(".info");
const battleInfo = document.querySelector(".info .battle-info");
const report = document.querySelector(".status data");
const attempts = document.querySelector(".attempts data");

let directions = ["horizontal", "vertical"];
let wid = 10;
let myArray = [];
let pcArray = [];

let Carrier = 1;
let Battleship = 1;
let Cruiser = 1;
let Submarine = 1;
let Destroyer = 1;

const ships = [
   {
      name: "destroyer",
      directions: [
         [0, 1],
         [0, wid],
      ],
   },
   {
      name: "submarine",
      directions: [
         [0, 1, 2],
         [0, wid, wid * 2],
      ],
   },
   {
      name: "cruiser",
      directions: [
         [0, 1, 2],
         [0, wid, wid * 2],
      ],
   },
   {
      name: "battleship",
      directions: [
         [0, 1, 2, 3],
         [0, wid, wid * 2, wid * 3],
      ],
   },
   {
      name: "carrier",
      directions: [
         [0, 1, 2, 3, 4],
         [0, wid, wid * 2, wid * 3, wid * 4],
      ],
   },
];

// Functions Calling

createCells(myShips, myArray);
ships.forEach((s) => generate(directions, s, myArray));

createCells(pcShips, pcArray);
ships.forEach((s) => generate(directions, s, pcArray));

function generate(dir, ship, cells) {
   let randomDir = Math.floor(Math.random() * 2); // 1 or 0
   let mainDir = 1;
   if (randomDir) mainDir = 10;
   let shipDirArr = ship.directions[randomDir]; //arr of directions
   let randomCell = Math.abs(
      Math.floor(
         Math.random() * cells.length - ship.directions[0].length * mainDir
      )
   );

   const isTaken = shipDirArr.some((index) =>
      cells[index + randomCell].classList.contains("taken")
   );
   const isOverboard = shipDirArr.some(
      (index) => (index + randomCell) % 10 === 9
   );
   const isOverEdge = shipDirArr.some(
      (index) => (index + randomCell) % 10 === 0
   );

   if (!isTaken && !isOverEdge && !isOverboard)
      shipDirArr.forEach((index) => {
         cells[index + randomCell].classList.add("taken", ship.name, "ship");
      });
   else generate(dir, ship, cells);
}

function createCells(board, arr) {
   for (let i = 0; i < 100; i++) {
      const cell = document.createElement("span");
      cell.dataset.order = i;
      board.append(cell);

      arr.push(cell);
   }
}

pcShips.addEventListener("click", (e) => {
   if (e.target.classList.contains("checked")) return;

   e.target.classList.add("checked");
   pcArray.shift(e.target);

   // console.log(e.target.classList);
   // console.log(e.target.className);

   if (e.target.classList.contains("ship")) {
      e.target.classList.add("dest");
      e.target.classList.remove("taken");
   }

   let shipsNames = ships.map((x) => x.name);
   if (shipsNames.includes(e.target.classList[0])) {
      console.log(e.target.classList[0]);
      e.target.classList.remove(e.target.classList[0]);
   }

   let allDestroyed = pcArray.some((el) => el.classList.contains("taken"));
   if (!allDestroyed) {
      report.innerText = "VICTORY. pc ships Destroyed"; //win condition
      attempts.innerText = 100 - pcArray.length;
      // pcShips.setAttribute("disabled");
   }

   //check if Destroyer is sunk
   let destroyerAlive = pcArray.some((l) => l.classList.contains("destroyer"));
   if (!destroyerAlive) ++Destroyer;
   if (Destroyer == 2) {
      let txt4 = document.createTextNode("Destroyer Sunk !");
      let p4 = document.createElement("p");
      p4.appendChild(txt4);
      battleInfo.append(p4);
   }

   //check if Cruiser is sunk
   let cruiserAlive = pcArray.some((el) => el.classList.contains("cruiser"));
   if (!cruiserAlive) ++Cruiser;
   if (Cruiser == 2) {
      let txt5 = document.createTextNode("Cruiser Sunk !");
      let p5 = document.createElement("p");
      p5.appendChild(txt5);
      battleInfo.append(p5);
   }

   //check if Carrier is sunk
   let carrierAlive = pcArray.some((el) => el.classList.contains("carrier"));
   if (!carrierAlive) ++Carrier;
   if (Carrier == 2) {
      let txt1 = document.createTextNode("Carrier Sunk !");
      let p1 = document.createElement("p");
      p1.appendChild(txt1);
      battleInfo.append(p1);
   }

   //check if Battleship is sunk
   let battleshipAlive = pcArray.some((l) =>
      l.classList.contains("battleship")
   );
   if (!battleshipAlive) ++Battleship;
   if (Battleship == 2) {
      let txt2 = document.createTextNode("Battleship Sunk !");
      let p2 = document.createElement("p");
      p2.appendChild(txt2);
      battleInfo.append(p2);
   }

   //check if Submarine is sunk
   let submarineAlive = pcArray.some((l) => l.classList.contains("submarine"));
   if (!submarineAlive) ++Submarine;
   if (Submarine == 2) {
      let txt3 = document.createTextNode("Submarine Sunk !");
      let p3 = document.createElement("p");
      p3.appendChild(txt3);
      battleInfo.append(p3);
   }

   console.log("enemy div");
});
