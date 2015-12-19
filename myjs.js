var PlayerTurn = false; //false = player1's turn, true = player2's turn
var signs = ["", "", "" , "", "", "", "", "", ""];
var counter = 0; //count the number of sign(if nine, mathc is par)
var score = [0, 0] //contains the score 
var lastsign;

function  lightPlayer() {
	if(PlayerTurn) {
		document.getElementById("title2").style.backgroundColor = "#00FF00";
		document.getElementById("title1").style.backgroundColor = "#9C0000";
	}
	else {
		document.getElementById("title1").style.backgroundColor = "red";
		document.getElementById("title2").style.backgroundColor = "green";
	}
}

function invertPlayerTurn() {
	if (PlayerTurn) PlayerTurn = false;
	else PlayerTurn = true;
	lightPlayer();
}

function undo() {
	if(lastsign !== null) {
	    document.getElementById(lastsign).value = "";
		document.getElementById(lastsign).disabled = false;
		counter--;
		signs[lastsign] = "";
        invertPlayerTurn();
	}
	lastsign = null;
}

function checkPar() {
	if(counter === 9) {
		return true;
	}
	return false;
}

function sayWinner() {
	if (PlayerTurn) {
		return "The Winner is X";
	}
	return "The Winner is O";
}

function deleteSigns() {
	for(var i = 0; i < 9; i++) {
	    signs[i] = "";
	}
}

function updateScore() {
    if (PlayerTurn) {
	    score[0]++;
        setScore("player1", 0);
	}
	else {
		score[1]++;
		setScore("player2", 1);
	}
}

function blockButton(idbutton) {
	document.getElementById(idbutton).disabled = true;
}

function unlockButtons() {
	var i;
	for (i = 0; i < 9; i++) {
		document.getElementById(i).disabled = false;
	}
}

function checkStatus() {
    if (
	     ((signs[0] != "") && (signs[0] === signs[1]) && (signs[1] === signs[2])) ||
		 ((signs[0] != "") && (signs[0] === signs[4]) && (signs[4] === signs[8])) ||
		 ((signs[0] != "") && (signs[0] === signs[3]) && (signs[3] === signs[6])) ||
		 ((signs[1] != "") && (signs[1] === signs[4]) && (signs[4] === signs[7])) ||
		 ((signs[2] != "") && (signs[2] === signs[5]) && (signs[5] === signs[8])) ||
		 ((signs[2] != "") && (signs[2] === signs[4]) && (signs[4] === signs[6])) ||
		 ((signs[3] != "") && (signs[3] === signs[4]) && (signs[4] === signs[5])) ||
		 ((signs[6] != "") && (signs[6] === signs[7]) && (signs[7] === signs[8]))
	   )
	{
	    alert(sayWinner());
		updateScore();
		deleteSigns();
		startMatch();
	}
	else if(checkPar()){
		deleteSigns();
		startMatch();
	}
}

function insertSign(index) {
	counter++;
	if (PlayerTurn) {
		invertPlayerTurn();
		signs[index] = "O";
		document.getElementById(index).value = signs[index];
	}
	else {
		invertPlayerTurn();
	    signs[index] = "X";
		document.getElementById(index).value = signs[index];
	}
	lastsign = index;
	blockButton(index);
	checkStatus();
}

function resetFields() {
	var supp;
	for(var i = 0; i < 9; i++) {
		supp = i;
        document.getElementById(supp).value = "";
	}
}

function startMatch() {
	counter = 0;
	resetFields();
	deleteSigns();
    unlockButtons();
	lastsign = null;
}

function setScore(player, index) {
    document.getElementById(player).innerHTML = score[index] + "";
}
function resetAll() {
	score[0] = 0;
	setScore("player1", 0);
	score[1] = 0;
	setScore("player2", 1);
    startMatch();
}

lightPlayer();
startMatch();
setScore("player1", 0);
setScore("player2", 1);