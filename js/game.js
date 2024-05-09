// initialize variables
let playerGo = "white"; // white always goes first
let width = 8; // width of the board
let whiteKingMoved = false; // check if the white king has moved
let blackKingMoved = false; // check if the black king has moved
let kingWhiteRookMoved = false; // check if the white king rook has moved
let queenWhiteRookMoved = false; // check if the white queen rook has moved
let kingBlackRookMoved = false; // check if the black king rook has moved
let queenBlackRookMoved = false; // check if the black queen rook has moved

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

    let checkmate = false;
    // if(isCheckmate(player)){
    //     alert("Checkmate! " + player + " wins!");
    //     // make the pieces in the board unclickable
    //     checkmate = true;
    // }

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
    {
        checkBishop(startRow, startColumn, targetRow, targetColumn);
    }
    else if(piece == "queen")
        checkQueen(startRow, startColumn, targetRow, targetColumn);
    else if(piece == "king")
        checkKing(startRow, startColumn, targetRow, targetColumn);
}

/* function isCheckmate(color) {
    let kingRow = -1;
    let kingCol = -1;
    let opponentColor = color == "white" ? "black" : "white";
    let canMoveRight = true;
    let canMoveLeft = true;
    let canMoveDown = true;
    let canMoveUp = true;
    let canMoveUpRight = true;
    let canMoveUpLeft = true;
    let canMoveDownRight = true;
    let canMoveDownLeft = true;

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(board[i][j].includes(color + "King")){
                kingRow = i;
                kingCol = j;
            }
        }
    }

    for(let i = kingCol+1; i < 8; i++){
        if(board[kingRow][i] != "")
            if(board[kingRow][i].includes(opponentColor + "Rook") || board[kingRow][i].includes(opponentColor + "Queen"))
                canMoveRight = false;
            break;
    }

    for(let i = kingCol-1; i >= 0; i--){
        if(board[kingRow][i] != "")
            if(board[kingRow][i].includes(opponentColor + "Rook") || board[kingRow][i].includes(opponentColor + "Queen"))
                canMoveLeft = false;
            break;
    }

    for(let i = kingRow+1; i < 8; i++){
        if(board[i][kingCol] != "")
            if(board[i][kingCol].includes(opponentColor + "Rook") || board[i][kingCol].includes(opponentColor + "Queen"))
                canMoveDown = false;
            break;
    }

    for(let i = kingRow-1; i >= 0; i--){
        if(board[i][kingCol] != "")
            if(board[i][kingCol].includes(opponentColor + "Rook") || board[i][kingCol].includes(opponentColor + "Queen"))
                canMoveUp = false;
            break;
    }

    for(let i = 1; kingRow + i < 8 && kingCol + i < 8; i++){
        if(board[kingRow + i][kingCol + i] != "")
            if(board[kingRow + i][kingCol + i].includes(opponentColor + "Bishop") || board[kingRow + i][kingCol + i].includes(opponentColor + "Queen"))
                canMoveDownRight = false;
            break;
    }

    for(let i = 1; kingRow - i >= 0 && kingCol - i >= 0; i++){
        if(board[kingRow - i][kingCol - i] != "")
            if(board[kingRow - i][kingCol - i].includes(opponentColor + "Bishop") || board[kingRow - i][kingCol - i].includes(opponentColor + "Queen"))
                canMoveUpLeft = false;
            break;
    }

    for(let i = 1; kingRow + i < 8 && kingCol - i >= 0; i++){
        if(board[kingRow + i][kingCol - i] != "")
            if(board[kingRow + i][kingCol - i].includes(opponentColor + "Bishop") || board[kingRow + i][kingCol - i].includes(opponentColor + "Queen"))
                canMoveDownLeft = false;
            break;
    }

    for(let i = 1; kingRow - i >= 0 && kingCol + i < 8; i++){
        if(board[kingRow - i][kingCol + i] != "")
            if(board[kingRow - i][kingCol + i].includes(opponentColor + "Bishop") || board[kingRow - i][kingCol + i].includes(opponentColor + "Queen"))
                canMoveUpRight = false;
            break;
    }

    if(canMoveRight && canMoveLeft && canMoveDown && canMoveUp && canMoveUpRight && canMoveUpLeft && canMoveDownRight && canMoveDownLeft && isKingInCheck(color))
        return true;

    return false;
} */