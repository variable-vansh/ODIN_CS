//takes in the source and outputs all possible destination co-ordinates
function validMoves(srcX, srcY) {
    let destArr = [];

    //up left
    destArr.push([srcX - 2, srcY - 1])
    //up right
    destArr.push([srcX - 2, srcY + 1])
    //down left
    destArr.push([srcX + 2, srcY - 1])
    //down right
    destArr.push([srcX + 2, srcY + 1])
    //left up
    destArr.push([srcX - 1, srcY - 2])
    //left down
    destArr.push([srcX + 1, srcY - 2])
    //right up
    destArr.push([srcX - 1, srcY + 2])
    //right down
    destArr.push([srcX + 1, srcY + 2])

    //remove edge cases- negative and co-ords>7

    destArr = destArr.filter(
        item => (item[0] >= 0 & item[1] >= 0 & item[0] <= 7 & item[1] <= 7)
    )

    return destArr;
}

export { validMoves }