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

function createCard(cardInputted, zhuSuit, zhuNumber, cardIndex) {
    let cardSuit = cardInputted.substring(0, 1);
    let cardNumber = cardInputted.substring(1, cardInputted.length);
    let suitColor = "red";
    let zhuHollowStarDisplay = "hide", zhuSolidStarDisplay = "hide", zhuFilledStarDisplay = "hide", zhuJokerStarDisplay = "hide";
    if (cardSuit == "♣" || cardSuit == "♠") {
        suitColor = "black";
        borderColor = "blackBK";
    } else {
        borderColor = "redBK";
    }
    if (cardSuit == zhuSuit || cardNumber == zhuNumber || cardNumber == "Joker") {
        if (cardSuit == zhuSuit && cardNumber == zhuNumber) {
            zhuSolidStarDisplay = "show";
            zhuFilledStarDisplay = "show";
        } else if (cardNumber == zhuNumber) {
            zhuSolidStarDisplay = "show";
        } else if (cardNumber == "Joker") {
            zhuJokerStarDisplay = "show";
        } else {
            zhuHollowStarDisplay = "show";
        }
    }
    let cardsHTML = `
    <div id="card-border${cardIndex}" class="card-border card-border-deactive" onclick="initiateCard('${cardSuit}', '${cardNumber}', '${cardIndex}')">
        <div id="card-inner-border" class="${borderColor}">
            <div id="card-content">
                <div id="card-type">
                    <div id="card-suit" class="${suitColor}">${cardSuit}</div>
                    <div id="card-number">${cardNumber}</div>
                </div>
                <svg id="card-center-svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48.91 59.66">
                    <linearGradient id="linear-gradient" x1="36.44" y1="51.18" x2="86.38" y2="30.25"
                        gradientUnits="userSpaceOnUse">
                        <stop offset="0.34" stop-color="#f0d750" />
                        <stop offset="0.56" stop-color="#e7cd3b" />
                        <stop offset="0.72" stop-color="#bc8c1f" />
                        <stop offset="0.82" stop-color="#d9ad15" />
                        <stop offset="1" stop-color="#fce186" />
                    </linearGradient>
                    <path class="cls-1"
                        d="M18.35,26.38,18.29,26l-.2.28c-.28.37-1.26,1.58-2.33,1.53a1.93,1.93,0,0,1-1.55-1,4.7,4.7,0,0,1-.5-3.74,3.76,3.76,0,0,1,1.21-1.69,7.4,7.4,0,0,1,.69-.45,4.14,4.14,0,0,0,1-.77,3.43,3.43,0,0,0,.87-2.93,3.18,3.18,0,0,0-2.22-2.42l-.35-.06.35.48a3.39,3.39,0,0,1,.88,1.94,2,2,0,0,1-.9,1.79,5.85,5.85,0,0,0-.4-3.59,6.63,6.63,0,0,0-.68-1,7.25,7.25,0,0,1-.58-.76,2.44,2.44,0,0,1-.14-.28,5.45,5.45,0,0,1-.28-2.36l0-.72-.26.28a3.78,3.78,0,0,0-.76,4.1c.75,1.52,1.46,3.39.17,4.44-.42.34-.75.63-1,.88a12.2,12.2,0,0,0,.7-1.31,2.61,2.61,0,0,0-.71-2.84l-.27-.25,0,.37c.09.94-.22,1.4-.9,2.43-.33.49-.74,1.11-1.22,2a3.89,3.89,0,0,0-.37,3.87,5,5,0,0,1-.71-1l-.2-.38-.09.5a7.11,7.11,0,0,0,2,5.86,5,5,0,0,0,3.5,1.52,4.11,4.11,0,0,0,.78-.07,5.6,5.6,0,0,0,3.87-2A3.33,3.33,0,0,0,18.35,26.38Z"
                        transform="translate(-7.55 -0.99)" />
                    <path class="cls-1"
                        d="M56.45,24.41l-.18-1.28c0-.13-.43-2.88-2.33-3.94.78-.09,1-.45,1-.73l0-.26-.24.09a3.08,3.08,0,0,1-1.72,0l.05,0a.85.85,0,0,0,.37-.78V17.3l-.19,0s-4.42.61-5.66-1.58l-.3-.53v.61A2.8,2.8,0,0,0,49,18.18a4.93,4.93,0,0,1,2.83,3.94,6.62,6.62,0,0,1-1.92,4.72q-.61.73-1.32,1.47-.31.33-.66.66l-.15.13,0,0a13.42,13.42,0,0,0-1.23-8.49l-.69-1.54.29,1.42c0,.08,1.54,7.64-2.47,11.95-1,1-1.85,1.92-2.64,2.7-2.2,2.19-3.78,3.77-4.57,6.1L36,42.6l.73-1.19c.56-.91,4.2-5.43,7.3-6.63a3.58,3.58,0,0,0,0,2.36,1.84,1.84,0,0,0,1.05,1c-.14.32-.62,1.2-.73,1.37a12.9,12.9,0,0,1-5,4.12,57.93,57.93,0,0,1-6.88,3l-1.78.69a13,13,0,0,0-4.39,2.59,6.6,6.6,0,0,0-2,4.59,3.76,3.76,0,0,0,1.24,2.8,2.07,2.07,0,0,0,1.35.5l.35,0a1.79,1.79,0,0,0,1.29-.92l.25-.47-.47.25a1.85,1.85,0,0,1-1.89.12A2.25,2.25,0,0,1,25.68,54a6.88,6.88,0,0,1,2-2.94C30,48.94,33,47.85,35.91,46.79S42,44.57,44.39,42.3a9,9,0,0,0,2.29-3.48c.41,1.48,1.16,6.08-4.28,8.47L41,47.91l1.51-.32s5.12-1.13,6.56-5.66l1.86,2-.69-1.22a7.86,7.86,0,0,1-.65-5.3,2.31,2.31,0,0,0,1.15,1.41l.51.23-.31-.46a3.47,3.47,0,0,1-.5-2.64,2.42,2.42,0,0,0,1.74,1.47l.47.14-.3-.39s-1.67-2.15-.58-3.45A2.13,2.13,0,0,0,54.14,32l.11-.46-.36.3c-.47.38-1.24.88-1.54.81A3,3,0,0,0,54.2,30.1l.07-.58-.36.46s-1.58,2-3,1.55a.32.32,0,0,1-.24-.23c-.18-.74,1.38-2.61,2.25-3.55a3.06,3.06,0,0,1-.4,1.25l-.27.49.49-.28A3.44,3.44,0,0,0,54.3,27a4.87,4.87,0,0,1,.35,1l.15.62L55,28c0-.18,1-3.89.34-6A5.31,5.31,0,0,1,56,23.21Z"
                        transform="translate(-7.55 -0.99)" />
                    <path class="cls-1"
                        d="M54.26,16.17a3.65,3.65,0,0,1-1.14-.07c.67-.1,1.7-.41,1.85-1.35L55,14.3l-.34.31s-.65.58-1.23.25l.92-.67-1-.07.58-.41-.68-.42a2.39,2.39,0,0,0,.68-2.2l-.05-.46-.24.4s-1,1.69-2.22,1.27c-.2-.07-.32-.16-.32-.23,0-.22.61-.63,1.2-.88l.41-.18-.43-.12a2.68,2.68,0,0,0-1.67.12c-.07-.42-.15-1.37.5-1.74l.4-.22L51.09,9a3.07,3.07,0,0,0-.91,0A2.8,2.8,0,0,0,48.6,6.36l-.28-.16,0,.31a2.6,2.6,0,0,1-.54,1.82,2.64,2.64,0,0,1-1.92.81c.17-.83,1-4.08,3.73-4.7l.59-.13-.58-.18S48.4,3.8,46.09,5.5A15.14,15.14,0,0,0,44.8,6.59c-.28.26-.56.52-.86.77a3.36,3.36,0,0,0-.43-2.88l-.23-.39-.06.45a9.56,9.56,0,0,1-.38,1.73,4.51,4.51,0,0,1-2,2.11l-.48.34a8.2,8.2,0,0,0,.52-6.83L40.58,1l0,1a9.21,9.21,0,0,1-3.4,7A6.26,6.26,0,0,0,38,7l.28-1.35L37.67,6.9a8,8,0,0,1-.83,1.27l0,0a12,12,0,0,1-1.45,1.54,24.85,24.85,0,0,0-3.1,3.3,1,1,0,0,1-.07-.3c0-.46.21-1.3,1.47-2.68l.27-.28-.39,0c-.09,0-2.2.16-4.08,4.76a6.63,6.63,0,0,1-3.25,3.52,6.78,6.78,0,0,1-1.71.58l-.13,0a6.41,6.41,0,0,1-1.05.13h-.4a4.79,4.79,0,0,0-2.82.54c-1.62,1-2.34,1.94-2.49,3.33-.05.51-.07.92-.09,1.24a2.14,2.14,0,0,1-.17,1l-.11.12.13.1a.56.56,0,0,0,.7,0l.13-.12a.81.81,0,0,1,.6-.33c.28,0,.6.26,1,.73l.2.25.25-.91.37.46.29-.65a4.28,4.28,0,0,0,2.25.25,12.36,12.36,0,0,0,4-1.58l.93-.49a9.79,9.79,0,0,1-3.37,3.51,10.45,10.45,0,0,1-.95.56l-.21.12a3,3,0,0,1-1.74.55.65.65,0,0,1-.4-.22l-.09-.08-.09,0c-.21.06-.39.62-.39.63a1.62,1.62,0,0,0,.06.62,1.47,1.47,0,0,0,1.07,1,3,3,0,0,0,1.74-.25,18.38,18.38,0,0,0,2.9-1.56,12.63,12.63,0,0,1,4-1.87c.56-.13,1.14-.22,1.69-.3a16.32,16.32,0,0,0,3.07-.69A10.09,10.09,0,0,0,37,23.93a20.15,20.15,0,0,1,.29,3.77,7.11,7.11,0,0,1-1,3.46c-2.41,4.1-6.29,6.94-10,9.69l-1.93,1.42a18.1,18.1,0,0,0-5.9,6.58,9.54,9.54,0,0,0-.61,6.48A7.51,7.51,0,0,0,22,60.2a6.21,6.21,0,0,0,2.35.45,5.92,5.92,0,0,0,3.94-1.44l.88-.8L28.15,59c-2,1-4,1-5.29.08a5.59,5.59,0,0,1-2.43-4.75c0-3.33,2.44-6.82,4.84-8.54,4.87-3.5,10.39-7.47,14.36-12.82l.28-.38a12.5,12.5,0,0,0,1.81-2.93A5.25,5.25,0,0,1,41,31.9L40.3,33l.91-.87c.15-.15,3.79-3.72,3.45-7.76a17.06,17.06,0,0,0-2.15-6.93s-1-2.08,0-3.32a8.09,8.09,0,0,1,3.18-2,5.09,5.09,0,0,0,2.08-.85,5.3,5.3,0,0,0,.09.79l0,.12a2.43,2.43,0,0,0,1.86,2.18,3.85,3.85,0,0,0,1.13-.05l.24,0c-.12.44-.73.83-1.05,1l-.15.1.12.14s2,2.29,4.34,1l.69-.39Zm-26,3.72a8.37,8.37,0,0,1-1.8.15c.1,0,.3-.15.39-.2.33-.18.67-.37,1-.58,1.37-.86,3-2,3.55-3.58A3.65,3.65,0,0,1,28.26,19.89Zm14.58-7.84a25.45,25.45,0,0,1-3.35,1.79,4.35,4.35,0,0,1,1.79-.11,4.44,4.44,0,0,0-2.4,1.6c.25-.31,1,.41,1.16.76-.2,0-.52-.12-.69,0s.13.81.18,1a4.17,4.17,0,0,1,.13,1.53c-.15-.21-.29-.43-.43-.64a5.76,5.76,0,0,1-.56,2.38,3.29,3.29,0,0,0-.26-1.23,4.26,4.26,0,0,1-.67,2.3,1.53,1.53,0,0,0,.13-.64c0-.17-.14-.52-.1-.65-.13.44-.83.91-1.07,1.29a8.16,8.16,0,0,0,.74-4.66,3.93,3.93,0,0,1,.37-2.74,4.83,4.83,0,0,1,2.69-1.86,9.71,9.71,0,0,0,3.8-2C44.33,11,43.22,11.64,42.84,12.05Z"
                        transform="translate(-7.55 -0.99)" />
                </svg>
                <div id="card-center-suit" class="${suitColor}">${cardSuit}</div>
                <svg id="zhuHollowStar" class="${zhuHollowStarDisplay}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.98 46.37" fill="#00ad11">
                    <defs>
                        <style>
                            .cls-hollow-star{
                                fill: none;
                                stroke: #000;
                                stroke-miterlimit: 10;
                                stroke-width: 10px;
                                }
                            </style>
                        </defs>
                    <path d="M164.21,119.28l-12.64-.47a2.14,2.14,0,0,1-1.92-1.41l-4.35-12a2.66,2.66,0,0,0-5,0l-4.35,12a2.11,2.11,0,0,1-1.92,1.41l-12.64.47a2.7,2.7,0,0,0-1.55,4.81l10,7.89a2.17,2.17,0,0,1,.73,2.29l-3.46,12.29a2.67,2.67,0,0,0,4.05,3l10.5-7.13a2.15,2.15,0,0,1,2.38,0l10.5,7.13a2.67,2.67,0,0,0,4-3l-3.47-12.29a2.19,2.19,0,0,1,.74-2.29l9.95-7.89A2.7,2.7,0,0,0,164.21,119.28Zm-11.12,9.54a6,6,0,0,0-2.06,6.39l2.19,7.76a.31.31,0,0,1-.47.34l-6.5-4.41a6.51,6.51,0,0,0-2.24-1,6,6,0,0,0-4.54.9l-6.63,4.5a.31.31,0,0,1-.47-.34l2.19-7.76a6,6,0,0,0-2.06-6.39l-6.28-5a.32.32,0,0,1,.18-.56l8-.29a6,6,0,0,0,5.38-4l2.75-7.57a.31.31,0,0,1,.58,0l2.74,7.57a6,6,0,0,0,5.38,4l8,.29a.31.31,0,0,1,.18.56Z" transform="translate(-118.81 -103.63)"/>
                    <path class="cls-hollow-star" d="M123.36,104.61" transform="translate(-118.81 -103.63)"/>
                </svg>
                <svg id="zhuSolidStar" class="${zhuSolidStarDisplay}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.98 46.37" fill="#00ad11">
                    <defs>
                        <style>
                            .cls-star {
                                fill: none;
                                stroke: #000;
                                stroke-miterlimit: 10;
                                stroke-width: 10px;
                            }
                        </style>
                    </defs>
                    <path class="cls-star" d="M123.36,104.61" transform="translate(-118.81 -103.63)"/>
                    <path d="M164.21,119.28l-12.64-.47a2.14,2.14,0,0,1-1.92-1.41l-4.35-12a2.66,2.66,0,0,0-5,0l-4.35,12a2.11,2.11,0,0,1-1.92,1.41l-12.64.47a2.7,2.7,0,0,0-1.55,4.81l10,7.89a2.17,2.17,0,0,1,.73,2.29l-3.46,12.29a2.67,2.67,0,0,0,4.05,3l10.5-7.13a2.15,2.15,0,0,1,2.38,0l10.5,7.13a2.67,2.67,0,0,0,4-3l-3.47-12.29a2.19,2.19,0,0,1,.74-2.29l9.95-7.89A2.7,2.7,0,0,0,164.21,119.28Z" transform="translate(-118.81 -103.63)"/>
                </svg>
                <svg id="zhuFilledStar" class="${zhuFilledStarDisplay}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.96 46.37" fill="#00ad11">
                    <defs>
                        <style>
                        .cls-filled-1 {
                            fill: #fff;
                        }
                        .cls-filled-2 {
                            fill: none;
                            stroke: #000;
                            stroke-miterlimit: 10;
                            stroke-width: 10px;
                        }
                        </style>
                    </defs>
                    <path class="cls-filled-1" d="M25,3.79l4.85,13.29a1,1,0,0,0,.91.66l14.14.51a1,1,0,0,1,.58,1.8L34.31,28.77A1,1,0,0,0,34,29.84l3.89,13.6a1,1,0,0,1-1.54,1.11L24.58,36.66a1,1,0,0,0-1.13,0L11.72,44.55a1,1,0,0,1-1.54-1.11l3.89-13.6a1,1,0,0,0-.35-1.07L2.58,20.05a1,1,0,0,1,.59-1.8l14.13-.51a1,1,0,0,0,.92-.66L23.06,3.79A1,1,0,0,1,25,3.79Z" transform="translate(-0.01 -0.02)"/>
                    <path d="M45.4,15.65l-12.64-.47a2.14,2.14,0,0,1-1.92-1.41l-4.35-12a2.66,2.66,0,0,0-5,0l-4.35,12a2.11,2.11,0,0,1-1.92,1.41l-12.64.47A2.7,2.7,0,0,0,1,20.46l10,7.89a2.18,2.18,0,0,1,.73,2.29L8.3,42.93a2.67,2.67,0,0,0,4,3l10.5-7.13a2.15,2.15,0,0,1,2.38,0l10.5,7.13a2.67,2.67,0,0,0,4-3L36.26,30.64A2.2,2.2,0,0,1,37,28.35l10-7.89a2.7,2.7,0,0,0-1.55-4.81ZM34.28,25.19a6,6,0,0,0-2.06,6.39l2.19,7.76a.31.31,0,0,1-.22.38.32.32,0,0,1-.25,0l-6.5-4.41a6.64,6.64,0,0,0-2.24-1,6,6,0,0,0-4.54.9L14,39.67a.31.31,0,0,1-.47-.34l2.19-7.76a6,6,0,0,0-2.06-6.39l-6.28-5a.32.32,0,0,1,0-.45.33.33,0,0,1,.21-.11l8-.29a6,6,0,0,0,5.38-4l2.75-7.57a.31.31,0,0,1,.4-.18.32.32,0,0,1,.18.18L27,15.33a6,6,0,0,0,5.38,4l8,.29a.31.31,0,0,1,.18.56Z" transform="translate(-0.01 -0.02)"/>
                    <path class="cls-filled-2" d="M4.55,1" transform="translate(-0.01 -0.02)"/>
                </svg>
                <svg id="zhuJokerStar" class="${zhuJokerStarDisplay}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.68 65.68" fill="#00ad11">
                    <defs>
                        <style>
                            .cls-joker {
                                fill: none;
                                stroke: #000;
                                stroke-miterlimit: 10;
                                stroke-width: 10px;
                            }
                        </style>
                    </defs>
                    <path class="cls-joker" d="M154.27,132.13" transform="translate(-121.42 -99.29)"/>
                    <path d="M154.27,99.29a32.84,32.84,0,1,0,32.84,32.84A32.84,32.84,0,0,0,154.27,99.29Zm23,28.09-9.95,7.89a2.18,2.18,0,0,0-.74,2.29L170,149.85a2.69,2.69,0,0,1-.32,2.19,2.66,2.66,0,0,1-3.68.81l-10.5-7.13a2.15,2.15,0,0,0-2.38,0l-10.5,7.13a2.63,2.63,0,0,1-2.29.34,2.66,2.66,0,0,1-1.76-3.34L142,137.56a2.18,2.18,0,0,0-.73-2.29l-10-7.89a2.7,2.7,0,0,1,1.55-4.81l12.64-.47a2.11,2.11,0,0,0,1.92-1.41l4.35-12a2.66,2.66,0,0,1,5,0l4.35,12A2.11,2.11,0,0,0,163,122.1l12.64.47a2.7,2.7,0,0,1,1.55,4.81Z" transform="translate(-121.42 -99.29)"/>
                </svg>
            </div>
        </div>
    </div>`;
    return cardsHTML;
}

