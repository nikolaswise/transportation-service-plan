// Cool Helpers
import * as dom from './helpers/dom';
import * as classy from './helpers/classy';
import * as aria from './helpers/aria';
import * as event from './helpers/event';
import bus from './helpers/bus';

import scrollMonitor from 'scrollmonitor'

let contentArea = document.querySelector('.js-text-area')
let headerOnes = dom.nodeListToArray(contentArea.getElementsByTagName('h1'))
let nubContainer = document.querySelector('.js-chapter-nubs')
let nubList = document.querySelector('.js-nub-list')
let containerMonitor = scrollMonitor.createContainer(contentArea);

let watchers = {}

const bindWatchers = () => {
  headerOnes.forEach(header => {
    watchers[header.id] = containerMonitor.create(header);
    watchers[header.id].enterViewport(function() {
      bus.emit('nubs:active', header.id)
      bus.emit('breadscrumbs:active', header)
    });
  })
}

const renderNub = nub => {
  return `
    <li>
      <a href="#${nub.href}"
         data-nub="${nub.href}"
         class="nub
                js-nub
                tooltip tooltip-right"
         aria-label="${nub.text}">
      </a>
    </li>
  `
}

const drawNubs = () => {
  let headerOnes = dom.nodeListToArray(contentArea.getElementsByTagName('h1'))
  let nubs = headerOnes.map(header => {
    return {
      href: header.id,
      text: header.innerHTML
    }
  })
  nubs.forEach(nub => {
    let html = renderNub(nub)
    nubList.insertAdjacentHTML('beforeend', html)
  })
  bus.emit('nubs:active', 'top');
}

const setActiveNub = id => {
  let nubs = dom.nodeListToArray(nubList.querySelectorAll('.js-nub'))
  nubs.forEach(nub => {
    classy.remove(nub, 'is-active')
    if (nub.getAttribute('data-nub') === id) {
      classy.add(nub, 'is-active')
    }
  })
}

const nubs = () => {
  bus.on('nubs:draw', drawNubs)
  bus.on('nubs:draw', bindWatchers)
  bus.on('nubs:active', setActiveNub)

  bus.emit('nubs:draw')
}

export default nubs;
