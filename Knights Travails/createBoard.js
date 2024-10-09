function createBoard() {
    let board = [];
    for (let x = 0; x < 8; x++) {
        board[x] = [];
        for (let y = 0; y < 8; y++) {
            board[x][y] = 'o'
            // board[x][y] = `[${x},${y}]`
        }
    }
    return board;
}

export { createBoard }