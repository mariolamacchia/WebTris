var PlayerTurn = false; //false = player1's turn, true = player2's turn
var signs = ['', '', '', '', '', '', '', '', ''];
var counter = 0; //count the number of sign(if nine, mathc is par)
var score = [0, 0]; //contains the score
var lastsign;

//ligh the tag <p> of player who has to put the sign
function lightPlayer() {
  if(PlayerTurn) {
    $('#title2').css('backgroundColor', '#00FF00');
    $('#title1').css('backgroundColor', '#9C0000');
  }
  else {
    $('#title1').css('backgroundColor', 'red');
    $('#title2').css('backgroundColor', 'green');
  }
}

//Invert the Player turn
function invertPlayerTurn() {
  PlayerTurn = !PlayerTurn;
  lightPlayer();
}

//Delete the last insertion
function undo() {
  if(lastsign !== null) {
    $('#'+lastsign).prop('value', '');
    $('#'+lastsign).prop('disabled', false);
    counter--;
    signs[lastsign] = '';
    invertPlayerTurn();
  }
  lastsign = null;
}

//Check if the match is equal
function checkPar() {
  return (counter === 9);
}

//Say the winner through an alert
function sayWinner(winner) {
  $('#matchend').css('display', 'block');
  if(winner) {
    if (PlayerTurn) {
      $('#winner').css('color', 'red');
      $('#winner').prop('innerHTML', 'The winner is: Player 1');
    }
    else {
      $('#winner').css('color', 'red');
      $('#winner').prop('innerHTML', 'The winner is: Player 2');
    }
  }
  else {
    $('#winner').css('color', 'white');
    $('#winner').prop('innerHTML', 'There is no winner');
  }
}

//Delete the signs stored into the array signs[]
function deleteSigns() {
  for(var i = 0; i < 9; i++) {
    signs[i] = '';
  }
}

//increase the score
function updateScore() {
  if (PlayerTurn) {
    score[0]++;
    setScore('player1', 0);
  }
  else {
    score[1]++;
    setScore('player2', 1);
  }
}

//Block the button after his pression
function blockButton(idbutton) {
  $('#'+idbutton).prop('disabled', true);
}

//Block All the buttons
function blockAll() {
  var i;
  for (i = 0; i < 9; i++) {
	  if($('#'+i).prop('disabled') === false) {
	    $('#'+i).prop('disabled', true);
    }
  }
}

//Unlock all the buttons
function unlockButtons() {
  var i;
  for (i = 0; i < 9; i++) {
    $('#'+i).prop('disabled', false);
  }
}

//Check if a player has won
function checkStatus() {
  if (
    ((signs[0] !== '') && (signs[0] === signs[1]) && (signs[1] === signs[2])) ||
    ((signs[0] !== '') && (signs[0] === signs[4]) && (signs[4] === signs[8])) ||
    ((signs[0] !== '') && (signs[0] === signs[3]) && (signs[3] === signs[6])) ||
    ((signs[1] !== '') && (signs[1] === signs[4]) && (signs[4] === signs[7])) ||
    ((signs[2] !== '') && (signs[2] === signs[5]) && (signs[5] === signs[8])) ||
    ((signs[2] !== '') && (signs[2] === signs[4]) && (signs[4] === signs[6])) ||
    ((signs[3] !== '') && (signs[3] === signs[4]) && (signs[4] === signs[5])) ||
    ((signs[6] !== '') && (signs[6] === signs[7]) && (signs[7] === signs[8]))
  ) {
    sayWinner(true);
    updateScore();
    lastsign = null;
    blockAll();
  } else if(checkPar()) {
    sayWinner(false);
    lastsign = null;
    blockAll();
  }
}

//Insert the sign into the button
function insertSign(index) {
  counter++;
  if (PlayerTurn) {
    invertPlayerTurn();
    signs[index] = 'O';
  } else {
    invertPlayerTurn();
    signs[index] = 'X';
  }
  $('#'+index).prop('value', signs[index]);
  lastsign = index;
  blockButton(index);
  checkStatus();
}

//reset the buttons' values
function resetFields() {
  var supp;
  for(var i = 0; i < 9; i++) {
    supp = i;
    $('#'+supp).prop('value', '');
  }
}

//start a new match
function startMatch() {
  $('#matchend').css('display', 'none');
  counter = 0;
  resetFields();
  deleteSigns();
  unlockButtons();
  lastsign = null;
}

//setScore to ""
function setScore(player, index) {
  $('#'+player).prop('innerHTML', score[index]);
}

//delete score and start a new match
function resetAll() {
  score[0] = 0;
  setScore('player1', 0);
  score[1] = 0;
  setScore('player2', 1);
  startMatch();
}

$(document).ready(function(){
  lightPlayer();
  startMatch();
  setScore('player1', 0);
  setScore('player2', 1);
});
