import acronym from './classifications.js'

/**
 * Composes an HTML pop-up template that is displayed on feature clicks.
 * This one is for the Street classification layers, where the user wishes
 * to see current classification, and proposed classification.
 *
 * @param {String} The column in the GIS layer that maps to current classification.
 * @param {String} The column in the GIS layer that maps to proposed classification.
 * @returns {String} The rendered HTML string for the popup.
 */

export default function (current, acr) {
  return function (feature) {

    console.log(feature)
    console.log(current)
    return `
      <h5 class="flush-top">
        ${current} District
      </h5>
      <table class="flush-bottom lead-top">
        <tbody>
          <tr>
            <td>${current} Class:</td>
            <td><a href="#${acronym[current][acr].replace(/ /g, '-').toLowerCase()}">${acr}</a></td>
          </tr>
        </tbody>
      </table>
    `;
  };
}
