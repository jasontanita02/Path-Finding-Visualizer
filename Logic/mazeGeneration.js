import dfs from './pathing.js'
import shuffle from './shuffle.js'


function generateMaze(col, row){
    let maze = [];
    for (let i = 0; i < row; i++){
        maze.push([]);
        for (let j = 0; j < col; j++){
            maze[i].push(0);
        }
    }
    return maze
}
const maze = generateMaze(7,7);

let graph = new Map();

function traverseMaze(maze, row, col, maxCol, maxRow, graph = new Map()){
    //Calculate the neighbors
    let N = row - 1;
    let E = col + 1;
    let S = row + 1;
    let W = col - 1; 
    let numberLetter = {"N": N, "E": E, "S": S, "W": W};
    let neighbors = ["N", "E", "S", "W"];
    let randomDirections = (neighbors);

    //Iterate through the neighbors
    
    //Visited
    maze[row][col] = 1;
    
    let x = `[${row},${col}]`;
    if (graph.has(x) == false){
        graph.set(x, []);
    }
    
    for (let i = 0; i < randomDirections.length; i++){
        let direction = randomDirections[i];
    

        if (["N", "S"].includes(direction)){
            //Check if its in bound
            let newRow = numberLetter[direction];
            if (newRow >= maxRow || newRow < 0){
                continue;
            }

            //Checks if its been visited
            if (maze[newRow][col] == 1){
                continue;
            }

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

            
            traverseMaze(maze, newRow, col, maxCol, maxRow, graph);
        }
        if (["W", "E"].includes(direction)){
            //Check if its in bound
            let newCol = numberLetter[direction];
            if (newCol >= maxCol || newCol < 0){
                continue;
            }

            //Checks if its been visited
            if (maze[row][newCol] == 1){
                continue;
            }
            // If we made it here its in bounds and hasn't been visited
            
            let y = `[${row},${newCol}]`
            if (graph.get(x).includes(y) == false){
                graph.get(x).push(y);
            }
            if (graph.has(y) == false){
                graph.set(y, [x])
            }

            traverseMaze(maze, row, newCol, maxCol, maxRow, graph);
        }
    }
}
 
traverseMaze(maze, 0, 0, maze[0].length, maze.length, graph);

let coords = randomStart(maze);




dfs(graph, `[${coords[0]}]`, `[${coords[1]}]`);


function getRandomIntInclusive(max) {
    return Math.floor(Math.random() * max);
}



function randomStart(maze){
    let row = maze.length;
    let col = maze[0].length;

    let randRow = getRandomIntInclusive(row);
    let randRow2 = getRandomIntInclusive(row);

    let col1 = 0;
    let col2 = col - 1;
    return [`${randRow},${col1}`, `${randRow2},${col2}`];
}


