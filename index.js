const { 
  exec 
} = require('./lib/executions')

const {
  addDeps,
  removeDeps
} = require('./lib/dependencies')

module.exports = {
  exec,
  addDeps,
  removeDeps
}