var PlayerTurn = false;

function checkStatus() {
	
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
	checkStatus();
}

function resetFields() {
	var y;
	for(var x = 1; x < 10; x++) {
		y = x + "";
        document.getElementById(y).value = "";
	}
}

function startMatch() {
    alert("Inizia partita");
	resetFields();
}

startMatch();