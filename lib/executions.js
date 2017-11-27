const execa = require('execa')

/**
 * Executes commands with Yarn and it fallbacks to NPM if the first fails
 * @param {Array<String>} cmds 
 * @param {ArrayString} fallbacks 
 */
module.exports.exec = (cmds, fallbacks) => {
  return execa('yarn', cmds).catch(() => execa('npm', fallbacks || cmds))
}