function initiateCard(suit, number, index) {
    let cardID = document.getElementById(`card-border${index}`);
    cardID.classList.toggle("card-border-active");
    cardID.classList.toggle("card-border-deactive");
}

function displayDecks(zhuSuit, zhuNumber) {
    let count = 0;
    deck.forEach(deckN => {
        if (count == 0) {
            console.log(players[0]);
            deckN.innerHTML = '';
            let count = 0;
            players[0].forEach(cardN => {
                deckN.innerHTML += createCard(cardN, zhuSuit, zhuNumber, count);
                count++;
            });
        } else {
            let cardHTML = `
            <img class="deck-card" src="../photos/card-back.svg">        
        `;
            if (count % 2 == 1) {
                cardHTML = `
                <img class="deck-card" src="../photos/Rcard-back.svg">        
            `;
            }
            for (let i = 0; i < 25; i++) {
                deckN.innerHTML += cardHTML;
            }
        }
        count++;
    });
}

function displayPlayed() {
    played.forEach(playedN => {

    });
}

function displayResult() {
    let fanDIV = document.getElementById("fanDiv");
    for (let i = 0; i < 10; i++) {
        let fanCard = `
            <img class="fan-card" id="fan-card" style="--card:${i}" src="../photos/cardBK-inverted.svg">        
            `;
        fanDiv.innerHTML += fanCard;
    }
}