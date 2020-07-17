import { initialiseCellsAndNeighbours } from "./cell.js";
import { wallsOnMouseMove, createWalls } from "./walls.js";
import { dijkstraPathfinding } from "./algorithms/unidirectional/dijkstraAlgorithm.js";
import { aStarPathfinding } from "./algorithms/unidirectional/aStarAlgorithm.js";
import { BFS } from "./algorithms/unidirectional/BFS.js";
import { DFS } from "./algorithms/unidirectional/DFS.js";
import { greedyBFS } from "./algorithms/unidirectional/greedyBFS.js";
import { bidirectionalDijkstra } from "./algorithms/bidirectional/bidirectionalDijkstra.js";
import { bidirectionalAStar } from "./algorithms/bidirectional/bidirectionalAStar.js";
import { modifiedDijkstra } from "./algorithms/unidirectional/modifiedDijkstra.js";
import { DFSmazeGenerator } from "./mazes/MazeDFS.js";
import { kruskalsMaze } from "./mazes/KruskalsMaze.js";
import { primsMaze } from "./mazes/PrimsMaze.js";
import { bidirectionalDijkstraAlgo } from "./test.js";
import { wilsonsMaze } from "./mazes/WilsonsMaze.js";
import { recursiveDivisionMaze } from "./mazes/recursiveDivisionMaze.js";

export const rows = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--rows")
);
export const cols = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--cols")
);
export let mouseDown = false;
export let grid, start, end;

let gridBoard = document.querySelector(".grid-board"),
  current;

