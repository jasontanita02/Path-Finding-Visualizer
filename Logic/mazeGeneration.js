import dfs from './pathing.js'
import shuffle from './shuffle.js'


export function generateMaze(col, row){
    let maze = [];
    for (let i = 0; i < row; i++){
        maze.push([]);
        for (let j = 0; j < col; j++){
            maze[i].push({
                isStart: false,
                isVisisted: false,
                isEnd: false,
                inPath: false,
                walls: {N: true, E: true, S: true, W: true}
            });
        }
    }
    return maze
}

export function cleanMaze(maze){
    for (let x = 0; x < maze.length; x++){
        for (let y = 0; y < maze[0].length; y++){
            maze[x][y].isVisisted = false;
        }
    }
    return maze;
}

export function traverseMaze(maze, row, col, maxCol, maxRow, graph = new Map(), start, end){
    //Calculate the neighbors
    let N = row - 1;
    let E = col + 1;
    let S = row + 1;
    let W = col - 1; 
    let numberLetter = {"N": N, "E": E, "S": S, "W": W};
    let reverseNeighbors = {"N": "S", "S": "N", "E": "W", "W": "E"};
    let neighbors = ["N", "E", "S", "W"];
    let randomDirections = shuffle(neighbors);

    //Iterate through the neighbors
    
    //Visited
    maze[row][col].isVisisted = true;
    let coordinates = `[${row},${col}]`;
    if (coordinates == start){
        maze[row][col].isStart = true;
    }

    if (coordinates == end){
        maze[row][col].isEnd = true;
    }
    
    let x = `[${row},${col}]`;
    if (graph.has(x) == false){
        graph.set(x, []);
    }
    
    //Looking at potential neighbors
    for (let i = 0; i < randomDirections.length; i++){
        let direction = randomDirections[i];
    

        if (["N", "S"].includes(direction)){
            //Check if its in bound
            let newRow = numberLetter[direction];
            if (newRow >= maxRow || newRow < 0){
                continue;
            }

            //Checks if its been visited
            if (maze[newRow][col].isVisisted == true){
                continue;
            }

            maze[row][col].walls[direction] = false;
            maze[newRow][col].walls[reverseNeighbors[direction]] = false;

            // If we made it here its in bounds and hasn't been visited
            //Add that connection
            let y = `[${newRow},${col}]`;
            // If the current cell doesnt have the y neighbor include it
            if (graph.get(x).includes(y) == false){
                graph.get(x).push(y);
            }
            if (graph.has(y) == false){
                graph.set(y, [x])
            }

            
            traverseMaze(maze, newRow, col, maxCol, maxRow, graph, start, end);
        }
        if (["W", "E"].includes(direction)){
            //Check if its in bound
            let newCol = numberLetter[direction];
            if (newCol >= maxCol || newCol < 0){
                continue;
            }

            //Checks if its been visited
            if (maze[row][newCol].isVisisted == true){
                continue;
            }
            // If we made it here its in bounds and hasn't been visited

            maze[row][col].walls[direction] = false;
            maze[row][newCol].walls[reverseNeighbors[direction]] = false;


            let y = `[${row},${newCol}]`
            if (graph.get(x).includes(y) == false){
                graph.get(x).push(y);
            }
            if (graph.has(y) == false){
                graph.set(y, [x])
            }

            traverseMaze(maze, row, newCol, maxCol, maxRow, graph, start, end);
        }
    }
}
 

function getRandomIntInclusive(max) {
    return Math.floor(Math.random() * max);
}



export function randomStart(maze){
    let row = maze.length;
    let col = maze[0].length;

    let randRow = getRandomIntInclusive(row);
    let randRow2 = getRandomIntInclusive(row);

    let col1 = 0;
    let col2 = col - 1;
    return [`${randRow},${col1}`, `${randRow2},${col2}`];
}


