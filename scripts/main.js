import { initialiseCellsAndNeighbours } from "./grid/cell.js";
import { wallsOnMouseMove, createWalls } from "./grid/walls.js";
import { BFS } from "./algorithms/unidirectional/BFS.js";
import { DFS } from "./algorithms/unidirectional/DFS.js";
import { aStarPathfinding } from "./algorithms/unidirectional/aStarAlgorithm.js";
import { modifiedDijkstra } from "./algorithms/unidirectional/modifiedDijkstra.js";
import { dijkstraPathfinding } from "./algorithms/unidirectional/dijkstraAlgorithm.js";
import { bidirectionalDijkstra } from "./algorithms/bidirectional/bidirectionalDijkstra.js";
import { bidirectionalAStar } from "./algorithms/bidirectional/bidirectionalAStar.js";
import { greedyBFS } from "./algorithms/unidirectional/greedyBFS.js";
import { recursiveDivisionMaze } from "./mazes/recursiveDivisionMaze.js";
import { kruskalsMaze } from "./mazes/KruskalsMaze.js";
import { DFSmazeGenerator } from "./mazes/MazeDFS.js";
import { wilsonsMaze } from "./mazes/WilsonsMaze.js";
import { primsMaze } from "./mazes/PrimsMaze.js";
import { bidirectionalDijkstraAlgo } from "./test.js";

export const rows = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--rows")
);
export const cols = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--cols")
);
export let mouseDown, isWall, liveUpdate;
export let grid, start, end, current;

let gridElement = document.querySelector(".grid");

