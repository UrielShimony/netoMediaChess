function calculateMoves(boardState, piecePosition, pieceName, playerColor) {
    const boardObj = boardState.map(line => JSON.parse(line));
    const i = Number(piecePosition[0]);
    const j = Number(piecePosition[1]);
    switch (pieceName) {
        case 'bishop':
            return bishopMoves([i, j], boardObj, playerColor);
        case 'queen':
            return queenMoves([i, j], boardObj, playerColor);
        case 'rook':
            return rookMoves([i, j], boardObj, playerColor);
        case 'knight':
            return knightMoves([i, j], boardObj, playerColor);

        default:
            throw "No Such piece"
    }
}

function bishopMoves(positon, boardState, playerColor) {
    let trips = [];

    //direction 1 , i+, j+
    let newTrip = makeTrip(1, 1, positon, boardState, playerColor);
    if (newTrip.length > 0) {
        trips.push(newTrip);
    }
    //direction 2 , i+, j-
    newTrip = makeTrip(1, -1, positon, boardState, playerColor);
    if (newTrip.length > 0) {
        trips.push(newTrip);
    }
    //direction 3 , i-, j+
    newTrip = makeTrip(-1, 1, positon, boardState, playerColor);
    if (newTrip.length > 0) {
        trips.push(newTrip);
    }
    //direction 4 , i-, j-
    newTrip = makeTrip(-1, -1, positon, boardState, playerColor);
    if (newTrip.length > 0) {
        trips.push(newTrip);
    }
    return trips;
}

function rookMoves(positon, boardState, playerColor) {

    let trips = [];
    //direction 1 , i=0, j+
    let newTrip = makeTrip(0, 1, positon, boardState, playerColor);
    if (newTrip.length > 0) {
        trips.concat(newTrip);
    }
    //direction 2 , i=0, j-
    newTrip = makeTrip(0, -1, positon, boardState, playerColor);
    if (newTrip.length > 0) {
        trips.concat(newTrip);
    }
    //direction 3 , i-, j=0
    newTrip = makeTrip(-1, 0, positon, boardState, playerColor);
    if (newTrip.length > 0) {
        trips.concat(newTrip);
    }
    //direction 4 , i+, j=0
    newTrip = makeTrip(-1, 0, positon, boardState, playerColor);
    if (newTrip.length > 0) {
        trips.concat(newTrip);
    }
    return trips;
}

function queenMoves(positon, boardState, playerColor) {
    let trips = [];
    trips.push(rookMoves(positon, boardState, playerColor));
    trips.push(bishopMoves(positon, boardState, playerColor));
    return trips;
}

function knightMoves(positon, boardState, playerColor) {
    const [i, j] = positon;
    let trips = [];
    checkStep(i + 2, j + 1, playerColor, boardState) && trips.push([i + 2, j + 1]);
    checkStep(i + 1, j + 2, playerColor, boardState) && trips.push([i + 1, j + 2]);
    checkStep(i - 2, j - 1, playerColor, boardState) && trips.push([i - 2, j - 1]);
    checkStep(i - 1, j - 2, playerColor, boardState) && trips.push([i - 1, j - 2]);
    checkStep(i + 2, j - 1, playerColor, boardState) && trips.push([i + 2, j - 1]);
    checkStep(i + 1, j - 2, playerColor, boardState) && trips.push([i + 1, j - 2]);
    checkStep(i - 2, j + 1, playerColor, boardState) && trips.push([i - 2, j + 1]);
    checkStep(i - 1, j + 2, playerColor, boardState) && trips.push([i - 1, j + 2]);

    return trips;
}

function checkStep(tripI, tripJ, playerColor, boardState) {
    if (tripI >= 0 && tripI <= 7 &&
        tripJ >= 0 && tripJ <= 7) {
        return boardState[tripI][tripJ].status === "empty" || boardState[tripI][tripJ].player !== playerColor
    }
    return false;
}

function makeTrip(iOffset, jOffset, position, boardState, playerColor) {
    const [i, j] = position;
    let tripI = i;
    let tripJ = j;
    let trip = [];
    while (true) {
        tripI += iOffset;
        tripJ += jOffset;
        if (checkStep(tripI, tripJ, playerColor, boardState)) {
            trip.push([tripI, tripJ]);
            if (boardState[tripI][tripJ].player !== undefined) {
                break// kill enemy
            }
        } else {
            break
        }
    }
    return trip;
}

module.exports = calculateMoves;