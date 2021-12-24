import { liveUpdate } from "../../main.js";
import { pathTracing } from "../../grid/path.js";
import { sleep } from "../../utils/essentials.js";

let endPoint;

export async function DFS(start, end) {
  endPoint = end;

  if (await DFSUtil(start)) {
    console.log("Search Successful");
    await pathTracing(end);
  } else {
    console.log("Search Unsuccessful!!");
  }
}

async function DFSUtil(current) {
  current.visited = true;
  current.cellElement.classList.remove("marked");
  current.cellElement.classList.add("visited");
  if (liveUpdate) {
    current.cellElement.classList.add("no-animation");
  }

  if (current == endPoint) {
    return true;
  }

  let neighbouringCells = current.neighbours;

  for (let i = 0; i < neighbouringCells.length; i++) {
    let neighbour = neighbouringCells[i];
    if (neighbour.visited || neighbour.wall) {
      continue;
    }

    neighbour.parent = current;
    neighbour.cellElement.classList.add("marked");
    if (!liveUpdate) {
      await sleep(7);
    }

    if (await DFSUtil(neighbour)) {
      return true;
    }

    neighbour.parent = undefined;
    if (!liveUpdate) {
      neighbour.cellElement.classList.replace("visited", "marked");
      await sleep(15);

      neighbour.cellElement.classList.replace("marked", "visited");
    }
  }

  return false;
}
