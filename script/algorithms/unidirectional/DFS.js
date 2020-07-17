import { pathTracing } from "../../path.js";
import { sleep } from "../../essential.js";

var endPoint;

export async function DFS(start, end) {
  endPoint = end;
  start.visited = true;

  if (await DFSUtil(start)) {
    console.log("Search Successful");
    pathTracing(end);
  } else {
    console.log("Search Unsuccessful!!");
  }
}

async function DFSUtil(current) {
  current.cellElement.classList.add("visited");
  await sleep(0);

  if (current == endPoint) {
    return true;
  }

  var neighbouringCells = current.neighbours;

  for (var i = 0; i < neighbouringCells.length; i++) {
    var neighbour = neighbouringCells[i];
    if (neighbour.visited || neighbour.wall) {
      continue;
    }

    neighbour.parent = current;
    neighbour.visited = true;
    if (await DFSUtil(neighbour)) {
      return true;
    }

    neighbour.parent = undefined;
    neighbour.visited = false;
  }

  current.cellElement.classList.remove("visited");
  return false;
}
