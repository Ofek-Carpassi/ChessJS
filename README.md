# ChessJS

This repository contains the code for a simple chess game implemented in JavaScript.

## Description

The game is built using vanilla JavaScript. It includes the logic for the movement of all the pieces in a chess game, including special moves like castling and en passant.

## How to Run

1. Clone this repository.
2. Open the HTML file in your browser.

## Code Structure

The code includes the following main components:

- `gameBoard`: The main game board.
- `playerDisplay`: Displays the current player's turn.
- `infoDisplay`: Displays game information.
- `startPieces`: An array representing the initial setup of the chess board.
- `createBoard()`: A function to create the game board.
- `dragStart(e)`, `dragOver(e)`, `dragDrop(e)`: Functions to handle drag and drop events for moving chess pieces.
- `checkIfValid(target)`: A function to check if a move is valid.
- `changePlayer()`, `reverseIds()`, `revertIds()`: Function to handle player changing.
- `check()`: Function to check for check.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.
dsa