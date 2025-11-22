export default function DFS(graph, node, end){
    let visited = new Set();
    let stack = [node];
    let parent = {};
    console.log("graph: \n", graph)
    // console.log("stack: ", stack)


    while(stack.length > 0){
        let current = stack.pop();
        if (current == end){
            console.log("Found the path!");
            console.log("current :", current, "end: ", end)
            while(parent[current] != undefined){
                console.log("parent: ", parent[current]);
                current = parent[current];
            } 
            break;
        }
        visited.add(current);

        for (let x = 0; x < graph.get(current).length; x++){
            
            let neighbor = graph.get(current)[x];
            if (visited.has(neighbor) == true){
                continue
            }


            // we see a neighbor we havnt seen
            parent[neighbor] = current;
            stack.push(neighbor);

        }

  
    }

}