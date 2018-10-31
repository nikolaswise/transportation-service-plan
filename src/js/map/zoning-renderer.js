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
    console.log(feature)
    return `
      <h5 class="flush-top">
        ${feature.CMP}
      </h5>
      <p class="flush-bottom">
        <b>Zone:</b>
        ${feature.CMP_DESC}
      </p>
      <p>
        <b>Overlay:</b>
        ${feature.OVRLY_DESC || 'None'}
      </p>
      <p class="lead-bottom">

      </p>
    `;
  };
}
