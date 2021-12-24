import { getCellWalls, getWallSeparatedCells } from "../grid/walls.js";
import { sleep } from "../utils/essentials.js";

export async function primsMaze(current) {
  current.walledCellVisited = true;
  let walls = getCellWalls(current);

  while (walls.length > 0) {
    let randIndex = Math.floor(Math.random() * walls.length);
    let wall = walls[randIndex];
    walls.splice(randIndex, 1);

    let wallSeparatedCells = getWallSeparatedCells(wall);
    if (
      wallSeparatedCells[0].walledCellVisited &&
      wallSeparatedCells[1].walledCellVisited
    ) {
      continue;
    } else if (
      !wallSeparatedCells[0].walledCellVisited &&
      !wallSeparatedCells[1].walledCellVisited
    ) {
      continue;
    }

    await sleep(70);

    wall.wall = false;
    wall.cellElement.classList.remove("wall");
    if (!wallSeparatedCells[0].walledCellVisited) {
      current = wallSeparatedCells[0];
    } else if (!wallSeparatedCells[1].walledCellVisited) {
      current = wallSeparatedCells[1];
    }

    current.walledCellVisited = true;
    walls = walls.concat(getCellWalls(current));
  }

  console.log("Done");
}
