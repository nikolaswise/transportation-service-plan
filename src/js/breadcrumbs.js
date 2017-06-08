// Cool Helpers
import * as dom from './helpers/dom';
import * as classy from './helpers/classy';
import * as aria from './helpers/aria';
import * as event from './helpers/event';
import bus from './helpers/bus';

import scrollMonitor from 'scrollmonitor'

let crumbZone = document.querySelector('.js-breadcrumbs')

const draw = crumb => {
  let html = `
    <span class="pt8 nav-top-link">></span>
    <a href='#${crumb.id}' class="crumb nav-top-link pt10">
      ${crumb.innerHTML}
    </a>
  `
  crumbZone.innerHTML = ''
  crumbZone.insertAdjacentHTML('beforeend', html)
}

const breadcrumbs = () => {
  bus.on('breadscrumbs:active', draw)
}

export default breadcrumbs
