if ( typeof define === "function" && define.amd ) {
	define( "TicTacToe", [], function() {
		return TicTacToe;
	});
}

var TicTacToe = function() {
  this.players = [];
  this.isOpen = false;

	// Add eventemitter for nodejs
	if (!(document && document.createEvent)) {
		this.eventEmitter = new require('events')();
	}
};

TicTacToe.prototype.start = function() {
  if (this.players.length !== 2) {
    throw new Error('Invalid number of players. Must be exactly 2.');
  }
  this.turn = !Math.floor(Math.random()*2); //false = player1's turn, true = player2's turn
  this.signs = ['', '', '', '', '', '', '', '', ''];
  this.counter = 0; //count the number of sign(if nine, mathc is par)
  this.isOpen = true;
	this.emit('start');
};

TicTacToe.prototype.getCurrentPlayer = function() {
  return this.players[1 * this.turn];
};

TicTacToe.prototype.getCell = function(x, y) {
	var index;
    if (!y) {
  	  index = x;
    } else {
  	  index = y * 3 + x;
    }
};

//Insert the sign into the button
TicTacToe.prototype.insert = function(x, y) {
  if (!this.isOpen) {
    return false;
  }
  var index;
  if (!y) {
	  index = x;
  } else {
	  index = y * 3 + x;
  }
  if (index >= this.signs.length) {
	  return false;
  }
  if (this.signs[index]) {
    return false;
  }
  this.counter++;
  if (this.turn) {
    this.signs[index] = 'O';
  } else {
    this.signs[index] = 'X';
  }
	this.emit('fill', {
		x: x,
		y: y,
		sign: this.signs[index]
	});
  this.lastsign = index;
  this.checkStatus();
  this.nextTurn();
  return true;
};

//Delete the last insertion
TicTacToe.prototype.undo = function() {
  if(this.lastsign !== null) {
    this.counter--;
    this.signs[this.lastsign] = '';
    this.nextTurn();
    this.isOpen = true;
		this.emit('unfill', {
			x: this.lastsign % 3,
			y: Math.floor(this.lastsign / 3)
		});
  	this.lastsign = null;
    return true;
	}
  return false;
};

TicTacToe.prototype.nextTurn = function() {
  this.turn = !this.turn;
	this.emit('changeTurn', {player: this.getCurrentPlayer()});
};

//Check if a player has won
TicTacToe.prototype.checkStatus = function() {
  var signs = this.signs;
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
    this.win(this.getCurrentPlayer());
  } else if (this.counter === 9) {
    this.win();
  }
};

TicTacToe.prototype.win = function(player) {
  if (player) {
    if (Number(player.score)) {
      player.score++;
    } else {
      player.score = 1;
    }
		this.emit('win', {player: player});
  }
  this.isOpen = false;
	this.emit('end', {player: player});
};

TicTacToe.prototype.emit = function(name, obj) {
	if (this.eventEmitter) {
		this.eventEmitter.emit(name, obj);
	} else {
		var e = document.createEvent('Event');
		e.initEvent(name);
		for (var k in obj) {
			e[k] = obj[k];
		}
		document.body.dispatchEvent(e);
	}
};

TicTacToe.prototype.on = function(name, fn) {
	if (this.eventEmitter) {
		this.eventEmitter.on(name, fn);
	} else {
		document.body.addEventListener(name, fn);
	}
};
