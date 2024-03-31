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
                strToShow += "<td style='background-color:black'  width='60' height='60' id=" +
                    numToShow.toString() + "  ondrop='drop(event)' ondragover='allowDrop(event)'>";
            } else {
                strToShow += "<td style='background-color:white'  width='60' height='60' id=" +
                    numToShow.toString() + "  ondrop='drop(event)' ondragover='allowDrop(event)'>";
            }
            // Add the piece to the square
            if(board[i][j] == "blackPawn")
                strToShow += "<img src = images/blackPawn.png draggable='true' ondragstart='drag(event)' id='pawn' class='piece black' />";
            else if(board[i][j] == "whitePawn")
                strToShow += "<img src = images/whitePawn.png draggable='true' ondragstart='drag(event)' id='pawn' class='piece white' />";
            else if(board[i][j] == "blackRook")
                strToShow += "<img src = images/blackRook.png draggable='true' ondragstart='drag(event)' id='rook' class='piece black' />";
            else if(board[i][j] == "whiteRook")
                strToShow += "<img src = images/whiteRook.png draggable='true' ondragstart='drag(event)' id='rook' class='piece white' />";
            else if(board[i][j] == "blackKnight")
                strToShow += "<img src = images/blackKnight.png draggable='true' ondragstart='drag(event)' id='knight' class='piece black' />";
            else if(board[i][j] == "whiteKnight")
                strToShow += "<img src = images/whiteKnight.png draggable='true' ondragstart='drag(event)' id='knight' class='piece white' />";
            else if(board[i][j] == "blackBishop")
                strToShow += "<img src = images/blackBishop.png draggable='true' ondragstart='drag(event)' id='bishop' class='piece black' />";
            else if(board[i][j] == "whiteBishop")
                strToShow += "<img src = images/whiteBishop.png draggable='true' ondragstart='drag(event)' id='bishop' class='piece white' />";
            else if(board[i][j] == "blackQueen")
                strToShow += "<img src = images/blackQueen.png draggable='true' ondragstart='drag(event)' id='queen' class='piece black' />";
            else if(board[i][j] == "whiteQueen")
                strToShow += "<img src = images/whiteQueen.png draggable='true' ondragstart='drag(event)' id='queen' class='piece white' />";
            else if(board[i][j] == "blackKing")
                strToShow += "<img src = images/blackKing.png draggable='true' ondragstart='drag(event)' id='king' class='piece black' />";
            else if(board[i][j] == "whiteKing")
                strToShow += "<img src = images/whiteKing.png draggable='true' ondragstart='drag(event)' id='king' class='piece white' />";
            
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
        checkBishop(startRow, startColumn, targetRow, targetColumn);
    else if(piece == "queen")
        checkQueen(startRow, startColumn, targetRow, targetColumn);
    else if(piece == "king")
        checkKing(startRow, startColumn, targetRow, targetColumn);
}

function checkPawn(startRow, startColumn, targetRow, targetColumn){
    // Check if the piece is a pawn
    if(board[startRow][startColumn].includes(playerGo)){
        // Store the piece and target piece
        let piece = board[startRow][startColumn];
        let targetPiece = board[targetRow][targetColumn];

        // If the player is white
        if(playerGo == "white"){
            // If the pawn is moving one square forward
            if(startRow - targetRow == 1 && startColumn == targetColumn && board[targetRow][targetColumn] == ""){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "whitePawn";
                if(isKingInCheck("white")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                }
                createBoard();
                playerGo = "black";
            }
            // If the pawn is moving two squares forward
            else if(startRow == 6 && startRow - targetRow == 2 && startColumn == targetColumn && board[targetRow][targetColumn] == ""){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "whitePawn";
                if(isKingInCheck("white")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                }
                createBoard();
                playerGo = "black";
            }
            // If the pawn is capturing a piece
            else if(startRow - targetRow == 1 && Math.abs(startColumn - targetColumn) == 1 && board[targetRow][targetColumn].includes("black")){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "whitePawn";
                if(isKingInCheck("white")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                }
                createBoard();
                playerGo = "black";
            }
        }
        // If the player is black
        else {
            // If the pawn is moving one square forward
            if(startRow - targetRow == -1 && startColumn == targetColumn && board[targetRow][targetColumn] == ""){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "blackPawn";
                if(isKingInCheck("black")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                }
                createBoard();
                playerGo = "white";
            }
            // If the pawn is moving two squares forward
            else if(startRow == 1 && startRow - targetRow == -2 && startColumn == targetColumn && board[targetRow][targetColumn] == ""){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "blackPawn";
                if(isKingInCheck("black")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                }
                createBoard();
                playerGo = "white";
            }
            // If the pawn is capturing a piece
            else if(startRow - targetRow == -1 && Math.abs(startColumn - targetColumn) == 1 && board[targetRow][targetColumn].includes("white")){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "blackPawn";
                if(isKingInCheck("black")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                }
                createBoard();
                playerGo = "white";
            }
        }
    }
}

