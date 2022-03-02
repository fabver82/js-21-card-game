//const readlineSync = require("readline-sync");

class Card{
    constructor(rank,symbol){
        this.rank = rank;
        this.symbol = symbol;
    }
    get toString(){
        switch (this.rank){
            case 1: return `Ace of ${this.symbol}`;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10 : return `${this.rank} of ${this.symbol}`;
            case 11: return `Jack of ${this.symbol}`;
            case 12: return `Queen of ${this.symbol}`;
            case 13: return `King of ${this.symbol}`;
        }
    }
}

class Deck{
    constructor(size=52){
        this.list = [];
        let start = 2;
        if (size == 32){
            start=7;
        }
        for(let i=start;i<=13;i++){
            let card = new Card(i,'Heart');
            this.list.push(card);
            card = new Card(i,'Spades');
            this.list.push(card);
            card = new Card(i,'Club');
            this.list.push(card);
            card = new Card(i,'Diamond');
            this.list.push(card);
        }
        let card = new Card(1,'Heart');
        this.list.push(card);
        card = new Card(1,'Spades');
        this.list.push(card);
        card = new Card(1,'Club');
        this.list.push(card);
        card = new Card(1,'Diamond');
        this.list.push(card);
    }
    shuffle(){
        this.list = this.list.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    }
    draw(){
        return this.list.shift(); 
    }
}

class Play21{
    constructor(){
        //initialise the deck, shuffle it
        this.deck = new Deck();
        this.deck.shuffle();
        this.playerSum = 0;
        this.playerStand = false;
        this.playerCards = [];
        this.dealerSum = 0;
        this.dealerCards = [];
        this.dealerStand = false;
    }
    initGame(){
        //draw two cards to player 
        //TODO:dealer play
        this.playerCards.push(this.deck.draw());
        this.dealerCards.push(this.deck.draw());
        this.playerCards.push(this.deck.draw());
        this.dealerCards.push(this.deck.draw());
    }
    getValueCard(cardRank,player="player"){
        switch (cardRank){
            case 1 : 
                if(player=="player"){
                    if (this.playerSum + 11 > 21){ return 1;}else{return 11;};
                }else{
                    if (this.dealerSum + 11 > 21){ return 1;}else{return 11;};
                }
                break;
            case 11:
            case 12:
            case 13: return 10;break;
            default: return cardRank; 
        }
    }
    updateSum(player="player"){
        if(player=="player"){
            this.playerSum=0;
            for(let card of this.playerCards){
                this.playerSum += this.getValueCard(card.rank);
             }
             return this.playerSum;
        }else{
            this.dealerSum=0;
            for(let card of this.dealerCards){
                this.dealerSum += this.getValueCard(card.rank);
             }
             return this.dealerSum;
        }
        
    }
    checkWinner(){
        if(this.updateSum('player') == 21){
            return "Player Won with 21";
        }
        if(this.isBust('player')){
            return "BUSTED!";
        }
        if (this.updateSum('player') > this.updateSum('dealer') && this.playerStand){
            return "Player Won";
        }else{
            return "Dealer Won";
        }
    }
    isBust(player="player"){
        if(player=="player"){
            if(this.playerSum > 21){
                return true;
            }else{
                return false;
            }
        }else{
            if(this.dealerSum> 21){
                return true;
            }else{
                return false;
            }
        }
        
    }
    drawCard(player = "player"){
        let drawCard = this.deck.draw();
        if (player == "player"){
            console.log(`Player draw ${drawCard.toString}`);
            this.playerCards.push(drawCard);
            this.updateSum("player");
            console.log(`Player has ${this.playerSum}`);
            if (this.isBust("player")){
                console.log('BUSTED');
            }
        }else{
            console.log(`Dealer draw ${drawCard.toString}`);
            this.dealerCards.push(drawCard);
            this.updateSum("dealer");
        }
    }
    stand(player="player"){
        if (player=="player"){
            this.playerStand = true;
        }else{
            this.dealerStand = true;
        }
        
    }
}


const playerList = document.querySelector('.player-card-list');
const playerTotal = document.querySelector('.player-total');
const textField = document.querySelector('.text');
const drawButton = document.querySelector('.draw');
const updatePlayerList = function(){
    playerList.innerHTML='';
    for(let card of game.playerCards){
        console.log(card);
        playerList.innerHTML += "<div class='card'>"+card.toString+"</div>"; 
    }
}
const updateTotalPlayer = function(){
    playerTotal.textContent = `you have ${game.updateSum('player')}`;
}

const updateWinnerField = function(){
    textField.textContent = game.checkWinner('player');
}

//new game
let game = new Play21();
game.initGame();
updateWinnerField();
//show player card
updatePlayerList();
//show total
updateTotalPlayer();

drawButton.addEventListener('click', function(){
    game.drawCard('player');
    updatePlayerList();
    updateTotalPlayer();
    updateWinnerField();
    
})
