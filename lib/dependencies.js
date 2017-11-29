const { exec } = require('./executions')
const path = require('path')
const fs = require('fs')

/**
 * Install packages
 * @param {Array<String>} deps 
 * @param {Object} options 
 */
const addPackages = (deps, {
 dev = false,
 changeDirectory = false
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

/**
 * Uninstall packages 
 * @param {Array<String>} deps 
 * @param {Object} options 
 */
const removePackages = (deps, { 
  dev = false,
  changeDirectory = false
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

/**
 * It checks if a list of node packages are installed and saved
 * Returns a new array of missing packages
 * @param {Array<String>} list packages
 * @param {Object} options
 */
const getMissingPackages = (list, {
  directory = process.cwd()
} = {}) => {
  const cwd = dir => path.resolve(directory, dir)
  const infoPath = cwd('./package.json')
  const info = fs.existsSync(infoPath) ? require(infoPath) : {}
  const { dependencies = {}, devDependencies = {} } = info

  return list.reduce((coll, name) => {
    const nodePath = cwd(`./node_modules/${name}`)
    const isSaved = (name in dependencies || name in devDependencies)
    const isInstalled = fs.existsSync(nodePath)

    return (isSaved && isInstalled) ? coll : coll.concat([name])
  }, [])
}

module.exports = {
  addPackages,
  removePackages,
  getMissingPackages
}