function checkKnight(startRow, startColumn, targetRow, targetColumn){
    // Check if the piece is a knight
    if(board[startRow][startColumn].includes(playerGo)){
        let piece = board[startRow][startColumn];
        let targetPiece = board[targetRow][targetColumn];
        if((startRow - 2 == targetRow && startColumn - 1 == targetColumn) || (startRow - 2 == targetRow && startColumn + 1 == targetColumn) ||
            (startRow + 2 == targetRow && startColumn - 1 == targetColumn) || (startRow + 2 == targetRow && startColumn + 1 == targetColumn) ||
            (startRow - 1 == targetRow && startColumn - 2 == targetColumn) || (startRow - 1 == targetRow && startColumn + 2 == targetColumn) ||
            (startRow + 1 == targetRow && startColumn - 2 == targetColumn) || (startRow + 1 == targetRow && startColumn + 2 == targetColumn)){
            board[startRow][startColumn] = "";
            board[targetRow][targetColumn] = playerGo + "Knight";
            if(isKingInCheck(playerGo)){
                board[startRow][startColumn] = piece;
                board[targetRow][targetColumn] = targetPiece;
                alert("Invalid move. You are in check.");
                return;
            }
            createBoard();
            if(playerGo == "white")
                playerGo = "black";
            else
                playerGo = "white";
        }
    }
}

function checkBishop(startRow, startColumn, targetRow, targetColumn){
    if(board[startRow][startColumn].includes(playerGo)){
        let piece = board[startRow][startColumn];
        let targetPiece = board[targetRow][targetColumn];
        if(startRow - targetRow == startColumn - targetColumn || startRow - targetRow == targetColumn - startColumn){
            let rowIncrement = startRow < targetRow ? 1 : -1;
            let colIncrement = startColumn < targetColumn ? 1 : -1;
            let row, col;
            for(row = startRow + rowIncrement, col = startColumn + colIncrement; 
                row != targetRow; 
                row += rowIncrement, col += colIncrement){
                if(board[row][col] != ""){
                    return;
                }
            }
            board[startRow][startColumn] = "";
            board[targetRow][targetColumn] = playerGo + "Bishop";
            createBoard();
            if(playerGo == "white")
                playerGo = "black";
            else
                playerGo = "white";
            if(isKingInCheck(playerGo)){
                board[startRow][startColumn] = piece;
                board[targetRow][targetColumn] = targetPiece;
                alert("Invalid move. You are in check.");
                return;
            }
        }
    }
}

function checkQueen(startRow, startColumn, targetRow, targetColumn){
    if(board[startRow][startColumn].includes(playerGo)){
        let piece = board[startRow][startColumn];
        let targetPiece = board[targetRow][targetColumn];
        if(startRow == targetRow || startColumn == targetColumn || Math.abs(startRow - targetRow) == Math.abs(startColumn - targetColumn)){
            let rowIncrement = startRow < targetRow ? 1 : startRow > targetRow ? -1 : 0;
            let colIncrement = startColumn < targetColumn ? 1 : startColumn > targetColumn ? -1 : 0;
            let row, col;
            for(row = startRow + rowIncrement, col = startColumn + colIncrement; 
                row != targetRow || col != targetColumn; 
                row += rowIncrement, col += colIncrement){
                if(board[row][col] != ""){
                    return;
                }
            }
            board[startRow][startColumn] = "";
            board[targetRow][targetColumn] = playerGo + "Queen";
            createBoard();
            if(playerGo == "white")
                playerGo = "black";
            else
                playerGo = "white";
            if(isKingInCheck(playerGo)){
                board[startRow][startColumn] = piece;
                board[targetRow][targetColumn] = targetPiece;
                alert("Invalid move. You are in check.");
                return;
            }
        }
    }
}

