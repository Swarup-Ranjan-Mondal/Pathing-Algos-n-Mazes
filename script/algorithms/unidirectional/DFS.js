import { pathTracing } from "../../path.js";
import { sleep } from "../../essential.js";

var endPoint;

export async function DFS(start, end) {
  endPoint = end;

  if (await DFSUtil(start)) {
    console.log("Search Successful");
    pathTracing(end);
  } else {
    console.log("Search Unsuccessful!!");
  }
}

async function DFSUtil(current) {
  current.visited = true;
  current.cellElement.classList.remove("marked");
  current.cellElement.classList.add("visited");

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
    neighbour.cellElement.classList.add("marked");
    await sleep(7);

    if (await DFSUtil(neighbour)) {
      return true;
    }

    neighbour.parent = undefined;
    neighbour.cellElement.classList.replace("visited", "marked");
    await sleep(15);

    neighbour.cellElement.classList.replace("marked", "visited");
  }

  return false;
}
