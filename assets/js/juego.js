
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
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');
const smallsPuntaje = document.querySelectorAll('small');
const divCartas = document.querySelectorAll('.cartas');

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

const valorCarta = ( carta ) => {
    let valor = carta.substring( 0, carta.length - 1 );

    // isNaN, true si no es un número
    return isNaN( valor ) ? (valor = ( valor === 'A' ) ? 11 : 10)
                          : valor *= 1; // Se multiplica por uno para convertir a tipo num

}

const f_crearCarta = ( carta, jugador ) => {    // 0 jugador, 1 computadora
    // Agregar la imagen al HTML
    const nuevaCarta = document.createElement('img');   // Si se crea una instancia de manera global
                                                        // se remplazara la carta por la ultima puesta por la referencia

    nuevaCarta.src = `assets/cartas/${ carta }.png`;
    nuevaCarta.classList.add('carta');

    divCartas[jugador].append( nuevaCarta );
}

// Turno de la computadora
const f_turnoComputadora = ( puntosJugador ) => {
    do{
        const carta = pedirCarta();
        // console.log( carta );

        puntosComputadora += valorCarta( carta );
        // console.log( puntosJugador );

        smallsPuntaje[1].innerText = puntosComputadora;

        f_crearCarta( carta, 1 );

        if ( puntosJugador > 21 ){
            break;
        }

    }while( (puntosComputadora < puntosJugador) && ( puntosJugador <=21 ) );


    // setTimeOut para que primero se visualice las cartas de la computadora y después el mensaje
    // con el resultado final
    setTimeout( () => {
        if ( puntosComputadora === puntosJugador )
        alert('Empate!');
        else if ( puntosJugador <= 21 && (puntosComputadora > 21 || puntosComputadora < puntosJugador))
            alert('Ganaste!!!');
        else if ( (puntosJugador < puntosComputadora && puntosComputadora <= 21) || puntosJugador > 21 )
            alert('Gano la computadora');
    }, 100);

}


// EVENTOS

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    // console.log( carta );

    puntosJugador += valorCarta( carta );
    // console.log( puntosJugador );

    smallsPuntaje[0].innerText = puntosJugador;

    f_crearCarta( carta, 0 );
    
    if ( puntosJugador > 21 ){
        console.log('Lo siento mucho perdiste :(');
        f_turnoComputadora( puntosJugador );
        btnPedir.disabled = true;       // Inhabilita el boton
        btnDetener.disabled = true;
    } else if ( puntosJugador === 21 ){
        console.log('21, Excelente!!! :D');
        btnPedir.disabled = true;       // Inhabilita el boton
        btnDetener.disabled = true;
        f_turnoComputadora( puntosJugador );
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    f_turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener( 'click', () => {
    console.clear(); // Limpiar consola
    deck = [];
    crearDeck();
    console.log(deck);
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosJugador = puntosComputadora = 0;
    smallsPuntaje[0].innerText = smallsPuntaje[1].innerText = puntosJugador;
    divCartas[0].innerHTML = divCartas[1].innerHTML = '';
} );

