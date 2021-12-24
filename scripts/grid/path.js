import { liveUpdate } from "../main.js";
import { getDirection, sleep } from "../utils/essentials.js";

export async function pathTracing(endCell) {
  let i,
    path = [],
    cell = endCell;

  while (cell != undefined) {
    path.push(cell);
    cell = cell.parent;
  }

  if (!liveUpdate) {
    for (i = path.length - 1; i >= 0; i--) {
      await sleep(8);
      path[i].cellElement.classList.replace("visited", "path");
    }
  }

  for (i = path.length - 1; i > 0; i--) {
    if (!liveUpdate) {
      await sleep(6);
    }
    let element = document.createElement("div");
    element.classList.add("line", getDirection(path[i], path[i - 1]));

    if (!liveUpdate) {
      path[i].cellElement.classList.replace("path", "path-traced");
    } else {
      path[i].cellElement.classList.replace("visited", "path-traced");
    }

    path[i].cellElement.appendChild(element);
  }

  if (!liveUpdate) {
    path[i].cellElement.classList.replace("path", "path-traced");
  } else {
    path[i].cellElement.classList.replace("visited", "path-traced");
  }
}

export async function bidirectionalPathTracing(
  intersectPoint,
  immediateNeighbour,
  parentOfNeighbour,
  end
) {
  let startDescendent,
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

  for (let i = stack.length - 1; i > 0; i--) {
    stack[i].parent = stack[i - 1];
  }
  stack[0].parent = startDescendent;
  stack = [];

  await pathTracing(end);
}
