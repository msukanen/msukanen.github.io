# Various web things (to be) ...
* Matrix 3D Rain - a 3D Matrix-style effect @ https://msukanen.github.io/matrix-rain.html

## Development
#### `.dist` in `package.json`
Note that `.dist` directory in `package.json` refers to the ultimate non-repository destination
of all web page related stuff. `.dist` directory does **not** exist in the repo itself and therefore
you have to create/symlink/etc. your own if you want to use any of the `"local*"` pieces of `package.json`.

YMMV - set "publish" and "local" script(s) in `package.json` as you see fit.
#### JavaScript files in `./js/`
These can largely be ignored as they're generated from TypeScript source(s) and present in repo only
so that GitHub Pages works with the repo's contents correctly. So, unless otherwise stated for any
individual JS file, don't touch - use the TS source(s) instead!

### Requirements
* shx
* TypeScript
* Dart-SDK
* Dart Sass

#### Getting 'shx'
* `npm install -g shx`

#### Getting 'TypeScript'
* `npm install -g typescript`

### The Other Things
I use **Chocolatey** to manage some packages, and so should you ;-)

Note that 'choco' needs to be ran as an admin unless you know what you're doing and/or have special needs.

* `choco install dart-sdk`
* `choco install sass`
