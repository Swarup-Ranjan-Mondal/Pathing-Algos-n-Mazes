import { sleep, getDirection } from "./essential.js";

export async function pathTracing(endCell) {
  var path = [];
  var cell = endCell;

  while (cell != undefined) {
    path.push(cell);
    cell = cell.parent;
  }

  for (var i = path.length - 1; i >= 0; i--) {
    await sleep(8);
    path[i].cellElement.classList.remove("visited");
    path[i].cellElement.classList.add("path");
  }

  for (var i = path.length - 1; i > 0; i--) {
    await sleep(8);
    var element = document.createElement("div");
    element.classList.add("line", getDirection(path[i], path[i - 1]));
    path[i].cellElement.classList.remove("path");
    path[i].cellElement.classList.add("way");
    path[i].cellElement.appendChild(element);
  }

  path[i].cellElement.classList.remove("path");
  path[i].cellElement.classList.add("way");
}

export function bidirectionalPathTracing(
  intersectPoint,
  immediateNeighbour,
  parentOfNeighbour,
  end
) {
  var startDescendent,
    endDescendent,
    stack = [];
  if (parentOfNeighbour == end) {
    startDescendent = intersectPoint;
    endDescendent = immediateNeighbour;
  } else {
    startDescendent = immediateNeighbour;
    endDescendent = intersectPoint;
  }

  while (endDescendent) {
    stack.push(endDescendent);
    endDescendent = endDescendent.parent;
  }

  for (var i = stack.length - 1; i > 0; i--) {
    stack[i].parent = stack[i - 1];
  }
  stack[0].parent = startDescendent;
  stack = [];

  pathTracing(end);
}
