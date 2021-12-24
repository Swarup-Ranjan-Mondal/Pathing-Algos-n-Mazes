import { Heap } from "../../utils/heap.js";
import { liveUpdate } from "../../main.js";
import { heuristic, sleep } from "../../utils/essentials.js";
import { bidirectionalPathTracing } from "../../grid/path.js";

export async function bidirectionalAStar(start, end) {
  let unvisitedFromStart = new Heap();
  let unvisitedFromEnd = new Heap();
  let visitedFromStart = [];
  let visitedFromEnd = [];

  let currentFromStart = start;
  let currentFromEnd = end;
  currentFromStart.g = 0;
  currentFromEnd.g = 0;
  currentFromStart.h = heuristic(currentFromStart, currentFromEnd);
  currentFromEnd.h = heuristic(currentFromEnd, currentFromStart);
  currentFromStart.f = currentFromStart.g + currentFromStart.h;
  currentFromEnd.f = currentFromEnd.g + currentFromEnd.h;
  unvisitedFromStart.insert(currentFromStart, currentFromStart.f);
  unvisitedFromEnd.insert(currentFromEnd, currentFromEnd.f);
  currentFromStart.cellElement.classList.add("marked");
  currentFromEnd.cellElement.classList.add("marked");
  if (!liveUpdate) {
    await sleep(0);
  }

  while (!unvisitedFromStart.isEmpty() && !unvisitedFromEnd.isEmpty()) {
    currentFromStart = unvisitedFromStart.delete();
    currentFromEnd = unvisitedFromEnd.delete();
    currentFromStart.cellElement.classList.replace("marked", "visited");
    currentFromEnd.cellElement.classList.replace("marked", "visited");
    if (!liveUpdate) {
      await sleep(0);
    } else {
      currentFromStart.cellElement.classList.add("no-animation");
      currentFromEnd.cellElement.classList.add("no-animation");
    }

    if (
      currentFromStart.x == currentFromEnd.x &&
      currentFromStart.y == currentFromEnd.y
    ) {
      console.log("Search Successful");
      return;
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
              neighbour.h = heuristic(neighbour, end);
              neighbour.f = neighbour.g + neighbour.h;
              neighbour.parent = currentFromStart;
              unvisitedFromStart.insert(neighbour, neighbour.f);
            } else if (dist < neighbour.g) {
              neighbour.g = dist;
              neighbour.f = neighbour.g + neighbour.h;
              neighbour.parent = currentFromStart;
              unvisitedFromStart.update(neighbour, neighbour.f);
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
              neighbour.h = heuristic(neighbour, start);
              neighbour.f = neighbour.g + neighbour.h;
              neighbour.parent = currentFromEnd;
              unvisitedFromEnd.insert(neighbour, neighbour.f);
            } else if (dist < neighbour.g) {
              neighbour.g = dist;
              neighbour.f = neighbour.g + neighbour.h;
              neighbour.parent = currentFromEnd;
              unvisitedFromEnd.update(neighbour, neighbour.f);
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
