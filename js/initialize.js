/*
?Points:
k: 10
ten: 10
five: 10

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

    let cardTypes = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
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

    console.log(dipai);
} catch (error) {
    console.log(error);
}