/* eslint space-before-function-paren: 0 */

// ===== Variables =====

const pad = document.getElementById('keyPad')
const screen = document.getElementById('screen')
const screenInfo = document.getElementById('screen--data')
const scrollTheme = document.getElementById('themeSwitch')
let screenValue = 0

const logs = {
  record0: '',
  record1: '',
  action: '',
  status: ''
}

const props = {
  mainBg: '--main--background',
  screenBg: '--screen--background',
  keypadBg: '--keypad--background',

  specialBg: '--special--background',
  specialShadow: '--special--shadow',

  equalBg: '--equal--key--background',
  equalShadow: '--equal--shadow',

  buttonBg: '--buttons--background',
  buttonShadow: '--buttons--shadow',

  numButtonText: '--num--text--buttons',
  noPadText: '--nopad--text--color',
  padText: '--pad--text--color'
}

const color1 = {
  mainBgColor: 'hsl(222, 26%, 31%)',
  screenBgColor: 'hsl(224, 36%, 15%)',
  keypadBgColor: 'hsl(223, 31%, 20%)',

  specialBgColor: 'hsl(225, 21%, 49%)',
  specialShadowColor: 'hsl(224, 28%, 35%)',

  equalBgColor: 'hsl(6, 63%, 50%)',
  equalShadowColor: 'hsl(6, 70%, 34%)',

  buttonBgColor: 'hsl(30, 25%, 89%)',
  buttonShadowColor: 'hsl(28, 16%, 65%)',

  numButtonTextColor: 'hsl(0, 0, 100%)',

  noPadTextColor: 'rgb(255, 255, 255)',

  padTextColor: 'rgb(255, 255, 255)'

}

const color2 = {
  mainBgColor: 'hsl(0, 0%, 90%)',
  screenBgColor: 'hsl(0, 0%, 93%)',
  keypadBgColor: 'hsl(0, 5%, 81%)',

  specialBgColor: 'hsl(185, 42%, 37%)',
  specialShadowColor: 'hsl(185, 58%, 25%)',

  equalBgColor: 'hsl(25, 98%, 40%)',
  equalShadowColor: 'hsl(25, 99%, 27%)',

  buttonBgColor: 'hsl(45, 7%, 89%)',
  buttonShadowColor: 'hsl(35, 11%, 61%)',

  numButtonTextColor: 'hsl(0, 0, 100%)',
  noPadTextColor: 'hsl(0, 0, 100%)',
  padTextColor: 'rgb(255, 255, 255)'
}

const color3 = {
  mainBgColor: 'hsl(268, 75%, 9%)',
  screenBgColor: 'hsl(268, 71%, 12%)',
  keypadBgColor: 'hsl(268, 71%, 12%)',

  specialBgColor: 'hsl(281, 89%, 26%)',
  specialShadowColor: 'hsl(285, 91%, 52%)',

  equalBgColor: 'hsl(176, 100%, 44%)',
  equalShadowColor: 'hsl(177, 92%, 70%)',

  buttonBgColor: 'hsl(268, 47%, 21%)',
  buttonShadowColor: 'hsl(290, 70%, 36%)',

  numButtonTextColor: 'hsl(52, 100%, 62%)',
  noPadTextColor: 'hsl(52, 100%, 62%)',
  padTextColor: 'rgb(255, 255, 255)'
}

// ===== Event Listeners =====

pad.addEventListener('click', press)
scrollTheme.addEventListener('change', switchTheme)

// ===== Functions =====

function press(event) {
  if (event.target.dataset.value !== undefined) {
    event.target.classList.toggle('click')
    setTimeout(function () {
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
    screenValue = `${logs.record0}${event.dataset.value}`
    screen.innerHTML = screenValue
    logs.record0 = screenValue
    screenInfo.innerHTML = `${logs.record0}`
  } else if (event.dataset.type === 'dot' &&
    !logs.record0.includes('.')) {
    screenValue = logs.record0 + '.'
    screen.innerHTML = screenValue
    screenInfo.innerHTML = `${logs.record0 + '.'}`
    logs.record0 = screenValue
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

  if (logs.record1 !== '') {
    equal()
  } else {
    logs.record1 = logs.record0
    logs.record0 = ''
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
  logs.record0 = logs.record0.slice(0, (logs.record0.length - 1))
  screen.innerHTML = logs.record0
  screenInfo.innerHTML = `${logs.record0}`
}

function reset(preserve = true) {
  logs.record1 = ''
  logs.action = ''
  if (preserve) {
    logs.record0 = ''
    screen.innerHTML = '0'
    screenInfo.innerHTML = ''
  }
}

function equal() {
  if (logs.record1 === '') logs.record1 = 0
  const num0 = Number(logs.record0)
  const num1 = Number(logs.record1)

  const calc = `${num1} ${logs.action} ${num0}`

  switch (logs.action) {
    case '+':
      logs.record0 = num1 + num0
      logs.status = 'ok'
      break
    case '-':
      logs.record0 = num1 - num0
      logs.status = 'ok'
      break
    case '/':
      divide(num0, num1)
      break
    case 'x':
      logs.record0 = (num1 * num0).toFixed(0)
      logs.status = 'ok'
      break
    default:
      logs.status = 'invalid'
  }
  if (logs.status === 'ok') {
    numCheck()

    screenInfo.innerHTML = `${calc} = ${logs.record0}`
    screen.innerHTML = `${logs.record0}`
    reset(false)
  } else {
    reset()
    screen.innerHTML = 'Syntax Error'
  }
}

function divide(num0, num1) {
  if (logs.record0 !== '0') {
    logs.record0 = num1 / num0
    logs.status = 'ok'
  } else {
    logs.status = 'invalid'
  }
}

function numCheck() {
  const result = (Number(logs.record0) - Math.floor(Number(logs.record0)))
  result !== 0
    ? logs.record0 = Number(logs.record0).toFixed(2)
    : logs.record0 = Number(logs.record0).toFixed(0)
}

// Comenzar con los themes

// ===== Themes =====

function switchTheme() {
  if (this.value === '1') theme(color1)
  if (this.value === '2') theme(color2)
  if (this.value === '3') theme(color3)
}

function theme(val) {
  for (const el in props) {
    const position = `${el}Color`
    const col = val[position]
    document.body.style.setProperty(props[el], col)
  }

  if (val === color3) {
    document.getElementsByClassName('equal--button')[0]
      .style.color = 'hsl(198, 20%, 13%)'
  }
}
