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
polygons.on('create', es.index.bind(es))
polygons.on('update', es.index.bind(es))

var polygon = {
  type: 'polygon',
  coordinates: [ [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ] ]
}

var location = { address: '123 pizza st', name: 'pizzaville', polygon: polygon }

polygons.create(location, function (err, data) {
  console.log('did it', err, data)
})
