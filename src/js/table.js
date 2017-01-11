import clusterize from 'clusterize.js'
import * as layers from './map/layers'

export default function renderTable () {
  console.log(layers)

  layers.bicycleClassifications.query()
  .where("1 = 1")
  .limit(500)
  .run(function(error, featureCollection){
    console.log(featureCollection);
  });
}

// Does this make sense to put this data in a table? Maybe not yet.
// for each layer in layers
// run a series of paginated queries
// put all the layers into a single table