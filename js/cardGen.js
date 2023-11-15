window.pageCount;
window.lobbySize;


function generateBingoCard(numberOfFlags, numberOfCards) {
    let cards = [];

    for (let outer = 0; outer < numberOfCards; outer++) {
        cards[outer] = [];
        for (let inner = 0; inner < 25; inner++) {
            cards[outer][inner] = Math.floor(Math.random() * numberOfFlags);
        }
    }

    return cards;
}
let bingoCard = generateBingoCard(lobbySize, pageCount);
// Using jQuery to log the bingo card
$(document).ready(function() {
    console.log(bingoCard);
});