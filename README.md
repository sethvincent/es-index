# es-index

A simple approach for indexing data in elasticsearch that's also stored in another db.

## Usage

Maybe you've got a model that emits create, update, and delete events.

You could do something like this:

```
var esindex = require('es-index')

var es = esindex({
  index: 'chat',
  type: 'messages'
})

messages.on('create', function (data) {
  es.create(data)
})
```

## License

[MIT](LICENSE.md)