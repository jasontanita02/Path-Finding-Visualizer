
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
const maze = generateMaze(2,3);

console.log("Before traversal\n")
for (let i = 0; i < maze.length; i++){
    console.log(maze[i]);
}

function traverseMaze(maze, row, col, maxCol, maxRow){
    // console.log(maxCol, maxRow)
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

    for (let i = 0; i < randomDirections.length; i++){
        console.log(i)
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
            console.log("Direction: ", direction, "row: ", row, "col: ", col);
            // If we made it here its in bounds and hasn't been visited
            traverseMaze(maze, newRow, col, maxCol, maxRow);
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
            console.log("Direction: ", direction, "row: ", row, "col: ", col);
            // If we made it here its in bounds and hasn't been visited
            traverseMaze(maze, row, newCol, maxCol, maxRow);
        }
    }
}
 
// console.log("Maze Row #: ", maze.length, "Maze Column #: ", maze[0].length)
traverseMaze(maze, 0, 0, maze[0].length, maze.length);


console.log("After traversal\n")
for (let i = 0; i < maze.length; i++){
    console.log(maze[i]);
}

//Testing 123

//comment
