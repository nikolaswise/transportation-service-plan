import bus from './helpers/bus.js';
import * as classy from './helpers/classy.js';
import * as map from './map/map.js';
import render from './map/popup-template.js';

export default function () {
  bus.on('set:view', setToPanel);
  bus.on('set:view', setLocation);
  bus.on('set:view', slowRedrawMap);
  bus.on('layer:control', toggleControl);
  bus.on('keyboard:escape', closeControl);
  bus.on('keyboard:escape', closePopUp);
  bus.on('layers:draw', drawMapLayers);
  bus.on('popup:opened', handlePopUp);
  // bus.on('popup:opened', closeControl);
  bus.on('popup:opened', map.zoomToFeature);
  bus.on('popup:close', closePopUp);
  bus.on('popup:leafletclosed', closePopUp);
  bus.on('type:size', sizeTextTo);


  // none of this garbage needs to be inside this function. functions can get hoisted outside,
  // the default export function would just call the bus bindings. Just like the intent will! wow!
  let panelContainer = document.querySelector('.js-panels');
  let controlPanel = document.querySelector('.js-layer-control-panel');
  let controlButton = document.querySelector('.js-layer-control');
  let popUpContainer = document.querySelector('.js-pop-up');
  let popUpTemplate = document.querySelector('.js-template');

  function handlePopUp (evt, renderTemplate) {
    classy.add(popUpContainer, 'is-active');
    popUpTemplate.innerHTML = renderTemplate(evt.feature.properties);
  }

  function closePopUp () {
    map.closeAllPopUps();
    classy.remove(popUpContainer, 'is-active');
  }

  function setToPanel (panel) {
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
  }

  // this might beed to be a little better about hashes
  function setLocation (panel) {
    if (panel === 'split') {
      panel = '/';
    }
    if (window.history.replaceState) {
      window.history.replaceState(null, null, panel);
    }
  }

  function sizeTextTo (size) {
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
  }

  function toggleControl () {
    classy.toggle(controlPanel, 'is-active');
    classy.toggle(controlButton, 'is-active');
  }

  function closeControl () {
    if (classy.has(controlPanel, 'is-active')) {
      classy.remove(controlPanel, 'is-active');
    }
  }

  function drawMapLayers () {
    map.drawLayers();
  }

  function slowRedrawMap () {
    window.setTimeout(map.redraw, 300);
  }
}
