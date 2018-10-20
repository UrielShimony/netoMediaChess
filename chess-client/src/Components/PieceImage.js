import React, {Component} from 'react';

const whiteBishop = () => <img className='pieceImage' src={'https://upload.wikimedia.org/wikipedia/' +
'commons/thumb/5/50/Chess_tile_bl.svg/2000px-Chess_tile_bl.svg.png'}/>;
const blackBishop = () => <img className='pieceImage' src={'https://upload.wikimedia.org/wikipedia/' +
'commons/thumb/5/50/Chess_tile_bl.svg/2000px-Chess_tile_bl.svg.png'}/>;
const blackKnight = () => <img className='pieceImage'
                               src={'https://cdn2.iconfinder.com/data/icons/harry-potter-solid-collection/60/' +
                               '50_-_Harry_Potter_-_Solid_-_Knight_Chess_Piece-512.png'}/>;
const whiteKnight = () => <img className='pieceImage'
                               src={'https://cdn2.iconfinder.com/data/icons/harry-potter-solid-collection/60/' +
                               '50_-_Harry_Potter_-_Solid_-_Knight_Chess_Piece-512.png'}/>;

const PieceImgae = ({pieceName, color}) => {
    // debugger
    switch (pieceName) {
        case 'bishop':
            return color === 'white' ? blackBishop() : whiteBishop();
        case 'knight':
            return color === 'white' ? blackKnight() : whiteKnight();
    }
};
export default PieceImgae


