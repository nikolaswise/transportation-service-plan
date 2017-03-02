// this needs to be named better, and there will be more of them I think.
// this file just maps GIS data layers to their popups, and gives them a reference handle
// so they can be got at by the map app
import popupRenderer from './classification-renderer';

/**
 * @property {object} designClassifications          - Object for GIS layer
 * @property {number} designClassifications.features - Esri Leaflet Feature Layer
 * @property {string} designClassifications.popup    - Rendered HTML string of desired popup.
 */
export const designClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20'
  }),
  popup: popupRenderer('Design', 'ProposedDesign')
};

/**
 * @property {object} bicycleClassifications          - Object for GIS layer
 * @property {number} bicycleClassifications.features - Esri Leaflet Feature Layer
 * @property {string} bicycleClassifications.popup    - Rendered HTML string of desired popup.
 */
export const bicycleClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/22'
  }),
  popup: popupRenderer('Bicycle', 'ProposedBicycle')
};

/**
 * @property {object} transitClassifications          - Object for GIS layer
 * @property {number} transitClassifications.features - Esri Leaflet Feature Layer
 * @property {string} transitClassifications.popup    - Rendered HTML string of desired popup.
 */
export const transitClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/1'
  }),
  popup: popupRenderer('Transit', 'ProposedTransit')
};

/**
 * @property {object} trafficClassifications          - Object for GIS layer
 * @property {number} trafficClassifications.features - Esri Leaflet Feature Layer
 * @property {string} trafficClassifications.popup    - Rendered HTML string of desired popup.
 */
export const trafficClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/4'
  }),
  popup: popupRenderer('Traffic', 'ProposedTraffic')
};

/**
 * @property {object} emergencyClassifications          - Object for GIS layer
 * @property {number} emergencyClassifications.features - Esri Leaflet Feature Layer
 * @property {string} emergencyClassifications.popup    - Rendered HTML string of desired popup.
 */
export const emergencyClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/7'
  }),
  popup: popupRenderer('Emergency', 'ProposedEmergency')
};

/**
 * @property {object} pedestrianClassifications          - Object for GIS layer
 * @property {number} pedestrianClassifications.features - Esri Leaflet Feature Layer
 * @property {string} pedestrianClassifications.popup    - Rendered HTML string of desired popup.
 */
export const pedestrianClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/13'
  }),
  popup: popupRenderer('Pedestrian', 'ProposedPedestrian')
};

/**
 * @property {object} pedestrianDistricts          - Object for GIS layer
 * @property {number} pedestrianDistricts.features - Esri Leaflet Feature Layer
 * @property {string} pedestrianDistricts.popup    - Rendered HTML string of desired popup.
 */
export const pedestrianDistricts = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/14'
  }),
  popup: popupRenderer('Pedestrian', 'ProposedPedestrian')
};

/**
 * @property {object} freightClassifications          - Object for GIS layer
 * @property {number} freightClassifications.features - Esri Leaflet Feature Layer
 * @property {string} freightClassifications.popup    - Rendered HTML string of desired popup.
 */
export const freightClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/17'
  }),
  popup: popupRenderer('Freight', 'ProposedFreight')
};

/**
 * @property {object} freightDistricts          - Object for GIS layer
 * @property {number} freightDistricts.features - Esri Leaflet Feature Layer
 * @property {string} freightDistricts.popup    - Rendered HTML string of desired popup.
 */
export const freightDistricts = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/18'
  }),
  popup: popupRenderer('Freight', 'ProposedFreight')
};

/**
 * @property {object} projectPoints          - Object for GIS layer
 * @property {number} projectPoints.features - Esri Leaflet Feature Layer
 * @property {string} projectPoints.popup    - Rendered HTML string of desired popup.
 */
export const projectPoints = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1',
    pane: 'top'
  }),
  popup: popupRenderer('foo', 'bar')
};

/**
 * @property {object} projectLines          - Object for GIS layer
 * @property {number} projectLines.features - Esri Leaflet Feature Layer
 * @property {string} projectLines.popup    - Rendered HTML string of desired popup.
 */
export const projectLines = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5',
    pane: 'top'
  }),
  popup: popupRenderer('foo', 'bar')
};

/**
 * @property {object} projectPolygons          - Object for GIS layer
 * @property {number} projectPolygons.features - Esri Leaflet Feature Layer
 * @property {string} projectPolygons.popup    - Rendered HTML string of desired popup.
 */
export const projectPolygons = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6',
    pane: 'bottom'
  }),
  popup: popupRenderer('foo', 'bar')
};

