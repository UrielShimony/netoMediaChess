import React, {Component} from 'react';
import PieceImage from './PieceImage'
import '../App.css'

const Cell = ({cell, callBack}) => {
    const cellStyle = cell.isMarked ? 'markedCell' : 'cell';
    switch (cell.status) {
        case 'filled':
            return (
                <div className={cellStyle} onClick={callBack}>
                    <PieceImage pieceName={cell.pieceName} color={cell.player}/>
                </div>);
        default:
            return (<div className={cellStyle}/>);
    }
};

export default Cell



