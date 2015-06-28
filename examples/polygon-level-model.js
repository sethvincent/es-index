var memdb = require('memdb')
var Model = require('level-model')
var inherits = require('util').inherits
var esindex = require('../index')

module.exports = Polygons
inherits(Polygons, Model)

function Polygons (db, options) {
  options = options || {}
  options.properties = {
    address: { type: 'string' },
    name: { type: 'string' },
    polygon: { type: 'object' }
  }
  Model.call(this, db, options)
}

var es = esindex({
  index: 'locations',
  type: 'location'
})

var polygons = new Polygons(memdb())

polygons.on('create', function (data) {
  es.index(data, function () {
    es.close()
  })
})

polygons.on('update', function (data) {
  es.index(data, function () {
    es.close()
  })
})

var polygon = {
  type: 'polygon',
  coordinates: [ [ [20.0, 0.0], [30.0, 0.0], [30.0, 1.0], [20.0, 1.0], [20.0, 0.0] ] ]
}

var location = { address: '999 poop st', name: 'pooptown', polygon: polygon }

polygons.create(location, function (err, data) {
  console.log('did it', err, data)
})