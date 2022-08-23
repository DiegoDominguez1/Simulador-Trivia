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
const jugadoresStorage = JSON.parse(sessionStorage.getItem('jugadores'));
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
    divJugador.innerHTML = `<div id="jugadorBox"><p>${nombreJugador}</p></div>`;
    nombresJugadores.appendChild(divJugador)
    jugadores.push(jugador)
   
    form.reset()
})

let btn_finalizar = document.getElementById("btn-finalizar")
    btn_finalizar.addEventListener("click", () => {
    elegirJugadores.style.display = "none"
    cargarPreguntas.style.display = "flex"
    let mensajeTurno = document.getElementById("mensajeTurno")
    const elemento = document.createElement("div")
    elemento.innerHTML = `<h2>El turno es de ${jugadores[0].nombre}</h2>`;
    mensajeTurno.appendChild(elemento) 
    sessionStorage.setItem('jugadores', JSON.stringify(jugadores))
})


let pregunta = document.getElementById("pregunta")
let btn1 = document.getElementById("btn1")
let btn2 = document.getElementById("btn2")
let btn3 = document.getElementById("btn3")

function consultarApi(){
   fetch("https://the-trivia-api.com/api/questions")
        .then(response => response.json())
        .then(result => {
            console.log(result)
            arrayBotones = agregarPregunta(result)
            adivinarPregunta (result, arrayBotones)
            
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
    sumar = lista.puntos++;
    return sumar;
}    

function agregarPregunta(result){
    let arrayPregunta = [
        result[0].incorrectAnswers[0],
        result[0].incorrectAnswers[1],
        result[0].correctAnswer
    ]
    shuffle(arrayPregunta)
    pregunta.innerText = result[0].question
    btn1.innerText = arrayPregunta[0]
    btn2.innerText = arrayPregunta[1]
    btn3.innerText = arrayPregunta[2]
    return arrayPregunta
   
}
function adivinarPregunta (result, arr){
    btn1.addEventListener("click", () => { 
        if(arr[0] ==  result[0].correctAnswer){
            alert("Adivinaste")
            sumarPuntos(jugadores[0])
            console.log(jugadores)
        }else{
            alert("Incorrecto")
        }
    })
    btn2.addEventListener("click", () => { 
        if(arr[1] ==  result[0].correctAnswer){
            alert("Adivinaste")
            sumarPuntos(jugadores[0])
            console.log(jugadores)
        }else{
            alert("Incorrecto")
        }
    })
    btn3.addEventListener("click", () => { 
        if(arr[2] ==  result[0].correctAnswer){
            alert("Adivinaste")
            sumarPuntos(jugadores[0])
            console.log(jugadores)
        }else{
            alert("Incorrecto")
        }
    })
}
consultarApi()
verificarStorageJugadores()