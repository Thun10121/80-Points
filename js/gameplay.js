//♠ ♥ ♣ ♦
const cardTypes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suitTypes = ["♠", "♥", "♣", "♦"];
// const fs = require('fs');

function intialize() { //the function that calls all functions to intialize
    let deck = putCards();
    deck = randomizeCards(deck);
    const zhuSuit = randomizeSuit(); //!
    const zhuNumber = randomizeNumber(); //!
    let distributeCardsOutput = distributeCards(deck);
    let playerDecksUnsorted = distributeCardsOutput[0];
    const diPai = distributeCardsOutput[1]; //!
    const playerDecks = sortPlayerDecks(playerDecksUnsorted, zhuSuit, zhuNumber); //!
    let game = {
        gameId: "1", //TODO This would subject to change
        playerDecks: playerDecks,
        diPai: diPai,
        players: ["thun", "hbl", "eemmaa", "avocado"]
    }

    //debugging purposes
    console.log(zhuSuit + " " + zhuNumber);
    console.log(diPai.join(" "));
    for(let i = 0; i < 4; i++){
        console.log(playerDecks[i].join(" "));
    }

    return game;
    // writeData(game);
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
        let rand = Math.floor(Math.random() * (deck.length));
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
    let diPai = deck;
    let output = [playerCards, diPai];
    return output;
}

function sortPlayerDecks(playerDecks, zhuSuit, zhuNumber) {
    let sortedPlayerDecks = [];
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
        playerFuSuit = sortFuSuit(playerFuSuit, zhuSuit);
        let output = playerJoker.concat(playerZhuNumber).concat(playerZhuSuit).concat(playerFuSuit);
        sortedPlayerDecks.push(output);
    });
    return sortedPlayerDecks;
}

function sortJoker(deck) { //backwards
    deck.sort();
    deck.reverse(); //forward now
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

    //sort by alternating color with ♠ ♥ ♣ ♦ precedence
    let corrOrder = ["♠", "♥", "♣", "♦"];
    let suitOrder = [["♠", "♥", "♣", "♦"], ["♥", "♠", "♦", "♣"], ["♣", "♥", "♠", "♦"], ["♦", "♠", "♥", "♣"]];
    let sortOrder = [[], [], [], []];
    for(let i = 0; i < corrOrder.length; i++){
        if(corrOrder[i] == zhuSuit){
            for(let j = 0; j < suitOrder[i].length; j++){
                for(let k = 0; k < deck.length; k++){
                    if(deck[k].includes(suitOrder[i][j])){
                        sortOrder[j].push(deck[k]);
                    }
                }
            }
            break;
        }
    }
    sortedDeck = sortOrder[0].concat(sortOrder[1]).concat(sortOrder[2]).concat(sortOrder[3]);
    return sortedDeck;
}

function sortZhuSuit(deck) {
    for (let i = 0; i < deck.length; i++) {
        deck[i] = deck[i].replace("10", "v");
        deck[i] = deck[i].replace("J", "w");
        deck[i] = deck[i].replace("Q", "x");
        deck[i] = deck[i].replace("K", "y");
        deck[i] = deck[i].replace("A", "z");
    }
    deck.sort();
    for (let i = 0; i < deck.length; i++) {
        deck[i] = deck[i].replace("v", "10");
        deck[i] = deck[i].replace("w", "J");
        deck[i] = deck[i].replace("x", "Q");
        deck[i] = deck[i].replace("y", "K");
        deck[i] = deck[i].replace("z", "A");
    }
    deck.reverse();
    return deck;
}

function sortFuSuit(deck, zhuSuit) {
    for (let i = 0; i < deck.length; i++) {
        deck[i] = deck[i].replace("10", "v");
        deck[i] = deck[i].replace("J", "w");
        deck[i] = deck[i].replace("Q", "x");
        deck[i] = deck[i].replace("K", "y");
        deck[i] = deck[i].replace("A", "z");
    }
    deck.sort();
    for (let i = 0; i < deck.length; i++) {
        deck[i] = deck[i].replace("v", "10");
        deck[i] = deck[i].replace("w", "J");
        deck[i] = deck[i].replace("x", "Q");
        deck[i] = deck[i].replace("y", "K");
        deck[i] = deck[i].replace("z", "A");
    }
    deck.reverse();

    //sort by alternating color with ♠ ♥ ♣ ♦ precedence
    let corrOrder = ["♠", "♥", "♣", "♦"];
    let suitOrder = [["♥", "♣", "♦"], ["♠", "♦", "♣"], ["♥", "♠", "♦"], ["♠", "♥", "♣"]];
    let sortedDeck = [[], [], []];
    for(let i = 0; i < corrOrder.length; i++){
        if(corrOrder[i] == zhuSuit){
            for(let j = 0; j < suitOrder[i].length; j++){
                for(let k = 0; k < deck.length; k++){
                    if(deck[k].includes(suitOrder[i][j])){
                        sortedDeck[j].push(deck[k]);
                    }
                }
            }
            break;
        }
    }

    deck = sortedDeck[0].concat(sortedDeck[1]).concat(sortedDeck[2]);

    return deck;
}

function findLArgestCard(card1, card2, card3, card4) {

}

function isZhuSuit() {

}

// function writeData(game) {
//     fs.writeFile("../data/gameData.json", JSON.stringify(game), (error) => {
//         if(err){
//             throw err;
//         }
//     });
// }

// function readData(gameId) {
//     fs.readFile(date, function (data) {
//         const games = JSON.parse(data);
//         console.log(games);
//     });
// }