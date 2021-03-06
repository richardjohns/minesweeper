document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
// "Boards is an object that contains an array of objects"

var board = new Object ();
board.cells = [];

// var board = new Object ();
// board.cells = [{row: 0, col: 0, isMine: true, isMarked: true, hidden: true},
//                {row: 0, col: 1, isMine: true, isMarked: true, hidden: true},
//                {row: 0, col: 2, isMine: true, isMarked: true, hidden: true},
//                {row: 1, col: 0, isMine: true, isMarked: true, hidden: true},
//                {row: 1, col: 1, isMine: true, isMarked: true, hidden: true},
//                {row: 1, col: 2, isMine: true, isMarked: true, hidden: true},
//                {row: 2, col: 0, isMine: true, isMarked: true, hidden: true},
//                {row: 2, col: 1, isMine: true, isMarked: true, hidden: true},
//                {row: 2, col: 2, isMine: true, isMarked: true, hidden: true}
//               ];

// Or can use
// var board = {
//   cells: [{row: 0, col: 0, isMine: true, hidden: true},
//           {row: 0, col: 1, isMine: true, hidden: true},
//           {row: 0, col: 2, isMine: true, hidden: true},
//
//           {row: 1, col: 0, isMine: true, hidden: true},
//           {row: 1, col: 1, isMine: true, hidden: true},
//           {row: 1, col: 2, isMine: true, hidden: true},
//
//           {row: 2, col: 0, isMine: true, hidden: true},
//           {row: 2, col: 1, isMine: true, hidden: true},
//           {row: 2, col: 2, isMine: true, hidden: true}
//           ]
// }

// // gets .row properties from every cell and pushes into an array for passing to countSurroundingMines.
// function getRows(cells) {
//   var rowArr = [];
//   for(var i = 0; i < board.cells.length; i++) {
//       rowArr.push(board.cells[i].row);
//   }
//   return rowArr;
// }
//
// var rowArray = getRows(board);
//
// // gets .col properties from every cell and pushes into an array for passing to countSurroundingMines.
// function getCols(cells) {
//     var colArr = [];
//     for(var i = 0; i < board.cells.length; i++) {
//         colArr.push(board.cells[i].col);
//     }
//     return colArr;
// }
//
// var colArray = getCols(board);

// function which calls countSurroundingMines for all cells in var board.

function startGame () {
  // Don't remove this function call: it makes the game work!
    document.addEventListener('click',checkForWin);
    document.addEventListener('contextmenu',checkForWin);
    console.log("startGame initiated");

    // code to generate board
    // alternative
    function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive, ie returns random whoile number between 2 & 6.
    }
    // function findCellRange() {
    //   var rand = Math.random();
    //   var rowColLength = 0;
    //   if (rand <= 0.2) {
    //      rowColLength = 2;
    //   } else if (rand > 0.2 && rand <= 0.4) {
    //      rowColLength = 3;
    //   } else if (rand > 0.4 && rand <= 0.6) {
    //      rowColLength = 4;
    //   } else if (rand > 0.6 && rand <= 0.8) {
    //      rowColLength = 5;
    //   } else {
    //      rowColLength = 6;
    //   }
    //   return rowColLength;
    // }

    var boardSize = getRandomIntInclusive(2,6);

    function buildBoard() {
      var row = 0;
      var col = 0;
      for (var i = 1; i <= (boardSize * boardSize); i++) {
        var newCell = {isMine: false, isMarked: false, hidden: true, surroundingMines: 0};
        newCell.row = row;
        newCell.col = col;
        if (getRandomIntInclusive(1,5) == 1) {
          newCell.isMine = true;
        }
        board.cells.push(newCell);
        if (col === boardSize - 1) {
          col = 0;
        } else {
          col++;
        }

        if (i % (boardSize) === 0) {
          row = row + 1;
        }
      }
      return board;
    }

    buildBoard();

    // code to check for each cell how many mines surrounding
    for(var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    console.log("loop working");
    }

  // supply separate row & column data to formula countSurroundingMines?
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for(var i = 0; i < board.cells.length; i++) {
      console.log('for loop working');
      if (board.cells[i].isMine === true && board.cells[i].isMarked === true ) {
        break;
      } else if (board.cells[i].isMine === true && board.cells[i].hidden === true ) {
        break;
      } else if (board.cells[i].isMine === false && board.cells[i].hidden === true ) {
        break;
      } else {
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
      lib.displayMessage('You win!')
      // reset board by setting board object length to 0.
      // Board.cells.length = 0;
      // startGame();
      // run initboard function again
    }
  }
}
// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true
function countSurroundingMines (cell) {
    var count = 0;
    console.log("countSurroundingMines initiated");
    var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
    for(var k = 0; k < surroundingCells.length; k++) {
        console.log('for loop working');
        if (surroundingCells[k].isMine === true) {
          count += 1;
        }
    }
    // return board.cells[k].surroundingMines;
    return count;
  }
