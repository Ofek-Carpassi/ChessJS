// initialize variables
let playerGo = "white"; // white always goes first
let isAITurn = false; // check if it is the AI's turn
let width = 8; // width of the board
let whiteKingMoved = false; // check if the white king has moved
let blackKingMoved = false; // check if the black king has moved
let kingWhiteRookMoved = false; // check if the white king rook has moved
let queenWhiteRookMoved = false; // check if the white queen rook has moved
let kingBlackRookMoved = false; // check if the black king rook has moved
let queenBlackRookMoved = false; // check if the black queen rook has moved

const PiecesEval = {
    "blackPawn": -10,
    "blackKnight": -30,
    "blackBishop": -30,
    "blackRook": -50,
    "blackQueen": -90,
    "blackKing": -900,
    "whitePawn": 10,
    "whiteKnight": 30,
    "whiteBishop": 30,
    "whiteRook": 50,
    "whiteQueen": 90,
    "whiteKing": 900
}

// initialize the board
let board = [
    ["blackRook", "blackKnight", "blackBishop", "blackQueen", "blackKing", "blackBishop", "blackKnight", "blackRook"],
    ["blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn"],
    ["whiteRook", "whiteKnight", "whiteBishop", "whiteQueen", "whiteKing", "whiteBishop", "whiteKnight", "whiteRook"]
]

// reset the game
function resetGame(){
    playerGo = "white"; // white always goes first
    isAITurn = false; // check if it is the AI's turn

    whiteKingMoved = false; // check if the white king has moved
    blackKingMoved = false; // check if the black king has moved
    kingWhiteRookMoved = false; // check if the white king rook has moved
    queenWhiteRookMoved = false; // check if the white queen rook has moved
    kingBlackRookMoved = false; // check if the black king rook has moved
    queenBlackRookMoved = false; // check if the black queen rook has moved

    // initialize the board
    board = [
        ["blackRook", "blackKnight", "blackBishop", "blackQueen", "blackKing", "blackBishop", "blackKnight", "blackRook"],
        ["blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn"],
        ["whiteRook", "whiteKnight", "whiteBishop", "whiteQueen", "whiteKing", "whiteBishop", "whiteKnight", "whiteRook"]
    ] 

    // create the board
    createBoard();
}

// create the board
function createBoard(){
    // Id for each square
    let numToShow = 0;
    // String containing the html to show the board
    let strToShow = "<table border='1'  align='center'>";

    // Loop through the board and create the table
    for(let i = 0; i < 8; i++){ 
        // Create a row
        strToShow += "<tr>";
        // Loop through the columns
        for(let j = 0; j < 8; j++){
            // Create a square
            if((i+j) % 2 === 0){
                strToShow += "<td class = 'whiteSquare' width='60' height='60' id=" +
                    numToShow.toString() + "  ondrop='drop(event)' ondragover='allowDrop(event)'>";
            } else {
                strToShow += "<td class = 'blackSquare'  width='60' height='60' id=" +
                    numToShow.toString() + "  ondrop='drop(event)' ondragover='allowDrop(event)'>";
            }
            // Add the piece to the square
            if(board[i][j] == "blackPawn")
                strToShow += "<img src = ../images/blackPawn.png draggable='true' ondragstart='drag(event)' id='pawn' class='piece-black' />";
            else if(board[i][j] == "whitePawn")
                strToShow += "<img src = ../images/whitePawn.png draggable='true' ondragstart='drag(event)' id='pawn' class='piece-white' />";
            else if(board[i][j] == "blackRook")
                strToShow += "<img src = ../images/blackRook.png draggable='true' ondragstart='drag(event)' id='rook' class='piece-black' />";
            else if(board[i][j] == "whiteRook")
                strToShow += "<img src = ../images/whiteRook.png draggable='true' ondragstart='drag(event)' id='rook' class='piece-white' />";
            else if(board[i][j] == "blackKnight")
                strToShow += "<img src = ../images/blackKnight.png draggable='true' ondragstart='drag(event)' id='knight' class='piece-black' />";
            else if(board[i][j] == "whiteKnight")
                strToShow += "<img src = ../images/whiteKnight.png draggable='true' ondragstart='drag(event)' id='knight' class='piece-white' />";
            else if(board[i][j] == "blackBishop")
                strToShow += "<img src = ../images/blackBishop.png draggable='true' ondragstart='drag(event)' id='bishop' class='piece-black' />";
            else if(board[i][j] == "whiteBishop")
                strToShow += "<img src = ../images/whiteBishop.png draggable='true' ondragstart='drag(event)' id='bishop' class='piece-white' />";
            else if(board[i][j] == "blackQueen")
                strToShow += "<img src = ../images/blackQueen.png draggable='true' ondragstart='drag(event)' id='queen' class='piece-black' />";
            else if(board[i][j] == "whiteQueen")
                strToShow += "<img src = ../images/whiteQueen.png draggable='true' ondragstart='drag(event)' id='queen' class='piece-white' />";
            else if(board[i][j] == "blackKing")
                strToShow += "<img src = ../images/blackKing.png draggable='true' ondragstart='drag(event)' id='king' class='piece-black' />";
            else if(board[i][j] == "whiteKing")
                strToShow += "<img src = ../images/whiteKing.png draggable='true' ondragstart='drag(event)' id='king' class='piece-white' />";
            
            // Close the square
            strToShow += "</td>";
            // Increment the id
            numToShow++;
        }
        // Close the row
        strToShow += "</tr>";
    }
    // Close the table
    strToShow += "</table>";
    // Add the reset button
    strToShow += "<div id = \"Reset-Button-Container\">";
    strToShow += "<div id = \"Center\">";
    // Add the reset button
    strToShow += "<button onclick=\"resetGame()\" id = \"Reset-Game\">Reset Game</button>"
    // Close the div
    strToShow += "</div>"
    strToShow += "</div>"
    // Show the board
    document.getElementById("gameboard").innerHTML = strToShow;

    // check if the king is in check
    let player = playerGo == "white" ? "black" : "white";
    isAITurn = !isAITurn;

    let checkmate = false;

    if(isKingInCheck(player) && !checkmate){
        alert("Check on the " + player + " king!");
    }
}

