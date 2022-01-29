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
      squares : Array(9).fill(null),
      banderaX : true,
      winner: null
      //squares: ["X",null, "O", "O", "X", null, null, null, "X"] 
    }
  }
  handleClick(i){
    if(this.state.squares[i] != null || this.state.winner != null){
      return;
    }

    let copia_squares = this.state.squares.slice();
    /* V1
    if(this.state.banderaX === true){
      this.state.banderaX = false;
      copia_squares[i] = "X";
    }else{
      this.state.banderaX = true;
      copia_squares[i] = "O";
    }
    */

    /*V2
    if(this.state.banderaX === true){
      copia_squares[i] = "X";
    }else{
      copia_squares[i] = "O";
    }
    this.state.banderaX = !this.state.banderaX;
    */

    copia_squares[i] = (this.state.banderaX === true ? "X" : "O");
    //this.state.banderaX = !this.state.banderaX;

    this.setState({squares : copia_squares, banderaX : !this.state.banderaX});
    this.calculateWinner(copia_squares);
  }

  renderSquare(i) {
    return <Square 
      valor={this.state.squares[i]}
      boardDiceQueHacerEnClick={()=> this.handleClick(i)}
    />;
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    lines.forEach(win_comb => {
      //console.log("posición ", win_comb[0], " es ", squares[win_comb[0]], 
      //    "// posición ", win_comb[1], " es ", squares[win_comb[1]],
      //    "// posición ", win_comb[2], " es ", squares[win_comb[2]]);      

      if(squares[win_comb[0]] != null 
         && squares[win_comb[0]] === squares[win_comb[1]] 
         && squares[win_comb[0]] === squares[win_comb[2]]
      ){
        //console.log("in", squares[win_comb[0]]);
        //return squares[win_comb[0]];
        this.setState({winner: squares[win_comb[0]]});
      }
      //console.log("out")
      //return null;
    });
  
  }

  render() {
    //this.calculateWinner(this.state.squares);
    let status;
    if(this.state.winner){
      status = "Winner is: " + this.state.winner;
    }else{
      status = 'Next player: ' + (this.state.banderaX === true ? "X" : "O");
    }

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

