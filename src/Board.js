import React, {Component} from 'react';

export default class Board extends Component {
		renderSquare(i) {
				return (
						<Square key={i} value={this.props.squares[i]} highlighted={this.props.winningSquares.includes(i)}
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
								<div key={i} className="board-row">
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

function Square(props){
		return (
				<button className={'square ' + (props.highlighted ? 'highlight' : '')} onClick={props.onClick}>
						{props.value}
				</button>
				);
}

