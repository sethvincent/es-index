var es = require('elasticsearch')

module.exports = esIndex

function esIndex (options) {
  if (!(this instanceof esIndex)) return new esIndex(options)
  this.es = es.Client({
    host: options.host || 'localhost:9200',
    log: options.log || 'trace'
  })

  this._index = options.index
  this._type = options.type
}

esIndex.prototype.index = function (key, data, callback) {
  var self = this

  if (typeof key === 'object') {
    callback = data
    data = key
    key = data.key
  }

  callback = callback || function () {}

  var options = {
    index: self._index,
    type: self._type,
    id: key,
    body: data,
    refresh: true
  }
  console.log(this)
  this.es.index(options, callback)
}

esIndex.prototype.create = function (key, data, callback) {
  self.index(key, data, callback)
}

esIndex.prototype.update = function (key, data, callback) {
  self.index(key, data, callback)
}

esIndex.prototype.delete = function (key, callback) {
  if (typeof key === 'object') key = data.key

  var options = {
    index: self._index,
    type: self._type,
    id: key,
    refresh: true
  }

  this.es.delete(options, callback)
}

esIndex.prototype.close = function () {
  this.es.close()
}