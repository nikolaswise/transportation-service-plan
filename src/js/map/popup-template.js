export default function (feature) {
  return `
    <h5 class="flush-top">
      ${feature.StreetName}
    </h5>
    <table class="lead-bottom lead-top">
      <tbody>
        <tr>
          <td>Current Classification:</td>
          <td>${feature.Design}</td>
        </tr>
        <tr>
          <td>Proposed Classification:</td>
          <td>${feature.ProposedDesign}</td>
        </tr>
      </tbody>
    </table>
    <p class="flush-bottom"><b>${feature.Design}:</b></p>
    <p>What does that mean do you thing?</p>

    <p class="flush-bottom"><b>${feature.ProposedDesign}:</b></p>
    <p>What does that mean do you thing?</p>

    <p>Transportation Plan ID: <a href="#">${feature.TranPlanID}</a></p>
  `
}
