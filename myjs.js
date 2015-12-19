var PlayerTurn = false;
var signs = ["", "", "" , "", "", "", "", "", ""];

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
		deleteSigns();
		startMatch();
	} 
}

function insertSign() {
	if (PlayerTurn) {
		PlayerTurn = false;
		return "O";
	}
	else {
		PlayerTurn = true;
	    return "X";
	}
}

function resetFields() {
	var supp;
	for(var i = 1; i < 10; i++) {
		supp = i + "";
        document.getElementById(supp).value = "";
	}
}

function startMatch() {
    alert("Inizia partita");
	resetFields();
}

startMatch();