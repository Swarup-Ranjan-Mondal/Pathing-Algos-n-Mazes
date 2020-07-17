import {
  generateVerticalWallWithHole,
  generateHorizontalWallWithHole,
} from "../walls.js";
import { sleep } from "../essential.js";

export async function recursiveDivisionMaze(startX, endX, startY, endY) {
  var dx = endX - startX,
    dy = endY - startY;

  if (dx < 2 || dy < 2) {
    return;
  }

  var x, y;
  var orientation =
    dx > dy
      ? "vertical"
      : dy > dx
      ? "horizontal"
      : Math.random() < 0.5
      ? "vertical"
      : "horizontal";

  await sleep(1000);

  if (orientation == "vertical") {
    x = generateVerticalWallWithHole(startX, endX, startY, endY);
    if (x != undefined) {
      await Promise.all([
        recursiveDivisionMaze(startX, x - 1, startY, endY),
        recursiveDivisionMaze(x + 1, endX, startY, endY),
      ]);
    }
  } else {
    y = generateHorizontalWallWithHole(startX, endX, startY, endY);
    if (y != undefined) {
      await Promise.all([
        recursiveDivisionMaze(startX, endX, startY, y - 1),
        recursiveDivisionMaze(startX, endX, y + 1, endY),
      ]);
    }
  }
}
