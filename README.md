# TicTacToe
How many times you want to create a tic tac toe game but you're too lazy to
make all the code by yourself? Don't waste your time: just install this with
bower or npm and use it. It works both on browsers and node!

    bower install --save tictactoe

or

    npm install --save tictactoe

Usage:

    var game = new TicTacToe();
    var player1 = {name: 'Gianluca'};
    var player2 = {name: 'Mario'};
    game.players.push(player1, player2);

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
    game.insert(0, 1);
    // -> 0, 1, 'X'
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
