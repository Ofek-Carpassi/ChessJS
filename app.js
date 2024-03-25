// initialize variables
let playerGo = "white";
let width = 8;
let whiteKingMoved = false;
let blackKingMoved = false;
let kingWhiteRookMoved = false;
let queenWhiteRookMoved = false;
let kingBlackRookMoved = false;
let queenBlackRookMoved = false;


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

function resetGame(){
    playerGo = "white";
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
    createBoard();
}

function createBoard(){
    let numToShow = 0;
    
    let strToShow = "<table border='1'  align='center'>";
    for(let i = 0; i < 8; i++){ 
        strToShow += "<tr>";
        for(let j = 0; j < 8; j++){
            if((i+j) % 2 === 0){
                strToShow += "<td style='background-color:black'  width='60' height='60' id=" +
                    numToShow.toString() + "  ondrop='drop(event)' ondragover='allowDrop(event)'>";
            } else {
                strToShow += "<td style='background-color:white'  width='60' height='60' id=" +
                    numToShow.toString() + "  ondrop='drop(event)' ondragover='allowDrop(event)'>";
            }
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
            
            strToShow += "</td>";
            numToShow++;
        }
        strToShow += "</tr>";
    }
    strToShow += "</table>";
    strToShow += "<div id = \"Reset-Button-Container\">";
    strToShow += "<div id = \"Center\">";
    strToShow += "<button onclick=\"resetGame()\" id = \"Reset-Game\">Reset Game</button>"
    strToShow += "</div>"
    strToShow += "</div>"
    document.getElementById("gameboard").innerHTML = strToShow;
}

createBoard()

function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("piece", e.target.id); // Set the type of the piece being dragged
    e.dataTransfer.setData("startSquare", e.target.parentNode.id); // Set the id of the square where the piece was initially
}

