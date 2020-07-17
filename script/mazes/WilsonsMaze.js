import {
  getRandomWalledCell,
  checkWalledCellNeighbours,
  getNextWalledCell,
  getWallBtwTwoAdjCells,
} from "../walls.js";
import { getDirection, sleep } from "../essential.js";
import { rows, cols } from "../script.js";

let mazeSet;

export async function wilsonsMaze() {
  var entry;
  mazeSet = [getRandomWalledCell()];

  while ((rows + 1) * (cols + 1) > 4 * mazeSet.length) {
    while (true) {
      entry = getRandomWalledCell();
      if (!mazeSet.includes(entry)) {
        break;
      }
    }

    await walk(entry);
    var current = entry;

    while (!mazeSet.includes(current)) {
      mazeSet.push(current);
      var direction = current.direction,
        next = getNextWalledCell(current, direction),
        wall = getWallBtwTwoAdjCells(current, next);

      await sleep(100);

      wall.wall = false;
      wall.cellElement.classList.remove("wall");
      current = next;
    }
  }

  console.log("Done");
}

async function walk(entry) {
  var current = entry;
  while (true) {
    var next = checkWalledCellNeighbours(current),
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
