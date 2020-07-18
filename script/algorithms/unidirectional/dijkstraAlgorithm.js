import { pathTracing } from "../../path.js";
import { sleep } from "../../essential.js";

export async function dijkstraPathfinding(start, end) {
  var unvisited = [];
  var current = start;
  current.g = 0;
  unvisited.push(current);
  current.cellElement.classList.add("marked");
  await sleep(0);

  while (unvisited.length > 0) {
    current = unvisited[0];
    unvisited.splice(0, 1);
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
