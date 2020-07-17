import { bidirectionalPathTracing } from "./path.js";
import { sleep } from "./essential.js";

export async function bidirectionalDijkstraAlgo(start, end) {
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
  await sleep(10);

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

    var neighboursFromStart = currentFromStart.neighbours,
      neighboursFromEnd = currentFromEnd.neighbours;

    for (var i = 0; i < neighboursFromStart.length; i++) {
      var neighbour = neighboursFromStart[i];
      if (
        visitedFromStart.includes(neighbour) ||
        neighbour.wall ||
        neighbour == currentFromEnd
      ) {
        continue;
      } else if (visitedFromEnd.includes(neighbour)) {
        console.log("Search Successful");
        bidirectionalPathTracing(neighbour, currentFromStart, start, end);
        return;
      } else if (unvisitedFromEnd.includes(neighbour)) {
        neighbour.cellElement.classList.remove("unvisited");
        neighbour.cellElement.classList.add("visited");
        console.log("Search Successful!!");
        bidirectionalPathTracing(neighbour, currentFromStart, start, end);
        return;
      }

      var dist = currentFromStart.g + 1;

      if (!unvisitedFromStart.includes(neighbour)) {
        neighbour.g = dist;
        neighbour.parent = currentFromStart;
        unvisitedFromStart.push(neighbour);
      } else if (dist < neighbour.g) {
        neighbour.g = dist;
        neighbour.parent = currentFromStart;
      }

      neighbour.cellElement.classList.add("unvisited");
    }

    for (var i = 0; i < neighboursFromEnd.length; i++) {
      var neighbour = neighboursFromEnd[i];
      if (
        visitedFromEnd.includes(neighbour) ||
        neighbour.wall ||
        neighbour == currentFromStart
      ) {
        continue;
      } else if (visitedFromStart.includes(neighbour)) {
        console.log("Search Successful");
        bidirectionalPathTracing(neighbour, currentFromEnd, end, end);
        return;
      } else if (unvisitedFromStart.includes(neighbour)) {
        neighbour.cellElement.classList.remove("unvisited");
        neighbour.cellElement.classList.add("visited");
        console.log("Search Successful!!");
        bidirectionalPathTracing(neighbour, currentFromEnd, end, end);
        return;
      }

      var dist = currentFromEnd.g + 1;

      if (!unvisitedFromEnd.includes(neighbour)) {
        neighbour.g = dist;
        neighbour.parent = currentFromEnd;
        unvisitedFromEnd.push(neighbour);
      } else if (dist < neighbour.g) {
        neighbour.g = dist;
        neighbour.parent = currentFromEnd;
      }

      neighbour.cellElement.classList.add("unvisited");
    }

    visitedFromStart.push(currentFromStart);
    visitedFromEnd.push(currentFromEnd);
  }

  console.log("Search Unsuccessful!!");
}
