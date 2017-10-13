import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import Knight from './Knight';
import { moveKnight, canMoveKnight } from './Game';

export default class Board extends React.Component {
  static propTypes = {
    knightPosition: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  };

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    const [knightX, knightY] = this.props.knightPosition;
    const piece = (x === knightX && y === knightY) ? <Knight /> : null;

    return (
      <div
        key={i}
        style={{ width: '12.5%', height: '12.5%' }}
        onClick={() => this.handleSquareClick(x, y)}
      >
        <Square black={black}>
          {piece}
        </Square>
      </div>
    );
  }

  handleSquareClick(toX, toY) {
    if (!canMoveKnight(toX, toY)) return;
    moveKnight(toX, toY);
  }

  render() {
    const squares = [];

    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{ width: '300px', height: '300px', display: 'flex', flexWrap: 'wrap' }}>
        {squares}
      </div>
    );
  }
}
