//♠ ♥ ♣ ♦
const cardTypes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suitTypes = ["♠", "♥", "♣", "♦"];
const cardValue = new Map();
const activeRooms = [];
const roomID = "";
// const fs = require('fs');

function GenerateRoomNumber(){
    let rand = Math.floor(Math.random() * 999999);
    let room = toString(rand);
    while(room.length < 6){
        room = "0" + room;
    }
    return room;
}

function intialize() { //the function that calls all functions to intialize
    let room = "";
    let exists = false;
    while(true){
        room = GenerateRoomNumber();
        exists = false;
        for(let i = 0; i < activeRooms.length; i++){
            if(activeRooms[i] == room){
                exists = true;
                break;
            }
        }
        if(!exists){
            activeRooms.push(room);
            roomID = room;
            break;
        }
    }
    
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
        zhuSuit: zhuSuit,
        zhuNumber: zhuNumber,
        diPai: diPai,
        players: ["thun", "hbl", "eemmaa", "avocado"]
    }

    //debugging purposes
    console.log(zhuSuit + " " + zhuNumber);
    console.log(diPai.join(" "));
    for(let i = 0; i < 4; i++){
        console.log(playerDecks[i].join(" "));
    }
    
    for(let i = 0; i < cardTypes.length; i++){
        if(cardTypes[i] != zhuNumber){
            cardValue.set(cardTypes[i], cardValue.size + 1);
        }
    }
    let cardExample = [];
    for(let i = 0; i < 4; i++){
        let rand = Math.floor(Math.random() * playerDecks[i].length);
        cardExample.push(playerDecks[i][rand]);
    }
    findLargestCard(cardExample[0], cardExample[1], cardExample[2], cardExample[3], zhuSuit, zhuNumber);
    return game;
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

function CardInfo(card, player, zhuLevel){
    this.card = card;
    this.player = player;
    this.zhuLevel = zhuLevel;
    //zhuLevel: 5 = RJoker; 4 = BJoker; 3 = zhuNumber + zhuSuit; 2 = zhuNumber; 1 = zhuSuit; 0 = not zhu
}

function findLargestCard(card1, card2, card3, card4, zhuSuit, zhuNumber) {
    console.log(card1, card2, card3, card4);
    let theCards = [card1, card2, card3, card4];
    let cardMap = [];
    let highestZhu = 0, totalPoints = 0;
    let card, player, point, zhuLevel;
    for(let i = 0; i < theCards.length; i++) {
        card = theCards[i];
        player = i + 1;
        if(card.includes("5")){
            point = 5;
        }else if(card.includes("10") || card.includes("K")){
            point = 10;
        }else{
            point = 0;
        }
        totalPoints += point;
        if(card.includes("RJoker")){
            zhuLevel = 5;
        }else if(card.includes("BJoker")){
            zhuLevel = 4;
        }else if(card.includes(zhuNumber)){
            if(card.includes(zhuSuit)){
                zhuLevel = 3;
            }else{
                zhuLevel = 2;
            }
        }else if(card.includes(zhuSuit)){
            zhuLevel = 1;
        }else{
            zhuLevel = 0;
        }
        if(zhuLevel > highestZhu){
            highestZhu = zhuLevel;
        }
        cardMap.push(new CardInfo(card, player, zhuLevel));
    }
    
    if(highestZhu > 0){ //if zhupai present
        for(let i = 0; i < cardMap.length; i++){
            if(cardMap[i].zhuLevel != highestZhu){
                cardMap.splice(i, 1);
                i --;
            }
        }
        if(highestZhu > 1){
            console.log("Largest Card: Player " + cardMap[0].player);
        }else{
            let biggest = 0;
            for(let j = 0; j < cardMap.length; j++){
                cardMap[j].card = cardValue.get(cardMap[j].card.substr(1, cardMap[j].card.length));
                if(cardMap[j].card > biggest){
                    biggest = cardMap[j].card;
                }
            }
            for(let j = 0; j < cardMap.length; j++){
                if(cardMap[j].card == biggest){
                    console.log("Largest Card: Player " + cardMap[j].player);
                    break;
                }
            }
        }
    }else{ //if no zhupai is present
        let currSuit = cardMap[0].card.charAt(0);
        for(let i = 0; i < cardMap.length; i++){
            if(!cardMap[i].card.includes(currSuit)){
                cardMap.splice(i, 1);
                i --;
            }
        }
        let biggest = 0;
        for(let j = 0; j < cardMap.length; j++){
            cardMap[j].card = cardValue.get(cardMap[j].card.substr(1, cardMap[j].card.length));
            if(cardMap[j].card > biggest){
            biggest = cardMap[j].card;
            }
        }
        for(let j = 0; j < cardMap.length; j++){
            if(cardMap[j].card == biggest){
                console.log("Largest Card: Player " + cardMap[j].player);
                break;
            }
        }
    }
}

function isZhuSuit() {

}