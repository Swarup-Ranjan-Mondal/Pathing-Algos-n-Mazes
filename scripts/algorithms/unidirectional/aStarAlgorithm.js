import { liveUpdate } from "../../main.js";
import { pathTracing } from "../../grid/path.js";
import { heuristic, sleep } from "../../utils/essentials.js";

export async function aStarPathfinding(start, end) {
  let openSet = [];
  let current = start;
  current.g = 0;
  openSet.push(current);
  current.cellElement.classList.add("marked");
  if (!liveUpdate) {
    await sleep(0);
  }

  while (openSet.length > 0) {
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    current = openSet[winner];
    openSet.splice(winner, 1);
    current.cellElement.classList.replace("marked", "visited");
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
      if (!openSet.includes(neighbour)) {
        neighbour.g = dist;
        neighbour.parent = current;
        openSet.push(neighbour);
      } else if (dist < neighbour.g) {
        neighbour.g = dist;
        neighbour.parent = current;
      }
      neighbour.h = heuristic(neighbour, end);
      neighbour.f = neighbour.g + neighbour.h;
    }

    current.visited = true;
  }

  console.log("Search Unsuccessful!!");
}
