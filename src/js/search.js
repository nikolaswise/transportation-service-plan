// Cool Helpers
import * as dom from './helpers/dom';
import * as classy from './helpers/classy';
import * as aria from './helpers/aria';
import * as event from './helpers/event';
import bus from './helpers/bus';
import highlighter from 'keyword-highlighter';

/**
 * Initializes drawer pattern and binds events.
 */
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

function getOffsetTop( elem )
{
    var offsetTop = 0;
    do {
      if ( !isNaN( elem.offsetTop ) )
      {
          offsetTop += elem.offsetTop;
      }
    } while( elem = elem.offsetParent );
    return offsetTop;
}

// this is prolly not so good
const indexContent = () => {
  window.content = []
  let contentArea = document.querySelector('.js-search-content')
  let headerOnes = dom.nodeListToArray(contentArea.getElementsByTagName('h1'))
  let headerTwos = dom.nodeListToArray(contentArea.getElementsByTagName('h2'))
  let headerThrees = dom.nodeListToArray(contentArea.getElementsByTagName('h3'))
  let headerFourss = dom.nodeListToArray(contentArea.getElementsByTagName('h4'))
  let headerFivess = dom.nodeListToArray(contentArea.getElementsByTagName('h5'))
  let headerSixess = dom.nodeListToArray(contentArea.getElementsByTagName('h6'))
  let paragraphs = dom.nodeListToArray(contentArea.getElementsByTagName('p'))
  window.content = window.content.concat(headerOnes)
  window.content = window.content.concat(headerTwos)
  window.content = window.content.concat(headerThrees)
  window.content = window.content.concat(headerFourss)
  window.content = window.content.concat(headerFivess)
  window.content = window.content.concat(headerSixess)
  window.content = window.content.concat(paragraphs)
}

const matchStringToNode = (node, string) => {
  if (!node.innerHTML) {
    return false
  }
  if (node.innerHTML.toLowerCase().includes(string)) {
    return true
  } else {
    return false
  }
}

const searchFor = term => {
  term = term.toLowerCase()
  let content = window.content.filter(node => {
    return matchStringToNode(node, term)
  })
  bus.emit('search:result', content.length, content, term)
}

const submit = e => {
  event.preventDefault(e);
  let input = dom.findElements('.js-search-input', e.target.parentNode)[0]
  let term = input.value
  bus.emit('search:for', term)
}
const cancel = e => {
  event.preventDefault(e);
  let input = dom.findElements('.js-search-input', e.target.parentNode)[0]
  input.value = ''
  bus.emit('search:cancel')
}


const bindSearch = () => {
  let submitBtns = dom.findElements('.js-search-submit')
  let cancelBtns = dom.findElements('.js-search-cancel')
  submitBtns.map((btn) => {
    event.add(btn, 'click', submit)
  })
  cancelBtns.map(btn => {
    event.add(btn, 'click', cancel)
  })
}

const showLoader = () => {
  let searchViews = dom.findElements('.js-search-loader')
  let hiddenViews = dom.findElements('.js-search-hide')
  let resultViews = dom.findElements('.js-search-results')
  hiddenViews.forEach(view => {
    classy.add(view, 'is-hidden')
  })
  searchViews.forEach(view => {
    classy.add(view, 'is-active')
  })
  resultViews.forEach(view => {
    classy.remove(view, 'is-active')
  })
}
const showResults = () => {
  let searchViews = dom.findElements('.js-search-loader')
  let hiddenViews = dom.findElements('.js-search-hide')
  let resultViews = dom.findElements('.js-search-results')
  hiddenViews.forEach(view => {
    classy.add(view, 'is-hidden')
  })
  searchViews.forEach(view => {
    classy.remove(view, 'is-active')
  })
  resultViews.forEach(view => {
    classy.add(view, 'is-active')
  })
}
const showOriginal = () => {
  let searchViews = dom.findElements('.js-search-loader')
  let hiddenViews = dom.findElements('.js-search-hide')
  let resultViews = dom.findElements('.js-search-results')
  hiddenViews.forEach(view => {
    classy.remove(view, 'is-hidden')
  })
  searchViews.forEach(view => {
    classy.remove(view, 'is-active')
  })
  resultViews.forEach(view => {
    classy.remove(view, 'is-active')
  })
}

window.scrollToPosition = function (position) {
  let contentArea = document.querySelector('.js-text-area')
  contentArea.scrollTop = position - 60;
}

const getClosestHeader = node => {
  let lastNode
  while (node.tagName[0] != 'H') {
    lastNode = node
    node = node.previousElementSibling
    if (!node) {
      node = lastNode.parentNode
    }
  }
  return node.innerHTML
}

const loadResults = function (count, results, term) {
  let resultsDiv = dom.findElements('.js-search-results')
  let contentArea = document.querySelector('.js-search-content')
  resultsDiv.map(div => {
    div.innerHTML = `
      <h6 class="search-result-summary">${count} results for '${term}'</h6>
    `
    results.map(result => {
      let section = getClosestHeader(result)
      let nodePos = getOffsetTop(result)
      let preview = result.innerHTML
      let highlighted = highlighter(term, preview)
      console.log(highlighted)
      div.insertAdjacentHTML('beforeend', `
        <a class="search-result" onclick="scrollToPosition(${nodePos})">
          <h6 class="search-result-header">${section}</h6>
          <p class="search-result-preview">${highlighted}</p>
        </a>
      `)
    })
  })
  bus.emit('search:render')
}

function search () {
  bus.on('search:index', indexContent);
  bus.on('search:bind', bindSearch);
  bus.on('search:for', showLoader);
  bus.on('search:render', showResults)
  bus.on('search:cancel', showOriginal)
  bus.on('search:for', searchFor);
  bus.on('search:result', loadResults);

  bus.emit('search:index');
  bus.emit('search:bind');
}

export default search;
