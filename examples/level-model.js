var memdb = require('memdb')
var Model = require('level-model')
var inherits = require('util').inherits
var esindex = require('../index')

module.exports = Messages
inherits(Messages, Model)

function Messages (db, options) {
  options = options || {}
  options.properties = {
    text: { type: 'string' },
    author: { type: 'string' }
  }
  Model.call(this, db, options)
  this.es = esindex({
    index: 'chat',
    type: 'messages'
  })
}

var msgs = new Messages(memdb(), {})

msgs.on('create', function (data) {
  msgs.es.index(data)
})

msgs.create({ text: 'wat', author: 'me' }, function (err, data) {
  console.log('did it')
})