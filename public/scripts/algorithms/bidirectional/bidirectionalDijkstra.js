import { bidirectionalPathTracing } from "../../grid/path.js";
import { sleep } from "../../utils/essentials.js";
import { liveUpdate } from "../../main.js";

export async function bidirectionalDijkstra(start, end) {
  let unvisitedFromStart = [];
  let unvisitedFromEnd = [];
  let visitedFromStart = [];
  let visitedFromEnd = [];

  let currentFromStart = start;
  let currentFromEnd = end;
  currentFromStart.g = 0;
  currentFromEnd.g = 0;
  unvisitedFromStart.push(currentFromStart);
  unvisitedFromEnd.push(currentFromEnd);
  currentFromStart.cellElement.classList.add("marked");
  currentFromEnd.cellElement.classList.add("marked");
  if (!liveUpdate) {
    await sleep(0);
  }

  while (unvisitedFromStart.length > 0 && unvisitedFromEnd.length > 0) {
    currentFromStart = unvisitedFromStart[0];
    currentFromEnd = unvisitedFromEnd[0];
    unvisitedFromStart.splice(0, 1);
    unvisitedFromEnd.splice(0, 1);
    currentFromStart.cellElement.classList.replace("marked", "visited");
    currentFromEnd.cellElement.classList.replace("marked", "visited");
    if (!liveUpdate) {
      await sleep(0);
    } else {
      currentFromStart.cellElement.classList.add("no-animation");
      currentFromEnd.cellElement.classList.add("no-animation");
    }

    let neighbours1 = currentFromStart.neighbours;
    let neighbours2 = currentFromEnd.neighbours;
    let length1 = neighbours1.length;
    let length2 = neighbours2.length;
    let i = 0,
      j = 0;

    while (i < length1 || j < length2) {
      let neighbour;

      if (i < length1) {
        neighbour = neighbours1[i];

        if (!neighbour.visited && !neighbour.wall) {
          neighbour.cellElement.classList.add("marked");

          let dist = currentFromStart.g + 1;

          if (
            !unvisitedFromEnd.includes(neighbour) &&
            neighbour != currentFromEnd
          ) {
            if (!unvisitedFromStart.includes(neighbour)) {
              neighbour.g = dist;
              neighbour.parent = currentFromStart;
              unvisitedFromStart.push(neighbour);
            } else if (dist < neighbour.g) {
              neighbour.g = dist;
              neighbour.parent = currentFromStart;
            }
          }
        } else if (
          !visitedFromStart.includes(neighbour) &&
          visitedFromEnd.includes(neighbour)
        ) {
          console.log("Search Successful");
          await bidirectionalPathTracing(
            neighbour,
            currentFromStart,
            start,
            end
          );
          return;
        }

        i++;
      }

      if (j < length2) {
        neighbour = neighbours2[j];

        if (!neighbour.visited && !neighbour.wall) {
          neighbour.cellElement.classList.add("marked");

          let dist = currentFromEnd.g + 1;

          if (
            !unvisitedFromStart.includes(neighbour) &&
            neighbour != currentFromStart
          ) {
            if (!unvisitedFromEnd.includes(neighbour)) {
              neighbour.g = dist;
              neighbour.parent = currentFromEnd;
              unvisitedFromEnd.push(neighbour);
            } else if (dist < neighbour.g) {
              neighbour.g = dist;
              neighbour.parent = currentFromEnd;
            }
          }
        } else if (
          visitedFromStart.includes(neighbour) &&
          !visitedFromEnd.includes(neighbour)
        ) {
          console.log("Search Successful");
          await bidirectionalPathTracing(neighbour, currentFromEnd, end, end);
          return;
        }

        j++;
      }
    }

    currentFromStart.visited = true;
    currentFromEnd.visited = true;
    visitedFromStart.push(currentFromStart);
    visitedFromEnd.push(currentFromEnd);
  }

  console.log("Search Unsuccessful!!");
}
