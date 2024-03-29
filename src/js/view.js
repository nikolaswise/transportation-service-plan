import bus from './helpers/bus.js';
import * as classy from './helpers/classy.js';
import bindScroll from './helpers/scroll-to-anchor.js';

// import responsiveType from './responsive-type.js';

/**
 * Renders the HTML for a popup, given a click event on a leaflet feature and a popup template
 * Places rendered popip html in DOM Node with the 'js-pop-up' class.
 *
 * @param {Event} Leaflet feature click event
 * @param {Function} Render template function from `./layers.hs`
 */
const handlePopUp = (evt, renderTemplate) => {

  let popUpContainer = document.querySelector('.js-pop-up');
  let popUpTemplate = document.querySelector('.js-template');
  let buttons = popUpContainer.querySelectorAll('.js-multiple-popups')
  buttons.forEach(node => {
    console.log('remove plz?')
    node.remove()
  })
  console.log(popUpContainer.querySelectorAll('.js-multiple-popups'))

  classy.add(popUpContainer, 'is-active');
  evt.feature
    ? popUpTemplate.innerHTML = renderTemplate(evt.feature.properties)
    : popUpTemplate.innerHTML = renderTemplate(evt.features[0].properties)
  bindScroll(popUpTemplate)
};


const handlePopUpMultiple = (targets, template, layer) => {
  let popUpContainer = document.querySelector('.js-pop-up');
  let popUpTemplate = document.querySelector('.js-template');

  let buttons = popUpContainer.querySelectorAll('.js-multiple-popups')
  buttons.forEach(node => {
    node.remove()
  })

  popUpContainer.classList.add('has-multiple')
  console.log('make some buttons')
  popUpTemplate.insertAdjacentHTML('beforebegin', `
    <div class="popup-buttons js-multiple-popups" data-feature=${targets.length - 1}>
      <button class="js-prev-popup pt6">←</button>
      <button class="js-next-popup pt6"> →</button>
    </div>
  `)

  let popups = targets.map(target => template(target.feature.properties))
  let prev = popUpContainer.querySelector(`.js-prev-popup`)
  let next = popUpContainer.querySelector(`.js-next-popup`)
  let state = popUpContainer.querySelector(`.js-multiple-popups`)

  prev.addEventListener('click', e => {
    e.preventDefault()
    let current = parseInt(state.getAttribute(`data-feature`))
    let newState
    current - 1 < 0
      ? newState = targets.length - 1
      : newState = current - 1
    state.setAttribute(`data-feature`, newState)
    layer.features.resetStyle()
    popUpTemplate.innerHTML = popups[newState]
    targets[newState].setStyle({
      lineCap: 'round',
      weight: 24,
      color: '#98CBCC'
    })
  })

  next.addEventListener('click', e => {
    e.preventDefault()
    let current = parseInt(state.getAttribute(`data-feature`))
    let newState
    current + 1 > targets.length - 1
      ? newState = 0
      : newState = current + 1
    state.setAttribute(`data-feature`, newState)
    layer.features.resetStyle()
    popUpTemplate.innerHTML = popups[newState]
    targets[newState].setStyle({
      lineCap: 'round',
      weight: 24,
      color: '#98CBCC'
    })
  })
}

/**
 * Removes `is-active` class from pop node.
 * Emits event on bus.
 *
 * @param {Event} Leaflet feature click event
 * @param {Function} Render template function from `./layers.hs`
 */
const closePopUp = () => {
  let popUpContainer = document.querySelector('.js-pop-up');
  let buttons = popUpContainer.querySelectorAll('.js-multiple-popups')
  buttons.forEach(node => {
    node.remove()
  })
  classy.remove(popUpContainer, 'is-active');
  bus.emit('popup:closed');
};

/**
 * Adds panel view class to panel container DOM nodel
 *
 * @param {String} `map`, `text`, or `split`
 */
const setToPanel = panel => {
  let panelContainer = document.querySelector('.js-panels');
  if (classy.has(panelContainer, `text-is-active`)) {
    classy.remove(panelContainer, `text-is-active`);
  }
  if (classy.has(panelContainer, `map-is-active`)) {
    classy.remove(panelContainer, `map-is-active`);
  }
  if (classy.has(panelContainer, `split-is-active`)) {
    classy.remove(panelContainer, `split-is-active`);
  }
  classy.add(panelContainer, `${panel}-is-active`);
  if (panel === 'map' | panel === 'split') {
    // bus.emit('map:redraw');
    delayRedrawMap();
  }
  // responsiveType();
};

/**
 * Sets URL to reflect panel view.
 *
 * @param {String} `map`, `text`, or `split`
 */
const setLocation = panel => {
  if (panel === 'split') {
    panel = '/';
  }
  if (window.history.replaceState) {
    window.history.replaceState(null, null, panel);
  }
};

/**
 * Sets class on root HTML node that defines text size.
 *
 * @param {String} `small`, `medium`, or `large`
 */
const sizeTextTo = size => {
  let html = document.querySelector('html');
  if (classy.has(html, `type-small`)) {
    classy.remove(html, `type-small`);
  }
  if (classy.has(html, `type-medium`)) {
    classy.remove(html, `type-medium`);
  }
  if (classy.has(html, `type-large`)) {
    classy.remove(html, `type-large`);
  }
  classy.add(html, `type-${size}`);
};

/**
 * Shows or hides the layer control panel
 */
const toggleControl = () => {
  let controlPanel = document.querySelector('.js-layer-control-panel');
  let controlButton = document.querySelector('.js-layer-control');
  classy.toggle(controlPanel, 'is-active');
  classy.toggle(controlButton, 'is-active');
};

/**
 * Hides the layer control panel
 */
const closeControl = () => {
  // let controlPanel = document.querySelector('.js-layer-control-panel');
  // if (classy.has(controlPanel, 'is-active')) {
  //   classy.remove(controlPanel, 'is-active');
  // }
};

/**
 * Emits a map redraw event on the bus.
 */
const delayRedrawMap = () => {
  setTimeout(function() {
    bus.emit('map:redraw');
  }, 300);
};

const viewLoaded = () => {
  classy.remove(document.querySelector('html'), 'is-loading')
}

/**
 * Binds event listeners for view functions.
 */
export default function () {
  bus.on('set:view', setToPanel);
  bus.on('set:view', setLocation);
  // bus.on('set:view', delayRedrawMap);
  bus.on('layer:control', toggleControl);
  bus.on('keyboard:escape', closeControl);
  bus.on('keyboard:escape', closePopUp);
  bus.on('popup:opened', handlePopUp);
  bus.on('popup:nested', handlePopUpMultiple)
  bus.on('popup:close', closePopUp);
  bus.on('popup:leafletclosed', closePopUp);
  // bus.on('type:size', sizeTextTo);
  bus.on('routing:done', viewLoaded)
}
