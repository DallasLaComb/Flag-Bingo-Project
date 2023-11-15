window.pageCount;
window.lobbySize;


function generateBingoCard(numberOfFlags, numberOfCards) {
    let cards = [];
	let innsersize = numberOfCards * 24;
		// inner = selectedFlagsLength
        for (let inner = 0; inner < innsersize; inner++) {
            cards[inner] = Math.floor(Math.random() * numberOfFlags);

    }

    return cards;
}

let bingoCard = generateBingoCard(lobbySize, pageCount);
// Using jQuery to log the bingo card
$(document).ready(function() {
    console.log(bingoCard);
});