createBoard()

// Drag and drop functions
function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("piece", e.target.id); // Set the type of the piece being dragged
    e.dataTransfer.setData("startSquare", e.target.parentNode.id); // Set the id of the square where the piece was initially
}

// Drop function
function drop(e) {
    e.preventDefault();
    var piece = e.dataTransfer.getData("piece"); // Get the type of the piece being dragged
    var startSquare = parseInt(e.dataTransfer.getData("startSquare")); // Get the id of the square where the piece was initially

    if(playerGo == "black"){
        return;
    }

    // If e.target is an img element, use its parent node (the td element) instead
    var target = e.target;
    if (target.tagName === 'IMG') {
        target = target.parentNode;
    }

    // Get the row and column of the start and target squares
    const startRow = Math.floor(startSquare / width)
    const targetRow = Math.floor(target.id / width)
    const startColumn = startSquare % width
    const targetColumn = target.id % width

    // Check if the move is valid
    if(piece == "pawn")
        checkPawn(startRow, startColumn, targetRow, targetColumn);
    else if(piece == "rook")
        checkRook(startRow, startColumn, targetRow, targetColumn);
    else if(piece == "knight")
        checkKnight(startRow, startColumn, targetRow, targetColumn);
    else if(piece == "bishop")
        checkBishop(startRow, startColumn, targetRow, targetColumn);
    else if(piece == "queen")
        checkQueen(startRow, startColumn, targetRow, targetColumn);
    else if(piece == "king")
        checkKing(startRow, startColumn, targetRow, targetColumn);

    makeAIMove();
}

function makeAIMove(){
    const availableMoves = getAvailableMoves();
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    makeMove(randomMove);
    playerGo = "white";
    createBoard();

    /* let bestMove = -Infinity;
    let bestMoveIndex = 0;

    for(let i = 0; i < availableMoves.length; i++){
        let move = availableMoves[i];
        makeMove(move);

        let moveValue = minimax(3, -Infinity, Infinity, false);
        undoMove(move);

        if(moveValue > bestMove){
            bestMove = moveValue;
            bestMoveIndex = i;
        }
    }

    makeMove(availableMoves[bestMoveIndex]);

    playerGo = "white";

    createBoard(); */
}

