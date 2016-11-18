import * as classy from './helpers/classy.js'

export default function () {
  let body = document.querySelector('body')
  classy.add(body, 'js-is-active')
  classy.add(body, 'split-screen')
}