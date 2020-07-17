import { rows, cols } from "./script.js";

function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.wall = false;
  this.mouseEnter = false;
  this.subsetId = null;
  this.cellElement = document.getElementById(`cell-${x}-${y}`);
  this.visited = false;
  this.walledCellVisited = false;
  this.direction = null;
  this.g = Infinity;
  this.h = Infinity;
  this.f = Infinity;
  this.parent = undefined;
  this.neighbours = [];

  this.getNeighbours = (grid) => {
    var x = this.x;
    var y = this.y;

    if (x < grid[y].length - 1) {
      this.neighbours.push(grid[y][x + 1]);
    }
    if (y < grid.length - 1) {
      this.neighbours.push(grid[y + 1][x]);
    }
    if (x > 0) {
      this.neighbours.push(grid[y][x - 1]);
    }
    if (y > 0) {
      this.neighbours.push(grid[y - 1][x]);
    }
  };
}

export function initialiseCellsAndNeighbours(grid) {
  for (var y = 0; y < rows; y++) {
    grid[y] = [];
    for (var x = 0; x < cols; x++) {
      grid[y][x] = new Cell(x, y);
    }
  }

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      grid[y][x].getNeighbours(grid);
    }
  }
}
