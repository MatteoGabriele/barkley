# exec

This command allows you to execute any commands via a Yarn with a fallback to NPM if the first fails
The methods takes an array of strings. If a second array is added, the fallback will be fired in case NPM kicks in.

An example could be if we want to install dependencies programmatically.
Yarn and NPM don't share the same api so we will type something like this

```js
const { exec } = require('barkley')

const yarn = ['add', '--dev', 'lodash']
const npm = ['install' '-S', 'lodash']

exec(yarn, npm)

```