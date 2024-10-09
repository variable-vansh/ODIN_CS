import { createBoard } from "./createBoard.js"
import { validMoves } from "./validMoves.js"
import { coordsToCell, cellToCoords } from "./translateCoords.js";

//create 8x8 chess board
let Board = createBoard();
// console.log(Board)

//takes in co-ordinates and returns all valid options for knight to move
let destArr = validMoves(1, 1)
// console.log(destArr)

//it is much easier to deal with the cell values, just convert the final result back to co-ordinates
//converts co-ordinates to cell values
// console.log(coordsToCell([0, 0]))
//converts cell value to co-ordinates
// console.log(cellToCoords([0]))

function knightMoves(src, dest) {
    let srcCellNo = coordsToCell(src)
    let destCellNo = coordsToCell(dest)

    console.log(`Start: ${srcCellNo}, Finish: ${destCellNo}`)
}

knightMoves([4, 5], [5, 4])

//create adjacency list for all 64 cells
// adjacency cell is an array of length 64 that stores all the points that can be visited from the point (point number = it's index)