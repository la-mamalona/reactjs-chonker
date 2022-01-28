import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*
class Square extends React.Component {
  render() {
    return (
      <button 
        className="square" 
        onClick={()=> this.props.boardDiceQueHacerEnClick()}
      >
        {this.props.valor}
      </button>
    );
  }
}
*/

function Square(props){
  return (
    <button 
      className="square"
      onClick={()=> props.boardDiceQueHacerEnClick() }
    >
      {props.valor}  
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares : Array(9).fill(null)
      //squares: ["X",null, "O", "O", "X", null, null, null, "X"] 
    }
  }
  handleClick(i){
    let copia_squares = this.state.squares.slice();
    copia_squares[i] = "X";
    this.setState({squares : copia_squares});
  }

  renderSquare(i) {
    return <Square 
      valor={this.state.squares[i]}
      boardDiceQueHacerEnClick={()=> this.handleClick(i)}
    />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>

    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