function getAvailableMoves(){
    // Get all the available moves for the AI
    let availableMoves = [];

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(board[i][j].includes("black")){
                if(board[i][j] == "blackPawn"){
                    availableMoves = availableMoves.concat(getPawnMoves(i, j));
                } else if(board[i][j] == "blackRook"){
                    availableMoves = availableMoves.concat(getRookMoves(i, j));
                } else if(board[i][j] == "blackKnight"){
                    availableMoves = availableMoves.concat(getKnightMoves(i, j));
                } else if(board[i][j] == "blackBishop"){
                    availableMoves = availableMoves.concat(getBishopMoves(i, j));
                } else if(board[i][j] == "blackQueen"){
                    availableMoves = availableMoves.concat(getQueenMoves(i, j));
                } else if(board[i][j] == "blackKing"){
                    availableMoves = availableMoves.concat(getKingMoves(i, j));
                }
            }
        }
    }

    return availableMoves;
}

function getPawnMoves(row, column){
    let moves = [];

    if(row + 1 < 8 && board[row + 1][column] == ""){
        moves.push({startRow: row, startColumn: column, targetRow: row + 1, targetColumn: column});
    }

    if(row + 1 < 8 && column + 1 < 8 && board[row + 1][column + 1].includes("white")){
        moves.push({startRow: row, startColumn: column, targetRow: row + 1, targetColumn: column + 1});
    }

    if(row + 1 < 8 && column - 1 >= 0 && board[row + 1][column - 1].includes("white")){
        moves.push({startRow: row, startColumn: column, targetRow: row + 1, targetColumn: column - 1});
    }

    return moves;
}

function getRookMoves(row, column){
    let moves = [];

    for(let i = row + 1; i < 8; i++){
        if(board[i][column] == ""){
            moves.push({startRow: row, startColumn: column, targetRow: i, targetColumn: column});
        } else if(board[i][column].includes("white")){
            moves.push({startRow: row, startColumn: column, targetRow: i, targetColumn: column});
            break;
        } else {
            break;
        }
    }

    for(let i = row - 1; i >= 0; i--){
        if(board[i][column] == ""){
            moves.push({startRow: row, startColumn: column, targetRow: i, targetColumn: column});
        } else if(board[i][column].includes("white")){
            moves.push({startRow: row, startColumn: column, targetRow: i, targetColumn: column});
            break;
        } else {
            break;
        }
    }

    for(let i = column + 1; i < 8; i++){
        if(board[row][i] == ""){
            moves.push({startRow: row, startColumn: column, targetRow: row, targetColumn: i});
        } else if(board[row][i].includes("white")){
            moves.push({startRow: row, startColumn: column, targetRow: row, targetColumn: i});
            break;
        } else {
            break;
        }
    }

    for(let i = column - 1; i >= 0; i--){
        if(board[row][i] == ""){
            moves.push({startRow: row, startColumn: column, targetRow: row, targetColumn: i});
        } else if(board[row][i].includes("white")){
            moves.push({startRow: row, startColumn: column, targetRow: row, targetColumn: i});
            break;
        } else {
            break;
        }
    }

    return moves;
}

function getKnightMoves(row, column){
    let moves = [];

    if(row + 2 < 8 && column + 1 < 8 && !board[row + 2][column + 1].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row + 2, targetColumn: column + 1});
    }

    if(row + 2 < 8 && column - 1 >= 0 && !board[row + 2][column - 1].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row + 2, targetColumn: column - 1});
    }

    if(row - 2 >= 0 && column + 1 < 8 && !board[row - 2][column + 1].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row - 2, targetColumn: column + 1});
    }

    if(row - 2 >= 0 && column - 1 >= 0 && !board[row - 2][column - 1].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row - 2, targetColumn: column - 1});
    }

    if(row + 1 < 8 && column + 2 < 8 && !board[row + 1][column + 2].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row + 1, targetColumn: column + 2});
    }

    if(row + 1 < 8 && column - 2 >= 0 && !board[row + 1][column - 2].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row + 1, targetColumn: column - 2});
    }

    if(row - 1 >= 0 && column + 2 < 8 && !board[row - 1][column + 2].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row - 1, targetColumn: column + 2});
    }

    if(row - 1 >= 0 && column - 2 >= 0 && !board[row - 1][column - 2].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row - 1, targetColumn: column - 2});
    }

    return moves;
}

