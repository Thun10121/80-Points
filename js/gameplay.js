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

try{
    let cardTypes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let suits = ["♠", "♥", "♣", "♦"];
    let cards = ["BJoker", "BJoker", "RJoker", "RJoker"];
    let rand;
    let randCards = [];
    let playerCards = [[], [], [], []];
    let dipai = [];
    let dipaiPoints = 0;
    let points = 0;

    intial();

    function intial() { // !whenever a game start
        cardTypes.forEach(putCards); //calling for each type of the card call function PutCards
        randomCards(cards); // randomize
        console.log("Whole Deck: " + randCards.join(" "));
        for (let i = 0; i < 4; i++)
            playerCards[i] = randCards.splice(0, 25);
        dipai = randCards;
    }

    function putCards(item) { //for each card input push it 8 times, 2 per 4 suits
        for (let x = 0; x < 2; x++)
            for (let i = 0; i < 4; i++)
                cards.push(suits[i] + item);
    }

    function randomCards(randArray) {
        while (randArray.length > 0) {
            rand = Math.floor(Math.random() * (cards.length));
            randCards.push(randArray[rand]);
            randArray.splice(rand, 1);
        }
    }
    
    function cp(order, card){
        this.order = order;
        this.card = card;
    }

    rand = Math.floor(Math.random() * 4);
    let zhuSuit = suits[rand];
    rand = Math.floor(Math.random() * 13);
    let zhuNumber = cardTypes[rand];
    console.log("zhuSuit: " + zhuSuit + " " + "zhuNumber: " + zhuNumber);

    for(let i = 0; i < 4; i++){
        playerCards[i] = sortCards(playerCards[i]);
        console.log("Player " + (i + 1) + " cards: " + playerCards[i].join(" "));
    }

    console.log("Dipai: " + dipai.join(" "));
    for(let i = 0; i < dipai.length; i++){
        if(dipai[i].substring(1, dipai[i].length) == "5"){
            dipaiPoints += 5;
        }else if(dipai[i].substring(1, dipai[i].length) == "10" || dipai[i].substring(1, dipai[i].length) == "K"){
            dipaiPoints += 10;
        }
    }
    console.log("Dipai Points: " + dipaiPoints);

    function sortCards(sorting){
        let afterSorted = [];
        let playerZhuNumber = [];
        let playerZhuSuit = [];
        let playerFuSuit = [[]];
        for(let i = 0; i < sorting.length; i++){
            if(i > sorting.length-1){
                break;
            }
            if(sorting[i] == "RJoker"){
                afterSorted.unshift(sorting[i]);
                sorting.splice(i, 1);
                i--;
            }else if(sorting[i] == "BJoker"){
                afterSorted.push(sorting[i]);
                sorting.splice(i, 1);
                i--;
            }else if(sorting[i].substring(1, sorting[i].length) == zhuNumber){
                playerZhuNumber.push(sorting[i]);
                sorting.splice(i, 1);
                i--;
            }else if(sorting[i].substring(0, 1) == zhuSuit){
                playerZhuSuit.push(sorting[i]);
                sorting.splice(i, 1);
                i--;
            }
        }
        for(let i = 0; i < playerZhuNumber.length; i++){
            if(i > playerZhuNumber.length-1){
                break;
            }
            if(playerZhuNumber[i].charAt(0) == zhuSuit){
                afterSorted.push(playerZhuNumber[i]);
                playerZhuNumber.splice(i, 1);
                i--;
            }
        }
        playerZhuNumber = sortSuit(playerZhuNumber);
        for(let i = 0; i < playerZhuNumber.length; i++){
            afterSorted.push(playerZhuNumber[i]);
        }

        playerZhuSuit = sortNumber(playerZhuSuit);
        for(let i = 0; i < playerZhuSuit.length; i++){
            afterSorted.push(playerZhuSuit[i]);
        }

        while(sorting.length > 0){
            let thisSuit = sorting[0].substring(0, 1);
            tempFuSuit = [];
            for(let i = 0; i < sorting.length; i++){
                if(i > sorting.length - 1){
                    break;
                }
                if(sorting[i].substring(0, 1) == thisSuit){
                    tempFuSuit.push(sorting[i]);
                    sorting.splice(i, 1);
                    i--;
                }
            }
            tempFuSuit = sortNumber(tempFuSuit);
            playerFuSuit.push(tempFuSuit);
        }
        playerFuSuit.shift();

        for(let i = 0; i < playerFuSuit.length; i++){
            if(playerFuSuit[i][0].substring(0, 1) == "♠"){
                for(let j = 0; j < playerFuSuit[i].length; j++){
                    afterSorted.push(playerFuSuit[i][j]);
                }
            }
        }
        for(let i = 0; i < playerFuSuit.length; i++){
            if(playerFuSuit[i][0].substring(0, 1) == "♥"){
                for(let j = 0; j < playerFuSuit[i].length; j++){
                    afterSorted.push(playerFuSuit[i][j]);
                }
            }
        }
        for(let i = 0; i < playerFuSuit.length; i++){
            if(playerFuSuit[i][0].substring(0, 1) == "♣"){
                for(let j = 0; j < playerFuSuit[i].length; j++){
                    afterSorted.push(playerFuSuit[i][j]);
                }
            }
        }
        for(let i = 0; i < playerFuSuit.length; i++){
            if(playerFuSuit[i][0].substring(0, 1) == "♦"){
                for(let j = 0; j < playerFuSuit[i].length; j++){
                    afterSorted.push(playerFuSuit[i][j]);
                }
            }
        }

        sorting = afterSorted;
        return sorting;
    }

    function sortSuit(currCards){
        let sortArr = currCards;
        currCards = [];
        for(let i = 0; i < sortArr.length; i++){
            if(sortArr[i].substring(0, 1) == "♠"){
                currCards.push(sortArr[i]);
            }
        }
        for(let i = 0; i < sortArr.length; i++){
            if(sortArr[i].substring(0, 1) == "♥"){
                currCards.push(sortArr[i]);
            }
        }
        for(let i = 0; i < sortArr.length; i++){
            if(sortArr[i].substring(0, 1) == "♣"){
                currCards.push(sortArr[i]);
            }
        }
        for(let i = 0; i < sortArr.length; i++){
            if(sortArr[i].substring(0, 1) == "♦"){
                currCards.push(sortArr[i]);
            }
        }
        return currCards;
    }

    function sortNumber(currCards){
        let sortArr = [];
        let currCopy = [];
        for(let i = 0; i < currCards.length; i++){
            for(let j = 0; j < cardTypes.length; j++){
                if(currCards[i].substring(1, currCards[i].length) == cardTypes[j]){
                    sortArr.push(new cp(i, j));
                    break;
                }
            }
        }
        for(let i = 0; i < sortArr.length; i++){
            for(let j = 0; j < sortArr.length-1; j++){
                if(sortArr[j].card < sortArr[j+1].card){
                    let temp = sortArr[j+1];
                    sortArr[j+1] = sortArr[j];
                    sortArr[j] = temp;
                }
            }
        }
        for(let i = 0; i < sortArr.length; i++){
            currCopy.push(currCards[sortArr[i].order]);
        }
        return currCopy;
    }

    //♠ ♥ ♣ ♦
    // rand = Math.floor(Math.random() * 2) + 1;
    // let zhuang1 = rand;
    // let zhuang2 = rand + 2;
    // console.log("Current zhuang: " + zhuang1 + " and " + zhuang2);
    // let largest = 0;
    // let thisRoundPoints = 0;

    // while(points < 80){
    //     let card1 = prompt("Enter Card 1");
    //     let card2 = prompt("Enter Card 2");
    //     let card3 = prompt("Enter Card 3");
    //     let card4 = prompt("Enter Card 4");
    //     console.log(card1 + " " + card2 + " " + card3 + " " + card4);
    //     findLargestCard(card1, card2, card3, card4);
    //     if(largest != zhuang1 && largest != zhuang2){
    //         points += thisRoundPoints;
    //     }
    //     console.log("Points caught: " + points);
    // }
    // console.log("Game Over");

    // function findLargestCard(card1, card2, card3, card4){
    //     let result = 0;
    //     let zhu = false;
    //     let thisRound = [new cp(1, card1), new cp(2, card2), new cp(3, card3), new cp(4, card4)];
    //     let currSuit = card1.charAt(0);
    //     thisRoundPoints = 0;

    //     for(let i = 0; i < thisRound.length; i++){
    //         if(thisRound[i].card.substring(1, thisRound[i].card.length) == "5"){
    //             thisRoundPoints += 5;
    //         }else if(thisRound[i].card.substring(1, thisRound[i].card.length) == "10" || thisRound[i].card.substring(1, thisRound[i].card.length) == "K"){
    //             thisRoundPoints += 10;
    //         }
    //         if(thisRound[i].card.charAt(0) == zhuSuit || thisRound[i].card.substring(1, thisRound[i].card.length) == zhuNumber){
    //             zhu = true;
    //         }else if(thisRound[i].card == "RJoker"){
    //             zhu = true;
    //             thisRound[i].card = "16";
    //         }else if(thisRound[i].card == "BJoker"){
    //             zhu = true;
    //             thisRound[i].card = "15";
    //         }
    //     }

    //     if(!zhu){ //all fupai
    //         for(let i = 0; i < 4; i++){
    //             if(i > thisRound.length-1){
    //                 break;
    //             }
    //             if(thisRound[i].card.charAt(0) != currSuit){
    //                 thisRound.splice(i, 1);
    //                 i--;
    //             }else{
    //                 thisRound[i].card = thisRound[i].card.substring(1, thisRound[i].card.length);
    //             }
    //         }
    //         for(let i = 0; i < thisRound.length; i++){
    //             for(let j = 0; j < cardTypes.length; j++){
    //                 if(thisRound[i].card == cardTypes[j]){
    //                     thisRound[i].card = j;
    //                 }
    //             }
    //         }
            // for(let i = 0; i < thisRound.length; i++){
            //     for(let j = 0; j < thisRound.length-1; j++){
            //         if(thisRound[j].card < thisRound[j+1].card){
            //             let temp = thisRound[j+1];
            //             thisRound[j+1] = thisRound[j];
            //             thisRound[j] = temp;
            //         }
            //     }
            // }
    //         result = thisRound[0].order;
    //     }else{ //zhupai is present
    //         currSuit = zhuSuit;
    //         for(let i = 0; i < 4; i++){
    //             if(i > thisRound.length-1){
    //                 break;
    //             }
    //             if(thisRound[i].card == "15" || thisRound[i].card == "16"){
    //                 continue;
    //             }
    //             if(thisRound[i].card.charAt(0) != currSuit && thisRound[i].card.substring(1, thisRound[i].card.length) != zhuNumber){
    //                 thisRound.splice(i, 1);
    //                 i--;
    //             }
    //         }
    //         for(let i = 0; i < thisRound.length; i++){
    //             if(thisRound[i].card.substring(1, thisRound[i].card.length) == zhuNumber){
    //                 if(thisRound[i].card.charAt(0) != zhuSuit){
    //                     thisRound[i].card = "13";
    //                 }else{
    //                     thisRound[i].card = "14";
    //                 }
    //                 continue;
    //             }
    //             if(thisRound[i].card == "15" || thisRound[i].card == "16"){
    //                 continue;
    //             }
    //             thisRound[i].card = thisRound[i].card.substring(1, thisRound[i].card.length)
    //             for(let j = 0; j < cardTypes.length; j++){
    //                 if(thisRound[i].card == cardTypes[j]){
    //                     thisRound[i].card = j;
    //                 }
    //             }
    //         }
    //         for(let i = 0; i < thisRound.length; i++){
    //             for(let j = 0; j < thisRound.length-1; j++){
    //                 if(thisRound[j].card < thisRound[j+1].card){
    //                     let temp = thisRound[j+1];
    //                     thisRound[j+1] = thisRound[j];
    //                     thisRound[j] = temp;
    //                 }
    //             }
    //         }
    //         result = thisRound[0].order;
    //     }
    //     console.log("largest card: person " + result);
    //     largest = result;
    // }
}catch(error){
    console.log(error);
}