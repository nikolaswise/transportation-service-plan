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

export default function (current, proposed) {
  console.log(current, proposed)
  return function (feature) {
    console.debug(`feature:`, feature)
    console.debug(`current:`, current)
    return `
      <h5 class="flush-top">
        ${feature.StreetName}
      </h5>
      <table class="flush-bottom lead-top">
        <tbody>
          <tr>
            <td>${current} Class:</td>
            <td><a href="#${acronym[current][feature[current]].replace(/ /g, '-').toLowerCase()}">${feature[current]}</a></td>
          </tr>
        </tbody>
      </table>
      <p class="lead-top">
        <b>${feature[current]}:</b>
        <a href="#${acronym[current][feature[current]].replace(/ /g, '-').toLowerCase()}">${acronym[current][feature[current]]}</a>
      </p>
    `;
  };
}
