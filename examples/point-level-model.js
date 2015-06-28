var memdb = require('memdb')
var Model = require('level-model')
var inherits = require('util').inherits
var esindex = require('../index')

module.exports = Locations
inherits(Locations, Model)

function Locations (db, options) {
  options = options || {}
  options.properties = {
    address: { type: 'string' },
    name: { type: 'string' },
    point: { type: 'array', items: 'number' }
  }
  Model.call(this, db, options)
}

var es = esindex({
  index: 'locations',
  type: 'location'
})

var locations = new Locations(memdb())

locations.on('create', function (data) {
  es.index(data, function () {
    es.close()
  })
})

locations.on('update', function (data) {
  es.index(data, function () {
    es.close()
  })
})

var point = [24, 10]

var location = { address: '123 pizza st', name: 'pizzaville', point: point }

locations.create(location, function (err, data) {
  console.log('did it', data)
})
