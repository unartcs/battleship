import "./style.css";
import Ship from "./Ship";

const hitButton = document.querySelector(".hitBtn") as HTMLButtonElement
const shipHpBox = document.querySelector(".ship-hp") as HTMLHeadingElement

let ship1 = new Ship("Nautilus", 5);

function checkLife(ship: Ship) {
  return ship.isAlive();
}

function setUI() {
  if (ship1.hp == 0) {
    shipHpBox.textContent = `${ship1.name} has sunk`
  } else {
    shipHpBox.textContent = `${ship1.hp}`
  }
}

hitButton?.addEventListener("click", (e) => {
  e.preventDefault();
  if (ship1.isAlive()) {
    ship1.hit()
    setUI()
    console.log(`Hit ship ${ship1.name} HP: ${ship1.hp}`);
  }
  else {
    console.log('Ship already sunk!')
  }
});

setUI();
