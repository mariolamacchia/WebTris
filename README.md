# TicTacToe
How many times you want to create a tic tac toe game but you're too lazy to
make all the code by yourself? Don't waste your time: just install this with
bower or npm and use it. It works both on browsers and node!

    bower install --save tictactoe

or

    npm install --save tictactoe

## Usage:

    var game = new TicTacToe();
    var player1 = {name: 'Gianluca'};
    var player2 = {name: 'Mario'};
    game.players.push(player1, player2);

    game.on('start', function(e) {
        console.log('Start!!!');
    });
    game.on('fill', function(e) {
        console.log(e.x, e.y, e.sign);
    });
    game.on('unfill').function(e) {
        console.log(e.x, e.y);
    });
    game.on('end', function(e) {
        console.log('winner: ', e.player);
    });

    game.start();
    // -> Start!!!
    console.log(game.getCurrentPlayer());
    // -> {name: 'Gianluca'}
    game.insert(0, 1);
    // -> 0, 1, 'X'
    console.log(game.getCurrentPlayer());
    // -> {name: 'Mario'}
    console.log(game.isOpen); // -> true
    game.insert(4);
    // -> 1, 1, 'O'
    game.undo();
    // -> 1, 1
    game.insert(0, 0);
    // -> 0, 0, 'X'
    game.insert(2, 2);
    // -> 0, 0, 'O'
    game.insert(0, 2);
    // -> 0, 2, 'X'
    // -> winner: {name: 'Gianluca', score: 1}
    console.log(game.isOpen); // -> false

### Attributes

  - **isOpen** [boolean]: indicates if the game is currently open
  - **players** [array]: game's players. At the end of each game, the winner
    will have the 'score' attribute incremented (or set to 1 if wasn't present).

### Methods

  - **start()**

    Start game. There must be exactly 2 players.

    TODO: return value and don't throw error.

  - **insert(x, [y])**

    Insert the symbol it the indicated cell. Either one or two indexes can be
    passed. It returns:

    - true if the symbol was successfully inserted
    - false if a the symbol wasn't inserted (eg: game wasn't open or cell was
      already taken)

  - **undo()**

    Undo the last move. It returns:

    - true if the last move was successfully undone
    - false an error occurred

    TODO: Right now it's possible to undo only the very last move

  - **getCell(x, [y])**

    Return the symbol in the indicated cel. Either one or two indexes can be
    passed. It returns:

    - 'X' or 'O' if the cell is taken
    - '' if the cell is empty

  - **getCurrentPlayer()**

    Returns the player who has to play

### Events

  - **start**: fired when the game starts.
  - **fill**: fired when a cell is filled out. Passed object has:

    - x: x-index of the cell
    - y: y-index of the cell
    - sign: 'X' or 'O', the inserted symbol

  - **unfill**: fired when a move is undone. Passed object has:

    - x: x-index of the cell
    - y: y-index of the cell

  - **changeTurn**: fired when the turn changes. Passed object has:

    - player: turn's player

  - **win**: fired when a player wins. Passed object has:

    - player: winning player

  - **end**: fired when the game ends. Passed object has

    - [player]: winning player (only if a player won)
