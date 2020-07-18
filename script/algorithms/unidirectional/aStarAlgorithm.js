import { pathTracing } from "../../path.js";
import { heuristic, sleep } from "../../essential.js";

export async function aStarPathfinding(start, end) {
  var openSet = [];
  var current = start;
  current.g = 0;
  openSet.push(current);
  current.cellElement.classList.add("marked");
  await sleep(0);

  while (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    current = openSet[winner];
    openSet.splice(winner, 1);
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
