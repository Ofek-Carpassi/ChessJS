const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'white'
playerDisplay.textContent = 'white'
let whiteKingMoved = false;
let blackKingMoved = false;
let kingWhiteRookMoved = false;
let queenWhiteRookMoved = false;
let kingBlackRookMoved = false;
let queenBlackRookMoved = false;
let kingWhiteRookID = 0;
let queenWhiteRookID = 7;
let kingBlackRookID = 7;
let queenBlackRookID = 0;
let whitePawnEnPassant = [false, false, false, false, false, false, false, false];
let blackPawnEnPassant = [false, false, false, false, false, false, false, false];
let currentWhiteKingId = 7;
let currentBlackKingId = 59;
let isBlackInCheck = false;
let isWhiteInCheck = false;

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

function createBoard(){
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable', 'true')
        square.setAttribute('square-id', 63 - i)
        const row = Math.floor( (63 - i) / 8) + 1
        if(row % 2 === 0){
            square.classList.add(i % 2 === 0 ? 'beige' : 'brown')
        } else {
            square.classList.add(i % 2 === 0 ? 'brown' : 'beige')
        }
        if(i <= 15 ){
            square.firstChild.firstChild.classList.add('black')
        }
        if (i >= 48 ){
            square.firstChild.firstChild.classList.add('white')
        }
        gameBoard.append(square)
    })
}
createBoard()

const allSquares = document.querySelectorAll(".square")

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

function initializeEnPassant(){
    for(let i = 0; i < 8; i++) {
        whitePawnEnPassant[i] = false;
        blackPawnEnPassant[i] = false;
    }
}

