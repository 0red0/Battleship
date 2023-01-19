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
const pcShipsAfter = document.querySelector(".pcShipsAfter");
const pcStatus = document.querySelector(".pc-status");
const pcAttempts = document.querySelector(".pc-attempts");
const pcShots = document.querySelector(".pc-shots");
const pcDest = document.querySelector(".pc-destroyed");
const playerStatus = document.querySelector(".player-status");
const playerAttempts = document.querySelector(".player-attempts");
const playerShots = document.querySelector(".player-shots");
const playerDest = document.querySelector(".player-destroyed");
const btn = document.querySelector("button");

let directions = ["horizontal", "vertical"];
let wid = 10;
let myArray = [];
let pcArray = [];

//Numbers of ships on the board
let Carrier = {
   player: 1,
   pc: 1,
};
let Battleship = {
   player: 1,
   pc: 1,
};
let Cruiser = {
   player: 1,
   pc: 1,
};
let Submarine = {
   player: 1,
   pc: 1,
};
let Destroyer = {
   player: 1,
   pc: 1,
};

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

//Player turn

pcShips.addEventListener("click", (e) => {
   if (e.target.classList.contains("checked")) return;

   e.target.classList.add("checked");

   if (e.target.classList.contains("ship")) {
      e.target.classList.add("dest");
      e.target.classList.remove("taken");
      pcShots.innerText = "Hit";
   } else {
      pcShots.innerText = "Miss";
   }

   let shipsNames = ships.map((x) => x.name);
   if (shipsNames.includes(e.target.classList[0])) {
      e.target.classList.remove(e.target.classList[0]); //remove shipName
   }

   let allDestroyed = pcArray.some((el) => el.classList.contains("taken"));
   if (!allDestroyed) {
      playerStatus.innerText = "VICTORY. PC ships Destroyed"; //win condition
      pcStatus.innerText = "DEFEAT~!. PC ships Destroyed"; //win condition
      let tmp = pcArray.filter((x) => x.classList.contains("checked"));
      pcAttempts.innerText = `Attempts = ${tmp.length}`;
   }

   destroyedShips(pcArray, pcDest, "pc");

   pcShipsAfter.style.display = "block";

   setTimeout(() => {
      pcTurn();
      pcShipsAfter.style.display = "none";
   }, 500);
});

//pc turn

function pcTurn() {
   let randomHit = myArray[Math.floor(Math.random() * 99)];

   if (randomHit.classList.contains("checked")) pcTurn();

   randomHit.classList.add("checked");

   if (randomHit.classList.contains("ship")) {
      randomHit.classList.add("dest");
      randomHit.classList.remove("taken");
      playerShots.innerText = "Hit";
   } else {
      playerShots.innerText = "Miss";
   }

   let shipsNames = ships.map((x) => x.name);
   if (shipsNames.includes(randomHit.classList[0])) {
      randomHit.classList.remove(randomHit.classList[0]); //remove shipName
   }

   let allDestroyed = myArray.some((el) => el.classList.contains("taken"));
   if (!allDestroyed) {
      playerStatus.innerText = "DEFEAT~!. Your ships Destroyed"; //Loss condition
      pcStatus.innerText = "Victory. your ships Destroyed"; //Loss condition

      let tmpArr = myArray.filter((x) => x.classList.contains("checked"));
      playerAttempts.innerText = `Attempts = ${tmpArr.length}`;
   }

   destroyedShips(myArray, playerDest, "player");
}

function destroyedShips(arr, dest, turn) {
   //check if Destroyer is sunk
   let destroyerAlive = arr.some((l) => l.classList.contains("destroyer"));
   if (!destroyerAlive) Destroyer[turn] = Destroyer[turn] + 1 || 1;
   if (Destroyer[turn] == 2) {
      let txt4 = document.createTextNode("Destroyer Sunk !");
      let p4 = document.createElement("p");
      p4.appendChild(txt4);
      dest.append(p4);
   }

   //check if Cruiser is sunk
   let cruiserAlive = arr.some((el) => el.classList.contains("cruiser"));
   if (!cruiserAlive) Cruiser[turn] = Cruiser[turn] + 1 || 1;
   if (Cruiser[turn] == 2) {
      let txt5 = document.createTextNode("Cruiser Sunk !");
      let p5 = document.createElement("p");
      p5.appendChild(txt5);
      dest.append(p5);
   }

   //check if Carrier is sunk
   let carrierAlive = arr.some((el) => el.classList.contains("carrier"));
   if (!carrierAlive) Carrier[turn] = Carrier[turn] + 1 || 1;
   if (Carrier[turn] == 2) {
      let txt1 = document.createTextNode("Carrier Sunk !");
      let p1 = document.createElement("p");
      p1.appendChild(txt1);
      dest.append(p1);
   }

   //check if Battleship is sunk
   let battleshipAlive = arr.some((l) => l.classList.contains("battleship"));
   if (!battleshipAlive) Battleship[turn] = Battleship[turn] + 1 || 1;
   if (Battleship[turn] == 2) {
      let txt2 = document.createTextNode("Battleship Sunk !");
      let p2 = document.createElement("p");
      p2.appendChild(txt2);
      dest.append(p2);
   }

   //check if Submarine is sunk
   let submarineAlive = arr.some((l) => l.classList.contains("submarine"));
   if (!submarineAlive) Submarine[turn] = Submarine[turn] + 1 || 1;
   if (Submarine[turn] == 2) {
      let txt3 = document.createTextNode("Submarine Sunk !");
      let p3 = document.createElement("p");
      p3.appendChild(txt3);
      dest.append(p3);
   }
}

btn.addEventListener("click", () => {
   let tmpo = pcArray.filter((x) => x.classList.contains("ship"));
   tmpo.forEach((s) => s.classList.toggle("show"));
   console.log("btn");
});
