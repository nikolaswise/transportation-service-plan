// this needs to be named better, and there will be more of them I think.
// this file just maps GIS data layers to their popups, and gives them a reference handle
// so they can be got at by the map app
import popupRenderer from './classification-renderer';
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
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer',
    layers: [15,16],
  }),
  pane: 'top',
  popup: popupRenderer('Design')
};

/**
 * @property {object} bicycleClassifications          - Object for GIS layer
 * @property {number} bicycleClassifications.features - Esri Leaflet Feature Layer
 * @property {string} bicycleClassifications.popup    - Rendered HTML string of desired popup.
 */
export const Bicycle = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer',
    layers: [6,7],
  }),
  pane: 'top',
  popup: popupRenderer('Bicycle')
};

/**
 * @property {object} transitClassifications          - Object for GIS layer
 * @property {number} transitClassifications.features - Esri Leaflet Feature Layer
 * @property {string} transitClassifications.popup    - Rendered HTML string of desired popup.
 */
export const Transit = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer',
    layers: [4,5],
  }),
  pane: 'top',
  popup: popupRenderer('Transit')
};

/**
 * @property {object} trafficClassifications          - Object for GIS layer
 * @property {number} trafficClassifications.features - Esri Leaflet Feature Layer
 * @property {string} trafficClassifications.popup    - Rendered HTML string of desired popup.
 */
export const Traffic = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer',
    layers: [2,3],
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
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer',
    layers: [0,1],
  }),
  pane: 'top',
  popup: popupRenderer('Emergency')
};

/**
 * @property {object} pedestrianClassifications          - Object for GIS layer
 * @property {number} pedestrianClassifications.features - Esri Leaflet Feature Layer
 * @property {string} pedestrianClassifications.popup    - Rendered HTML string of desired popup.
 */
export const Pedestrian = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer',
    layers: [9,10],
  }),
  pane: 'bottom',
  popup: popupRenderer('Pedestrian')
};

/**
 * @property {object} freightClassifications          - Object for GIS layer
 * @property {number} freightClassifications.features - Esri Leaflet Feature Layer
 * @property {string} freightClassifications.popup    - Rendered HTML string of desired popup.
 */
export const Freight = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/PBOT_Transportation_System_Plan_Proposal/MapServer',
    layers: [12,13],
  }),
  pane: 'top',
  popup: popupRenderer('Freight')
};
/**
 * @property {object} projectPoints          - Object for GIS layer
 * @property {number} projectPoints.features - Esri Leaflet Feature Layer
 * @property {string} projectPoints.popup    - Rendered HTML string of desired popup.
 */
export const projectPoints = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Proposal_Archive/MapServer/1',
    pane: 'top'
  }),
  popup: popupProject('foo', 'bar')
};

/**
 * @property {object} projectLines          - Object for GIS layer
 * @property {number} projectLines.features - Esri Leaflet Feature Layer
 * @property {string} projectLines.popup    - Rendered HTML string of desired popup.
 */
export const projectLines = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Proposal_Archive/MapServer/5',
    pane: 'top'
  }),
  popup: popupProject('foo', 'bar')
};

/**
 * @property {object} projectPolygons          - Object for GIS layer
 * @property {number} projectPolygons.features - Esri Leaflet Feature Layer
 * @property {string} projectPolygons.popup    - Rendered HTML string of desired popup.
 */
export const projectPolygons = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Proposal_Archive/MapServer/6',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
};


export const projLinesConstrained = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5',
    pane: 'top'
  }),
  popup: popupProject('foo', 'bar')
}

export const projLinesUnconstrained = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5',
    pane: 'top'
  }),
  popup: popupProject('foo', 'bar')
}

export const projLinesCC2035 = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5',
    pane: 'top'
  }),
  popup: popupProject('foo', 'bar')
}
export const projLinesOther = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5',
    pane: 'top'
  }),
  popup: popupProject('foo', 'bar')
}
export const projPointsConstrained = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1',
    pane: 'top'
  }),
  popup: popupProject('foo', 'bar')
}
export const projPointsUnconstrained = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1',
    pane: 'top'
  }),
  popup: popupProject('foo', 'bar')
}
export const projPointsCC2035 = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1',
    pane: 'top'
  }),
  popup: popupProject('foo', 'bar')
}
export const projPointsOther = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1',
    pane: 'top'
  }),
  popup: popupProject('foo', 'bar')
}
export const projPolygonsConstrained = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
}
export const projPolygonsUnconstrained = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
}
export const projPolygonsCC2035 = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
}
export const projPolygonsOther = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
}

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