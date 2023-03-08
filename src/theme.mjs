/* eslint space-before-function-paren: 0 */

import { props, color1, color2, color3 } from './contants.mjs'

export function switchTheme() {
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