function generateGridBoard() {
  var grid = [];
  gridBoard.innerHTML = "";

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${x}-${y}`;
      gridBoard.appendChild(cell);
    }
  }
  initialiseCellsAndNeighbours(grid);

  return grid;
}

function createNewGrid() {
  grid = generateGridBoard();
  start = grid[10][10];
  end = grid[10][40];
  start.cellElement.classList.add("starting-cell");
  end.cellElement.classList.add("ending-cell");
  moveStartAndEndWithMouse();
}

function clearObstaclesAndPaths() {
  var startX = start.x,
    startY = start.y,
    endX = end.x,
    endY = end.y;

  grid = generateGridBoard();
  start = grid[startY][startX];
  end = grid[endY][endX];
  start.cellElement.classList.add("starting-cell");
  end.cellElement.classList.add("ending-cell");
  moveStartAndEndWithMouse();
}

function clearPathAndNodes() {
  var walls = [],
    startX = start.x,
    startY = start.y,
    endX = end.x,
    endY = end.y;

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      if (grid[y][x].wall) {
        walls.push({ x: x, y: y });
      }
    }
  }

  grid = generateGridBoard();
  start = grid[startY][startX];
  end = grid[endY][endX];
  start.cellElement.classList.add("starting-cell");
  end.cellElement.classList.add("ending-cell");

  for (var i = 0; i < walls.length; i++) {
    var wall = grid[walls[i].y][walls[i].x];

    wall.wall = true;
    wall.cellElement.classList.add("wall");
  }
  moveStartAndEndWithMouse();
}

function moveStartAndEndWithMouse() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = grid[y][x];

      cell.cellElement.onmouseover = () => {
        if (cell === start) {
          current = "start";
        } else if (cell === end) {
          current = "end";
        }
      };

      cell.cellElement.onmouseenter = () => {
        if (mouseDown) {
          if (current == "start") {
            start.cellElement.classList.remove("starting-cell");
            start = cell;
            start.cellElement.classList.add("starting-cell");
            start.wall = false;
            start.cellElement.classList.remove("wall");
          }

          if (current == "end") {
            end.cellElement.classList.remove("ending-cell");
            end = cell;
            end.cellElement.classList.add("ending-cell");
            end.wall = false;
            end.cellElement.classList.remove("wall");
          }
        }
      };
    }
  }
}

async function callAlgoAndMazeFunctions(type, functionName) {
  if (type == "Mazes") {
    if (functionName == "recursiveBacktracking") {
      clearObstaclesAndPaths();
      createWalls(grid);
      await DFSmazeGenerator(grid[0][0]);
    } else if (functionName == "randomizedKruskal") {
      clearObstaclesAndPaths();
      var wallsSet = createWalls(grid);
      await kruskalsMaze(wallsSet);
    } else if (functionName == "randomizedPrim") {
      clearObstaclesAndPaths();
      createWalls(grid);
      await primsMaze(grid[0][0]);
    } else if (functionName == "wilson") {
      clearObstaclesAndPaths();
      createWalls(grid);
      await wilsonsMaze();
    } else if (functionName == "recursiveDivision") {
      clearObstaclesAndPaths();
      await recursiveDivisionMaze(0, cols - 1, 0, rows - 1);
    }
  } else {
    if (functionName == "dijkstra") {
      clearPathAndNodes();
      await dijkstraPathfinding(start, end);
    } else if (functionName == "a*") {
      clearPathAndNodes();
      await aStarPathfinding(start, end);
    } else if (functionName == "bfs") {
      clearPathAndNodes();
      await BFS(start, end);
    } else if (functionName == "dfs") {
      clearPathAndNodes();
      await DFS(start, end);
    } else if (functionName == "greedyBfs") {
      clearPathAndNodes();
      await greedyBFS(start, end);
    } else if (functionName == "modifiedDijkstra") {
      clearPathAndNodes();
      await modifiedDijkstra(start, end);
    } else if (functionName == "bidirectionalDijkstra") {
      clearPathAndNodes();
      await bidirectionalDijkstra(start, end);
    } else if (functionName == "bidirectionalA*") {
      clearPathAndNodes();
      await bidirectionalAStar(start, end);
    }
  }
}

/* Main Program Starts Here */
document.addEventListener("mousedown", () => {
  mouseDown = true;
});
document.addEventListener("mouseup", () => {
  mouseDown = false;
});

createNewGrid();
moveStartAndEndWithMouse();
wallsOnMouseMove(grid);

const optionList = document.querySelectorAll(".options-list");
const select = document.querySelectorAll(".select");
const visualiseBtn = document.querySelector("#visualise");
const clearBoardBtn = document.querySelector("#clear-board");
const clearWallsBtn = document.querySelector("#clear-walls");
const clearPathBtn = document.querySelector("#clear-path");
let type,
  functionName,
  typeList = [],
  inactive = false,
  currentSelect = null;

select.forEach((s) => {
  typeList.push(s.innerHTML.trim());
});

for (let i = 0; i < select.length; i++) {
  const option = optionList[i].querySelectorAll(".option");

  select[i].addEventListener("click", () => {
    if (!inactive) {
      if (currentSelect != null) {
        currentSelect.innerHTML = type;
      }
      currentSelect = null;
      optionList[i].classList.toggle("active");
    }
  });

  option.forEach((o) => {
    o.addEventListener("click", () => {
      type = typeList[i];
      currentSelect = select[i];
      functionName = o.querySelector("input").id;
      select[i].innerHTML = o.querySelector("label").innerHTML;
      optionList[i].classList.remove("active");
    });
  });
}

visualiseBtn.onclick = async () => {
  if (!inactive && currentSelect != null) {
    visualiseBtn.classList.add("btn-inactive");
    inactive = true;
    await callAlgoAndMazeFunctions(type, functionName);
    currentSelect.innerHTML = type;
    visualiseBtn.classList.remove("btn-inactive");
    inactive = false;
  }
};

clearBoardBtn.addEventListener("click", () => {
  createNewGrid();
});

clearWallsBtn.addEventListener("click", () => {
  clearObstaclesAndPaths();
});

clearPathBtn.addEventListener("click", () => {
  clearPathAndNodes();
});
