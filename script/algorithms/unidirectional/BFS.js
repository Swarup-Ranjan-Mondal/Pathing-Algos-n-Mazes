import { pathTracing } from "../../path.js";
import { sleep } from "../../essential.js";

export async function BFS(start, end) {
  var unvisitedQueue = [];
  var current = start;
  unvisitedQueue.push(current);
  current.cellElement.classList.add("marked");
  await sleep(0);

  while (unvisitedQueue.length > 0) {
    current = unvisitedQueue[0];
    unvisitedQueue.splice(0, 1);
    current.cellElement.classList.remove("marked");
    current.cellElement.classList.add("visited");
    await sleep(0);

    if (current == end) {
      console.log("Search Successful");
      pathTracing(end);
      return;
    }

    var neighbouringCells = current.neighbours;

    for (var i = 0; i < neighbouringCells.length; i++) {
      var neighbour = neighbouringCells[i];
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
