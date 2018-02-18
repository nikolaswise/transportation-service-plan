const initial = {
  center: [45.528, -122.63],
  zoom: 12
}

const ZoomMin = L.Control.Zoom.extend({
  options: {
    position: "topright",
    zoomInText: "+",
    zoomInTitle: "Zoom in",
    zoomOutText: "-",
    zoomOutTitle: "Zoom out",
    zoomMinText: "Zoom min",
    zoomMinTitle: "Zoom min"
  },

  onAdd: function (map) {
    var zoomName = "leaflet-control-zoom"
      , container = L.DomUtil.create("div", zoomName + " leaflet-bar")
      , options = this.options

    this._map = map

    this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
     zoomName + '-in', container, this._zoomIn, this)

    this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
     zoomName + '-out', container, this._zoomOut, this)

    this._zoomMinButton = this._createButton(options.zoomMinText, options.zoomMinTitle,
     zoomName + '-min', container, this._zoomMin, this)


    return container
  },

  _zoomMin: function () {
    this._map.flyTo(initial.center, initial.zoom);
  }
})
export default ZoomMin