// ===== Variables =====

let pad = document.getElementById("keyPad")
let screen = document.getElementById("screen")
let screenInfo = document.getElementById("screen--data")
let screenValue = 0

let logs = {
    record0: "",
    record1: "",
    action: "",
    status: ""
}

// ===== Event Listeners =====


pad.addEventListener("click", press)


// ===== Functions =====


function press(event) {
    if (event.target.dataset.value !== undefined) {
        event.target.classList.toggle("click")
        setTimeout(function ()  {
            event.target.classList.toggle("click")
        }.bind(event), 100)
    }
    if (event.target.dataset.type === "num" 
        || event.target.dataset.type === "dot") {
            calculate(event.target)
    } else {
        otherKeys(event.target)
    }

}


// Casos de numeros y dot
function calculate(event) {

    if (event.dataset.type === "num") {
        screenValue = `${logs.record0}${event.dataset.value}`
        screen.innerHTML = screenValue
        logs.record0 = screenValue
        screenInfo.innerHTML = `${logs.record0}`


    } else if (event.dataset.type === "dot" 
        && !logs.record0.includes(".")) {
            screenValue = logs.record0 + "."
            screen.innerHTML = screenValue
            screenInfo.innerHTML = `${logs.record0 + "."}`
            logs.record0 = screenValue
    }
}


// Casos de botones NO numericos
function otherKeys(event) {
    (event.dataset.type === "action") 
        ? actionButtons(event)
        : specialButtons(event)
}


function actionButtons(event) {
    logs.action = event.dataset.value
    
    if (logs.record1 !== "") {
        equal()
    } else {
        logs.record1 = logs.record0
        logs.record0 = ""
    }
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
            equal()
    }
}


function del() {
    logs.record0 = logs.record0.slice(0, (logs.record0.length - 1))
    screen.innerHTML = logs.record0
    screenInfo.innerHTML = `${logs.record0}`
}


function reset() {
    logs.record0 = ""
    logs.record1 = ""
    logs.action = ""
    screen.innerHTML = ""
    screenInfo.innerHTML = ''
    screen.dataset.initial = "true"
}


function equal() {

    let num0 = Number(logs.record0)
    let num1 = Number(logs.record1)

    let calc = `${logs.record1} ${logs.action} ${logs.record0}`

    switch (logs.action) {
        case "+": 
            logs.record0 = num1 + num0
            logs.status = "ok"
            break
        case "-":
            logs.record0 = num1 - num0
            logs.status = "ok"
            break
        case "/":
            divide(num0, num1)
            break
        case "x":
            logs.record0 = (num1 * num0).toFixed(0)
            logs.status = "ok"
    }
    if (logs.status === "ok") {
        if (Number(logs.record0) < 0) logs.record0.toFixed(2)
        screenInfo.innerHTML = `${calc} = ${logs.record0}`
        screen.innerHTML = `${logs.record0}`
        logs.record1 = ""
    } else {
        screenInfo.innerHTML = ""
        screen.innerHTML = "Syntax Error"
    }
}

function divide(num0, num1) {
    console.log(logs.record0 !== "0")
    if (logs.record0 !== "0") {
        logs.record0 = num1 / num0
        logs.status = "ok"        
    } else {
        logs.status = "invalid"
    }
}
