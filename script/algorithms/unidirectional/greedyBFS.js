import { pathTracing } from "../../path.js";
import { heuristic, sleep, Heap } from "../../essential.js";

export async function greedyBFS(start, end) {
  var unvisitedHeap = new Heap();
  var current = start;
  unvisitedHeap.insert(current, 0);
  current.cellElement.classList.add("unvisited");
  await sleep(0);

  while (!unvisitedHeap.isEmpty()) {
    current = unvisitedHeap.delete();
    current.cellElement.classList.remove("unvisited");
    current.cellElement.classList.add("visited");

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

      if (!unvisitedHeap.includes(neighbour)) {
        neighbour.h = heuristic(neighbour, end);
        neighbour.parent = current;
        unvisitedHeap.insert(neighbour, neighbour.h);
        neighbour.cellElement.classList.add("unvisited");
      }
      await sleep(0);
    }

    current.visited = true;
  }

  console.log("Search Unsuccessful!!");
}
