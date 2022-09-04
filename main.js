let btn_empezar = document.getElementById("btn-empezar")
let sectionIntro = document.getElementById("sectionIntro")
let sectionElegirJugadores = document.getElementById("elegirJugadores")

btn_empezar.addEventListener("click", () => {
    sectionIntro.style.display = "none"
    sectionElegirJugadores.style.display = "flex"
})

class Persona{
    constructor(nombre, puntos,turnos){
        this.nombre = nombre;
        this.puntos = puntos;
        this.turnos = turnos;
    }
}
//VERIFICAR STORAGE
const jugadoresStorage = JSON.parse(sessionStorage.getItem('jugadores'))
const verificarStorageJugadores = () => {
    console.log(jugadoresStorage)
    if (jugadoresStorage !== null) {
     console.log(jugadoresStorage)
     } 
}
//CARGAR JUGADORES
let form = document.getElementById("form")
let turno = 0
let nombresJugadores = document.getElementById("nombresJugadores")
let jugadores = []

form.addEventListener("submit", function(e){
    e.preventDefault()
    let nombreJugador = document.querySelector("#input").value
    let jugador = new Persona(nombreJugador, 0, turno++)
    const divJugador = document.createElement("div")
    divJugador.innerHTML = `<div id="jugadorBox"><p>${nombreJugador}</p></div>`
    nombresJugadores.appendChild(divJugador)
    jugadores.push(jugador)
   
    form.reset()
})

let mensajeTurno = document.getElementById("mensajeTurno")    
function jugadorturno(turnoJ){
    const elemento = document.createElement("div")
    elemento.innerHTML = `<h2>El turno es de ${jugadores[turnoJ].nombre}</h2>`
    mensajeTurno.appendChild(elemento) 
    sessionStorage.setItem('jugadores', JSON.stringify(jugadores))
}

let siguiente = 0
let btn_finalizar = document.getElementById("btn-finalizar")
    btn_finalizar.addEventListener("click", () => {
    elegirJugadores.style.display = "none"
    cargarPreguntas.style.display = "flex"
    jugadorturno(siguiente)
})

let pregunta = document.getElementById("pregunta")
let btn1 = document.getElementById("btn1")
let btn2 = document.getElementById("btn2")
let btn3 = document.getElementById("btn3")

let resultado
function consultarApi(){
    fetch("https://the-trivia-api.com/api/questions")
    .then(response => response.json())
    .then(result => {
        console.log(result)
        arrayBotones = agregarPregunta(result,posicion)
        console.log(arrayBotones)
        resultado = result 
    })
    .catch(error => console.log(error))
}

//ALGORITMO FISHER-YATES
function shuffle(arr) {
    var i,
    j,
    temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;    
};

function sumarPuntos(lista){
    sumar = lista.puntos++
    return sumar;
}

function agregarPregunta(result, posicion){
    let arrayPregunta = [
        result[posicion].incorrectAnswers[0],
        result[posicion].incorrectAnswers[1],
        result[posicion].correctAnswer
    ]
    shuffle(arrayPregunta)
    pregunta.innerText = result[posicion].question
    btn1.innerText = arrayPregunta[0]
    btn2.innerText = arrayPregunta[1]
    btn3.innerText = arrayPregunta[2]
    return arrayPregunta
}

let respuesta
let posicion = 0
let cantidadPreguntas = 0
function logicaBtn(nroBtn,turno){
    if(arrayBotones[nroBtn] === resultado[posicion].correctAnswer){
        swal("Crack!","Tu respuesta es correcta!", "success")
        posicion++
        sumarPuntos(jugadores[turno])
        cantidadPreguntas++
        if(cantidadPreguntas == 3){
            siguienteJugador()
        }else{
            arrayBotones = agregarPregunta(resultado,posicion)
            console.log(arrayBotones) 
        }
        respuesta = true 
    }else{
        swal("Mal ahí!", "Tu respuesta es incorrecta!", "error")
        posicion++
        cantidadPreguntas++
        if(cantidadPreguntas == 3){
            siguienteJugador()
        }else{
            arrayBotones = agregarPregunta(resultado,posicion)
            console.log(arrayBotones)
        }
        respuesta = false
    }
}   
function siguienteJugador(){
    swal("Tú turno terminó","Siguiente jugador", "info")
        siguiente++
        consultarApi()
        posicion = 0 
        cantidadPreguntas = 0
        sessionStorage.setItem('jugadores', JSON.stringify(jugadores))
}
function pintar(btn){
    respuesta?btn.style.background = "green":btn.style.background = "red"
}

function reiniciar(btn){
    setTimeout(() => {
        btn.style.background = "white"
    }, 1000);
}

    btn1.addEventListener("click", () => { 
        logicaBtn(0,siguiente)
        pintar(btn1)
        reiniciar(btn1)
    })
    btn2.addEventListener("click", () => { 
        logicaBtn(1,siguiente)
        pintar(btn2)
        reiniciar(btn2)
    })
    btn3.addEventListener("click", () => { 
        logicaBtn(2,siguiente)
        pintar(btn3)
        reiniciar(btn3)
    })


// sessionStorage.setItem('jugadores', JSON.stringify(jugadores))
consultarApi()
verificarStorageJugadores()

