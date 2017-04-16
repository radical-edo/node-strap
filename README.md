# Node-Strap
A simple utility function to help bootstrap Node.js projects.

### Usage
The simplest way to use it would be.

```js
const nodeStrap = require('node-strap');

nodeStarp('./initializers');
```
And that's it. The function will navigate to the directory. Find all files with the extension `.js` and `require` them.

**requiring a function**
If `node-strap` will require a function it will call that function **immediately**. Keep that in mind, if you want to supply some arguments to that function use `options.applyArgs`

### Options
`node-strap` supports an `options` as a second argument:
* `rootDir` - tells the function the **root directory** of your project. If not specified it will use `process.cwd()` to determine this value. Therefore it is a good idea to add this option, a simple `__dirname` should be good enough :wink:
* `applyArgs` - a list of arguments to supply to a function if one was required, default: `[]`
* `strapDirectories` - flag that tells if `node-strap` require files in a **directory** if it encountered one, default `false`. If this is set to `true`, then keep in mind that `callOrder` doesn't support setting up for multiple **directories**, only 1 `array` can be specified.
* `callOrder` - an array of files data will determine the order of required files, default: `[]`. The extension `.js` can be omitted, for example:
```js
const callOrder = ['first_file.js', 'second_file.js'];
// or
const callOrder = ['first_file', 'second_file'];
```
Either way is fine. And yes, I'm aware that I've redfined a `const` value, it's just to show that you should pick one :smirk:

### Caveat
The exported function is **synchronous**. Please keep that in mind. The use case for this was to initiate a project, so you wouldn't have to write all those `require` by hand. Just keep them in one place. And `require` is **synchronous** therefore I've seen no reason to make it **asynchronous** :sunglasses:

