module.exports = Object.assign({
  extractPackage: require('./lib/extract-package')
},
  require('./lib/executions'),
  require('./lib/dependencies')
)
