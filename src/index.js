import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
		return (
				<button className="square" onClick={props.onClick}>
						{props.value}
				</button>
				);
}

class Board extends React.Component {
		renderSquare(i) {
				return (
						<Square value={this.props.squares[i]} 
								onClick={() => this.props.onClick(i)} />
						);
		}
		renderRow(row) {
				let renderedSquares = [];
				for(let i = (row - 1) * 3; i < row * 3; i++){
						renderedSquares.push(this.renderSquare(i));
				}
				return renderedSquares;
		}
		renderBoard(){
				let board = [];
				for(let i=1; i < 4; i++){
						board.push(
								<div className="board-row">
										{this.renderRow(i)}
								</div>
								);
				}
				return board;
		}

		render() {
				return (
						<div>
								{this.renderBoard()}
						</div>
						);
		}
}

class Game extends React.Component {
		constructor(props){
				super(props);
				this.state = {
						history :  [{ squares : Array(9).fill(null) , lastMove : ''}],
						xIsNext : true,
						stepNumber : 0,
				};
		}

		jumpTo(step){
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

		render() {
				const history = this.state.history;
				const current = history[this.state.stepNumber];
				const winner = calculateWinner(current.squares);

				const moves = history.map((move, step) => {
						const desc = (step ? 
								"Go to move " + move.lastMove: "Start");
						return (
								<li key={move}>
										<button className={this.state.stepNumber===step ? 'bold' : ''} onClick={() => this.jumpTo(step)}> {desc} </button>
								</li>
								);
				});

				let status;
				if(winner){
						status = 'Winner: ' + winner;
				}else{
						status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
				}

				return (
						<div className="game">
								<div className="game-board">
										<Board 
												squares={current.squares}
												onClick={(i) => this.handleClick(i)}
										/>
								</div>
								<div className="game-info">
										<div>{status}</div>
										<ol>{moves}</ol>
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
						return squares[a];
				}
		}
		return null;
}

function getReadableCoordinates(square){
		return " ("+ (Math.floor(square / 3) + 1) + ',' + (square % 3 + 1) + ')'
}
