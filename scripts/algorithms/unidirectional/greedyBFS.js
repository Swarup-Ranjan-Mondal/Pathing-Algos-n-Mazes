import { Heap } from "../../utils/heap.js";
import { liveUpdate } from "../../main.js";
import { pathTracing } from "../../grid/path.js";
import { heuristic, sleep } from "../../utils/essentials.js";

export async function greedyBFS(start, end) {
  let current = start;
  let unvisitedHeap = new Heap();
  unvisitedHeap.insert(current, 0);
  current.cellElement.classList.add("marked");
  if (!liveUpdate) {
    await sleep(0);
  }

  while (!unvisitedHeap.isEmpty()) {
    current = unvisitedHeap.delete();
    current.cellElement.classList.replace("marked", "visited");
    if (liveUpdate) {
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

      if (!unvisitedHeap.includes(neighbour)) {
        neighbour.h = heuristic(neighbour, end);
        neighbour.parent = current;
        unvisitedHeap.insert(neighbour, neighbour.h);
        neighbour.cellElement.classList.add("marked");
      }
      if (!liveUpdate) {
        await sleep(0);
      }
    }

    current.visited = true;
  }

  console.log("Search Unsuccessful!!");
}
