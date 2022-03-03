class Card{
    constructor(rank,symbol){
        this.rank = rank;
        this.symbol = symbol;
    }
    get symbolEmoji(){
        switch(this.symbol){
            case 'Spade': return "&#9824;";
            case 'Heart': return "&#9829;";
            case 'Club': return "&#9827;";
            case 'Diamond': return "&#9830;";
        }
    }
    get toString(){
        switch (this.rank){
            case 1: return `Ace${this.symbolEmoji}`;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10 : return `${this.rank}${this.symbolEmoji}`;
            case 11: return `Jack${this.symbolEmoji}`;
            case 12: return `Queen${this.symbolEmoji}`;
            case 13: return `King${this.symbolEmoji}`;
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
            card = new Card(i,'Spade');
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
class Player{
    constructor(isDealer=false){
        this.isDealer = isDealer;
        this.total = 0;
        this.stand = false;
        this.hand = [];
        this.stack = 100;
    }
    setStack(stack){
        this.stack=stack;
    }
    draw(card){
        this.hand.push(card);
    }
    setSum(sum){
        this.total=sum;
    }
    setStand(){
        this.stand = true;  
    }
    isBust(){
        if (this.total > 21){
            return true;
        }else{
            return false;
        }
    }

}
class Play21{
    constructor(){
        //initialise the deck, shuffle it
        this.deck = new Deck();
        this.deck.shuffle();
        this.player = new Player();
        this.dealer = new Player(true);
        // this.playerSum = 0;
        // this.playerStand = false;
        // this.playerCards = [];
        // this.dealerSum = 0;
        // this.dealerCards = [];
        // this.dealerStand = false;
    }
    initGame(){
        //draw two cards to player 
        //TODO:dealer play
        // this.deck = new Deck();
        // this.deck.shuffle();
        // this.playerSum = 0;
        // this.playerStand = false;
        // this.playerCards = [];
        // this.dealerSum = 0;
        // this.dealerCards = [];
        // this.dealerStand = false;
        // this.playerCards.push(this.deck.draw());
        // this.dealerCards.push(this.deck.draw());
        // this.playerCards.push(this.deck.draw());
        // this.dealerCards.push(this.deck.draw());
        this.player.draw(this.deck.draw());
        this.dealer.draw(this.deck.draw());
        this.player.draw(this.deck.draw());
        this.dealer.draw(this.deck.draw());
    }
    setSum(player){
        let sum = 0;
        for(let card of player.hand){
            if (card.rank>10){
                sum+=10;
            }else{
                sum += card.rank
            }
        }
        for(let card of player.hand){
            if(card.rank==1 && sum+10<=21){
                sum+=10;
            }
        }
        player.total=sum;
    }
    checkWinner(bet){
        if(this.player.total == 21){
            this.player.stack += 2*bet;
            return "Player Won with 21";
        }
        if(this.player.isBust()){
            return "BUSTED!";
        }
        if(this.dealer.isBust()){
            this.player.stack += 2*bet;
            return "Player Won";
        }
        if (this.player.total > this.dealer.total && this.player.stand){
            this.player.stack += 2*bet;
            return "Player Won";
        }
        if(this.player.total <= this.dealer.total && this.player.stand){
            return "Dealer Won"
        }
        return 'draw or stand?';
    }
}


const playerList = document.querySelector('.player-card-list');
const playerTotal = document.querySelector('.player-total');
const textField = document.querySelector('.text');
const drawButton = document.querySelector('.draw');
drawButton.style.visibility = 'hidden';
const standButton = document.querySelector('.stand');
standButton.style.visibility = 'hidden';
const dealerList = document.querySelector('.dealer-card-list');
const dealerTotal= document.querySelector('.dealer-total');
const newGameButton = document.querySelector('.new');
const stackTextField = document.querySelector('.stack-text');
stackTextField.style.visibility='hidden';
const stackField = document.querySelector('.stack');
stackField.textContent="100";
const betField = document.querySelector('#bet');
let game = undefined;
const updatePlayerList = function(){
    playerList.innerHTML='';
    for(let card of game.player.hand){
        console.log(card);
        playerList.innerHTML += "<div class='card'>"+card.toString+"</div>"; 
    }
}
const updateDealerList = function(){
    dealerList.innerHTML='';
    for(let card of game.dealer.hand){
        console.log(card);
        dealerList.innerHTML += "<div class='card'>"+card.toString+"</div>"; 
    }
}
const updateTotalPlayer = function(){
    game.setSum(game.player);
    playerTotal.textContent = `you have ${game.player.total}`;
}
const updateTotalDealer = function(){
    game.setSum(game.dealer);
    dealerTotal.textContent = `Dealer have ${game.dealer.total}`;
}

const updateWinnerField = function(){
    let winner = game.checkWinner(betField.value);
    stackField.textContent = game.player.stack;
    textField.textContent = winner;
    if (winner!=='draw or stand?'){
        newGameButton.style.visibility = 'visible';
        standButton.style.visibility = 'hidden';
        drawButton.style.visibility = 'hidden';
    }
}

newGameButton.addEventListener('click',function(){
    //new game
    game = new Play21();
    stackTextField.style.visibility='visible';
    game.player.setStack(parseInt(stackField.textContent));
    game.player.stack-=betField.value;
    stackField.textContent=game.player.stack;
    game.initGame();
    dealerList.innerHTML=''
    dealerTotal.textContent='';
    newGameButton.style.visibility='hidden';
    drawButton.style.visibility = 'visible';
    standButton.style.visibility='visible';
    
    //show player card
    updatePlayerList();
    //show total
    updateTotalPlayer();
    updateWinnerField();
})


drawButton.addEventListener('click', function(){
    game.player.draw(game.deck.draw());
    updatePlayerList();
    updateTotalPlayer();
    updateWinnerField();
    if (game.player.isBust()){
        drawButton.style.visibility='hidden';
    }
    
})
standButton.addEventListener('click',function(){
    game.player.setStand();
    drawButton.style.visibility = 'hidden';
    standButton.style.visibility = 'hidden';
    updateDealerList();
    updateTotalDealer();
    while (game.dealer.total < game.player.total){
        game.dealer.draw(game.deck.draw());
        updateDealerList();
        updateTotalDealer();
        game.setSum(game.dealer);
        console.log('dealer total:'+game.dealer.total);
    }
    game.dealer.setStand();
    updateWinnerField();
})
