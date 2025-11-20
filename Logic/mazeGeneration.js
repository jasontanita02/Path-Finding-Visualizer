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
const maze = generateMaze(2,2);

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
    graph.set(x, []);
    
    // console.log(graph);

    for (let i = 0; i < randomDirections.length; i++){
        // console.log(i)
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
            graph.get(x).push(`[${newRow},${col}]`);
            // console.log(graph);

            
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
            
            
            graph.get(x).push(`[${row},${newCol}]`);

            traverseMaze(maze, row, newCol, maxCol, maxRow, graph);
        }
    }
}
 
traverseMaze(maze, 0, 0, maze[0].length, maze.length, graph);


console.log("After everything");
// console.log(graph);

graph.get("[0,0]").push("[1,0]");
graph.get("[0,0]").push("[1,1]");

console.log(graph)

for (let i = 0; i < graph.get("[0,0]").length; i++){
    let x = graph.get("[0,0]")[i];
    console.log(x);
    console.log(graph.get(x))
}
console.log(graph.get("[0,0]").length);
console.log(graph.get("[0,0]"));


console.log(graph.get("0,0"));



// dfs(graph, [0,0], "hello");
//TODO make bidirectional in graph. Easy fix.
