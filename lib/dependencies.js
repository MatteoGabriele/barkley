const { exec } = require('./executions')

const addDeps = (deps, {
 dev = false,
 changeDirectory = process.cwd()
} = {}) => {
  let yarnCmds = ['add']
  let npmCmds = ['install', '-S']

  if (changeDirectory) {
    process.chdir(changeDirectory)
  }

  if (dev) {
    yarnCmds = ['add', '--dev']
    npmCmds = ['install', '-D']
  }

  return exec(
    yarnCmds.concat(deps), 
    npmCmds.concat(deps)
  )
}

const removeDeps = (deps, { 
  dev = false,
  changeDirectory = process.cwd()
} = {}) => {
  const yarnCmds = ['remove']
  const npmCmds = ['uninstall']

  if (changeDirectory) {
    process.chdir(changeDirectory)
  }

  if (dev) {
    npmCmds.push('-D')
  } else {
    npmCmds.push('-S')
  }
  
  return exec(
    yarnCmds.concat(deps), 
    npmCmds.concat(deps)
  )
}

module.exports = {
  addDeps,
  removeDeps
}