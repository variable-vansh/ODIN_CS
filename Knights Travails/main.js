import { coordsToCell } from "./translateCoords.js";
import { getShorttestRoute } from "./allRoutes.js";

function knightMoves(src, dest) {
    //translate cell coordinates to cell numbers, they are easier to deal with
    let srcCellNo = coordsToCell(src)
    let destCellNo = coordsToCell(dest)

    console.log(`The knight can move from [${src}] to [${dest}] in ${getShorttestRoute(srcCellNo, destCellNo).length - 1} moves`)
    console.log(getShorttestRoute(srcCellNo, destCellNo))

}

knightMoves([3, 3], [4, 3])