import getOffsetTop from './get-offset-top';
import scrollTo from './scroll-to'

const bind = () => {
  let contentArea = document.querySelector('.js-text-area')
  let anchors = Array(...document.querySelectorAll('a'))
  let internals = anchors.filter(a => a.attributes.href.value.charAt(0) == '#')
  internals.forEach(a => {
    let id = a.attributes.href.value
    a.addEventListener('click', e => {
      e.preventDefault()
      console.log(id)
      let node = document.querySelector(id)
      let position = getOffsetTop(node) - 60
      scrollTo(contentArea, position)
    })
  })
}

export default bind