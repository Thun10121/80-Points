const cardTypes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suitTypes = ["♠", "♥", "♣", "♦"];


function intialize() { //the function that calls all functions to intialize
    let deck = putCards();
    deck = randomizeCards(deck);
    const zhuSuit = randomizeSuit();
    console.log("suit: " + zhuSuit);
    const zhuNumber = randomizeNumber();
    console.log(deck);
    let playerDecksUnsorted = distributeCards(deck);
    const playerDecks = sortPlayerDecks(playerDecksUnsorted, zhuSuit);
}

function putCards() {
    let cards = ["BJoker", "BJoker", "RJoker", "RJoker"];
    for (let i = 0; i < 2; i++) {
        suitTypes.forEach(suitN => {
            cardTypes.forEach(cardN => {
                cards.push(suitN + cardN);
            });
        });
    }
    return cards;
}

function randomizeCards(deck) {
    let randDeck = [];
    while (deck.length > 0) {
        let = rand = Math.floor(Math.random() * (deck.length));
        randDeck.push(deck[rand]);
        deck.splice(rand, 1);
    }
    return randDeck;
}

function randomizeSuit() { //randomize the suit
    //! remember the users will decide the zhuSuit
    //? this is for debugging purposes
    let rand = Math.floor(Math.random() * 4);
    return suitTypes[rand];
}

function randomizeNumber() { //randomize the number
    let rand = Math.floor(Math.random() * 13);
    return cardTypes[rand];
}

function distributeCards(deck) {
    let playerCards = [[], [], [], []];
    for (let i = 0; i < 4; i++) {
        let temp = []; //each player deck
        for (let j = 0; j < 25; j++) {
            temp.push(deck[0]);
            deck.splice(0, 1);
        }
        playerCards.push(temp);
    }
    return playerCards;
}

function sortPlayerDecks(playerDecks, zhuSuit, zhuNumber) {
    playerDecks.forEach(deckN => {
        deckN.sort();
        deckN = sortZhuSuit(deckN, zhuSuit);
        console.log("player length"); //?debug unfinsihed
    });
}

function sortZhuSuit(deck, zhuSuit) {
    for (let i = 0; i < deck.length; i++) {
        if (deck[i].charAt(0) == zhuSuit) {
            let temp = deck[i];
            deck.splice(i, 1);
            deck.unshift(temp);
        }
    }
    console.log("deck " + deck);
}

function sortZhuNumber(deck) {

}

function sortJokers(deck) {

}