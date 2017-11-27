const execa = require('execa')

module.exports.exec = (cmds, fallbacks) => {
  return execa('yarn', cmds).catch(() => execa('npm', fallbacks || cmds))
}