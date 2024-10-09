import { validMoves } from "./validMoves.js";
import { coordsToCell, cellToCoords } from "./translateCoords.js";
function createAdjacencyList() {
    //initiate empty list
    let adjacencyList = []
    //loop through all cells of board
    for (let i = 0; i < 64; i++) {
        //get coords of each cell
        let coords = cellToCoords(i);
        //get valid moves for each coords
        let cellsLinked = validMoves(coords[0], coords[1])
        // adjacencyList.push(cellsLinked)
        cellsLinked = cellsLinked.map(coordsToCell)
        adjacencyList.push(cellsLinked)
    }

    return adjacencyList
}

let List = createAdjacencyList()

export { List }
