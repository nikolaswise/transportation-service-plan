var template = `
  <div class="scale right" style="width:{{scale.pixelFrom.halfMile}}px">
    <h6 class="scale-unit">miles</h6>
    <div class="scale-bars">
      <div class="quarter-scale scale-section"><span class="scale-fill"></span></div>
      <div class="quarter-scale scale-section"><span class="scale-fill"></span></div>
      <div class="half-scale scale-section"><span class="scale-fill"></span></div>
    </div>
    <div class="scale-labels">
      <div class="quarter-scale text-left">
        <h6 class="label">0</h6>
      </div>
      <div class="quarter-scale text-left">
        <h6 class="label">1/8</h6>
      </div>
      <div class="half-scale">
        <h6 class="label left">1/4</h6>
        <h6 class="label right">1/2</h6>
      </div>
    </div>
  </div>
`

function getScale() {
  let map = this.map
  var centerLatLng = map.getCenter();                    // get map center

  var pointC = map.latLngToContainerPoint(centerLatLng); // convert to containerpoint (pixels)
  var pointX = [pointC.x + 1, pointC.y];                 // add one pixel to x
  var pointY = [pointC.x, pointC.y + 1];                 // add one pixel to y

                                                         // convert containerpoints to latlng's
  var latLngC = map.containerPointToLatLng(pointC);
  var latLngX = map.containerPointToLatLng(pointX);
  var latLngY = map.containerPointToLatLng(pointY);

  var distanceX = latLngC.distanceTo(latLngX);           // calculate distance between c and x (latitude)
  var distanceY = latLngC.distanceTo(latLngY);           // calculate distance between c and y (longitude)

  var times = [distanceX, distanceY]

  var sum = times.reduce(function(distanceX, distanceY) { return distanceX + distanceY; })
  var avg = sum / times.length

  var meters       = avg                     // meters per meter : 1
  var kilometer    = avg / 1000              // meters per kilometer : 1000
  var feet         = avg * 3.2804            // feet per meter : 3.2804
  var mile         = feet / 5280             // feet per mile : 5280
  var nauticalMile = avg / 1852              // meters per nautical mile

  var scale = {
    'pixelTo': {
      'meters': meters.toFixed(3),
      'kilometer': kilometer.toFixed(3),
      'feet': feet.toFixed(3),
      'mile': mile.toFixed(3),
      'nauticalMile': nauticalMile.toFixed(3)
    },
    'pixelFrom': {
      'meter' : 1 / meters,
      'kilometer' : 1 / kilometer,
      'halfKilometer' : 0.5 / kilometer,
      'quarterKilometer' : 0.25 / kilometer,
      'eigthKilometer' : 0.125 / kilometer,
      'feet' : 1 / feet,
      'mile' : 1 / mile,
      'halfMile': 0.5 / mile,
      'quarterMile': 0.25 / mile,
      'eigthMile': 0.125 / mile,
      'nauticalMile' : 1 / nauticalMile
    }
  }
  return scale
}

function addTo(element) {
}

function custom(element, template) {

  let render = () => {
    let scale = this.getScale()
  }

  this.map.whenReady(function(){
    render()
  })
  this.map.on('zoomend', function(){
    render()
  })
}

class Scalebar extends L.control.scale {
  constructor(map, fn) {
    super()
    this.map = map
    this.fn = fn ? fn : false
    this.getScale = getScale
    this.custom = custom
  }
}

export default Scalebar
