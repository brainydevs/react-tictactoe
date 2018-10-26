import React, {Component} from 'react';
import Board from './Board';
import './Game.css';

class Game extends Component {
		constructor(props){
				super(props);
				this.state = {
						history :  [{ squares : Array(9).fill(null) , lastMove : ''}],
						xIsNext : true,
						stepNumber : 0,
						reverseSorted : false
				};
		}

		jumpTo(move){
				const step = this.state.history.indexOf(move);
				this.setState({
						stepNumber : step,
						xIsNext : (step % 2) === 0
				});
		}

		handleClick(i) {
				const history = this.state.history.slice(0, this.state.stepNumber + 1);
				const current = history[history.length -1];
				const squares = current.squares.slice();
				if(calculateWinner(squares) || squares[i]){
						return;
				}
				squares[i] = this.state.xIsNext ? 'X' : 'O';
				this.setState({
						history: history.concat({squares : squares, lastMove : getReadableCoordinates(i)}),
						stepNumber: history.length,
						xIsNext : !this.state.xIsNext 
				});
		}

		toggleSort(){
				this.setState({
						reverseSorted:!this.state.reverseSorted
				});
		}

		render() {
				const history = this.state.history;
				const movesHistory = this.state.reverseSorted ? this.state.history.slice(0).reverse() : this.state.history;
				const current = history[this.state.stepNumber];
				const winner = calculateWinner(current.squares);

				const moves = movesHistory.map((move, step) => {
						const desc = (move.lastMove ?  "Go to move " + move.lastMove: "Start");
						const isSelectedStep = this.state.reverseSorted ? step === history.length - this.state.stepNumber - 1 : step === this.state.stepNumber;
						return (
								<li key={move}>
										<button className={isSelectedStep ? 'bold' : ''} onClick={() => this.jumpTo(move)}> {desc} </button>
								</li>
								);
				});

				let status, winningSquares = [];
				if(winner){
						status = 'Winner: ' + winner.winner;
						winningSquares = winner.squares;
				}else if(!current.squares.includes(null)){
						status = "Draw!";
				}else{
						status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
				}

				return (
						<div className="game">
								<div className="game-board">
										<Board 
												squares={current.squares}
												winningSquares={winningSquares}
												onClick={(i) => this.handleClick(i)}
										/>
								</div>
								<div className="game-info">
										<div>{status}</div>
										<button onClick={() => this.toggleSort()}>Reverse order</button>
										<ol reversed={this.state.reverseSorted}>{moves}</ol>
								</div>
						</div>
						);
		}
}

function calculateWinner(squares) {
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
		for (let i = 0; i < lines.length; i++) {
				const [a, b, c] = lines[i];
				if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
						return {
								winner : squares[a],
								squares: [a,b,c]
						};
				}
		}
		return null;
}

function getReadableCoordinates(square){
		return " ("+ (Math.floor(square / 3) + 1) + ',' + (square % 3 + 1) + ')'
}

export default Game;
