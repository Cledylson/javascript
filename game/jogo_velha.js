let jogador = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];

function jogada(id) {
	if (tabuleiro[id] === "") {
		document.getElementById(id).innerText = jogador;
		tabuleiro[id] = jogador;

		if (vencedor()) {
			document.getElementById("mensagem").innerText = "O jogador " + jogador + " venceu!";
			bloquearTabuleiro();
		} else if (empate()) {
			document.getElementById("mensagem").innerText = "Empate!";
			bloquearTabuleiro();
		} else {
			jogador = jogador === "X" ? "O" : "X";
			document.getElementById("mensagem").innerText = "É a vez do jogador " + jogador;
		}
	}
}

function vencedor() {
	const possibilidades = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let possibilidade of possibilidades) {
		if (tabuleiro[possibilidade[0]] !== "" &&
			tabuleiro[possibilidade[0]] === tabuleiro[possibilidade[1]] &&
			tabuleiro[possibilidade[1]] === tabuleiro[possibilidade[2]]) {
			return true;
		}
	}

	return false;
}

function empate() {
	for (let i = 0; i < 9; i++) {
		if (tabuleiro[i] === "") {
			return false;
		}
	}

	return true;
}

function bloquearTabuleiro() {
	for (let i = 0; i < 9; i++) {
		document.getElementById(i).removeEventListener("click", jogada);
	}
}

for (let i = 0; i < 9; i++) {
	document.getElementById(i).addEventListener("click", () => jogada(i));
}
