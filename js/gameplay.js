/*
?Points:
5: 5
10: 10
K: 10

?Suits:
spades: ♠
hearts: ♥
clovers: ♣
diamonds: ♦
♠ ♥ ♣ ♦
*/

//!functionns

try {
    let zhuSuitDiv = document.getElementById("zhuSuit");
    let zhuCardDiv = document.getElementById("zhuCard");
    let content = document.getElementById("content");
    let cardTypes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let suits = ["♠", "♥", "♣", "♦"];
    let cards = ["BJoker", "BJoker", "RJoker", "RJoker"];
    let rand = 0;
    let randCards = [];
    let playerCards = [[], [], [], []];
    let dipai = [];
    let dipaiPoints = 0;
    let points = 0;
    let zhuSuit = "";
    let zhuNumber = "";
    let afterSorted = [];
    let playerZhuNumber = [];
    let playerZhuSuit = [];
    let playerFuSuit = [[]];

    intialize();
    //TODO content.innerHTML += "Whole Deck: " + randCards.join(" ") + "<br><br>";

    for (let i = 0; i < 4; i++) {
        playerCards[i] = randCards.splice(0, 25);
    }
    dipai = randCards;

    function intialize() { // !whenever a game start
        cardTypes.forEach(putCards); //calling for each type of the card call function PutCards
        randomCards(cards); // randomize
    }

    function putCards(item) { //for each card input push it 8 times, 2 per 4 suits
        for (let x = 0; x < 2; x++) {
            for (let i = 0; i < 4; i++) {
                cards.push(suits[i] + item);
            }
        }
    }

    function randomCards(randArray) {
        while (randArray.length > 0) {
            rand = Math.floor(Math.random() * (cards.length));
            randCards.push(randArray[rand]);
            randArray.splice(rand, 1);
        }
    }

    function cp(order, card) {
        this.order = order;
        this.card = card;
    }

    rand = Math.floor(Math.random() * 4);
    zhuSuit = suits[rand];
    rand = Math.floor(Math.random() * 13);
    zhuNumber = cardTypes[rand];
    const FzhuSuit = zhuSuit;
    const FzhuNumber = zhuNumber;
    console.log("zhuSuit: " + FzhuSuit);
    console.log("zhuNumber: " + FzhuNumber);
    // zhuSuitDiv.innerHTML = `Main Suit: ${zhuSuit}`; //!add back
    // zhuCardDiv.innerHTML = `Main Number: ${zhuNumber}`; //! add back
    displayPlayerCards();

    function displayPlayerCards(){
        for (let i = 0; i < 4; i++) {
            playerCards[i] = sortCards(playerCards[i]);
            console.log(playerCards[i].join(" "));
            //TODO content.innerHTML += "Player " + (i + 1) + " cards: " + playerCards[i].join(" ") + "<br>";
        }
        return playerCards;
    }
    console.log(dipai.join(" "));

    const FplayerCards = displayPlayerCards;

    for (let i = 0; i < dipai.length; i++) {
        if (dipai[i].substring(1, dipai[i].length) == "5") {
            dipaiPoints += 5;
        } else if (dipai[i].substring(1, dipai[i].length) == "10" || dipai[i].substring(1, dipai[i].length) == "K") {
            dipaiPoints += 10;
        }
    }

    function sortCards(sorting) { //!sort each player cards
        afterSorted = [];
        playerZhuNumber = [];
        playerZhuSuit = [];
        playerFuSuit = [[]];
        for (let i = 0; i < sorting.length; i++) { //length of the deck
            if (i > sorting.length - 1) {
                break;
            }
            if (sorting[i] == "RJoker") {
                afterSorted.unshift(sorting[i]);
                sorting.splice(i, 1);
                i--;
            } else if (sorting[i] == "BJoker") {
                afterSorted.push(sorting[i]);
                sorting.splice(i, 1);
                i--;
            } else if (sorting[i].substring(1, sorting[i].length) == zhuNumber) {
                playerZhuNumber.push(sorting[i]);
                sorting.splice(i, 1);
                i--;
            } else if (sorting[i].substring(0, 1) == zhuSuit) {
                playerZhuSuit.push(sorting[i]);
                sorting.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < playerZhuNumber.length; i++) {
            if (i > playerZhuNumber.length - 1) {
                break;
            }
            if (playerZhuNumber[i].charAt(0) == zhuSuit) {
                afterSorted.push(playerZhuNumber[i]);
                playerZhuNumber.splice(i, 1);
                i--;
            }
        }
        playerZhuNumber = sortSuit(playerZhuNumber);
        for (let i = 0; i < playerZhuNumber.length; i++) {
            afterSorted.push(playerZhuNumber[i]);
        }

        playerZhuSuit = sortNumber(playerZhuSuit);
        for (let i = 0; i < playerZhuSuit.length; i++) {
            afterSorted.push(playerZhuSuit[i]);
        }

        while (sorting.length > 0) {
            let thisSuit = sorting[0].substring(0, 1);
            tempFuSuit = [];
            for (let i = 0; i < sorting.length; i++) {
                if (i > sorting.length - 1) {
                    break;
                }
                if (sorting[i].substring(0, 1) == thisSuit) {
                    tempFuSuit.push(sorting[i]);
                    sorting.splice(i, 1);
                    i--;
                }
            }
            tempFuSuit = sortNumber(tempFuSuit);
            playerFuSuit.push(tempFuSuit);
        }
        playerFuSuit.shift();

        for (let i = 0; i < 4; i++){
            let currSuit = suits[i];
            for (let j = 0; j < playerFuSuit.length; j++) {
                if (playerFuSuit[j][0].substring(0, 1) == currSuit) {
                    for (let k = 0; k < playerFuSuit[j].length; k++) {
                        afterSorted.push(playerFuSuit[j][k]);
                    }
                }
            }
        }

        sorting = afterSorted;
        return sorting;
    }

    function sortSuit(currCards) { //!sort each deck by suits
        let sortArr = currCards;
        currCards = [];
        for(let i = 0; i < 4; i++){
            let currSuit = suits[i];
            for (let j = 0; j < sortArr.length; j++) {
                if (sortArr[j].substring(0, 1) == currSuit) {
                    currCards.push(sortArr[j]);
                }
            }
        }
        return currCards;
    }

    function sortNumber(currCards) { //! 
        let sortArr = [];
        let currCopy = [];
        for (let i = 0; i < currCards.length; i++) {
            for (let j = 0; j < cardTypes.length; j++) {
                if (currCards[i].substring(1, currCards[i].length) == cardTypes[j]) {
                    sortArr.push(new cp(i, j));
                    break;
                }
            }
        }
        for (let i = 0; i < sortArr.length; i++) {
            for (let j = 0; j < sortArr.length - 1; j++) {
                if (sortArr[j].card < sortArr[j + 1].card) {
                    let temp = sortArr[j + 1];
                    sortArr[j + 1] = sortArr[j];
                    sortArr[j] = temp;
                }
            }
        }
        for (let i = 0; i < sortArr.length; i++) {
            currCopy.push(currCards[sortArr[i].order]);
        }
        return currCopy;
    }

    //♠ ♥ ♣ ♦
    let card1, card2, card3, card4 = "";
    rand = Math.floor(Math.random() * 2) + 1;
    let zhuang1 = rand;
    let zhuang2 = rand + 2;
    // TODO: content.innerHTML += "Current Zhuang: " + zhuang1 + " and " + zhuang2;
    console.log("Current Zhuang: " + zhuang1 + " and " + zhuang2);
    let largest = 0;
    let thisRoundPoints = 0;
    let cardNum = 0;

    function findLargestCard(card1, card2, card3, card4) {
        cardNum = 1;
        let currSuit = card1.charAt(0);
        let result = 0;
        let zhu = false;

        for (let i = 0; i < card1.length; i++) {
            if (card1[i] == " ") {
                cardNum++;
            }
        }

        if (cardNum == 1) {
            thisRoundPoints = 0;
            let thisRound = [new cp(1, card1), new cp(2, card2), new cp(3, card3), new cp(4, card4)];

            for (let i = 0; i < thisRound.length; i++) {
                if (thisRound[i].card.substring(1, thisRound[i].card.length) == "5") {
                    thisRoundPoints += 5;
                } else if (thisRound[i].card.substring(1, thisRound[i].card.length) == "10" || thisRound[i].card.substring(1, thisRound[i].card.length) == "K") {
                    thisRoundPoints += 10;
                }
                if (thisRound[i].card.charAt(0) == zhuSuit || thisRound[i].card.substring(1, thisRound[i].card.length) == zhuNumber) {
                    zhu = true;
                } else if (thisRound[i].card == "RJoker") {
                    zhu = true;
                    thisRound[i].card = "16";
                } else if (thisRound[i].card == "BJoker") {
                    zhu = true;
                    thisRound[i].card = "15";
                }
            }

            if (!zhu) { //all fupai
                for (let i = 0; i < 4; i++) {
                    if (i > thisRound.length - 1) {
                        break;
                    }
                    if (thisRound[i].card.charAt(0) != currSuit) {
                        thisRound.splice(i, 1);
                        i--;
                    } else {
                        thisRound[i].card = thisRound[i].card.substring(1, thisRound[i].card.length);
                    }
                }
                for (let i = 0; i < thisRound.length; i++) {
                    for (let j = 0; j < cardTypes.length; j++) {
                        if (thisRound[i].card == cardTypes[j]) {
                            thisRound[i].card = j;
                        }
                    }
                }
                for (let i = 0; i < thisRound.length; i++) {
                    for (let j = 0; j < thisRound.length - 1; j++) {
                        if (thisRound[j].card < thisRound[j + 1].card) {
                            let temp = thisRound[j + 1];
                            thisRound[j + 1] = thisRound[j];
                            thisRound[j] = temp;
                        }
                    }
                }
                result = thisRound[0].order;
            } else { //zhupai is present
                currSuit = zhuSuit;
                for (let i = 0; i < 4; i++) {
                    if (i > thisRound.length - 1) {
                        break;
                    }
                    if (thisRound[i].card == "15" || thisRound[i].card == "16") {
                        continue;
                    }
                    if (thisRound[i].card.charAt(0) != currSuit && thisRound[i].card.substring(1, thisRound[i].card.length) != zhuNumber) {
                        thisRound.splice(i, 1);
                        i--;
                    }
                }
                for (let i = 0; i < thisRound.length; i++) {
                    if (thisRound[i].card.substring(1, thisRound[i].card.length) == zhuNumber) {
                        if (thisRound[i].card.charAt(0) != zhuSuit) {
                            thisRound[i].card = "13";
                        } else {
                            thisRound[i].card = "14";
                        }
                        continue;
                    }
                    if (thisRound[i].card == "15" || thisRound[i].card == "16") {
                        continue;
                    }
                    thisRound[i].card = thisRound[i].card.substring(1, thisRound[i].card.length)
                    for (let j = 0; j < cardTypes.length; j++) {
                        if (thisRound[i].card == cardTypes[j]) {
                            thisRound[i].card = j;
                        }
                    }
                }
                for (let i = 0; i < thisRound.length; i++) {
                    for (let j = 0; j < thisRound.length - 1; j++) {
                        if (thisRound[j].card < thisRound[j + 1].card) {
                            let temp = thisRound[j + 1];
                            thisRound[j + 1] = thisRound[j];
                            thisRound[j] = temp;
                        }
                    }
                }
                result = thisRound[0].order;
            }
            // content.innerHTML += "<br>Largest Card: Person " + result;
            largest = result;
        } else if (cardNum == 2) {//♠ ♥ ♣ ♦
            thisRoundPoints = 0;
            let thisRound = [new cp(1, card1), new cp(2, card2), new cp(3, card3), new cp(4, card4)];
            let twoCards = [];

            let card1A = "", card2A = "";
            for (let i = 0; i < thisRound.length; i++) {
                card1A = "", card2A = thisRound[i].card;
                while (true) {
                    if (card1A.length > 0 && card2A.charAt(0) == " ") {
                        break;
                    }
                    card1A += card2A.charAt(0);
                    card2A = card2A.substring(1, card2A.length);
                }
                card2A = card2A.substring(1, card2A.length);
                twoCards.push(new cp(card1A, card2A));
            }
            for (let i = 0; i < twoCards.length; i++) {
                if (twoCards[i].order.substring(1, 2) == "5") {
                    thisRoundPoints += 5;
                }
                if (twoCards[i].card.substring(1, 2) == "5") {
                    thisRoundPoints += 5;
                }
                if (twoCards[i].order.substring(1, 3) == "10") {
                    thisRoundPoints += 10;
                }
                if (twoCards[i].card.substring(1, 3) == "10") {
                    thisRoundPoints += 10;
                }
                if (twoCards[i].order.substring(1, 2) == "K") {
                    thisRoundPoints += 10;
                }
                if (twoCards[i].card.substring(1, 2) == "K") {
                    thisRoundPoints += 10;
                }
            }
            for (let i = 0; i < twoCards.length; i++) {
                if (i > twoCards.length - 1) {
                    break;
                }
                if (twoCards[i].order != twoCards[i].card) {
                    twoCards.splice(i, 1);
                    thisRound.splice(i, 1);
                    i--;
                    continue;
                }
                if (twoCards[i].order.charAt(0) != currSuit) {
                    if (twoCards[i].order.substring(1, twoCards[i].order.length) != zhuNumber) {
                        twoCards.splice(i, 1);
                        thisRound.splice(i, 1);
                        i--;
                        continue;
                    }
                }
                if (twoCards[i].order.charAt(0) == zhuSuit || twoCards[i].order.substring(1, thisRound[i].order.length) == zhuNumber || twoCards[i].order == "BJoker" || twoCards[i].order == "RJoker") {
                    zhu = true;
                }
            }
            for (let i = 0; i < thisRound.length; i++) {
                thisRound[i].card = thisRound[i].card.substring(0, thisRound[i].card.length / 2);
            }

            if (!zhu) {
                for (let i = 0; i < thisRound.length; i++) {
                    thisRound[i].card = thisRound[i].card.substring(1, thisRound[i].card.length);
                    for (let j = 0; j < cardTypes.length; j++) {
                        if (thisRound[i].card == cardTypes[j]) {
                            thisRound[i].card = j;
                        }
                    }
                }
                for (let i = 0; i < thisRound.length; i++) {
                    for (let j = 0; j < thisRound.length - 1; j++) {
                        if (thisRound[j].card < thisRound[j + 1].card) {
                            let temp = thisRound[j + 1];
                            thisRound[j + 1] = thisRound[j];
                            thisRound[j] = temp;
                        }
                    }
                }
                result = thisRound[0].order;
            } else {
                currSuit = zhuSuit;

                for (let i = 0; i < thisRound.length; i++) {
                    if (i > thisRound.length - 1) {
                        break;
                    }
                    if (thisRound[i].card == "BJoker" || thisRound[i].card == "RJoker") {
                        continue;
                    }
                    if (thisRound[i].card.charAt(0) != currSuit && thisRound[i].card.substring(1, thisRound[i].card.length) != zhuNumber) {
                        thisRound.splice(i, 1);
                        i--;
                    }
                }
                for (let i = 0; i < thisRound.length; i++) {
                    if (thisRound[i].card.substring(1, thisRound[i].card.length) == zhuNumber) {
                        if (thisRound[i].card.charAt(0) != zhuSuit) {
                            thisRound[i].card = "13";
                        } else {
                            thisRound[i].card = "14";
                        }
                        continue;
                    }
                    if (thisRound[i].card == "BJoker") {
                        thisRound[i].card = "15";
                        continue;
                    }
                    if (thisRound[i].card == "RJoker") {
                        thisRound[i].card = "16";
                        continue;
                    }
                    thisRound[i].card = thisRound[i].card.substring(1, thisRound[i].card.length)
                    for (let j = 0; j < cardTypes.length; j++) {
                        if (thisRound[i].card == cardTypes[j]) {
                            thisRound[i].card = j;
                        }
                    }
                }
                for (let i = 0; i < thisRound.length; i++) {
                    for (let j = 0; j < thisRound.length - 1; j++) {
                        if (thisRound[j].card < thisRound[j + 1].card) {
                            let temp = thisRound[j + 1];
                            thisRound[j + 1] = thisRound[j];
                            thisRound[j] = temp;
                        }
                    }
                }
                result = thisRound[0].order;
            }
        }
        largest = result;
        console.log("largest card: person " + largest);
    }
   
} catch (error) {
    console.log(error);
}

function reload() {
    setTimeout(function () {
        reloadAlert = true;
    }, 5000);
}

window.onload = function () { //!edit
    console.log(reloadAlert);
    if (reloadAlert) {
        alert("you are leaving the page");
    }
}