import { getCellWalls, getWallSeparatedCells } from "../walls.js";
import { sleep } from "../essential.js";

export async function primsMaze(current) {
  current.walledCellVisited = true;
  var walls = getCellWalls(current);

  while (walls.length > 0) {
    var randIndex = Math.floor(Math.random() * walls.length);
    var wall = walls[randIndex];
    walls.splice(randIndex, 1);

    var wallSeparatedCells = getWallSeparatedCells(wall);
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

    await sleep(100);

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
