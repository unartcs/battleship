import "./style.css";
import Ship from "./Ship";
import Gameboard from "./Gameboard";

const gameContainer = document.querySelector(
  ".game-container"
) as HTMLDivElement;
const rotationBtn = document.querySelector(
  ".game-rotation-button"
) as HTMLButtonElement;
const shipListDOM = document.querySelector(".ship-list") as HTMLDivElement;

let ship1 = new Ship("Nautilus", 5);
let ship2 = new Ship("Darwin", 4);
let ship3 = new Ship("Chimney", 3);
let ship4 = new Ship("Zeta", 2);
let shipList: Ship[] = [ship1, ship2, ship3, ship4];
let activeShip = ship1;
let gameBoard = new Gameboard();
let vertical: boolean = true;
// let gameBoardDOMArray: HTMLDivElement[] = [];
let gameBoardDOMArray: HTMLDivElement[][] = [];

function drawBoard() {
  let sizeOffset: number = gameBoard.size * 5;
  gameContainer.style.gridTemplateColumns = `repeat(${gameBoard.size}, ${sizeOffset}px)`;
  for (let j = 0; j < gameBoard.size; j++) {
    gameBoardDOMArray[j] = [];
    for (let i = 0; i < gameBoard.size; i++) {
      let box = document.createElement("div") as HTMLDivElement;
      box.classList.add("game-box");
      box.style.height = `${sizeOffset}px`;
      box.style.width = `${sizeOffset}px`;
      gameContainer.appendChild(box);
      gameBoardDOMArray[j].push(box);
    }
  }
  enableGrid();
  console.log(gameBoardDOMArray);
}

function enableGrid() {
  gameBoardDOMArray.forEach((item) => {
    item.forEach((pos) => {
      pos.addEventListener("click", () => {
        // console.log(pos)
        let x = item.indexOf(pos);
        let y = gameBoardDOMArray.indexOf(item);
        console.log(x, y);
        for (let i = 0; i < activeShip.length; i++) {
          if (
            !vertical &&
            x + activeShip.length < gameBoardDOMArray[y].length + 1
          ) {
            gameBoardDOMArray[y][x + i].style.backgroundColor = "blue";
            gameBoardDOMArray[y][x + i].textContent = "X";
          } else if (
            vertical &&
            y + activeShip.length < gameBoardDOMArray[x].length + 1
          ) {
            gameBoardDOMArray[y + i][x].style.backgroundColor = "blue";
            gameBoardDOMArray[y + i][x].textContent = "X";
          }
        }
      });
    });
  });
}

rotationBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (vertical) {
    vertical = !vertical;
    rotationBtn.textContent = "Horizontal";
  } else {
    vertical = !vertical;
    rotationBtn.textContent = "Vertical";
  }
});

function setUI() {
  shipList.forEach((ship) => {
    let shipDOMDiv = document.createElement("div") as HTMLDivElement;
    let shipDOMRadio = document.createElement("input") as HTMLInputElement;
    let shipDOMLabel = document.createElement("label") as HTMLLabelElement;
    let shipDomIcon: HTMLSpanElement;
    let shipDOMIconGroup = document.createElement("div") as HTMLDivElement;
    let shipDOMTextGroup = document.createElement("div") as HTMLDivElement;
    shipDOMTextGroup.classList.add("ship-item-text-group");
    shipDOMDiv.classList.add("ship-item");
    shipDOMRadio.type = "radio";
    shipDOMLabel.htmlFor = ship.name;
    shipDOMLabel.textContent = ship.name;
    shipDOMRadio.name = "ship";
    shipDOMRadio.value = ship.name;
    shipDOMDiv.appendChild(shipDOMIconGroup);
    shipDOMTextGroup.appendChild(shipDOMRadio);
    shipDOMTextGroup.appendChild(shipDOMLabel);
    shipListDOM.appendChild(shipDOMTextGroup);
    shipListDOM.appendChild(shipDOMDiv);
    shipDOMIconGroup.classList.add("ship-item-icon-group");
    for (let i = 0; i < ship.length; i++) {
      shipDomIcon = document.createElement("span") as HTMLSpanElement;
      shipDomIcon.classList.add("ship-item-icon");
      shipDOMIconGroup.appendChild(shipDomIcon);
    }
  });
}

function chooseShip() {
  let selectedShip = document.querySelectorAll('input[name="ship"]') as HTMLInputElement | any;
  selectedShip.forEach((item: HTMLInputElement) => {
    item.addEventListener("click", () => {
      shipList.filter((ship) => {
        console.log(item.value)
        if (ship.name === item.value) {
          activeShip = shipList[shipList.indexOf(ship)] 
        }
      });
      console.log(activeShip)
    });

  });
}

setUI();
chooseShip();
drawBoard();
