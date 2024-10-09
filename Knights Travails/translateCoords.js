function coordsToCell(coords) {
    let x = coords[0];
    let y = coords[1];
    return ((8 * x) + y)
}

function cellToCoords(cell) {
    let x = Math.floor(cell / 8);
    let y = cell % 8;
    return ([x, y])
}

export { coordsToCell, cellToCoords }