# Pathing Algos n Mazes

>An app to demonstrate **`pathing`** (or [pathfinding](https://en.wikipedia.org/wiki/Pathfinding)) algorithms and **`maze generation`** algorithms.
>
>**_Link to hosted demo:_** https://swarup-ranjan-mondal.github.io/Pathing-Algos-n-Mazes/

### Pathing Algorithms:

**Pathing** or **pathfinding** algorithms are build on top of graph search algorithms and explore routes between nodes, starting at one node and traversing through relationships until the destination has been reached. A path is identified between two nodes in a large network based on some criteria like shortest, cheapest, fastest, etc.

This app supports two type of **pathing** algorithms, `unidirectional` and `bidirectional`.

**Unidirectional Pathing Algorithms** are the algorithms where the exploration for finding a path starts from only one direction i.e. from the `start node`. The list of supported algorithms of this type is given below:

| Unidirectional Pathing Algorithm |
| --------------------------------- |
| Dijkstra                          |
| A*                                |
| Breadth First Search (BFS)        |
| Depth First Search (DFS)          |
| Greedy Best First Search          |
| Modified Dijkstra                 |

**Bidirectional Pathing Algorithms** are the algorithms where the exploration for finding a path starts from both the direction i.e. from the `start node` as well as from the `goal node`. The list of supported algorithms of this type is given below:

| Bidirectional Pathing Algorithm |
| -------------------------------- |
| Bidirectional Dijkstra           |
| Bidirectional A*                 |
 
### Maze Generation Algorithms:

**Maze generation** algorithms are automated methods for the creation of mazes. Currently, the app supports the following **maze generation** algorithms:

| Maze Generation Algorithm |
| ------------------------- |
| Recursive Backtracking    | 
| Randomized Kruskal        |
| Randomized Prim           |
| Wilson                    |
| Recursive Division        | 


## Usage

To run this app locally, clone this repo using the command:

```sh
$ git clone https://github.com/swarup-ranjan-mondal/Pathing-Algos-n-Mazes.git
```

Move inside the subfolder `Pathing-Algos-n-Mazes/` using the command

```sh
$ cd Pathing-Algos-n-Mazes/
```

### Prequisites

Here in this app, the html and the static files are served using [Express.js](https://expressjs.com/) which is a web framework for [Node.js](https://nodejs.org/en/). Hence, for running the app locally make sure `Node.js` is installed on your system. If not installed, download and install from [here](https://nodejs.org/en/download/).

### Install

Install the dependencies using the command:

```sh
$ npm install
```

This app uses **nodemon** package to run the server, so you need to have the package globally installed. If you don't have **nodemon** installed globally, you can do that using the command:

```sh
$ npm install -g nodemon
```

### Run

Run the app locally with the command:

```sh
$ npm start
```

The above command runs the app at port `3000` by default.

Now, open the app on the browser at `http://127.0.0.1:3000/` and have fun 😄.

The app will automatically reload if you change any of the source files.
