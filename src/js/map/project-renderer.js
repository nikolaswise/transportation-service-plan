const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

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
        ${feature.ProjectName}
      </h5>
      <p> ${feature.ProjectDescription} </p>
      <table class="lead-bottom lead-top">
        <tbody>
          <tr>
            <td>Status</td>
            <td>${feature.ProjectStatus}</td>
          </tr>
          <tr>
            <td>Lead Agency</td>
            <td>${feature.LeadAgency}</td>
          </tr>
          <tr>
            <td>Estimated Cost</td>
            <td>$${numberWithCommas(feature.EstimatedCost)}</td>
          </tr>
          <tr>
            <td>Estimated Time Frame</td>
            <td>${feature.EstimatedTimeframe}</td>
          </tr>
        </tbody>
      </table>
    `;
  };
}
