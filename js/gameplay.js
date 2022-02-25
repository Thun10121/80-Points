/*
?Points:
k: 10
ten: 10
five: 5

?Suits:
spades: ♠️
hearts: ♥
clovers: ♣️
diamonds: ♢
♠️♥♣️♢
*/

try {

    let points = [5, 10, 10];
    //point values (in order): five,ten,king

    let cardTypes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let suits = ["♠", "♥", "♣", "♦"];
    let cards = ["BJoker", "BJoker", "RJoker", "RJoker"];
    let rand;
    let randCards = [];
    let playerCards = [[], [], [], []];
    let dipai = [];

    intial();

    function intial() { // !whenever a game start
        cardTypes.forEach(putCards); //calling for each type of the card call function PutCards
        randomCards(cards); // randomize
        console.log(randCards.join(" "));
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

    findLargestCard("♣K", "♦A", "♣7", "♠9");

    function cp(order, card){
        this.order = order;
        this.card = card;
    }

    function findLargestCard(card1, card2, card3, card4){
        let result = 0;
        let joker = false, rj = false, bj = false;
        let thisRound = [new cp(1, card1), new cp(2, card2), new cp(3, card3), new cp(4, card4)];
        let currSuit = card1.charAt(0);
        for(let i = 0; i < 4; i++){
            if(i > thisRound.length-1){
                break;
            }
            if(thisRound[i].card != "BJoker" && thisRound[i].card != "RJoker"){
                if(thisRound[i].card.charAt(0) != currSuit){
                    thisRound.splice(i, 1);
                    i--
                }else{
                    thisRound[i].card = thisRound[i].card.substring(1, thisRound[i].card.length);
                }
            }else{
                joker = true;
            }
        }

        if(joker){
            let temp = -1;
            for(let i = 0; i < thisRound.length; i++){
                if(thisRound[i].card == "RJoker"){
                    rj = true;
                    result = thisRound[i].order;
                    break;
                }else if(thisRound[i].card == "BJoker"){
                    bj = true;
                    if(temp == -1){
                        temp = thisRound[i].order;
                    }
                }
            }
            if(bj && !rj){
                result = temp;
            }
        }else{
            for(let i = 0; i < thisRound.length; i++){
                for(let j = 0; j < cardTypes.length; j++){
                    if(thisRound[i].card == cardTypes[j]){
                        thisRound[i].card = j;
                    }
                }
            }
            for(let i = 0; i < thisRound.length; i++){
                for(let j = 0; j < thisRound.length-1; j++){
                    if(thisRound[j].card < thisRound[j+1].card){
                        let temp = thisRound[j+1];
                        thisRound[j+1] = thisRound[j];
                        thisRound[j] = temp;
                    }
                }
            }
            result = thisRound[0].order;
        }
        console.log("largest card: person " + result);
    }
} catch (error) {
    console.log(error);
}