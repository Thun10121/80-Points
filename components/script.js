/*
------------------------------------------------------------------
!Table Of Contents
------------------------------------------------------------------
 *1.  Game Logic
        Global Variables
        Main Functions
        Room Functions
 *2.  Display Logic
 *3.  Buttons
*/

/*
TODO finish loading page
TODO finish initialize function
*/

/*
------------------------------------------------------------------
*1. Game Logic
------------------------------------------------------------------
*/
/*
    ------------------------------------------------------------------
    1.2 HTML Selectors
    ------------------------------------------------------------------
*/
const DECK_ONE = document.getElementsByClassName("yourcards");
const DECK_TWO = document.getElementsByClassName("deck")[1];
const DECK_THREE = document.getElementsByClassName("deck")[0];
const DECK_FOUR = document.getElementsByClassName("deck")[2];

const PLAYED_CARDS_ONE = document.getElementsByClassName("play")[0];
const PLAYED_CARDS_TWO = document.getElementsByClassName("play")[1];
const PLAYED_CARDS_THREE = document.getElementsByClassName("play")[2];
const PLAYED_CARDS_FOUR = document.getElementsByClassName("play")[3]

/*
    ------------------------------------------------------------------
    1.2 Global Variables
    ------------------------------------------------------------------
*/

let DECKS = [DECK_ONE, DECK_TWO, DECK_THREE, DECK_FOUR];
let played = [PLAYED_CARDS_ONE, PLAYED_CARDS_TWO, PLAYED_CARDS_THREE, PLAYED_CARDS_FOUR];

const CARD_TYPES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const SUIT_TYPES = ["♠", "♥", "♣", "♦"];

const cardValue = new Map();

const MAX_ROOMS = 20;
let ACTIVE_ROOMS = []; //!add to firebase
let ROOM_ID = "";
let ROOM_TYPE = ""; //TODO: waiting for custom function added

let TOTAL_POINTS = 0;

/*
    ------------------------------------------------------------------
    1.3 General Function
    ------------------------------------------------------------------
*/

function include(array, value) {
    let result = false
    for (let i in array) {
        if (array[i] == value) {
            result = true;
            break;
        }
    }
    return result;
}

function substring(string, indexOne, indexTwo) {
    let result = "";
    for (let i in string) {
        if (i >= indexOne && i <= indexTwo) {
            result += string[i];
        }
    }
    return result;
}

function charAt(string, index) {
    return string[index];
}

function length(string) {
    let result = 0;
    for (let i in string) {
        if (i > result) {
            result = i;
        }
    }

    return Math.floor(result) + 1;
}

/*
    ------------------------------------------------------------------
    1.4 Main Function
    ------------------------------------------------------------------
*/

function intialize() {
    roomGenerator();
    console.log(ROOM_ID);
    const DECK_ORDERED = putCards();
    const DECK = randomizeCards(DECK_ORDERED);

    const ZHU_SUIT = randomizeSuit();
    const ZHU_NUMBER = randomizeNumber();

    const DISTRIBUTE_CARDS = distributeCards(DECK);
    console.log(DISTRIBUTE_CARDS);
    const PLAYERDECK_UNSORTED = DISTRIBUTE_CARDS[0];
    console.log(PLAYERDECK_UNSORTED);
    const DI_PAI = DISTRIBUTE_CARDS[1];
    const PLAYERDECKS = sortPlayerDecks(PLAYERDECK_UNSORTED, ZHU_SUIT, ZHU_NUMBER);
    console.log(PLAYERDECKS);
}

/*
    ------------------------------------------------------------------
    1.5 Room Functions
    ------------------------------------------------------------------
*/
function GenerateRoomNumber() {
    let room = Math.floor(Math.random() * 1000000).toString();
    while (room.length < 6) {
        room = "0" + room;
    }
    return room;
}

