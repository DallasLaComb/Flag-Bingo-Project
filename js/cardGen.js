window.pageCount;
window.lobbySize;


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
        
        }

    return cards;
}

window.bingoCard = generateBingoCard(lobbySize, pageCount); // Generates a 5x5 Bingo card with unique numbers from 0 to 125
console.log(bingoCard);
