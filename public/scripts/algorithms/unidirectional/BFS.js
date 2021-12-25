import { liveUpdate } from "../../main.js";
import { pathTracing } from "../../grid/path.js";
import { sleep } from "../../utils/essentials.js";

export async function BFS(start, end) {
  let unvisitedQueue = [];
  let current = start;
  unvisitedQueue.push(current);
  current.cellElement.classList.add("marked");
  if (!liveUpdate) {
    await sleep(0);
  }

  while (unvisitedQueue.length > 0) {
    current = unvisitedQueue[0];
    unvisitedQueue.splice(0, 1);
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

      if (!unvisitedQueue.includes(neighbour)) {
        neighbour.parent = current;
        unvisitedQueue.push(neighbour);
        neighbour.cellElement.classList.add("marked");
      }
    }

    current.visited = true;
  }

  console.log("Search Unsuccessful!!");
}
