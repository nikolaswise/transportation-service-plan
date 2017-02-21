// this needs to be named better, and there will be more of them I think.
// this file just maps GIS data layers to their popups, and gives them a reference handle
// so they can be got at by the map app
import popupRenderer from './classification-renderer';

export const designClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20'
  }),
  popup: popupRenderer('Design', 'ProposedDesign')
};

export const bicycleClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/22'
  }),
  popup: popupRenderer('Bicycle', 'ProposedBicycle')
};

export const transitClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/1'
  }),
  popup: popupRenderer('Transit', 'ProposedTransit')
};

export const trafficClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/4'
  }),
  popup: popupRenderer('Traffic', 'ProposedTraffic')
};

export const emergencyClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/7'
  }),
  popup: popupRenderer('Emergency', 'ProposedEmergency')
};

export const pedestrianClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/13'
  }),
  popup: popupRenderer('Pedestrian', 'ProposedPedestrian')
};

export const pedestrianDistricts = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/14'
  }),
  popup: popupRenderer('Pedestrian', 'ProposedPedestrian')
};

export const freightClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/17'
  }),
  popup: popupRenderer('Freight', 'ProposedFreight')
};

export const freightDistricts = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/18'
  }),
  popup: popupRenderer('Freight', 'ProposedFreight')
};

export const projectPoints = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1',
    pane: 'top'
  }),
  popup: popupRenderer('foo','bar')
};
export const projectLines = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5',
    pane: 'top'
  }),
  popup: popupRenderer('foo','bar')
};
export const projectPolygons = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6',
    pane: 'bottom'
  }),
  popup: popupRenderer('foo','bar')
};

