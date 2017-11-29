const fs = require('fs')
const fetch = require('node-fetch')
const tar = require('tar')
const tempDir = require('temp-dir')
const semver = require('semver')
const del = require('del')

/**
 * Create a Promise that resolves when a stream ends and rejects when an error occurs
 * @param {WritableStream|ReadableStream} stream
 * @returns {Promise}
 */
function whenStreamDone (stream) {
  return new Promise(function (resolve, reject) {
    stream.on('end', resolve)
    stream.on('finish', resolve)
    stream.on('error', reject)
  })
}

module.exports = (name, { 
  version, 
  dest = tempDir, 
  tag = 'latest',
  satisfyMajor = false
} = {}) => {
  const tarFilePath = `${tempDir}/${name}.tar.gz`
  const extractedPackagePath = `${dest}/package`

  return del(extractedPackagePath, { force: true }).then(() => {
    return fetch(`http://registry.npmjs.org/${name}`).then(response => {
      return response.json()
    })
  })
  .then(info => {
    const versions = Object.keys(info.versions)

    let selectedVersion = satisfyMajor ? semver.maxSatisfying(versions, `^${version}.0.0`) : version

    if (!version) {
      selectedVersion = info['dist-tags'][tag]
    }

    if (satisfyMajor && !selectedVersion) {
      throw new Error(`${version} doesn\'t satisfy any major versions of ${name}`)
    }

    if (!selectedVersion) {
      throw new Error(`Version ${version} doesn't exist for ${name}.`)
    }

    return info.versions[selectedVersion].dist.tarball
  })
  .then(url => {
    return fetch(url).then(response => {
      const file = fs.createWriteStream(tarFilePath)
      response.body.pipe(file)

      return whenStreamDone(response.body).then(() => {
        return tar.x({ 
          file: tarFilePath, 
          cwd: dest 
        }).then(() => {
          return extractedPackagePath
        })
      })
    })
  })
}
