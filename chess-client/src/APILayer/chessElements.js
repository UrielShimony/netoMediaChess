export class ChessCell {
    constructor(status='empty', player=undefined, pieceName=undefined) {
        this.status = status;
        this.player = player;
        this.pieceName = pieceName;
        this.isMarked = false;
    }
}
