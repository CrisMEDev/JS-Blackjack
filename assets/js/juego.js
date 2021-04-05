
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

let puntosJugador = 0;
let puntosComputadora = 0;


// Referencias en el DOM
const btnPedir = document.querySelector('#btnPedir');
const smallsPuntaje = document.querySelectorAll('small');


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

    // console.log(deck);

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

// pedirCarta();

const valorCarta = ( carta ) => {
    let valor = carta.substring( 0, carta.length - 1 );

    // isNaN, true si no es un número
    return isNaN( valor ) ? (valor = ( valor === 'A' ) ? 11 : 10)
                          : valor *= 1; // Se multiplica por uno para convertir a tipo num

}

// console.log( valorCarta( pedirCarta() ) );


// EVENTOS

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    // console.log( carta );

    puntosJugador += valorCarta( carta );
    // console.log( puntosJugador );

    smallsPuntaje[0].innerText = puntosJugador;

});

