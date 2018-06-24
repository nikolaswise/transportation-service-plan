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
  return function (feature) {
    return `
      <h5 class="flush-top">
        ${feature.StreetName}
      </h5>
      <table class="flush-bottom lead-top">
        <tbody>
          <tr>
            <td>${current} Class:</td>
            <td>${feature[current]}</td>
          </tr>
        </tbody>
      </table>
      <p class="lead-bottom">
        <b>${feature[current]}:</b>
        ${acronym[feature[current]]}
      </p>

      <p>Transportation Plan ID: <a href="#">${feature.TranPlanID}</a></p>
    `;
  };
}
