// ===== Variables =====

let pad = document.getElementById("keyPad")
let screen = document.getElementById("screen")
let screenValue = 0

let logs = {
    record0: "",
    record1: "",
    record2: "",
    accion: ""
}

// ===== Event Listeners =====


pad.addEventListener("click", show)


// ===== Functions =====


// Funcion inicial y validacion de tipo de boton presionado
function show(event) {
    if (event.target.dataset.value !== undefined) {
        
        event.target.classList.toggle("click")
        setTimeout(function ()  {
            event.target.classList.toggle("click")
        }.bind(event), 100)


        if (screen.dataset.initial === "true" 
            && event.target.dataset.type === "num") {
                screen.dataset.initial = "false"
                screen.innerHTML = `${logs.record0}${event.target.dataset.value}`
                logs.record0 = `${logs.record0}${event.target.dataset.value}`
        } else if (event.target.dataset.type === "num" 
            || event.target.dataset.type === "dot") {
                calculate(event.target)
        } else {
            action(event.target)
        }
    }
    // console.log("primer log", logs)
}



// Casos de numeros y dot
function calculate(event) {

    if (event.dataset.type === "num") {
        screenValue = `${logs.record0}${event.dataset.value}`
        screen.innerHTML = screenValue
        logs.record0 = screenValue


    } else if (event.dataset.type === "dot" 
        && !logs.record0.includes(".")) {
            screenValue = logs.record0 + "."
            screen.innerHTML = screenValue
            logs.record0 = screenValue
    } 
    // console.log("segundo log", logs)
}

// Casos de botones de action

function action(event) {

    if (event.dataset.type === "action") {
        console.log("este valor es = ", event.dataset.value)
    } else {
        // console.log("estos son especiales: ", event.dataset.value)
        del()
    }
}

function del() {
    logs.record0 = logs.record0.slice(0, (logs.record0.length - 1))
    screen.innerHTML = logs.record0
}

/* puedo usar logs.record0.length = 0 para hacer que se resetee  */