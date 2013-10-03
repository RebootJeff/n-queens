/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };
  var matrix = makeEmptyMatrix(n);
  var board = new Board(matrix);
  for(var rowIndex = 0; rowIndex < n; rowIndex++){
    for(var colIndex = 0; colIndex < n; colIndex++){
      board.togglePiece(rowIndex, colIndex);
      if (board.hasAnyRooksConflicts()){
        board.togglePiece(rowIndex,colIndex);
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
  return board.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var start = new Date().getTime();
  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };
  var matrix = makeEmptyMatrix(n);
  var board = new Board(matrix);
  var rowIndex = 0;
  var solutions = [];
  var rookRecursive = function(){
    if (rowIndex === n){
      return solutions.push($.extend(true,[],board.rows()));
    }
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex,colIndex);
      if (board.hasAnyRooksConflicts()){
        board.togglePiece(rowIndex,colIndex);
      }else{
        rowIndex++;
        rookRecursive();
        rowIndex--;
        board.togglePiece(rowIndex,colIndex);
      }
    }
  };
  rookRecursive();
  var end = new Date().getTime();
  var total = end - start;
  console.log("The total time to run is nRooks "+total+"ms");
  return solutions.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };
  var matrix = makeEmptyMatrix(n);
  var board = new Board(matrix);
  for(var rowIndex = 0; rowIndex < n; rowIndex++){
    for(var colIndex = 0; colIndex < n; colIndex++){
      board.togglePiece(rowIndex, colIndex);
      if (board.hasAnyQueenConflictsOn(rowIndex, colIndex)){
        board.togglePiece(rowIndex,colIndex);
      }
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return board.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var start = new Date().getTime();
  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };
  var matrix = makeEmptyMatrix(n);
  var board = new Board(matrix);
  var rowIndex = 0;
  var solutionsCount = 0;
  var breadcrumbArr = _(_.range(n)).map(function(){ return false; });
  var queenRecursive = function(colArr,majArr,minArr){
    if (rowIndex === n){
      return solutionsCount++;
    }
    for (var colIndex = 0; colIndex < n; colIndex++) {
      if (colArr[colIndex]){
        continue;
      }else if(majArr[board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex,colIndex)]){
        continue;
      }else if(minArr[board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex,colIndex)]){
        continue;
      }else{
        board.togglePiece(rowIndex,colIndex);
        if (board.hasAnyQueenConflictsOn(rowIndex, colIndex)){
          board.togglePiece(rowIndex,colIndex);
        }else{
          colArr[colIndex] = true;
          majArr[board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex,colIndex)] = true;
          minArr[board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex,colIndex)] = true;
          rowIndex++;
          queenRecursive(colArr,majArr,minArr);
          rowIndex--;
          colArr[colIndex] = false;
          majArr[board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex,colIndex)] = false;
          minArr[board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex,colIndex)] = false;
          board.togglePiece(rowIndex,colIndex);
        }
      }
    }
  };
  queenRecursive(breadcrumbArr,breadcrumbArr.slice(),breadcrumbArr.slice());
  var end = new Date().getTime();
  var total = end - start;
  console.log("The total time to run is nQueens "+total+"ms");
  return solutionsCount;
};
