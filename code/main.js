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
        }
    }
    // console.log("primer log", logs)
}


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