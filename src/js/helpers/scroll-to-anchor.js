import scrollTo from './scroll-to'

const scrollToAnchor = anchor => {
  let node = document.querySelector(anchor)
  console.log(node.scrollTop)
}

export default scrollToAnchor