class Card{
    constructor(rank,symbol){
        this.rank = rank;
        this.symbol = symbol;
    }
    get rank(){
        switch (this.rank){
            case 1: return "Ace";
            case 2,3,4,5,6,7,8,9,10 : return this.rank.toString();
            case 11: return "Jack";
            case 12: return "Queen";
            case 13: return "King";
        }
    }
    get symbol(){
        return this.symbol;
    }
    get toString(){
        return `${this.rank()} of ${this.symbol()}`;
    }

}

let card = new Card(1,'heart');
console.log(card.toString());

class Cards{
    constructor(){

    }
}