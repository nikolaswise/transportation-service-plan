export const designClassifications = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20'
})

export const bicycleClassifications = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/22'
})

export const urbanHighway = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'UH'"
})
export const industrialRoad = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'IR'"
})
export const civicMainSteet = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'CIMS'"
})
export const neighborhoodMainStreet = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign='NMS'"
})
export const civicCorridor = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'CIC'"
})
export const neighborhoodCorridor = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'NC'"
})
export const regionalCorridor = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'RC'"
})
export const communityCorridor = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'CC'"
})