import {
  generateVerticalWallWithHole,
  generateHorizontalWallWithHole,
} from "../grid/walls.js";
import { sleep } from "../utils/essentials.js";

export async function recursiveDivisionMaze(startX, endX, startY, endY) {
  let dx = endX - startX,
    dy = endY - startY;

  if (dx < 2 || dy < 2) {
    return;
  }

  let x, y;
  let orientation =
    dx > dy
      ? "vertical"
      : dy > dx
      ? "horizontal"
      : Math.random() < 0.5
      ? "vertical"
      : "horizontal";

  await sleep(80);

  if (orientation == "vertical") {
    x = await generateVerticalWallWithHole(startX, endX, startY, endY);
    if (x != undefined) {
      await recursiveDivisionMaze(startX, x - 1, startY, endY);
      await recursiveDivisionMaze(x + 1, endX, startY, endY);
    }
  } else {
    y = await generateHorizontalWallWithHole(startX, endX, startY, endY);
    if (y != undefined) {
      await recursiveDivisionMaze(startX, endX, startY, y - 1);
      await recursiveDivisionMaze(startX, endX, y + 1, endY);
    }
  }
}
