import * as dom from './helpers/dom.js'
import bus from './helpers/bus.js'

export default function runningHead () {
  bus.on('scrolling:at', runningHandler)
  bus.on('running:section', renderSection)

  let sections = dom.findElements('.js-section')

  sections.map(function (section) {
    let node = section
    let position = section.offsetTop + section.offsetParent.offsetTop
    return {
      node: section,
      position: position
    }
  })

  let heads    = dom.findElements('.js-running-section')
  let current

  function closestToTop (sections) {

  }

  function runningHandler (pageYOffset) {

  }

  function getCurrentSection (sections) {

  }

  function renderSection (section) {
    heads.map(function(head) {

    })
  }
}
