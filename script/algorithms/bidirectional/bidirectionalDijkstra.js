import { bidirectionalPathTracing } from "../../path.js";
import { sleep } from "../../essential.js";

export async function bidirectionalDijkstra(start, end) {
  var unvisitedFromStart = [];
  var unvisitedFromEnd = [];
  var visitedFromStart = [];
  var visitedFromEnd = [];

  var currentFromStart = start;
  var currentFromEnd = end;
  currentFromStart.g = 0;
  currentFromEnd.g = 0;
  unvisitedFromStart.push(currentFromStart);
  unvisitedFromEnd.push(currentFromEnd);
  currentFromStart.cellElement.classList.add("unvisited");
  currentFromEnd.cellElement.classList.add("unvisited");
  await sleep(0);

  while (unvisitedFromStart.length > 0 && unvisitedFromEnd.length > 0) {
    currentFromStart = unvisitedFromStart[0];
    currentFromEnd = unvisitedFromEnd[0];
    unvisitedFromStart.splice(0, 1);
    unvisitedFromEnd.splice(0, 1);
    currentFromStart.cellElement.classList.remove("unvisited");
    currentFromEnd.cellElement.classList.remove("unvisited");
    currentFromStart.cellElement.classList.add("visited");
    currentFromEnd.cellElement.classList.add("visited");
    await sleep(0);

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
