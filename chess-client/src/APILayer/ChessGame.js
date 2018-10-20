import Server from '../Utills/Server'
import {ChessCell} from "./chessElements";

const BASE_URL = 'http://localhost:4000';
const CALCULATE_MOVES_URL = `${BASE_URL}${'/calculatePiecePossibleMoves'}`;

// const GAME_STATE_URL = `${BASE_URL}${'/chess/SomthingElse'}`;


class ChessGame {
    constructor() {

        // this.boardState =
        const blacKnightCell = new ChessCell('filled', 'black', 'knight');
        const whiteBishopCell = new ChessCell('filled', 'white', 'bishop');
        this.boardState =
            [new Array(8).fill().map(()=>new ChessCell),
                new Array(3).fill().map(()=>new ChessCell).concat(blacKnightCell).concat(new Array(4).fill().map(()=>new ChessCell)),
                new Array(4).fill().map(()=>new ChessCell).concat(whiteBishopCell).concat(new Array(3).fill().map(()=>new ChessCell)),
                new Array(8).fill().map(()=>new ChessCell),
                new Array(8).fill().map(()=>new ChessCell),
                new Array(8).fill().map(()=>new ChessCell),
                new Array(8).fill().map(()=>new ChessCell),
                new Array(8).fill().map(()=>new ChessCell),]
    }

    sendHi() {
        Server.get('http://localhost:3000/Hi')
            .then((res) => {
                console.log(res);
            });
    }

    getBoardState() {
        return this.boardState;
    }

    getMoves(i, j) {
        const cell = this.boardState[i][j];
        if (cell.status === 'filled') {
            const pieceName = cell.pieceName;
            const playerColor = cell.player;
            const currentBoardState = this.boardState;
            const params = {
                pieceName: pieceName,
                playerColor: playerColor,
                piecePosition: [i, j],
                boardState: currentBoardState,
            };

            return Server.get(CALCULATE_MOVES_URL, params)
                .then((res) => {
                this.boardState.map((line)=>{
                    line.map((cell)=>{
                        cell.isMarked=false;
                    })
                })

                    res.data.map((trip) => {
                        if (trip.flat().length > trip.length) {
                            //trip
                            trip.map((cell) => {
                                const [i, j] = cell;
                                this.boardState[i][j].isMarked = true;
                            })
                        } else {
                            //just one cell
                            const [i, j] = trip;
                            this.boardState[i][j].isMarked = true;
                        }
                    });
                    return this.boardState;
                });
        }

    }
}

export default new ChessGame();


