asdf// this needs to be named better, and there will be more of them I think.
// this file just maps GIS data layers to their popups, and gives them a reference handle
// so they can be got at by the map app
import popupRenderer from './classification-renderer';
import popupDistricts from './district-renderer';
import popupProject from './project-renderer';
import popupZoning from './zoning-renderer';
import popupTaxlots from './taxlots-renderer';
import popupCenters from './centers-renderer';
import popupCorridors from './corridors-renderer';

/**
 * @property {object} designClassifications          - Object for GIS layer
 * @property {number} designClassifications.features - Esri Leaflet Feature Layer
 * @property {string} designClassifications.popup    - Rendered HTML string of desired popup.
 */
export const Design = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [10]
  }),
  pane: 'top',
};
export const DesignFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/10',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Design')
}

/**
 * @property {object} bicycleClassifications          - Object for GIS layer
 * @property {number} bicycleClassifications.features - Esri Leaflet Feature Layer
 * @property {string} bicycleClassifications.popup    - Rendered HTML string of desired popup.
 */
export const BicycleClassifications = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [12]
  })
};
export const BicycleFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/12',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Bicycle')
}
export const BicycleDistricts = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [13],
    style: feature => ({fillOpacity: 0.5})
  })
};
export const BicycleDistrictFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/13',
    pane: 'bottom',
    minZoom: 15
  }),
  pane: 'bottom',
  popup: popupDistricts('Bicycle')
}
/**
 * @property {object} transitClassifications          - Object for GIS layer
 * @property {number} transitClassifications.features - Esri Leaflet Feature Layer
 * @property {string} transitClassifications.popup    - Rendered HTML string of desired popup.
 */
export const Transit = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [3]
  }),
  pane: 'top',
  // popup: popupRenderer('Transit')
};
export const TransitFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/3',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Transit')
}
/**
 * @property {object} trafficClassifications          - Object for GIS layer
 * @property {number} trafficClassifications.features - Esri Leaflet Feature Layer
 * @property {string} trafficClassifications.popup    - Rendered HTML string of desired popup.
 */
export const Traffic = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [4]
  }),
  pane: 'top',
}
export const TrafficFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/4',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Traffic')
}
/**
 * @property {object} emergencyClassifications          - Object for GIS layer
 * @property {number} emergencyClassifications.features - Esri Leaflet Feature Layer
 * @property {string} emergencyClassifications.popup    - Rendered HTML string of desired popup.
 */
export const Emergency = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [7]
  }),
  pane: 'top',
  // popup: popupRenderer('Emergency')
};
export const EmergencyFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/7',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Emergency')
}
/**
 * @property {object} pedestrianClassifications          - Object for GIS layer
 * @property {number} pedestrianClassifications.features - Esri Leaflet Feature Layer
 * @property {string} pedestrianClassifications.popup    - Rendered HTML string of desired popup.
 */
export const PedestrianClassifications = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [15],
    pane: 'top'
  }),
  pane: 'top',
  // popup: popupRenderer('Pedestrian')
};
export const PedestrianFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/15',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Pedestrian')
}
export const PedestrianDistricts = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [16],
    pane: 'bottom',
    style: feature => ({fillOpacity: 0.5})
  }),
  pane: 'bottom',
  // popup: popupDistricts('Pedestrian', 'PD')
};
export const PedestrianDistrictFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/16',
    pane: 'bottom',
    minZoom: 15
  }),
  pane: 'bottom',
  popup: popupDistricts('Pedestrian`')
}
/**
 * @property {object} freightClassifications          - Object for GIS layer
 * @property {number} freightClassifications.features - Esri Leaflet Feature Layer
 * @property {string} freightClassifications.popup    - Rendered HTML string of desired popup.
 */
export const FreightClassifications = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [19]
  }),
  // popup: popupRenderer('Freight')
};
export const FreightFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/19',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Freight')
}
export const FreightDistricts = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [20],
    style: feature => ({fillOpacity: 0.5})
  }),
  popup: popupDistricts('Freight', 'FD')
};
export const FreightDistrictFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/20',
    pane: 'bottom',
    minZoom: 15
  }),
  pane: 'bottom',
  popup: popupDistricts('Freight')
}
export const FreightFacilities = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [18]
  }),
  // popup: popupRenderer('Freight')
};
export const FreightFacillitiesFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/18',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Freight')
}
/**
 * @property {object} projectPoints          - Object for GIS layer
 * @property {number} projectPoints.features - Esri Leaflet Feature Layer
 * @property {string} projectPoints.popup    - Rendered HTML string of desired popup.
 */