function roomGenerator() {
    let exists = false;
    let exceed = false;
    while (true) {
        if (ACTIVE_ROOMS.length == MAX_ROOMS) {
            alert("all rooms are filled");
            exceed = true;
            break;
        }
        let room = GenerateRoomNumber();
        exists = false;
        for (let j = 0; j < ACTIVE_ROOMS.length; j++) {
            if (room == ACTIVE_ROOMS[j]) {
                exists = true
            }
        }
        if (!exists) {
            ACTIVE_ROOMS.push(room);
            ROOM_ID = room;
            break;
        } else {
            room = GenerateRoomNumber();
        }
    }
}

/*
    ------------------------------------------------------------------
    1.6 Intialize Functions
    ------------------------------------------------------------------
*/
function loading() {

}

function putCards() {
    let cards = ["BJoker", "BJoker", "RJoker", "RJoker"];
    for (let i = 0; i < 2; i++) {
        for (let suitN in SUIT_TYPES) {
            for (let cardN in CARD_TYPES) {
                cards.push(SUIT_TYPES[suitN] + CARD_TYPES[cardN]);
            }
        }
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
    return SUIT_TYPES[rand];
}

function randomizeNumber() { //randomize the number
    let rand = Math.floor(Math.random() * 13);
    return CARD_TYPES[rand];
}

function distributeCards(deck) { //distribute cards to players
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
    for (let deckN in playerDecks) {
        let playerJoker = [];
        let playerZhuSuit = [];
        let playerZhuNumber = [];
        let playerFuSuit = [];
        for (let cardN in playerDecks[deckN]) {
            let temp = playerDecks[deckN][cardN];
            if (substring(temp, 1, length(temp)) == "Joker") {
                playerJoker.push(temp);
            } else if (substring(temp, 1, length(temp)) == zhuNumber) {
                playerZhuNumber.push(temp);
            } else if (charAt(temp, 0) == zhuSuit) {
                playerZhuSuit.push(temp);
            } else {
                playerFuSuit.push(temp);
            }
        }
        console.log(playerJoker);
        console.log(playerZhuNumber);
        console.log(playerZhuSuit);
        console.log(playerFuSuit);
        playerJoker = sortJoker(playerJoker);
        playerZhuNumber = sortZhuNumber(playerZhuNumber, zhuSuit);
        playerZhuSuit = sortSuit(playerZhuSuit, zhuSuit, true);
        playerFuSuit = sortSuit(playerFuSuit, zhuSuit, false);
        let output = playerJoker.concat(playerZhuNumber).concat(playerZhuSuit).concat(playerFuSuit);
        sortedPlayerDecks.push(output);
    }
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
    for (let cardN in deck) {
        if (cardN.charAt(0) == zhuSuit) {
            sortedDeck.unshift(cardN);
        } else {
            sortedDeck.push(cardN);
        }
    }

    //sort by alternating color with ♠ ♥ ♣ ♦ precedence
    let corrOrder = ["♠", "♥", "♣", "♦"];
    let suitOrder = [["♠", "♥", "♣", "♦"], ["♥", "♠", "♦", "♣"], ["♣", "♥", "♠", "♦"], ["♦", "♠", "♥", "♣"]];
    let sortOrder = [[], [], [], []];
    for (let i = 0; i < corrOrder.length; i++) {
        if (corrOrder[i] == zhuSuit) {
            for (let j = 0; j < suitOrder[i].length; j++) {
                for (let k = 0; k < deck.length; k++) {
                    if (deck[k].includes(suitOrder[i][j])) {
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

function sortSuit(deck, zhuSuit, isZhu) {
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
    if (isZhu) {
        return deck;
    }
    //sort by alternating color with ♠ ♥ ♣ ♦ precedence
    let corrOrder = ["♠", "♥", "♣", "♦"];
    let suitOrder = [["♥", "♣", "♦"], ["♠", "♦", "♣"], ["♥", "♠", "♦"], ["♠", "♥", "♣"]];
    let sortedDeck = [[], [], []];
    for (let i = 0; i < corrOrder.length; i++) {
        if (corrOrder[i] == zhuSuit) {
            for (let j = 0; j < suitOrder[i].length; j++) {
                for (let k = 0; k < deck.length; k++) {
                    if (deck[k].includes(suitOrder[i][j])) {
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