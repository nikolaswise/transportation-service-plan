import bus from './helpers/bus';
import * as classy from './helpers/classy';

const close = () => {
  let nodes = Array(...document.querySelectorAll('.toc ul li ul'))
  let moreNodes = Array(...document.querySelectorAll('.toc ul'))
  nodes.forEach(node => {
    if (classy.has(node, 'is-active')) {
      classy.remove(node, 'is-active')
    }
  })
  moreNodes.forEach(node => {
    if (classy.has(node, 'is-active')) {
      classy.remove(node, 'is-active')
    }
  })
}

const toggle = node => {
  let target = node.querySelector('ul')
  classy.toggle(target, 'is-active')
}

const bind = () => {
  let links = Array(...document.querySelectorAll('.toc a'))
  links.forEach(link => {
    link.addEventListener('click', e => {
      let parent = e.target.parentNode
      let grandpappy = parent.parentNode.parentNode
      bus.emit('toc:toggle', parent)
      bus.emit('toc:toggle', grandpappy)
    })
  })
  let backs = Array(...document.querySelectorAll('.toc ul li ul'))
  backs.forEach(back => {
    back.addEventListener('click', e => {
      bus.emit('toc:close')
    })
  })
}


const listen = () => {
  bus.on('toc:bind', bind)
  bus.on('toc:toggle', toggle)
  bus.on('toc:close', close)
  bus.on('keyboard:escape', close)
  bus.on('drawer:close', close)
  bus.on('keyboard:arrow:left', close)
  bus.emit('toc:bind')
}

export default listen