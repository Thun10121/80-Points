//♠ ♥ ♣ ♦

const cardTypes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suitTypes = ["♠", "♥", "♣", "♦"];


function intialize() { //the function that calls all functions to intialize
    let deck = putCards();
    deck = randomizeCards(deck);
    const zhuSuit = randomizeSuit();
    console.log("suit: " + zhuSuit);
    const zhuNumber = randomizeNumber();
    console.log("number: " + zhuNumber);
    console.log(deck);
    let playerDecksUnsorted = distributeCards(deck);
    const playerDecks = sortPlayerDecks(playerDecksUnsorted, zhuSuit, zhuNumber);
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
    let playerCards = [];
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
        let playerJoker = [];
        let playerZhuSuit = [];
        let playerZhuNumber = [];
        let playerFuSuit = [];
        deckN.forEach(cardN => {
            if (cardN.includes("Joker")) {
                playerJoker.push(cardN);
            } else if (cardN.substring(1, cardN.length) == zhuNumber) {
                playerZhuNumber.push(cardN);
            } else if (cardN.charAt(0) == zhuSuit) {
                playerZhuSuit.push(cardN);
            } else {
                playerFuSuit.push(cardN);
            }
        });
        playerJoker = sortJoker(playerJoker);
        playerZhuNumber = sortZhuNumber(playerZhuNumber, zhuSuit);
        playerZhuSuit = sortZhuSuit(playerZhuSuit);
    });
}

function sortJoker(deck) { //backwards
    deck.sort();
    return deck;
}

function sortZhuNumber(deck, zhuSuit) {
    deck.sort();
    let sortedDeck = [];
    deck.forEach(cardN => {
        if (cardN.charAt(0) == zhuSuit) {
            sortedDeck.unshift(cardN);
        } else {
            sortedDeck.push(cardN);
        }
    });
    return sortedDeck;
}

function sortZhuSuit(deck) {
    deck.sort();
    let sortedDeck = [];
    let deckInt = [];
    let deckChar = [];
    deck.forEach(cardN => {
        if (!isNaN(cardN.substring(1, cardN.length))) {
            deckInt.push(cardN);
        } else {
            deckChar.push(cardN);
        }
    });
    console.log("zhu Suit");
    deckInt.sort();
    deckChar.sort();
    let sortedDeckChar = [];
    deckChar.forEach(cardN => {
        if(cardN.includes("A")){
            sortedDeckChar.push(cardN);
        } else {
            sortedDeckChar.unshift(cardN);
        }
    });

    //unfinished
    console.log("int" + deckInt);
    console.log("char" + sortedDeckChar);

}