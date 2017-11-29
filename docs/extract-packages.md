# extract-package
The `extract-package` allows you to download and extract node packages directly with an http request to npm registry.

The method accepts a string as first argument, options as second and returns a Promise.
The Promise resolve returns the path where the package has been extracted.

```js
const { extractPackage } = require('barkley')

extractPackage('lodash').then((path) => {
  // installed!
})
```

Options available as second argument:
* version: a string that rappresents the version of the package we want to download. Default is latest version
* dest: destination of the downloaded package. Default path is the temporary directory of your machine
* tag: the default tag is 'latest', but can be changed if we need to download from betas or other tags
* satisfyMajor: allows you to check if the version you are requesting needs to satisfy a specific major version. Default is latest major version

```js
const { extractPackage } = require('barkley')

extractPackage('lodash', { version: '1.3.5' }).then((path) => {
  // installed!
})
````