import {
  getRandomWalledCell,
  checkWalledCellNeighbours,
  getNextWalledCell,
  getWallBtwTwoAdjCells,
} from "../grid/walls.js";
import { rows, cols } from "../main.js";
import { getDirection, sleep } from "../utils/essentials.js";

let mazeSet;

export async function wilsonsMaze() {
  let entry;
  mazeSet = [getRandomWalledCell()];

  while ((rows + 1) * (cols + 1) > 4 * mazeSet.length) {
    while (true) {
      entry = getRandomWalledCell();
      if (!mazeSet.includes(entry)) {
        break;
      }
    }

    await walk(entry);
    let current = entry;

    while (!mazeSet.includes(current)) {
      mazeSet.push(current);
      let direction = current.direction,
        next = getNextWalledCell(current, direction),
        wall = getWallBtwTwoAdjCells(current, next);

      await sleep(70);

      wall.wall = false;
      wall.cellElement.classList.remove("wall");
      current = next;
    }
  }

  console.log("Done");
}

async function walk(entry) {
  let current = entry;
  while (true) {
    let next = checkWalledCellNeighbours(current),
      direction = getDirection(current, next);

    if (mazeSet.includes(next)) {
      current.direction = direction;
      return;
    } else if (direction == current.direction) {
      continue;
    }

    current.direction = direction;
    current = next;
  }
}
