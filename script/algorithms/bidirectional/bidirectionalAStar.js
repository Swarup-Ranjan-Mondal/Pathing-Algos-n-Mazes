import { heuristic, sleep, Heap } from "../../essential.js";
import { bidirectionalPathTracing } from "../../path.js";

export async function bidirectionalAStar(start, end) {
  var unvisitedFromStart = new Heap();
  var unvisitedFromEnd = new Heap();
  var visitedFromStart = [];
  var visitedFromEnd = [];

  var currentFromStart = start;
  var currentFromEnd = end;
  currentFromStart.g = 0;
  currentFromEnd.g = 0;
  currentFromStart.h = heuristic(currentFromStart, currentFromEnd);
  currentFromEnd.h = heuristic(currentFromEnd, currentFromStart);
  currentFromStart.f = currentFromStart.g + currentFromStart.h;
  currentFromEnd.f = currentFromEnd.g + currentFromEnd.h;
  unvisitedFromStart.insert(currentFromStart, currentFromStart.f);
  unvisitedFromEnd.insert(currentFromEnd, currentFromEnd.f);
  currentFromStart.cellElement.classList.add("unvisited");
  currentFromEnd.cellElement.classList.add("unvisited");
  await sleep(0);

  while (!unvisitedFromStart.isEmpty() && !unvisitedFromEnd.isEmpty()) {
    currentFromStart = unvisitedFromStart.delete();
    currentFromEnd = unvisitedFromEnd.delete();
    currentFromStart.cellElement.classList.remove("unvisited");
    currentFromEnd.cellElement.classList.remove("unvisited");
    currentFromStart.cellElement.classList.add("visited");
    currentFromEnd.cellElement.classList.add("visited");
    await sleep(0);

    if (
      currentFromStart.x == currentFromEnd.x &&
      currentFromStart.y == currentFromEnd.y
    ) {
      console.log("Search Successful");
      return;
    }

    var neighbours1 = currentFromStart.neighbours;
    var neighbours2 = currentFromEnd.neighbours;
    var length1 = neighbours1.length;
    var length2 = neighbours2.length;
    var i = 0,
      j = 0;

    while (i < length1 || j < length2) {
      var neighbour;

      if (i < length1) {
        neighbour = neighbours1[i];

        if (!neighbour.visited && !neighbour.wall) {
          neighbour.cellElement.classList.add("unvisited");

          var dist = currentFromStart.g + 1;

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
          bidirectionalPathTracing(neighbour, currentFromStart, start, end);
          return;
        }

        i++;
      }

      if (j < length2) {
        neighbour = neighbours2[j];

        if (!neighbour.visited && !neighbour.wall) {
          neighbour.cellElement.classList.add("unvisited");

          var dist = currentFromEnd.g + 1;

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
          bidirectionalPathTracing(neighbour, currentFromEnd, end, end);
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
