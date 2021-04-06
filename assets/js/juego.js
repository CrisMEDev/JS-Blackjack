
/*
*    C = (Clover)
*    D = (Diamond)
*    H = (Heart)
*    S = (Sword)
*/

// PATRON MODULO
const miPatronModulo = (() => {
    'use strict'        // Use strict es para que java nos ayude a evitar errores comunes en codigo

    
    let deck                = [];
    const tiposDeCartas     = ['C', 'D', 'H', 'S'],
          especiales        = ['A', 'K', 'Q', 'J'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];


    // Referencias en el DOM
    const btnPedir = document.querySelector('#btnPedir'),
          btnNuevo = document.querySelector('#btnNuevo'),
          btnDetener = document.querySelector('#btnDetener'),
          smallsPuntaje = document.querySelectorAll('small'),
          divCartas = document.querySelectorAll('.cartas');

    const f_inicializarjuego = ( numJugadores = 1 ) => {    // Número de jugadores; por defecto 1, último jugador CPU
        deck = crearDeck();
        puntosJugadores = [];
        for ( let i = 0; i <= numJugadores; i++ )
            puntosJugadores.push(0);
        
        btnPedir.disabled = btnDetener.disabled = false;
        smallsPuntaje[0].innerText = smallsPuntaje[1].innerText = puntosJugadores[0];

        // Se puede resetear con un foreach
        divCartas[0].innerHTML = divCartas[1].innerHTML = '';   // similar a la linea siguiente
        divCartas.forEach( elemento => elemento.innerHTML = '' );
    }
    
    // Funcion que crea un nuevo deck de cartas barajeado
    const crearDeck = () => {
        deck = [];

        for ( let i = 2; i <= 10; i++ ){
            for (let tipo of tiposDeCartas)
            deck.push(i + tipo);
        }

        for ( let tipo of tiposDeCartas )
            for ( let especial of especiales )
            deck.push(especial + tipo);

        return _.shuffle( deck );
    }
    
    const pedirCarta = () => {

        if( deck.length === 0 )
            throw 'No hay cartas en el deck';
    
        deck = _.shuffle( deck );   // Se vuelve a revolver la baraja
            
        return deck.shift();    // Retorna la primera carta de la bajara y la elimina
    }

    // Obtiene el valor de la carta tomada
    const valorCarta = ( carta ) => {
        let valor = carta.substring( 0, carta.length - 1 );

        // isNaN, true si no es un número
        return isNaN( valor ) ? (valor = ( valor === 'A' ) ? 11 : 10)
                            : valor *= 1; // Se multiplica por uno para convertir a tipo num

    }

    const f_crearCarta = ( carta, turnoJugador ) => {    // 0 turnoJugador, 1 computadora
        // Agregar la imagen al HTML
        const nuevaCarta = document.createElement('img');   // Si se crea una instancia de manera global
                                                            // se remplazara la carta por la ultima puesta por la referencia

        nuevaCarta.src = `assets/cartas/${ carta }.png`;
        nuevaCarta.classList.add('carta');

        divCartas[turnoJugador].append( nuevaCarta );
    }

    const f_determinarGanador = () => {

        const [ puntosJugador, puntosComputadora ] = puntosJugadores;

        // setTimeOut para que primero se visualice las cartas de la computadora y después el mensaje
        // con el resultado final
        setTimeout( () => {
            if ( puntosComputadora === puntosJugador )
                alert('Empate!');
            else if ( puntosJugador <= 21 && (puntosComputadora > 21 || puntosComputadora < puntosJugador))
                alert('Ganaste!!!');
            else if ( (puntosJugador < puntosComputadora && puntosComputadora <= 21) || puntosJugador > 21 )
                alert('Gano la computadora');
        }, 150);
    }

    const f_acumularPuntos = ( turnoJugador, carta ) => {
        puntosJugadores[ turnoJugador ] += valorCarta( carta );
        smallsPuntaje[ turnoJugador ].innerText = puntosJugadores[ turnoJugador ];
        return puntosJugadores[ turnoJugador ];
    }

    // Turno de la computadora
    const f_turnoComputadora = ( puntosJugador ) => {
        let puntosComputadora = 0;
        do{
            const carta = pedirCarta();

            puntosComputadora = f_acumularPuntos( puntosJugadores.length - 1, carta );
            f_crearCarta( carta, puntosJugadores.length - 1 );

        }while( (puntosComputadora < puntosJugador) && ( puntosJugador <=21 ) );

        f_determinarGanador();
    }


    // EVENTOS

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        f_acumularPuntos( 0, carta );
        f_crearCarta( carta, 0 );
        
        if ( puntosJugadores[0] > 21 ){
            f_turnoComputadora( puntosJugadores[0] );
            btnPedir.disabled = true;       // Inhabilita el boton
            btnDetener.disabled = true;
        } else if ( puntosJugadores[0] === 21 ){
            btnPedir.disabled = true;       // Inhabilita el boton
            btnDetener.disabled = true;
            f_turnoComputadora( puntosJugadores[0] );
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        f_turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener( 'click', () => {

        f_inicializarjuego();
        
    } );

    return {
        nuevoJuego: f_inicializarjuego,
    };

})()


