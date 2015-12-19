var PlayerTurn = false;
var signs = ["", "", "" , "", "", "", "", "", ""];
var counter = 0;
var score = [0, 0]

function checkPar() {
	if(counter === 9) {
		alert("Patta");
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
	for(var i = 0; i < 10; i++) {
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
	if(checkPar()){
		deleteSigns();
		startMatch();
	}
	else if (
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
}

function insertSign(index) {
	counter++;
	if (PlayerTurn) {
		PlayerTurn = false;
		signs[index] = "O";
		index = index;
		document.getElementById(index).value = signs[index];
	}
	else {
		PlayerTurn = true;
	    signs[index] = "X";
		document.getElementById(index).value = signs[index];
	}
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
    unlockButtons();
}

function setScore(player, index) {
    document.getElementById(player).innerHTML = score[index] + "";
}

startMatch();
setScore("player1", 0);
setScore("player2", 1)