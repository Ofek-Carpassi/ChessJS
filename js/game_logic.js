function checkPawn(startRow, startColumn, targetRow, targetColumn, isAI){
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
                /* if(isKingInCheck("white")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                } */
                createBoard();
                playerGo = "black";
            }
            // If the pawn is moving two squares forward
            else if(startRow == 6 && startRow - targetRow == 2 && startColumn == targetColumn && board[targetRow][targetColumn] == ""){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "whitePawn";
                /* if(isKingInCheck("white")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                } */
                createBoard();
                playerGo = "black";
            }
            // If the pawn is capturing a piece
            else if(startRow - targetRow == 1 && Math.abs(startColumn - targetColumn) == 1 && board[targetRow][targetColumn].includes("black")){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "whitePawn";
                /* if(isKingInCheck("white")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                } */
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
                /* if(isKingInCheck("black")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                } */
                createBoard();
                playerGo = "white";
            }
            // If the pawn is moving two squares forward
            else if(startRow == 1 && startRow - targetRow == -2 && startColumn == targetColumn && board[targetRow][targetColumn] == ""){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "blackPawn";
                /* if(isKingInCheck("black")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                } */
                createBoard();
                playerGo = "white";
            }
            // If the pawn is capturing a piece
            else if(startRow - targetRow == -1 && Math.abs(startColumn - targetColumn) == 1 && board[targetRow][targetColumn].includes("white")){
                board[startRow][startColumn] = "";
                board[targetRow][targetColumn] = "blackPawn";
                /* if(isKingInCheck("black")){
                    board[startRow][startColumn] = piece;
                    board[targetRow][targetColumn] = targetPiece;
                    alert("Invalid move. You are in check.");
                    return;
                } */
                createBoard();
                playerGo = "white";
            }
        }
    }
}

function checkKnight(startRow, startColumn, targetRow, targetColumn, isAI){
    // Check if the piece is a knight
    piece = board[startRow][startColumn];
    if(board[startRow][startColumn].includes(playerGo)){
        let piece = board[startRow][startColumn];
        let targetPiece = board[targetRow][targetColumn];
        if((startRow - 2 == targetRow && startColumn - 1 == targetColumn) || (startRow - 2 == targetRow && startColumn + 1 == targetColumn) ||
            (startRow + 2 == targetRow && startColumn - 1 == targetColumn) || (startRow + 2 == targetRow && startColumn + 1 == targetColumn) ||
            (startRow - 1 == targetRow && startColumn - 2 == targetColumn) || (startRow - 1 == targetRow && startColumn + 2 == targetColumn) ||
            (startRow + 1 == targetRow && startColumn - 2 == targetColumn) || (startRow + 1 == targetRow && startColumn + 2 == targetColumn)){
            board[startRow][startColumn] = "";
            board[targetRow][targetColumn] = playerGo + piece.substring(5);
            /* if(isKingInCheck(playerGo)){
                board[startRow][startColumn] = piece;
                board[targetRow][targetColumn] = targetPiece;
                alert("Invalid move. You are in check.");
                return;
            } */
            createBoard();
            if(playerGo == "white")
                playerGo = "black";
            else
                playerGo = "white";
        }
    }
}

function checkBishop(startRow, startColumn, targetRow, targetColumn, isAI){
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
            /* if(isKingInCheck(playerGo)){
                board[startRow][startColumn] = piece;
                board[targetRow][targetColumn] = targetPiece;
                alert("Invalid move. You are in check.");
                return;
            } */
        }
    }
}

function checkQueen(startRow, startColumn, targetRow, targetColumn, isAI){
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
            /* if(isKingInCheck(playerGo)){
                board[startRow][startColumn] = piece;
                board[targetRow][targetColumn] = targetPiece;
                alert("Invalid move. You are in check.");
                return;
            } */
        }
    }
}

function checkRook(startRow, startColumn, targetRow, targetColumn, isAI){
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

function checkKing(startRow, startColumn, targetRow, targetColumn, isAI){
    if(board[startRow][startColumn].includes(playerGo)){
        let piece = board[startRow][startColumn];
        let targetPiece = board[targetRow][targetColumn];
        if(Math.abs(startRow - targetRow) <= 1 && Math.abs(startColumn - targetColumn) <= 1){
            // Normal King move
            board[startRow][startColumn] = "";
            board[targetRow][targetColumn] = playerGo + "King";
            createBoard();
            /* if(isKingInCheck(playerGo)){
                board[startRow][startColumn] = piece;
                board[targetRow][targetColumn] = targetPiece;
                alert("Invalid move. You are in check.");
                return;
            } */
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