import { pathTracing } from "../../path.js";
import { heuristic, sleep, PriorityQueue } from "../../essential.js";

export async function modifiedDijkstra(start, end) {
  var unvisited = new PriorityQueue();
  var current = start;
  current.g = 0;
  current.h = heuristic(current, end);
  unvisited.insert(current, current.g, current.h);
  current.cellElement.classList.add("marked");
  await sleep(0);

  while (!unvisited.isEmpty()) {
    current = unvisited.delete();
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

      neighbour.cellElement.classList.add("marked");
      var dist = current.g + 1;
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
