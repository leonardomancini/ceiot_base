var express = require('express');
var router = express.Router();
var players;
let nextPlayer = 0;
let gameBoard;
let marks = ['O','X'];
let EMPTY_SLOT = ' ';
let winner;
let tiedGame;
let finishedGame;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/begin', function(req, res, next) {
  let body = req.body;
  
  gameBoard=[
    [EMPTY_SLOT,EMPTY_SLOT,EMPTY_SLOT],
    [EMPTY_SLOT,EMPTY_SLOT,EMPTY_SLOT],
    [EMPTY_SLOT,EMPTY_SLOT,EMPTY_SLOT]
    ];

  if(!Array.isArray(body) || body.length != 2 ) {
    res.sendStatus(400);
  } else {
    winner = false;
    tiedGame = false;
    finishedGame = false;
    players = body;
    nextPlayer = 0;
    let response = {
      nextPlayer:players[nextPlayer],
      gameBoard:gameBoard
    }

    res.send(response).status(200);
  }


  
});

router.put('/move', function(req, res, next) {
  let column=req.body.column;
  let row=req.body.row;

  if(finishedGame == true) {
    res.status(400).send({error:'Juego finalizado', isFinished:finishedGame});
    return;
  }

  if(column <0 || column > 2 || row < 0 || row > 2) {
    res.status(400).send({error:'Rangos incorrectos'});
    return;
  }

  if(gameBoard[row][column] != EMPTY_SLOT) {
    res.status(400).send({nextPlayer:players[nextPlayer]});
    return;
  } 


  if(players[nextPlayer] == req.body.player) {
    gameBoard[row][column] = marks[nextPlayer];
    winner = checkWinByColumn(column, marks[nextPlayer])||checkWinByRow(row, marks[nextPlayer])||checkWinByDiagonal(marks[nextPlayer]);
    if(req.body.player==players[0]) {
        nextPlayer=1;    
        
      } else {
        nextPlayer=0;    
        
      }
     

      let player = players[nextPlayer];
     
     

      if( countEmptyCells() == 0) {
        tiedGame = true;
      }

      finishedGame = winner;

      let game = {nextPlayer:player,gameBoard:gameBoard, tiedGame:tiedGame, winner:winner, isFinished:finishedGame};

      res.send(game).status(200);
  } else {
    res.sendStatus(400);
  }

 

 
  
});


function countEmptyCells() {
  if(gameBoard == undefined) {
    return 0;
  }
  count = 0;
  for( i = 0; i < gameBoard.length; i++) {
    for(j = 0; j < gameBoard[i].length; j++) {
      if(gameBoard[i][j] == EMPTY_SLOT) {
        count = count + 1;
      }
    }
  }
  return count;

}

function checkWinByColumn(column, symbol) {
  if(gameBoard == undefined || symbol == undefined || symbol == EMPTY_SLOT ) {
    return false;
  }
  isFilledBySymbol = true;
  for( i = 0; i < gameBoard.length; i++) {
    if(gameBoard[i][column] != symbol) {
      isFilledBySymbol = false;
    } 
  }
  return isFilledBySymbol;
}


function checkWinByRow(row, symbol) {
  if(gameBoard == undefined || symbol == undefined || symbol == EMPTY_SLOT) {
    return false;
  }

  gameBoardRow = gameBoard[row];

  isFilledBySymbol = true;
  for( i = 0; i < gameBoardRow.length; i++) {
    if(gameBoardRow[i]!= symbol) {
      isFilledBySymbol = false;
    } 
  }
  return isFilledBySymbol;
}


function checkWinByDiagonal(symbol) {
  if(gameBoard == undefined || symbol == undefined || symbol == EMPTY_SLOT) {
    return false;
  }

  return (gameBoard[0][0]==gameBoard[1][1]&&gameBoard[1][1]==gameBoard[2][2]&&gameBoard[1][1]==symbol)
  ||(gameBoard[0][2]==gameBoard[1][1]&&gameBoard[1][1]==gameBoard[2][0]&&gameBoard[1][1]==symbol);
}


module.exports = router;
