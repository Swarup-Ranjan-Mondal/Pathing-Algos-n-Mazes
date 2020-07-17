import { mouseDown, grid, cols, rows, start, end } from "./script.js";

export function createWalls(grid) {
  var walls = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x];
      if (y % 2 == 1 || x % 2 == 1) {
        cell.cellElement.classList.add("wall");
        cell.wall = true;
        walls.push(cell);
      }
    }
  }

  return walls;
}

export function generateHorizontalWallWithHole(startX, endX, startY, endY) {
  var Yvalues = [];

  for (var y = startY; y <= endY; y++) {
    if (y % 2 == 1) {
      Yvalues.push(y);
    }
  }

  while (Yvalues.length > 0) {
    var randIndex = Math.floor(Math.random() * Yvalues.length),
      y = Yvalues[randIndex];

    if (
      (startX - 1 >= 0 && !grid[y][startX - 1].wall) ||
      (endX + 1 < cols && !grid[y][endX + 1].wall)
    ) {
      Yvalues.splice(randIndex, 1);
      continue;
    }

    var holeX = startX + Math.floor(Math.random() * (endX - startX + 1));

    for (var x = startX; x <= endX; x++) {
      if (holeX == x) {
        continue;
      }

      var wall = grid[y][x];
      wall.wall = true;
      wall.cellElement.classList.add("wall");
    }

    return y;
  }

  return undefined;
}

export function generateVerticalWallWithHole(startX, endX, startY, endY) {
  var Xvalues = [];

  for (var x = startX; x <= endX; x++) {
    if (x % 2 == 1) {
      Xvalues.push(x);
    }
  }

  while (Xvalues.length > 0) {
    var randIndex = Math.floor(Math.random() * Xvalues.length),
      x = Xvalues[randIndex];

    if (
      (startY - 1 >= 0 && !grid[startY - 1][x].wall) ||
      (endY + 1 < rows && !grid[endY + 1][x].wall)
    ) {
      Xvalues.splice(randIndex, 1);
      continue;
    }

    var holeY = startY + Math.floor(Math.random() * (endY - startY + 1));

    for (var y = startY; y <= endY; y++) {
      if (holeY == y) {
        continue;
      }

      var wall = grid[y][x];
      wall.wall = true;
      wall.cellElement.classList.add("wall");
    }

    return x;
  }

  return undefined;
}

export function getRandomWalledCell() {
  while (true) {
    var x = Math.floor(Math.random() * grid[0].length),
      y = Math.floor(Math.random() * grid.length);

    if (x % 2 == 0 && y % 2 == 0) {
      return grid[y][x];
    }
  }
}

export function getCellWalls(cell) {
  var walls = [],
    neighbours = cell.neighbours;

  for (var i = 0; i < neighbours.length; i++) {
    if (neighbours[i].wall) {
      walls.push(neighbours[i]);
    }
  }

  return walls;
}

export function getWallBtwTwoAdjCells(cell1, cell2) {
  var x = (cell1.x + cell2.x) / 2,
    y = (cell1.y + cell2.y) / 2;
  return grid[y][x];
}

export function getNextWalledCell(current, direction) {
  if (direction == "top") {
    return grid[current.y - 2][current.x];
  } else if (direction == "right") {
    return grid[current.y][current.x + 2];
  } else if (direction == "bottom") {
    return grid[current.y + 2][current.x];
  } else if (direction == "left") {
    return grid[current.y][current.x - 2];
  }
}

export function checkWalledCellNeighbours(cell) {
  var neighbours = [],
    x = cell.x,
    y = cell.y;

  if (x + 2 < grid[y].length && !grid[y][x + 2].walledCellVisited) {
    neighbours.push(grid[y][x + 2]);
  }
  if (y + 2 < grid.length && !grid[y + 2][x].walledCellVisited) {
    neighbours.push(grid[y + 2][x]);
  }
  if (x > 1 && !grid[y][x - 2].walledCellVisited) {
    neighbours.push(grid[y][x - 2]);
  }
  if (y > 1 && !grid[y - 2][x].walledCellVisited) {
    neighbours.push(grid[y - 2][x]);
  }

  if (neighbours.length > 0) {
    var randIndex = Math.floor(Math.random() * neighbours.length);
    return neighbours[randIndex];
  } else {
    return undefined;
  }
}

export function getWallSeparatedCells(wall) {
  var wallSeparatedCells = [],
    x = wall.x,
    y = wall.y;

  if (x > 0 && !grid[y][x - 1].wall) {
    if (x + 1 < grid[y].length && !grid[y][x + 1].wall) {
      wallSeparatedCells.push(grid[y][x - 1]);
      wallSeparatedCells.push(grid[y][x + 1]);
    }
  }

  if (y > 0 && !grid[y - 1][x].wall) {
    if (y + 1 < grid.length && !grid[y + 1][x].wall) {
      wallSeparatedCells.push(grid[y - 1][x]);
      wallSeparatedCells.push(grid[y + 1][x]);
    }
  }

  return wallSeparatedCells;
}

export function wallsOnMouseMove(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x].cellElement;

      cell.onmouseleave = () => {
        if (mouseDown) {
          if (!grid[y][x].wall) {
            cell.classList.add("wall");
            grid[y][x].wall = true;
          } else {
            cell.classList.remove("wall");
            grid[y][x].wall = false;
          }
        }
      };

      cell.onclick = () => {
        if (grid[y][x] != start && grid[y][x] != end) {
          if (!grid[y][x].wall) {
            cell.classList.add("wall");
            grid[y][x].wall = true;
          } else {
            cell.classList.remove("wall");
            grid[y][x].wall = false;
          }
        }
      };
    }
  }
}