let startPositionId
let draggedElement

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo === 'black' ? 'white' : 'black'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

    if(correctGo) {
        if(takenByOpponent && valid) {
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            check();
            changePlayer()
            return
        }
        if(taken && !takenByOpponent) {
            infoDisplay.textContent = 'Invalid move'
            setTimeout(() => infoDisplay.textContent = '', 2000)
            return
        }
        if (valid) {
            e.target.append(draggedElement);
            check();
            changePlayer()
            return
        }
    }
}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const piece = draggedElement.id
    const pieceColor = draggedElement.firstChild.getAttribute('class')

    if(pieceColor === playerGo) {
        switch(piece) {
            case 'pawn':
                const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
                if (
                    starterRow.includes(startId) && startId + width * 2 === targetId || 
                    startId + width === targetId || 
                    (startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
                    (startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild)
                ) {
                    if(targetId >= 56 && targetId <= 63) {
                        const square = document.querySelector(`[square-id = '${targetId}']`);
                        const deleteSquarePiece = document.querySelector(`[square-id = '${startId}']`);
                        const color = playerGo === 'white' ? 'white' : 'black';
                        let promotedPiece;

                        do {
                            promotedPiece = prompt("Please enter queen, rook, bishop or knight to choose a promotion to your pawn: ").toUpperCase();
                        } while (promotedPiece !== "QUEEN" && promotedPiece !== "ROOK" && promotedPiece !== "BISHOP" && promotedPiece !== "KNIGHT");
            
                        deleteSquarePiece.removeChild(deleteSquarePiece.firstChild);

                        const piece = document.createElement('div');
                        piece.classList.add('piece');
                        if(promotedPiece === 'QUEEN') {
                            square.innerHTML = queen;
                        } else if(promotedPiece === 'ROOK') {
                            square.innerHTML = rook;
                        } else if(promotedPiece === 'BISHOP') {
                            square.innerHTML = bishop;
                        } else if(promotedPiece === 'KNIGHT') {
                            square.innerHTML = knight;
                        }
                        square.firstChild.setAttribute('draggable', 'true');
                        square.firstChild.firstChild.classList.add(color);

                        changePlayer();
                        initializeEnPassant();

                        return false;
                    }

                    if(starterRow.includes(startId) && startId + width * 2 === targetId){
                        if(targetId === 31 && playerGo === 'white'){
                            const enPassantSquare = document.querySelector(`[square-id = '${targetId - 1}']`);
                            const piece = enPassantSquare.firstChild?.id;
                            const colorPiece = enPassantSquare.firstChild?.firstChild?.getAttribute("class");

                            if(piece === "pawn" && colorPiece === 'black'){
                                const pawnArrayIndex = (targetId - 1) % 8;
                                blackPawnEnPassant[pawnArrayIndex] = true;
                            }
                        }
                        if(targetId === 24 && playerGo === 'white'){
                            const enPassantSquare = document.querySelector(`[square-id = '${targetId + 1}']`);
                            const piece = enPassantSquare.firstChild?.id;
                            const colorPiece = enPassantSquare.firstChild?.firstChild?.getAttribute("class");

                            if(piece === "pawn" && colorPiece === 'black'){
                                const pawnArrayIndex = (targetId + 1) % 8;
                                blackPawnEnPassant[pawnArrayIndex] = true;
                            }
                        }
                        if(targetId > 24 && targetId < 31 && playerGo === 'white'){
                            const enPassantSquareFirst = document.querySelector(`[square-id = '${targetId + 1}']`);
                            const enPassantSquareSecond = document.querySelector(`[square-id = '${targetId - 1}']`);
                            const pieceFirst = enPassantSquareFirst.firstChild?.id;
                            const pieceSecond = enPassantSquareSecond.firstChild?.id;
                            const colorPieceFirst = enPassantSquareFirst.firstChild?.firstChild?.getAttribute("class");
                            const colorPieceSecond = enPassantSquareSecond.firstChild?.firstChild?.getAttribute("class");

                            if(pieceFirst === "pawn" && colorPieceFirst === 'black'){
                                const pawnArrayIndex = (targetId + 1) % 8;
                                blackPawnEnPassant[pawnArrayIndex] = true;
                            }
                            if(pieceSecond === "pawn" && colorPieceSecond === 'black'){
                                const pawnArrayIndex = (targetId - 1) % 8;
                                blackPawnEnPassant[pawnArrayIndex] = true;
                            }
                        }

                        if(targetId === 31 && playerGo === 'black'){
                            const enPassantSquare = document.querySelector(`[square-id = '${targetId - 1}']`);
                            const piece = enPassantSquare.firstChild?.id;
                            const colorPiece = enPassantSquare.firstChild?.firstChild?.getAttribute("class");

                            if(piece === "pawn" && colorPiece === 'white'){
                                const pawnArrayIndex = (targetId - 1) % 8;
                                whitePawnEnPassant[pawnArrayIndex] = true;
                            }
                        }
                        if(targetId === 24 && playerGo === 'black'){
                            const enPassantSquare = document.querySelector(`[square-id = '${targetId + 1}']`);
                            const piece = enPassantSquare.firstChild?.id;
                            const colorPiece = enPassantSquare.firstChild?.firstChild?.getAttribute("class");

                            if(piece === "pawn" && colorPiece === 'white'){
                                const pawnArrayIndex = (targetId + 1) % 8;
                                whitePawnEnPassant[pawnArrayIndex] = true;
                            }
                        }
                        if(targetId > 24 && targetId < 31 && playerGo === 'black'){
                            const enPassantSquareFirst = document.querySelector(`[square-id = '${targetId + 1}']`);
                            const enPassantSquareSecond = document.querySelector(`[square-id = '${targetId - 1}']`);
                            const pieceFirst = enPassantSquareFirst.firstChild?.id;
                            const pieceSecond = enPassantSquareSecond.firstChild?.id;
                            const colorPieceFirst = enPassantSquareFirst.firstChild?.firstChild?.getAttribute("class");
                            const colorPieceSecond = enPassantSquareSecond.firstChild?.firstChild?.getAttribute("class");

                            if(pieceFirst === "pawn" && colorPieceFirst === 'white'){
                                const pawnArrayIndex = (targetId + 1) % 8;
                                whitePawnEnPassant[pawnArrayIndex] = true;
                            }
                            if(pieceSecond === "pawn" && colorPieceSecond === 'white'){
                                const pawnArrayIndex = (targetId - 1) % 8;
                                whitePawnEnPassant[pawnArrayIndex] = true;
                            }
                        }
                    }

                    return true;
                }
                if(startId + width + 1 === targetId && whitePawnEnPassant[7 - ((targetId - 1) % 8)]) {
                    const square = document.querySelector(`[square-id = '${startId + 1}']`);
                    square.removeChild(square.firstChild);
                    initializeEnPassant();
                    return true;
                }
                if(startId + width - 1 === targetId && whitePawnEnPassant[7 - ((targetId + 1) % 8)]) {
                    const square = document.querySelector(`[square-id = '${startId - 1}']`);
                    square.removeChild(square.firstChild);
                    initializeEnPassant();
                    return true;
                }
                if(startId + width + 1 === targetId && blackPawnEnPassant[7 - ((targetId - 1) % 8)]) {
                    const square = document.querySelector(`[square-id = '${startId + 1}']`);
                    square.removeChild(square.firstChild);
                    initializeEnPassant();
                    return true;
                }
                if(startId + width - 1 === targetId && blackPawnEnPassant[7 - ((targetId + 1) % 8)]) {
                    const square = document.querySelector(`[square-id = '${startId - 1}']`);
                    square.removeChild(square.firstChild);
                    initializeEnPassant();
                    return true;
                }
                initializeEnPassant();
                return false;
            case 'knight':
                return (
                    startId + width * 2 - 1 === targetId || 
                    startId + width * 2 + 1 === targetId ||
                    startId + width - 2 === targetId ||
                    startId + width + 2 === targetId ||
                    startId - width * 2 - 1 === targetId ||
                    startId - width * 2 + 1 === targetId ||
                    startId - width - 2 === targetId ||
                    startId - width + 2 === targetId
                )
            case 'bishop':
                return (
                    startId + width + 1 === targetId ||
                    (startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||
                    (startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||
                    (startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||
                    (startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||
                    (startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||
                    (startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||

                    startId - width - 1 === targetId ||
                    (startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||
                    (startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||
                    (startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||
                    (startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||
                    (startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||
                    (startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||

                    startId + width - 1 === targetId ||
                    (startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
                    (startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
                    (startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
                    (startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
                    (startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
                    (startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||

                    startId - width + 1 === targetId ||
                    (startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild) ||
                    (startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild) ||
                    (startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild) ||
                    (startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild) ||
                    (startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild) ||
                    (startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild)
                )
            case 'rook':
                if (
                    startId + width === targetId ||
                    (startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||
                    (startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||
                    (startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||
                    (startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||
                    (startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||
                    (startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||

                    startId - width === targetId ||
                    (startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||
                    (startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||
                    (startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||
                    (startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||
                    (startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||
                    (startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||

                    startId + 1 === targetId ||
                    (startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
                    (startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
                    (startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
                    (startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
                    (startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
                    (startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||

                    startId - 1 === targetId ||
                    (startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
                    (startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
                    (startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
                    (startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
                    (startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
                    (startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild)
                ) {
                    if(startId === 0 && playerGo === 'white') {kingWhiteRookMoved = true; return true;}
                    if(startId === 7 && playerGo === 'white') {queenWhiteRookMoved = true; return true;}
                    if(startId === 0 && playerGo === 'black') {queenBlackRookMoved = true; return true;}
                    else {kingBlackRookMoved = true; return true;}
                }
                return false;

            case 'queen':
                return (
                    startId + width + 1 === targetId ||
                    (startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||
                    (startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||
                    (startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||
                    (startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||
                    (startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||
                    (startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) ||

                    startId - width - 1 === targetId ||
                    (startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||
                    (startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||
                    (startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||
                    (startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||
                    (startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||
                    (startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild) ||

                    startId + width - 1 === targetId ||
                    (startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
                    (startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
                    (startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
                    (startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
                    (startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
                    (startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||

                    startId - width + 1 === targetId ||
                    (startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild) ||
                    (startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild) ||
                    (startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild) ||
                    (startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild) ||
                    (startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild) ||
                    (startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild) ||

                    startId + width === targetId ||
                    (startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||
                    (startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||
                    (startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||
                    (startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||
                    (startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||
                    (startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||

                    startId - width === targetId ||
                    (startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||
                    (startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||
                    (startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||
                    (startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||
                    (startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||
                    (startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width}"]`).firstChild) ||

                    startId + 1 === targetId ||
                    (startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
                    (startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
                    (startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
                    (startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
                    (startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
                    (startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||

                    startId - 1 === targetId ||
                    (startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
                    (startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
                    (startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
                    (startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
                    (startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
                    (startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild)
                )
            case 'king':
                    if (
                        startId + width + 1 === targetId ||
                        startId + width === targetId ||
                        startId + width - 1 === targetId ||
                        startId + 1 === targetId ||
                        startId - 1 === targetId ||
                        startId - width + 1 === targetId ||
                        startId - width === targetId ||
                        startId - width - 1 === targetId
                    ) {
                        if(playerGo === 'white') {currentWhiteKingId = targetId;whiteKingMoved = true; return true;}
                        else {currentBlackKingId = targetId;blackKingMoved = true; return true;}
                    }

                    if(playerGo === 'white') {
                        if(startId - 2 === targetId && !whiteKingMoved && !kingWhiteRookMoved) {
                            if(!document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild){
                                const square = document.querySelector(`[square-id = '${startId - 1}']`)
                                const rook = document.querySelector(`[square-id = '${kingWhiteRookID}']`).firstChild
                                square.append(rook);
                                currentWhiteKingId = targetId;
                                return true;
                            }
                        }
                        else if(startId + 2 === targetId && !whiteKingMoved && !queenWhiteRookMoved) {
                            if(!document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild) {
                                const square = document.querySelector(`[square-id = '${startId + 1}']`)
                                const rook= document.querySelector(`[square-id = '${queenWhiteRookID}']`).firstChild
                                square.append(rook);
                                currentWhiteKingId = targetId;
                                return true;
                            }
                        }
                    }

                    if(playerGo === 'black') {
                        if(startId - 2 === targetId && !blackKingMoved && !queenBlackRookMoved) {
                            if(!document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild){
                                const square = document.querySelector(`[square-id = '${startId - 1}']`)
                                const rook = document.querySelector(`[square-id = '${queenBlackRookID}']`).firstChild
                                square.append(rook);
                                let currentBlackKingId = targetId;
                                return true;
                            }
                        }
                        else if(startId + 2 === targetId && !blackKingMoved && !kingBlackRookMoved) {
                            if(!document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild) {
                                const square = document.querySelector(`[square-id = '${startId + 1}']`)
                                const rook= document.querySelector(`[square-id = '${kingBlackRookID}']`).firstChild
                                square.append(rook);
                                let currentBlackKingId = targetId;
                                return true;
                            }
                        }
                    }
                    return false;
        }
    }
}

function changePlayer() {
    if(playerGo === "black") {
        reverseIds()
        playerGo = "white"
        playerDisplay.textContent = 'white'
    } else {
        revertIds()
        playerGo = "black"
        playerDisplay.textContent = 'black'
    }
}

function reverseIds() {
    const allSquares = document.querySelectorAll("#gameboard .square")

    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', (width * width - 1) - i))
}

function revertIds() {
    const allSquares = document.querySelectorAll("#gameboard .square")

    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', i))
}

function check() {
    const variables = {
        whiteKingId: currentWhiteKingId,
        blackKingId: currentBlackKingId,
    }
    const enemyGo = playerGo === 'white' ? 'black' : 'white';
    const kingId = "KingId";
    const enemyKing = variables[`${enemyGo}${kingId}`]
    let stopLeft = false;
    let stopRight = false;
    let stopUp = false;
    let stopDown = false;
    // check for rook and queen - horizontal
    for(let goRight = enemyKing-1, goLeft = enemyKing+1; goRight >= enemyKing - (enemyKing % 8) || goLeft <= enemyKing + (7 - (enemyKing % 8)); goRight--, goLeft++) {
        console.log(stopLeft, stopRight)
        if(goRight % 8 !== 0 && goRight >= enemyKing - (enemyKing % 8) && !stopRight) {
            const rightSquare = document.querySelector(`[square-id="${goRight}"]`);
            const rightSquarePiece = rightSquare.firstChild?.id;
            const rightSquarePieceColor = rightSquare.firstChild?.firstChild?.getAttribute('class');
            if(rightSquarePiece === undefined || rightSquarePieceColor === enemyGo) {
                if(document.querySelector(`[square-id="${goRight+1}]`) != 'rook' && document.querySelector(`[square-id="${goRight+1}]`) != 'queen'){
                    stopRight = true;
                }
                if(document.querySelector(`[square-id="${goRight + 1}"]`).firstChild?.firstChild?.getAttribute('class') === enemyGo) {
                    stopUp = true;
                }
            }
            if((rightSquarePiece === 'rook' || rightSquarePiece === 'queen') && rightSquarePieceColor === playerGo) {
                isBlackInCheck = true;
                console.log('black in check horizontal one');
                return;
            }
        }
        if((goLeft + 1) % 8 !== 0 && goLeft <= enemyKing + (7 - (enemyKing % 8)) && !stopLeft) {
            const leftSquare = document.querySelector(`[square-id="${goLeft}"]`);
            const leftSquarePiece = leftSquare.firstChild?.id;
            const leftSquarePieceColor = leftSquare.firstChild?.firstChild?.getAttribute('class');
            if(leftSquarePiece === undefined || leftSquarePieceColor === enemyGo) {
                if(document.querySelector(`[square-id="${goLeft-1}]`) != 'rook' && document.querySelector(`[square-id="${goLeft-1}]`) != 'queen'){
                    stopLeft = true;
                }
                if(document.querySelector(`[square-id="${goLeft - 1}"]`).firstChild?.firstChild?.getAttribute('class') === enemyGo) {
                    stopUp = true;
                }
            }
            if((leftSquarePiece === 'rook' || leftSquarePiece === 'queen') && leftSquarePieceColor === playerGo) {
                isBlackInCheck = true;
                console.log('black in check horizontal two');
                return;
            }
        }
        if(stopLeft && stopRight) {
            break;
        }
    }

    // check for rook and queen - vertical
    for(let goUp = enemyKing+8, goDown = enemyKing-8; goUp <= 63 || goDown >= 0; goUp += 8, goDown -=8) {
        console.log(stopUp, stopDown)
        if(goUp <= 63 && !stopUp) {
            const upSquare = document.querySelector(`[square-id="${goUp}"]`);
            const upSquarePiece = upSquare.firstChild?.id;
            const upSquarePieceColor = upSquare.firstChild?.firstChild?.getAttribute('class');
            if(upSquarePiece === undefined || upSquarePiece === enemyGo) {
                if(document.querySelector(`[square-id="${goUp - 8}"]`) != 'rook' && document.querySelector(`[square-id="${goUp - 8}"]`) != 'queen'){
                    stopUp = true;
                }
                if(document.querySelector(`[square-id="${goUp - 8}"]`).firstChild?.firstChild?.getAttribute('class') === enemyGo) {
                    stopUp = true;
                }
            }
            if((upSquarePiece === 'rook' || upSquarePiece === 'queen') && upSquarePieceColor === playerGo) {
                isBlackInCheck = true;
                console.log('black in check vertical one');
                return;
            }
        }
        if(goDown >= 0 && !stopDown) {
            const downSquare = document.querySelector(`[square-id="${goDown}"]`);
            const downSquarePiece = downSquare.firstChild?.id;
            const downSquarePieceColor = downSquare.firstChild?.firstChild?.getAttribute('class');
            if(downSquarePiece === undefined || downSquarePieceColor === enemyGo) {
                if(document.querySelector(`[square-id="${goDown + 8}"]`) != 'rook' && document.querySelector(`[square-id="${goDown + 8}"]`) != 'queen'){
                    stopDown = true;
                }
                if(document.querySelector(`[square-id="${goDown + 8}"]`).firstChild?.firstChild?.getAttribute('class') === enemyGo) {
                    stopUp = true;
                }
            }
            if((downSquarePiece === 'rook' || downSquarePiece === 'queen') && downSquarePieceColor === playerGo) {
                isBlackInCheck = true;
                console.log('black in check vertical two');
                return;
            }
        }
        if(stopUp && stopDown) {
            break;
        }
    }
    // check for bishop - diagonal right up
    // check for bishop - diagonal left up
    // check for pawn - diagonal right up
    // check for pawn - diagonal left up
    // check for knight - eight possible moves
    // check for queen - all sides

}
// function for check and checkmate
// function for stalemate