function generateGridBoard() {
  let grid = [];
  gridElement.innerHTML = "";

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${x}-${y}`;
      gridElement.appendChild(cell);
    }
  }
  initialiseCellsAndNeighbours(grid);

  return grid;
}

function createNewGrid() {
  grid = generateGridBoard();
  start = grid[10][10];
  end = grid[10][40];
  start.cellElement.classList.add("start");
  end.cellElement.classList.add("goal");
  moveStartAndEndWithMouse();
  wallsOnMouseMove(grid);
}

function clearObstaclesAndPaths() {
  let startX = start.x,
    startY = start.y,
    endX = end.x,
    endY = end.y;

  grid = generateGridBoard();
  start = grid[startY][startX];
  end = grid[endY][endX];
  start.cellElement.classList.add("start");
  end.cellElement.classList.add("goal");
  moveStartAndEndWithMouse();
  wallsOnMouseMove(grid);
}

function clearPathAndNodes() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = grid[y][x];

      cell.visited = false;
      cell.parent = undefined;
      cell.cellElement.innerHTML = "";
      cell.cellElement.classList.remove(
        "path",
        "marked",
        "visited",
        "path-traced",
        "no-animation"
      );
    }
  }

  moveStartAndEndWithMouse();
  wallsOnMouseMove(grid);
}

function moveStartAndEndWithMouse() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = grid[y][x];

      cell.cellElement.onmousedown = () => {
        if (cell == start) {
          current = "start";
        } else if (cell == end) {
          current = "end";
        }
      };

      cell.cellElement.onmouseenter = () => {
        if (mouseDown) {
          if (current == "start") {
            start.cellElement.classList.remove("start");
            isWall = cell.wall;
            start = cell;
            start.cellElement.classList.add("start");
            start.cellElement.classList.remove("wall");
            start.wall = false;
          } else if (current == "end") {
            end.cellElement.classList.remove("goal");
            isWall = cell.wall;
            end = cell;
            end.cellElement.classList.add("goal");
            end.cellElement.classList.remove("wall");
            end.wall = false;
          }

          if (
            (current == "start" || current == "end") &&
            type != "Mazes" &&
            liveUpdate
          ) {
            performPathingAlgo(algoName);
          } else if (type == "Mazes" && liveUpdate) {
            clearPathAndNodes();
            liveUpdate = false;
          }
        }
      };
    }
  }
}

async function generateMazeWithAlgo(algoName) {
  if (algoName == "recursiveBacktracking") {
    clearObstaclesAndPaths();
    createWalls(grid);
    await DFSmazeGenerator(grid[0][0]);
  } else if (algoName == "randomizedKruskal") {
    clearObstaclesAndPaths();
    let wallsSet = createWalls(grid);
    await kruskalsMaze(wallsSet);
  } else if (algoName == "randomizedPrim") {
    clearObstaclesAndPaths();
    createWalls(grid);
    await primsMaze(grid[0][0]);
  } else if (algoName == "wilson") {
    clearObstaclesAndPaths();
    createWalls(grid);
    await wilsonsMaze();
  } else if (algoName == "recursiveDivision") {
    clearObstaclesAndPaths();
    await recursiveDivisionMaze(0, cols - 1, 0, rows - 1);
  }
}

async function performPathingAlgo(algoName) {
  if (algoName == "dijkstra") {
    clearPathAndNodes();
    await dijkstraPathfinding(start, end);
  } else if (algoName == "a*") {
    clearPathAndNodes();
    await aStarPathfinding(start, end);
  } else if (algoName == "bfs") {
    clearPathAndNodes();
    await BFS(start, end);
  } else if (algoName == "dfs") {
    clearPathAndNodes();
    await DFS(start, end);
  } else if (algoName == "greedyBfs") {
    clearPathAndNodes();
    await greedyBFS(start, end);
  } else if (algoName == "modifiedDijkstra") {
    clearPathAndNodes();
    await modifiedDijkstra(start, end);
  } else if (algoName == "bidirectionalDijkstra") {
    clearPathAndNodes();
    await bidirectionalDijkstra(start, end);
  } else if (algoName == "bidirectionalA*") {
    clearPathAndNodes();
    await bidirectionalAStar(start, end);
  }
}

async function callPathingOrMazeGenAlgo(type, algoName) {
  if (type == "Mazes") {
    await generateMazeWithAlgo(algoName);
  } else {
    await performPathingAlgo(algoName);
  }
}

/* Main Program Starts Here */
let type,
  algoName,
  typeList = [],
  currentSelect = null;

const selects = document.querySelectorAll(".select");
const visualizeBtn = document.querySelector("#visualize");
const clearPathBtn = document.querySelector("#clear-path");
const clearBoardBtn = document.querySelector("#clear-board");
const clearWallsBtn = document.querySelector("#clear-walls");
const optionLists = document.querySelectorAll(".option-list");

createNewGrid();

gridElement.onmousedown = () => {
  mouseDown = true;
};
gridElement.onmouseup = () => {
  mouseDown = false;
  current = undefined;
};

selects.forEach((select) => {
  typeList.push(select.innerText.trim());
});

for (let i = 0; i < selects.length; i++) {
  const options = optionLists[i].querySelectorAll(".option");

  selects[i].onclick = () => {
    optionLists[i].classList.toggle("active");

    window.onmousedown = (e) => {
      if (!e.target.classList.contains("option") && e.target != selects[i]) {
        optionLists[i].classList.remove("active");
      }
      window.onmousedown = undefined;
    };
  };

  options.forEach((option) => {
    option.onclick = () => {
      if (currentSelect != null) {
        currentSelect.innerText = type;
      }
      type = typeList[i];
      currentSelect = selects[i];
      algoName = option.querySelector("input").id;
      selects[i].innerText = option.querySelector("label").innerText;
      optionLists[i].classList.remove("active");
    };
  });
}

visualizeBtn.onclick = async () => {
  const btns = [visualizeBtn, clearBoardBtn, clearWallsBtn, clearPathBtn];

  if (currentSelect != null) {
    liveUpdate = false;
    gridElement.classList.add("inactive");
    btns.forEach((btn) => {
      btn.classList.add("inactive");
    });
    selects.forEach((select) => {
      select.classList.add("inactive");
    });

    await callPathingOrMazeGenAlgo(type, algoName);

    selects.forEach((select) => {
      select.classList.remove("inactive");
    });
    btns.forEach((btn) => {
      btn.classList.remove("inactive");
    });
    gridElement.classList.remove("inactive");
    if (type != "Mazes") {
      liveUpdate = true;
    }
  }
};

clearBoardBtn.onclick = () => {
  createNewGrid();
  liveUpdate = false;
};

clearWallsBtn.onclick = () => {
  clearObstaclesAndPaths();
  liveUpdate = false;
};

clearPathBtn.onclick = () => {
  clearPathAndNodes();
  liveUpdate = false;
};
