class Card{
    constructor(rank,symbol){
        this.rank = rank;
        this.symbol = symbol;
    }
    get toString(){
        switch (this.rank){
            case 1: return `Ace of ${this.symbol}`;
            case 2,3,4,5,6,7,8,9,10 : return `${this.rank.toString()} of ${this.symbol}`;
            case 11: return `Jack of ${this.symbol}`;
            case 12: return `Queen of ${this.symbol}`;
            case 13: return `King of ${this.symbol}`;
        }
    }
}

class Deck32{
    constructor(){
        this.list = [];
        for(let i=7;i<=13;i++){
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

