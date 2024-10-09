import { List } from "./adjacencyList.js";
import { coordsToCell, cellToCoords } from "./translateCoords.js";


let n = 64;

// Function which finds all the paths and stores it in paths array
function findPaths(paths, path, parent, n, u) {
    // Base Case
    if (u === -1) {
        paths.push(path.slice());
        return;
    }

    // Loop for all the parents of the given vertex
    for (let i = 0; i < parent[u].length; i++) {
        let par = parent[u][i];

        // Insert the current vertex in path
        path.push(u);

        // Recursive call for its parent
        findPaths(paths, path, parent, n, par);

        // Remove the current vertex
        path.pop();
    }
}

// Function which performs bfs from the given source vertex
function bfs(List, parent, n, start) {
    // dist will contain shortest distance from start to every other vertex
    let dist = Array(n).fill(Number.MAX_VALUE);

    let q = [];

    // Insert source vertex in queue and make its parent -1 and distance 0
    q.push(start);
    parent[start] = [-1];
    dist[start] = 0;

    // Until Queue is empty
    while (q.length > 0) {
        let u = q.shift();

        for (let i = 0; i < List[u].length; i++) {
            let v = List[u][i];

            if (dist[v] > dist[u] + 1) {
                // A shorter distance is found
                // So erase all the previous parents
                // and insert new parent u in parent[v]
                dist[v] = dist[u] + 1;
                q.push(v);
                parent[v] = [u];
            } else if (dist[v] === dist[u] + 1) {
                // Another candidate parent for shortes path found
                parent[v].push(u);
            }
        }
    }
}

// Function which prints all the paths from start to end
function printPaths(List, n, start, end) {
    let paths = [];
    let path = [];
    let parent = Array(n).fill(null).map(() => []);

    // Function call to bfs
    bfs(List, parent, n, start);

    // Function call to findPaths
    findPaths(paths, path, parent, n, end);

    // for (let i = 0; i < paths.length; i++) {
    //     let v = paths[i];

    //     // Since paths contain each path in reverse order, so reverse it
    //     v.reverse();

    //     // Print node for the current path
    //     console.log(v.join(" "));
    // }
    return (paths[0].reverse())
}

function getShorttestRoute(src, dest) {
    let cellsArr = printPaths(List, n, src, dest)

    let coordsArr = [];
    //now to convert the cell Array to an array of co-ordinates
    for (let x = 0; x < cellsArr.length; x++) {
        coordsArr.push(cellToCoords(cellsArr[x]))
    }

    return coordsArr
}

export { getShorttestRoute }