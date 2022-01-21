// ===== Variables =====

let pad = document.getElementById("keyPad")
let screen = document.getElementById("screen")
let screenValue = 0

let logs = {
    record0: "",
    record1: "",
    record2: "",
    action: ""
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
            otherKeys(event.target)
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


// Casos de botones NO numericos
function otherKeys(event) {
    (event.dataset.type === "action") 
        ? actionButtons(event)
        : specialButtons(event)
}

function actionButtons(event) {
    switch(event.dataset.value) {
        case "+":
            sum()
            break
        case "-":
            minus()
            break
        case "/":
            divide()
            break
        case "x":
            multiply()
    }
}

function sum() {
    logs.record1 =  Number(logs.record1) + Number(logs.record0)
    logs.record0 = ""
    screen.innerHTML = "+"
    console.log(logs)
}

function minus() {
    (logs.record1 === "")
     ? logs.record1 =  Number(logs.record0)
     : logs.record1 =  Number(logs.record1) - Number(logs.record0)
    logs.record0 = ""
    screen.innerHTML = "-"
    console.log(logs)
}

function divide() {
     if (logs.record1 === "") {
        logs.record1 =  Number(logs.record0)
    } else if (logs.record0 !== "") {
        logs.record1 =  Number(logs.record1) / Number(logs.record0)
    }
    logs.record0 = ""
    screen.innerHTML = "/"
    console.log(logs)
}

function specialButtons(event) {
    switch(event.dataset.value) {
        case "del":
            del()
            break
        case "reset":
            reset()
            break
        case "equal":
            console.log("equal")
            break
    }
}


function del() {
    logs.record0 = logs.record0.slice(0, (logs.record0.length - 1))
    screen.innerHTML = logs.record0
}


function reset() {
    logs.record0 = ""
    logs.record1 = ""
    logs.record2 = ""
    logs.action = ""
    screen.innerHTML = logs.record0
}