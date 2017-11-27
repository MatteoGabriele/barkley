const { exec } = require('./executions')
const path = require('path')
const fs = require('fs')

const installPackages = (deps, {
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

    if (isSaved && isInstalled) {
      return coll
    }

    return coll.concat([name])
  }, [])
}

module.exports = {
  installPackages,
  removePackages,
  getMissingPackages
}