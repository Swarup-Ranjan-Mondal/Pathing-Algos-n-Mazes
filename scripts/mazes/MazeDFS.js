import { grid } from "../main.js";
import { sleep } from "../utils/essentials.js";
import { checkWalledCellNeighbours } from "../grid/walls.js";

let stack = [];

export async function DFSmazeGenerator(current) {
  current.walledCellVisited = true;
  let neighbour = checkWalledCellNeighbours(current);

  if (neighbour) {
    /* Push Current Cell to stack */
    stack.push(current);

    await sleep(70);

    /* Remove the wall between current and neighbour */
    let x = (current.x + neighbour.x) / 2,
      y = (current.y + neighbour.y) / 2,
      cell = grid[y][x];
    cell.walledCellVisited = true;
    cell.wall = false;
    cell.cellElement.classList.remove("wall");

    /* Call the recursive function with the neighbour as current cell */
    await DFSmazeGenerator(neighbour);
  } else if (stack.length > 0) {
    await DFSmazeGenerator(stack.pop());
  } else {
    console.log("Done");
  }
}
