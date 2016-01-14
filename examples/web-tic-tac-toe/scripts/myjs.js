//Resize the botton in 1:1
function resizeButtons() {
    var width;
    width = $('#00').css('width');
    $('.field').css('height', width);
}

var game = new TicTacToe();
game.players.push({
  id: 'player1',
  name: 'Player 1',
  score: 0
}, {
  id: 'player2',
  name: 'Player 2',
  score: 0
});
game.on('changeTurn', lightPlayer);
game.on('unfill', undo);
game.on('end', sayWinner);
game.on('end', blockAll);
game.on('start', startMatch);
game.on('win', setScore);
game.on('fill', blockButton);
game.on('fill', insertSign);

//ligh the tag <p> of player who has to put the sign
function lightPlayer(player) {
  $('.title').removeClass('active');
  $('#' + player.id).addClass('active');
}

//Delete the last insertion
function undo(e) {
  $('#' + e.x + e.y).prop('value', '');
  $('#' + e.x + e.y).prop('disabled', false);
}

//Say the winner through an alert
function sayWinner(e) {
  $('#matchend').show();
  if(e.player) {
    $('#result').addClass('win');
    $('#result').text('The winner is: ' + e.player.name);
  }
  else {
    $('#result').removeClass('win');
    $('#result').text('There is no winner');
  }
}

//Block the button after his pression
function blockButton(e) {
  $('#'+ e.x + e.y).prop('disabled', true);
}

//Block All the buttons
function blockAll() {
  $('.field').prop('disabled', true);
}

//Unlock all the buttons
function unlockButtons() {
  $('.field').prop('disabled', false);
}

//Insert the sign into the button
function insertSign(e) {
  $('#' + e.x + e.y).val(e.sign);
}

//reset the buttons' values
function resetFields() {
  $('.field').val('');
}

//start a new match
function startMatch() {
  $('#matchend').hide();
  resetFields();
  unlockButtons();
}

//setScore to ""
function setScore() {
  $('#player1').text(game.players[0].score);
  $('#player2').text(game.players[1].score);
}

$(document).ready(function(){
  resizeButtons();
  $( window ).resize(function() {
    resizeButtons();
  });

  $('.field').on('click', function(e) {
    game.insert(Number(this.id[0]), Number(this.id[1]));
  });

  $('.undo').on('click', function() {
    game.undo();
  });

  $('.newmatch').on('click', function() {
    game.start();
  });

  $('.reset').on('click', function() {
    game.players[0].score = 0;
    game.players[1].score = 0;
    setScore();
    game.start();
  });

  game.start();
});