function getBishopMoves(row, column){
    let moves = [];

    for(let i = 1; row + i < 8 && column + i < 8; i++){
        if(board[row + i][column + i] == ""){
            moves.push({startRow: row, startColumn: column, targetRow: row + i, targetColumn: column + i});
        } else if(board[row + i][column + i].includes("white")){
            moves.push({startRow: row, startColumn: column, targetRow: row + i, targetColumn: column + i});
            break;
        } else {
            break;
        }
    }

    for(let i = 1; row + i < 8 && column - i >= 0; i++){
        if(board[row + i][column - i] == ""){
            moves.push({startRow: row, startColumn: column, targetRow: row + i, targetColumn: column - i});
        } else if(board[row + i][column - i].includes("white")){
            moves.push({startRow: row, startColumn: column, targetRow: row + i, targetColumn: column - i});
            break;
        } else {
            break;
        }
    }

    for(let i = 1; row - i >= 0 && column + i < 8; i++){
        if(board[row - i][column + i] == ""){
            moves.push({startRow: row, startColumn: column, targetRow: row - i, targetColumn: column + i});
        } else if(board[row - i][column + i].includes("white")){
            moves.push({startRow: row, startColumn: column, targetRow: row - i, targetColumn: column + i});
            break;
        } else {
            break;
        }
    }

    for(let i = 1; row - i >= 0 && column - i >= 0; i++){
        if(board[row - i][column - i] == ""){
            moves.push({startRow: row, startColumn: column, targetRow: row - i, targetColumn: column - i});
        } else if(board[row - i][column - i].includes("white")){
            moves.push({startRow: row, startColumn: column, targetRow: row - i, targetColumn: column - i});
            break;
        }
    }

    return moves;
}

function getQueenMoves(row, column){
    let moves = [];

    moves = moves.concat(getRookMoves(row, column));
    moves = moves.concat(getBishopMoves(row, column));

    return moves;
}

function getKingMoves(row, column){
    let moves = [];

    if(row + 1 < 8 && board[row + 1][column] == ""){
        moves.push({startRow: row, startColumn: column, targetRow: row + 1, targetColumn: column});
    }

    if(row + 1 < 8 && column + 1 < 8 && !board[row + 1][column + 1].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row + 1, targetColumn: column + 1});
    }

    if(row + 1 < 8 && column - 1 >= 0 && !board[row + 1][column - 1].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row + 1, targetColumn: column - 1});
    }

    if(row - 1 >= 0 && board[row - 1][column] == ""){
        moves.push({startRow: row, startColumn: column, targetRow: row - 1, targetColumn: column});
    }

    if(row - 1 >= 0 && column + 1 < 8 && !board[row - 1][column + 1].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row - 1, targetColumn: column + 1});
    }

    if(row - 1 >= 0 && column - 1 >= 0 && !board[row - 1][column - 1].includes("black")){
        moves.push({startRow: row, startColumn: column, targetRow: row - 1, targetColumn: column - 1});
    }

    if(column + 1 < 8 && board[row][column + 1] == ""){
        moves.push({startRow: row, startColumn: column, targetRow: row, targetColumn: column + 1});
    }

    if(column - 1 >= 0 && board[row][column - 1] == ""){
        moves.push({startRow: row, startColumn: column, targetRow: row, targetColumn: column - 1});
    }

    return moves;
}

function minimax(depth, alpha, beta, isMaximizing){
    if(depth == 0){
        return evaluateBoard();
    }

    let availableMoves = getAvailableMoves();
    let bestMove = -Infinity;

    if(isMaximizing){
        for(let i = 0; i < availableMoves.length; i++){
            let move = availableMoves[i];
            makeMove(move);

            bestMove = Math.max(bestMove, minimax(depth - 1, alpha, beta, false));
            alpha = Math.max(alpha, bestMove);
            undoMove(move);

            if(beta <= alpha){
                break;
            }
        }

        return bestMove;
    } else {
        bestMove = Infinity;

        for(let i = 0; i < availableMoves.length; i++){
            let move = availableMoves[i];
            makeMove(move);

            bestMove = Math.min(bestMove, minimax(depth - 1, alpha, beta, true));
            beta = Math.min(beta, bestMove);
            undoMove(move);

            if(beta <= alpha){
                break;
            }
        }

        return bestMove;
    }
}

function evaluateBoard(){
    let score = 0;

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(board[i][j] != ""){
                score += PiecesEval[board[i][j]];
            }
        }
    }

    return score;
}

function makeMove(move){
    board[move.targetRow][move.targetColumn] = board[move.startRow][move.startColumn];
    board[move.startRow][move.startColumn] = "";
}

function undoMove(move){
    board[move.startRow][move.startColumn] = board[move.targetRow][move.targetColumn];
    board[move.targetRow][move.targetColumn] = "";
}