function drop(e) {
    e.preventDefault();
    var piece = e.dataTransfer.getData("piece"); // Get the type of the piece being dragged
    var startSquare = parseInt(e.dataTransfer.getData("startSquare")); // Get the id of the square where the piece was initially

    // If e.target is an img element, use its parent node (the td element) instead
    var target = e.target;
    if (target.tagName === 'IMG') {
        target = target.parentNode;
    }

    const startRow = Math.floor(startSquare / width)
    const targetRow = Math.floor(target.id / width)
    const startColumn = startSquare % width
    const targetColumn = target.id % width

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
    if(board[startRow][startColumn].includes(playerGo)){
        if(playerGo == "white"){
            if(startRow - targetRow == 1 && startColumn == targetColumn && board[targetRow][targetColumn] == ""){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "whitePawn";
                createBoard();
                playerGo = "black";
            }
            else if(startRow == 6 && startRow - targetRow == 2 && startColumn == targetColumn && board[targetRow][targetColumn] == ""){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "whitePawn";
                createBoard();
                playerGo = "black";
            }
            else if(startRow - targetRow == 1 && Math.abs(startColumn - targetColumn) == 1 && board[targetRow][targetColumn].includes("black")){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "whitePawn";
                createBoard();
                playerGo = "black";
            }
        }
        else{
            if(startRow - targetRow == -1 && startColumn == targetColumn && board[targetRow][targetColumn] == ""){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "blackPawn";
                createBoard();
                playerGo = "white";
            }
            else if(startRow == 1 && startRow - targetRow == -2 && startColumn == targetColumn && board[targetRow][targetColumn] == ""){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "blackPawn";
                createBoard();
                playerGo = "white";
            }
            else if(startRow - targetRow == -1 && Math.abs(startColumn - targetColumn) == 1 && board[targetRow][targetColumn].includes("white")){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "blackPawn";
                createBoard();
                playerGo = "white";
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

function checkKnight(startRow, startColumn, targetRow, targetColumn){
    if(board[startRow][startColumn].includes(playerGo)){
        if((startRow - 2 == targetRow && startColumn - 1 == targetColumn) || (startRow - 2 == targetRow && startColumn + 1 == targetColumn) ||
            (startRow + 2 == targetRow && startColumn - 1 == targetColumn) || (startRow + 2 == targetRow && startColumn + 1 == targetColumn) ||
            (startRow - 1 == targetRow && startColumn - 2 == targetColumn) || (startRow - 1 == targetRow && startColumn + 2 == targetColumn) ||
            (startRow + 1 == targetRow && startColumn - 2 == targetColumn) || (startRow + 1 == targetRow && startColumn + 2 == targetColumn)){
            board[startRow][startColumn] = "";
            board[targetRow][targetColumn] = playerGo + "Knight";
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
        if(startRow - targetRow == startColumn - targetColumn){
            if(startRow < targetRow){
                for(let i = 1; i < targetRow - startRow; i++){
                    if(board[startRow + i][startColumn + i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Bishop";
                createBoard();
            }
            else if(startRow > targetRow){
                for(let i = 1; i < startRow - targetRow; i++){
                    if(board[startRow - i][startColumn - i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Bishop";
                createBoard();
            }
        }
        else if(startRow - targetRow == targetColumn - startColumn){
            if(startRow < targetRow){
                for(let i = 1; i < targetRow - startRow; i++){
                    if(board[startRow + i][startColumn - i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Bishop";
                createBoard();
            }
            else if(startRow > targetRow){
                for(let i = 1; i < startRow - targetRow; i++){
                    if(board[startRow - i][startColumn + i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Bishop";
                createBoard();
            }
        }
        if(playerGo == "white")
            playerGo = "black";
        else
            playerGo = "white";
    }
}

function checkQueen(startRow, startColumn, targetRow, targetColumn){
    if(board[startRow][startColumn].includes(playerGo)){
        if(startRow == targetRow){
            if(startColumn < targetColumn){
                for(let i = startColumn + 1; i < targetColumn; i++){
                    if(board[startRow][i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Queen";
                createBoard();
            }
            else if(startColumn > targetColumn){
                for(let i = startColumn - 1; i > targetColumn; i--){
                    if(board[startRow][i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Queen";
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
                board[targetRow][targetColumn] = playerGo + "Queen";
                createBoard();
            }
            else if(startRow > targetRow){
                for(let i = startRow - 1; i > targetRow; i--){
                    if(board[i][startColumn] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Queen";
                createBoard();
            }
        }
        if(startRow - targetRow == startColumn - targetColumn){
            if(startRow < targetRow){
                for(let i = 1; i < targetRow - startRow; i++){
                    if(board[startRow + i][startColumn + i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Queen";
                createBoard();
            }
            else if(startRow > targetRow){
                for(let i = 1; i < startRow - targetRow; i++){
                    if(board[startRow - i][startColumn - i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Queen";
                createBoard();
            }
        }
        else if(startRow - targetRow == targetColumn - startColumn){
            if(startRow < targetRow){
                for(let i = 1; i < targetRow - startRow; i++){
                    if(board[startRow + i][startColumn - i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Queen";
                createBoard();
            }
            else if(startRow > targetRow){
                for(let i = 1; i < startRow - targetRow; i++){
                    if(board[startRow - i][startColumn + i] != ""){
                        return;
                    }
                }
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = playerGo + "Queen";
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
        // Prevent the king from capturing its own pieces
        if (board[targetRow][targetColumn].includes(playerGo)) {
            return;
        }

        if((startRow == targetRow && startColumn + 1 == targetColumn) || (startRow == targetRow && startColumn - 1 == targetColumn) ||
            (startRow + 1 == targetRow && startColumn == targetColumn) || (startRow - 1 == targetRow && startColumn == targetColumn) ||
            (startRow + 1 == targetRow && startColumn + 1 == targetColumn) || (startRow + 1 == targetRow && startColumn - 1 == targetColumn) ||
            (startRow - 1 == targetRow && startColumn + 1 == targetColumn) || (startRow - 1 == targetRow && startColumn - 1 == targetColumn)){
            board[startRow][startColumn] = "";
            board[targetRow][targetColumn] = playerGo + "King";
            createBoard();
            if(playerGo == "white"){
                playerGo = "black";
                whiteKingMoved = true;
            }
            else{
                playerGo = "white";
                blackKingMoved = true;
            }
        }
        // castling
        else if(startRow == targetRow && startColumn == targetColumn + 2){
            if(playerGo == "white"){
                if(!whiteKingMoved && !kingWhiteRookMoved){
                    board[7][4] = "";
                    board[7][2] = "whiteKing";
                    board[7][0] = "";
                    board[7][3] = "whiteRook";
                    createBoard();
                    playerGo = "black";
                    whiteKingMoved = true;
                }
            }
            else{
                if(!blackKingMoved && !kingBlackRookMoved){
                    board[0][4] = "";
                    board[0][2] = "blackKing";
                    board[0][0] = "";
                    board[0][3] = "blackRook";
                    createBoard();
                    playerGo = "white";
                    blackKingMoved = true;
                }
            }
        }
    }
}