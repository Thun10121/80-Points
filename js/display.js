//? load all  the graphics to the game.html

let deck1 = document.getElementById("player-decks1-content");
let deck2 = document.getElementById("player-decks2-content");
let deck3 = document.getElementById("player-decks3-content");
let deck4 = document.getElementById("player-decks4-content");

let played1 = document.getElementById("playedcard1");
let played2 = document.getElementById("playedcard2");
let played3 = document.getElementById("playedcard3");
let played4 = document.getElementById("playedcard4");

let deck = [deck1, deck2, deck3, deck4];
let played = [played1, played2, played3, played4];

displayDecks();

function displayDecks() {
    let count = 0;
    deck.forEach(deckN => {
        let cardHTML = `
            <img class="deck-card" src="../photos/card-back.svg">        
        `;
        if (count % 2 == 1) {
            cardHTML = `
                <img class="deck-card" src="../photos/Rcard-back.svg">        
            `
        }
        if(count == 0){
            cardHTML = `
                <img class="deck-card" src="../photos/placeholder.svg">        
            `
        }
        for (let i = 0; i < 25; i++) {
            deckN.innerHTML += cardHTML;
        }
        count++;
    });
}

function displayPlayed() {
    played.forEach(playedN => {

    });
}
let x = "A4";

createCard(x);

function createCard(cardInputted){
    let cardSuit = cardInputted.substring(0,1);
    let cardNumber = cardInputted.substring(1,cardInputted.length);

}