/* eslint space-before-function-paren: 0 */

import { logs } from './contants.mjs'
import { switchTheme } from './theme.mjs'

// ===== Variables =====

const pad = document.getElementById('keyPad')
const screen = document.getElementById('screen')
const screenInfo = document.getElementById('screen--data')
const scrollTheme = document.getElementById('themeSwitch')

let screenValue = 0

// ===== Event Listeners =====

pad.addEventListener('click', pressEvent)
scrollTheme.addEventListener('change', switchTheme)

// ===== Functions =====

function pressEvent(event) {
  if (event.target.dataset.value !== undefined) {
    event.target.classList.toggle('click')
    setTimeout(() => {
      event.target.classList.toggle('click')
    }, 100)
  }
  if (event.target.dataset.type === 'num' ||
    event.target.dataset.type === 'dot') {
    calculate(event.target)
  } else {
    otherKeys(event.target)
  }
}

// Casos de numeros y dot
function calculate(event) {
  if (event.dataset.type === 'num') {
    screenValue = `${logs.firstValue}${event.dataset.value}`
    screen.innerHTML = screenValue
    logs.firstValue = screenValue
    screenInfo.innerHTML = `${logs.firstValue}`
  } else if (event.dataset.type === 'dot' &&
    !logs.firstValue.includes('.')) {
    screenValue = logs.firstValue + '.'
    screen.innerHTML = screenValue
    screenInfo.innerHTML = `${logs.firstValue + '.'}`
    logs.firstValue = screenValue
  }
}

// Casos de botones NO numericos
function otherKeys(event) {
  (event.dataset.type === 'action')
    ? actionButtons(event)
    : specialButtons(event)
}

function actionButtons(event) {
  logs.action = event.dataset.value

  if (logs.secondValue !== '') {
    equal()
  } else {
    logs.secondValue = logs.firstValue
    logs.firstValue = ''
  }
}

function specialButtons(event) {
  switch (event.dataset.value) {
    case 'del':
      del()
      break
    case 'reset':
      reset()
      break
    case 'equal':
      equal()
  }
}

function del() {
  if (logs.firstValue === '0' || logs.firstValue === '') return
  logs.firstValue = logs.firstValue.slice(0, (logs.firstValue.length - 1))
  screen.innerHTML = logs.firstValue === '' ? 0 : logs.firstValue
  screenInfo.innerHTML = `${logs.firstValue}`
}

function reset(preserve = true) {
  logs.secondValue = ''
  logs.action = ''
  if (preserve) {
    logs.firstValue = ''
    screen.innerHTML = '0'
    screenInfo.innerHTML = ''
  }
}

function equal() {
  if (logs.secondValue === '') logs.secondValue = 0
  const num0 = Number(logs.firstValue)
  const num1 = Number(logs.secondValue)

  const calc = `${num1} ${logs.action} ${num0}`

  switch (logs.action) {
    case '+':
      logs.firstValue = num1 + num0
      logs.status = 'ok'
      break
    case '-':
      logs.firstValue = num1 - num0
      logs.status = 'ok'
      break
    case '/':
      divide(num0, num1)
      break
    case 'x':
      logs.firstValue = (num1 * num0).toFixed(0)
      logs.status = 'ok'
      break
    default:
      logs.status = 'invalid'
  }
  if (logs.status === 'ok') {
    numCheck()

    screenInfo.innerHTML = `${calc} = ${logs.firstValue}`
    screen.innerHTML = `${logs.firstValue}`
    reset(false)
  } else {
    reset()
    screen.innerHTML = 'Syntax Error'
  }
}

function divide(num0, num1) {
  if (logs.firstValue !== '0') {
    logs.firstValue = num1 / num0
    logs.status = 'ok'
  } else {
    logs.status = 'invalid'
  }
}

function numCheck() {
  const result = (Number(logs.firstValue) - Math.floor(Number(logs.firstValue)))
  result !== 0
    ? logs.firstValue = Number(logs.firstValue).toFixed(2)
    : logs.firstValue = Number(logs.firstValue).toFixed(0)
}
