
/*
*    C = (Clover)
*    D = (Diamond)
*    H = (Heart)
*    S = (Sword)
*/

let deck                = [];
let deckCartasEnJuego   = [];
const tiposDeCartas     = ['C', 'D', 'H', 'S'];
const especiales        = ['A', 'K', 'Q', 'J'];


// Funcion que crea un nuevo deck de cartas barajeado
const crearDeck = () => {

    for ( let i = 2; i <= 10; i++ ){
        for (let tipo of tiposDeCartas)
        deck.push(i + tipo);
    }

    for ( let tipo of tiposDeCartas )
        for ( let especial of especiales )
        deck.push(especial + tipo);


    // console.log(deck);

    deck = _.shuffle( deck );

    console.log(deck);

    return deck
}

crearDeck();

const pedirCarta = () => {

    if( deck.length === 0 )
        throw 'No hay cartas en el deck';

    const carta = deck.shift();

    deck = _.shuffle( deck );

    deckCartasEnJuego.push(carta);
    // console.log(deckCartasEnJuego);
    // console.log(deck);

    return carta;
}

pedirCarta();

