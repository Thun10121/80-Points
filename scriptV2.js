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
const PLAYED_CARDS_FOUR = document.getElementsByClassName("play")[3];

/*
    ------------------------------------------------------------------
    1.2 Global Variables
    ------------------------------------------------------------------
*/

let DECKS = [DECK_ONE, DECK_TWO, DECK_THREE, DECK_FOUR];
let played = [PLAYED_CARDS_ONE, PLAYED_CARDS_TWO, PLAYED_CARDS_THREE, PLAYED_CARDS_FOUR];

const cardTypes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suitTypes = ["♠", "♥", "♣", "♦"];

const cardValue = new Map();

const maxRooms = 20;
let ACTIVE_ROOMS = []; //!add to firebase
let ROOM_ID = "";
let roomType = ""; //TODO: waiting for custom function added

let totalPoints = 0;

/*
    ------------------------------------------------------------------
    1.3 Main Function
    ------------------------------------------------------------------
*/

function intialize() {
    roomGenerator();
    console.log(ROOM_ID);
}

/*
    ------------------------------------------------------------------
    1.4 Room Functions
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
        if (ACTIVE_ROOMS.length == maxRooms) {
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
    1.5 Intialize Functions
    ------------------------------------------------------------------
*/
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