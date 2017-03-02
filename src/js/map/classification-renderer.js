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
      <table class="lead-bottom lead-top">
        <tbody>
          <tr>
            <td>Current Classification:</td>
            <td>${feature[current]}</td>
          </tr>
          <tr>
            <td>Proposed Classification:</td>
            <td>${feature[proposed]}</td>
          </tr>
        </tbody>
      </table>
      <p class="flush-bottom"><b>${feature[current]}:</b></p>
      <p>What does that mean do you thing?</p>

      <p class="flush-bottom"><b>${feature[proposed]}:</b></p>
      <p>What does that mean do you thing?</p>

      <p>Transportation Plan ID: <a href="#">${feature.TranPlanID}</a></p>
    `;
  };
}
