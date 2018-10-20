import React, {Component} from 'react';
import './App.css';
import ChessGame from "./APILayer/ChessGame";
import Cell from "./Components/CellComponent";

class App extends Component {
    constructor() {
        super()
        this.state = {
            boardState: undefined,
        }
    }

    componentWillMount() {
        const boardState = ChessGame.getBoardState();
        this.setState({boardState: boardState})
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <Board className='board' boardState={this.state.boardState} updateCellMoves={this.updateCellMoves}/>
                </div>
            </div>
        );
    }

    updateCellMoves = (i, j) => {
        ChessGame.getMoves(i, j)
            .then(newBoardState => {
                this.setState({boardState: newBoardState});
            });
    }

}

const Board = ({boardState, updateCellMoves}) => {
    if (boardState) {
        return boardState.map((line, i) => {
            return (
                <div className='boardRow' key={i}>
                    {line.map((cell, j) => {
                        return (<Cell cell={cell} position={[i, j]} callBack={() => updateCellMoves(i, j)} key={j}/>)
                    })}
                </div>)
        })
    }
}
export default App;
