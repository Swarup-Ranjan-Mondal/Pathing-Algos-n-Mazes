import { Subset } from "../utils/subset.js";
import { getWallSeparatedCells } from "../grid/walls.js";
import { generateId, sleep } from "../utils/essentials.js";

export async function kruskalsMaze(wallsSet) {
  let set = {};

  while (wallsSet.length > 0) {
    let randIndex = Math.floor(Math.random() * wallsSet.length);
    let wall = wallsSet[randIndex];
    wallsSet.splice(randIndex, 1);

    let wallSeparatedCells = getWallSeparatedCells(wall);
    if (wallSeparatedCells.length == 0) {
      continue;
    } else if (
      wallSeparatedCells[0].subsetId == null &&
      wallSeparatedCells[1].subsetId != null
    ) {
      let id = wallSeparatedCells[1].subsetId;
      wallSeparatedCells[0].subsetId = wallSeparatedCells[1].subsetId;
      set[id].insert(wallSeparatedCells[0]);
    } else if (
      wallSeparatedCells[1].subsetId == null &&
      wallSeparatedCells[0].subsetId != null
    ) {
      let id = wallSeparatedCells[0].subsetId;
      wallSeparatedCells[1].subsetId = wallSeparatedCells[0].subsetId;
      set[id].insert(wallSeparatedCells[1]);
    } else if (
      wallSeparatedCells[0].subsetId == null &&
      wallSeparatedCells[1].subsetId == null
    ) {
      let id = generateId(15);
      wallSeparatedCells[0].subsetId = id;
      wallSeparatedCells[1].subsetId = id;
      let subset = new Subset();
      subset.insertMany([wallSeparatedCells[0], wallSeparatedCells[1]]);
      set[id] = subset;
    } else if (
      wallSeparatedCells[0].subsetId == wallSeparatedCells[1].subsetId
    ) {
      continue;
    } else {
      let id1 = wallSeparatedCells[0].subsetId,
        id2 = wallSeparatedCells[1].subsetId;
      set[id2].modifyElementsId(id1);
      set[id1].insertMany(set[id2].getElements());
      delete set[id2];
    }

    await sleep(56);

    wall.wall = false;
    wall.cellElement.classList.remove("wall");
  }

  console.log("Done");
}
