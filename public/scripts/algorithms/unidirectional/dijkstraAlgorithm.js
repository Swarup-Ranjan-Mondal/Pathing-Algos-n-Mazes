import { liveUpdate } from "../../main.js";
import { pathTracing } from "../../grid/path.js";
import { sleep } from "../../utils/essentials.js";

export async function dijkstraPathfinding(start, end) {
  let unvisited = [];
  let current = start;
  current.g = 0;
  unvisited.push(current);
  current.cellElement.classList.add("marked");
  if (!liveUpdate) {
    await sleep(0);
  }

  while (unvisited.length > 0) {
    current = unvisited[0];
    unvisited.splice(0, 1);
    current.cellElement.classList.remove("marked");
    current.cellElement.classList.add("visited");
    if (!liveUpdate) {
      await sleep(0);
    } else {
      current.cellElement.classList.add("no-animation");
    }

    if (current == end) {
      console.log("Search Successful");
      await pathTracing(end);
      return;
    }

    let neighbouringCells = current.neighbours;

    for (let i = 0; i < neighbouringCells.length; i++) {
      let neighbour = neighbouringCells[i];
      if (neighbour.visited || neighbour.wall) {
        continue;
      }

      neighbour.cellElement.classList.add("marked");
      let dist = current.g + 1;
      if (!unvisited.includes(neighbour)) {
        neighbour.g = dist;
        neighbour.parent = current;
        unvisited.push(neighbour);
      } else if (dist < neighbour.g) {
        neighbour.g = dist;
        neighbour.parent = current;
      }
    }

    current.visited = true;
  }

  console.log("Search Unsuccessful!!");
}
