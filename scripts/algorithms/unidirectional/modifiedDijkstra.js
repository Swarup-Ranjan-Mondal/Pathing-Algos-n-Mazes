import { PriorityQueue } from "../../utils/priorityQueue.js";
import { heuristic, sleep } from "../../utils/essentials.js";
import { pathTracing } from "../../grid/path.js";
import { liveUpdate } from "../../main.js";

export async function modifiedDijkstra(start, end) {
  let unvisited = new PriorityQueue();
  let current = start;
  current.g = 0;
  current.h = heuristic(current, end);
  current.cellElement.classList.add("marked");
  unvisited.insert(current, current.g, current.h);
  if (!liveUpdate) {
    await sleep(0);
  }

  while (!unvisited.isEmpty()) {
    current = unvisited.delete();
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
      if (!unvisited.includes(neighbour)) {
        neighbour.g = dist;
        neighbour.h = current.h + heuristic(neighbour, end);
        neighbour.parent = current;
        unvisited.insert(
          neighbour,
          neighbour.g + neighbour.h + current.h,
          current.h + neighbour.h
        );
      } else if (dist < neighbour.g) {
        neighbour.g = dist;
        neighbour.h = current.h + heuristic(neighbour, end);
        neighbour.parent = current;
        unvisited.update(
          neighbour,
          neighbour.g + neighbour.h + current.h,
          current.h + neighbour.h
        );
      }
    }

    current.visited = true;
  }

  console.log("Search Unsuccessful!!");
}
