function generateBingoCard(numberOfFlags, numberOfCards) {
   
    let cards = new int[numberOfCards][25];
		
        for(let outer = 0; outer < numberOfCards; outer++) {
        	
        	for(let inner = 1; inner < 25; inner++) {
        		cards[outer][inner] = Math.floor(Math.random() * numberOfFlags);;
                
        		System.out.print(cards[outer][inner]);
        		
        		if(inner%5 == 0 && inner != 0) {
        			System.out.println();
        		}
        		
        		}
        		
        	System.out.println("\n");
        	

    return card;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
}
function generateNonRepeatingRandoms(size) {
    // Create an array with `size` number of elements
    const variables = Array.from({ length: size }, (v, k) => k);

    // Shuffle the array
    return shuffleArray(variables);
}

}
let bingoCard = generateBingoCard(); // Generates a 5x5 Bingo card with unique numbers from 0 to 125
console.log(bingoCard);