export const ProjectPoints = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/22',
    pane: 'top'
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
export const ProjectPointsTen = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/22',
    pane: 'top',
    where: "EstimatedTimeframe = '1-10_YRS'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
export const ProjectPointsTwenty = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/22',
    pane: 'top',
    where: "EstimatedTimeframe = '11-20_YRS'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
export const ProjectPointsOther = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/22',
    pane: 'top',
    where: "EstimatedTimeframe = 'NA'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
/**
 * @property {object} projectLines          - Object for GIS layer
 * @property {number} projectLines.features - Esri Leaflet Feature Layer
 * @property {string} projectLines.popup    - Rendered HTML string of desired popup.
 */
export const ProjectLines = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/23',
    pane: 'top'
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
export const ProjectLinesTen = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/23',
    pane: 'top',
    where: "EstimatedTimeframe = '1-10_YRS'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
export const ProjectLinesTwenty = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/23',
    pane: 'top',
    where: "EstimatedTimeframe = '11-20_YRS'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
export const ProjectLinesOther = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/23',
    pane: 'top',
    where: "EstimatedTimeframe = 'NA'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
/**
 * @property {object} projectPolygons          - Object for GIS layer
 * @property {number} projectPolygons.features - Esri Leaflet Feature Layer
 * @property {string} projectPolygons.popup    - Rendered HTML string of desired popup.
 */
export const ProjectPolygons = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/24',
    pane: 'bottom',
    style: feature => ({fillOpacity: 0.2})
  }),
  pane: 'bottom',
  popup: popupProject('foo', 'bar')
};
export const ProjectPolygonsTen = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/24',
    pane: 'bottom',
    where: "EstimatedTimeframe = '1-10_YRS'",
    style: feature => ({fillOpacity: 0.2})
  }),
  pane: 'bottom',
  popup: popupProject('foo', 'bar')
};
export const ProjectPolygonsTwenty = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/24',
    pane: 'bottom',
    where: "EstimatedTimeframe = '11-20_YRS'",
    style: feature => ({fillOpacity: 0.2})
  }),
  pane: 'bottom',
  popup: popupProject('foo', 'bar')
};
export const ProjectPolygonsOther = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/24',
    pane: 'bottom',
    where: "EstimatedTimeframe = 'NA'",
    style: feature => ({fillOpacity: 0.2})
  }),
  pane: 'bottom',
  popup: popupProject('foo', 'bar')
};
export const bikeProgram = {
  features: window.L.esri.featureLayer({
    url: 'https://services.arcgis.com/quVN97tn06YNGj9s/arcgis/rest/services/TSPBikePrograms_temp_2018_03_15/FeatureServer/0',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
}

export const greenwayProgram = {
  features: window.L.esri.featureLayer({
    url: 'https://services.arcgis.com/quVN97tn06YNGj9s/arcgis/rest/services/TSPBikePrograms_temp_2018_03_15/FeatureServer/1',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
}

export const taxlots = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color/MapServer/8',
    pane: 'bottom',
    style: feature => ({fillOpacity: 0.2})
  }),
  popup: popupTaxlots('foo', 'bar')
}

export const zoning = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Zoning/MapServer/0',
    // url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/39',
    pane: 'bottom',
    style: feature => ({fillOpacity: 0.2})
  }),
  popup: popupZoning('foo', 'bar')
}


export const centers = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/46',
    pane: 'bottom',
    style: feature => ({fillOpacity: 0.2})
  }),
  popup: popupCenters('foo', 'bar')
}
export const corridors = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/44',
    pane: 'bottom'
  }),
  popup: popupCorridors('foo', 'bar')
}

export const centersRegional = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/2',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
}
export const centersTown = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/3',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
}
export const centersNeighborhood = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/4',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
}
export const corridorsCivic = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/5',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
}
export const corridorsNeighborhood = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/6',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
}