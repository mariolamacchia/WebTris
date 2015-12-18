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