const execa = require('execa')

const getDependencyString = deps => deps.split(',').join(' ')

module.exports = {
  exec (cmds, fallbackCmds) {
    return execa('yarn', cmds).catch(() => execa('npm', fallbackCmds || cmds))
  },

  addDeps (deps, dev = false) {
    const yarnCmds = ['add']
    const npmCmds = ['-S']
    const dependencyString = getDependencyString(deps)

    if (dev) {
      yarnCmds.push('--dev')
      npmCmds = ['-D']
    }

    yarnCmds.push(dependencyString)
    npmCmds.push(dependencyString)

    return module.exports.exec(yarnCmds, npmCmds)
  },

  removeDepds (deps, dev = false) {
    const dependencyString = getDependencyString(deps)    
    const yarnCmds = ['remove']
    const npmCmds = ['uninstall']

    if (dev) {
      npmCmds.push('-D')
    } else {
      npmCmds.push('-S')
    }

    yarnCmds.push(dependencyString)    
    npmCmds.push(dependencyString)
    
    return module.exports.exec(yarnCmds, npmCmds)
  }
}