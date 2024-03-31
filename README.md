# ChessJS
This is a very simple implementation of the classic "Chess" game. <br>
It is written in JavaScript and uses the HTML5 canvas for rendering. <br>

## Features
- Drag and drop functionality to move pieces instead of using onclick events.
- Automatic detection of valid moves.
- Automatic detection of when a player is in check.
- Automatic detection of when a player has won.
- Automatic detection of a draw by stalemate.

## How to run
Just open the `index.html` file in your browser. <br>

## Code Structure
The games logic is implemented in the `game.js` file. <br>
This file includes the initialization of the game board, the logic for moving and capturing pieces, and the logic for determining when a player has won. <br>
The `BuildBoard` function is used to draw the board on the canvas. <br>
The `drag`, `allowDrop`, and `drop` functions are used to implement the drag and drop functionality. <br>
The `checkWin` function is used to determine when a player has won. <br>

## Future Improvements
- Add multiplayer online functionality.
- Add an AI to play against.
- Add a scoring system.
- Improve the UI.
- Add options to save and load games.
- Add move history and undo functionality.
- Add animations for moving pieces.
- Add sound effects.
- Add a timer for each player's turn.
- Add a tutorial for new players.
- Add a points system for each piece.

## Contributing
Feel free to contribute to this project. <br>
Please open an issue if you have any suggestions or find any bugs. <br>

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.