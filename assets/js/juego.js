
/*
*    C = (Clover)
*    D = (Diamond)
*    H = (Heart)
*    S = (Sword)
*/

let deck            = [];
const tiposDeCartas = ['C', 'D', 'H', 'S'];
const especiales    = ['A', 'K', 'Q', 'J'];

const crearDeck = () => {

    for ( let i = 2; i <= 10; i++ ){
        for (let tipo of tiposDeCartas)
        deck.push(i + tipo);
    }

    for ( let tipo of tiposDeCartas )
        for ( let especial of especiales )
        deck.push(especial + tipo);


    console.log(deck);

    deck = _.shuffle( deck );

    console.log(deck);

    return deck;
}

crearDeck();