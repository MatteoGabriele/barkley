# Depndencies
All methods related to programmatically dependency handling

## addPackages
Allows us to install programmatically an array of node packages
Using the [exec]('/docs/exec.md') all packages are installed with Yarn with a fallback on Node in case is not installed.

The methods accepts and array of strings as first argument, an option object as second and returns a Promise.

```js
const { addPackages } = require('barkley')

addPackages(['babel-core', 'babel-loader', 'webpack']).then(() => {
  // all packages are installed!
})
```

Options available as second argument:
* dev: allows to install packages as devDependencies. Default is false

```js
const path = require('path')
const { addPackages } = require('barkley')

addPackages(['lodash'], { dev: true }).then(() => {
  // package installed!
})
```

## removePackages
As `addPackages`, this method uses [exec]('/docs/exec.md').
The mothod accepts an array of packages to uninstall, an option object and returns a Promise

```js
const { addPackages } = require('barkley')

removePackages(['lodash']).then(() => {
  // package uninstalled!
})
```

## getMissingPackages
On a given array of node packages it returns a new one of packages that are not listed in the package.json file or in the node_modules folder of the project.

The methods accepts and array of strings as first argument, an option object as second and returns an array of strings.

```js
const { getMissingPackages } = require('barkley')

// assuming that lodash is not installed or added to the package.json dependencies
// this method will return it as only item in the array
const missingPackages = getMissingPackages(['webpack', 'lodash']) // ['lodash']

```

Options available as second argument:
* directory: allows to change the root directory of the project. Default is current directory