function checkRook(startRow, startColumn, targetRow, targetColumn){
    if(board[startRow][startColumn].includes(playerGo)){
        if(startRow == targetRow){
            if(startColumn < targetColumn){
                for(let i = startColumn + 1; i < targetColumn; i++){
                    if(board[startRow][i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Rook";
                createBoard();
            }
            else if(startColumn > targetColumn){
                for(let i = startColumn - 1; i > targetColumn; i--){
                    if(board[startRow][i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Rook";
                createBoard();
            }
        }
        else if(startColumn == targetColumn){
            if(startRow < targetRow){
                for(let i = startRow + 1; i < targetRow; i++){
                    if(board[i][startColumn] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Rook";
                createBoard();
            }
            else if(startRow > targetRow){
                for(let i = startRow - 1; i > targetRow; i--){
                    if(board[i][startColumn] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Rook";
                createBoard();
            }
        }
        if(playerGo == "white")
            playerGo = "black";
        else
            playerGo = "white";
    }
}

function checkKing(startRow, startColumn, targetRow, targetColumn){
    if(board[startRow][startColumn].includes(playerGo)){
        let piece = board[startRow][startColumn];
        let targetPiece = board[targetRow][targetColumn];
        if(Math.abs(startRow - targetRow) <= 1 && Math.abs(startColumn - targetColumn) <= 1){
            // Normal King move
            board[startRow][startColumn] = "";
            board[targetRow][targetColumn] = playerGo + "King";
            createBoard();
            if(isKingInCheck(playerGo)){
                board[startRow][startColumn] = piece;
                board[targetRow][targetColumn] = targetPiece;
                alert("Invalid move. You are in check.");
                return;
            }
            if(playerGo == "white"){
                whiteKingMoved = true;
            }
            else{
                blackKingMoved = true;
            }
        } else if (startRow === targetRow && Math.abs(startColumn - targetColumn) === 2) {
            // Castling move
            if (isKingInCheck(playerGo)) {
                alert("Invalid move. You are in check.");
                return;
            }
            let rookColumn = targetColumn === 2 ? 0 : 7;
            let rookTargetColumn = targetColumn === 2 ? 3 : 5;
            let rookRow = playerGo === "white" ? 7 : 0;

            if ((playerGo === "white" && whiteKingMoved) || (playerGo === "black" && blackKingMoved)) {
                alert("Invalid move. The king has already moved.");
                return;
            }

            if (!board[startRow][rookColumn].includes(playerGo + "Rook") || board[rookRow][rookColumn] !== "") {
                alert("Invalid move. The rook is not in its original position or there are pieces between the king and the rook.");
                return;
            }

            // Check for pieces between the king and rook
            for (let i = Math.min(startColumn, rookColumn) + 1; i < Math.max(startColumn, rookColumn); i++) {
                if (board[startRow][i] !== "") {
                    alert("Invalid move. There are pieces between the king and the rook.");
                    return;
                }
            }

            // Move the king and the rook
            board[startRow][startColumn] = "";
            board[targetRow][targetColumn] = playerGo + "King";
            board[rookRow][rookColumn] = "";
            board[rookRow][rookTargetColumn] = playerGo + "Rook";
            createBoard();

            if(playerGo == "white"){
                whiteKingMoved = true;
            }
            else{
                blackKingMoved = true;
            }
        }
        playerGo = playerGo === "white" ? "black" : "white";
    }
}

function isKingInCheck(color){
    let kingRow = -1;
    let kingColumn = -1;
    let opponentColor = color == "white" ? "black" : "white";

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(board[i][j].includes(color + "King")){
                kingRow = i;
                kingColumn = j;
            }
        }
    }

    // check if in check by pawn
    if(color == "white"){
        if(kingRow - 1 >= 0){
            if(kingColumn - 1 >= 0 && board[kingRow - 1][kingColumn - 1].includes(opponentColor + "Pawn"))
                return true;
            if(kingColumn + 1 < 8 && board[kingRow - 1][kingColumn + 1].includes(opponentColor + "Pawn"))
                return true;
        }
    }
    else{
        if(kingRow + 1 < 8){
            if(kingColumn - 1 >= 0 && board[kingRow + 1][kingColumn - 1].includes(opponentColor + "Pawn"))
                return true;
            if(kingColumn + 1 < 8 && board[kingRow + 1][kingColumn + 1].includes(opponentColor + "Pawn"))
                return true;
        }
    }

    // check if in check by rook or queen
    for(let i = kingRow + 1; i < 8; i++){
        if(board[i][kingColumn] != ""){
            if(board[i][kingColumn].includes(opponentColor + "Rook") || board[i][kingColumn].includes(opponentColor + "Queen"))
                return true;
            break;
        }
    }
    for(let i = kingRow - 1; i >= 0; i--){
        if(board[i][kingColumn] != ""){
            if(board[i][kingColumn].includes(opponentColor + "Rook") || board[i][kingColumn].includes(opponentColor + "Queen"))
                return true;
            break;
        }
    }
    for(let i = kingColumn + 1; i < 8; i++){
        if(board[kingRow][i] != ""){
            if(board[kingRow][i].includes(opponentColor + "Rook") || board[kingRow][i].includes(opponentColor + "Queen"))
                return true;
            break;
        }
    }
    for(let i = kingColumn - 1; i >= 0; i--){
        if(board[kingRow][i] != ""){
            if(board[kingRow][i].includes(opponentColor + "Rook") || board[kingRow][i].includes(opponentColor + "Queen"))
                return true;
            break;
        }
    }

    // check if in check by bishop or queen
    for(let i = 1; kingRow + i < 8 && kingColumn + i < 8; i++){
        if(board[kingRow + i][kingColumn + i] != ""){
            if(board[kingRow + i][kingColumn + i].includes(opponentColor + "Bishop") || board[kingRow + i][kingColumn + i].includes(opponentColor + "Queen"))
                return true;
            break;
        }
    }
    for(let i = 1; kingRow - i >= 0 && kingColumn - i >= 0; i++){
        if(board[kingRow - i][kingColumn - i] != ""){
            if(board[kingRow - i][kingColumn - i].includes(opponentColor + "Bishop") || board[kingRow - i][kingColumn - i].includes(opponentColor + "Queen"))
                return true;
            break;
        }
    }
    for(let i = 1; kingRow + i < 8 && kingColumn - i >= 0; i++){
        if(board[kingRow + i][kingColumn - i] != ""){
            if(board[kingRow + i][kingColumn - i].includes(opponentColor + "Bishop") || board[kingRow + i][kingColumn - i].includes(opponentColor + "Queen"))
                return true;
            break;
        }
    }
    for(let i = 1; kingRow - i >= 0 && kingColumn + i < 8; i++){
        if(board[kingRow - i][kingColumn + i] != ""){
            if(board[kingRow - i][kingColumn + i].includes(opponentColor + "Bishop") || board[kingRow - i][kingColumn + i].includes(opponentColor + "Queen"))
                return true;
            break;
        }
    }

    // check if in check by knight
    if(kingRow - 2 >= 0 && kingColumn - 1 >= 0 && board[kingRow - 2][kingColumn - 1].includes(opponentColor + "Knight"))
        return true;
    if(kingRow - 2 >= 0 && kingColumn + 1 < 8 && board[kingRow - 2][kingColumn + 1].includes(opponentColor + "Knight"))
        return true;
    if(kingRow + 2 < 8 && kingColumn - 1 >= 0 && board[kingRow + 2][kingColumn - 1].includes(opponentColor + "Knight"))
        return true;
    if(kingRow + 2 < 8 && kingColumn + 1 < 8 && board[kingRow + 2][kingColumn + 1].includes(opponentColor + "Knight"))
        return true;
    if(kingRow - 1 >= 0 && kingColumn - 2 >= 0 && board[kingRow - 1][kingColumn - 2].includes(opponentColor + "Knight"))
        return true;
    if(kingRow - 1 >= 0 && kingColumn + 2 < 8 && board[kingRow - 1][kingColumn + 2].includes(opponentColor + "Knight"))
        return true;
    if(kingRow + 1 < 8 && kingColumn - 2 >= 0 && board[kingRow + 1][kingColumn - 2].includes(opponentColor + "Knight")) 
        return true;
    if(kingRow + 1 < 8 && kingColumn + 2 < 8 && board[kingRow + 1][kingColumn + 2].includes(opponentColor + "Knight"))
        return true;

    return false;
}

// function isCheckmate(color) {
//     let kingRow = -1;
//     let kingCol = -1;
//     let opponentColor = color == "white" ? "black" : "white";
//     let canMoveRight = true;
//     let canMoveLeft = true;
//     let canMoveDown = true;
//     let canMoveUp = true;
//     let canMoveUpRight = true;
//     let canMoveUpLeft = true;
//     let canMoveDownRight = true;
//     let canMoveDownLeft = true;

//     for(let i = 0; i < 8; i++){
//         for(let j = 0; j < 8; j++){
//             if(board[i][j].includes(color + "King")){
//                 kingRow = i;
//                 kingCol = j;
//             }
//         }
//     }

//     for(let i = kingCol+1; i < 8; i++){
//         if(board[kingRow][i] != "")
//             if(board[kingRow][i].includes(opponentColor + "Rook") || board[kingRow][i].includes(opponentColor + "Queen"))
//                 canMoveRight = false;
//             break;
//     }

//     for(let i = kingCol-1; i >= 0; i--){
//         if(board[kingRow][i] != "")
//             if(board[kingRow][i].includes(opponentColor + "Rook") || board[kingRow][i].includes(opponentColor + "Queen"))
//                 canMoveLeft = false;
//             break;
//     }

//     for(let i = kingRow+1; i < 8; i++){
//         if(board[i][kingCol] != "")
//             if(board[i][kingCol].includes(opponentColor + "Rook") || board[i][kingCol].includes(opponentColor + "Queen"))
//                 canMoveDown = false;
//             break;
//     }

//     for(let i = kingRow-1; i >= 0; i--){
//         if(board[i][kingCol] != "")
//             if(board[i][kingCol].includes(opponentColor + "Rook") || board[i][kingCol].includes(opponentColor + "Queen"))
//                 canMoveUp = false;
//             break;
//     }

//     for(let i = 1; kingRow + i < 8 && kingCol + i < 8; i++){
//         if(board[kingRow + i][kingCol + i] != "")
//             if(board[kingRow + i][kingCol + i].includes(opponentColor + "Bishop") || board[kingRow + i][kingCol + i].includes(opponentColor + "Queen"))
//                 canMoveDownRight = false;
//             break;
//     }

//     for(let i = 1; kingRow - i >= 0 && kingCol - i >= 0; i++){
//         if(board[kingRow - i][kingCol - i] != "")
//             if(board[kingRow - i][kingCol - i].includes(opponentColor + "Bishop") || board[kingRow - i][kingCol - i].includes(opponentColor + "Queen"))
//                 canMoveUpLeft = false;
//             break;
//     }

//     for(let i = 1; kingRow + i < 8 && kingCol - i >= 0; i++){
//         if(board[kingRow + i][kingCol - i] != "")
//             if(board[kingRow + i][kingCol - i].includes(opponentColor + "Bishop") || board[kingRow + i][kingCol - i].includes(opponentColor + "Queen"))
//                 canMoveDownLeft = false;
//             break;
//     }

//     for(let i = 1; kingRow - i >= 0 && kingCol + i < 8; i++){
//         if(board[kingRow - i][kingCol + i] != "")
//             if(board[kingRow - i][kingCol + i].includes(opponentColor + "Bishop") || board[kingRow - i][kingCol + i].includes(opponentColor + "Queen"))
//                 canMoveUpRight = false;
//             break;
//     }

//     if(canMoveRight && canMoveLeft && canMoveDown && canMoveUp && canMoveUpRight && canMoveUpLeft && canMoveDownRight && canMoveDownLeft && isKingInCheck(color))
//         return true;

//     return false;
// }