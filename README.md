# djantajs-compiler-rc

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Linux + OSX Build Status][ci-image]][ci-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Follow @djantaio on Twitter][twitter-image]][twitter-url]

> Uses djantajs runtime compiler to extract all the framework know provided annotation from your code and then generate the plateform .djanta-rc.json configuration.

## Getting Started
This version of the module requires at least npm `>=4.6.0` and node `>=7.0.0`

If you haven't used [npm](https://npmjs.com/) before, be sure to check out the [Getting Started](https://docs.npmjs.com/getting-started/what-is-npm) guide. Once you're familiar with that process, you may install this module with this command:

## Install

Install with [npm](https://www.npmjs.com/):

```shell
npm i djantajs-compiler-rc --save[-dev]
```

Once this module has been sucessfully installed, it may be enabled and ready to be used inside your project with this line of JavaScript:

```js
let rc = require('djantajs-compiler-rc');
```

## Usage

```js
let rc = require('djantajs-compiler-rc');
```

## Table of contents

* [Features](#features)
* [CLI](#cli)
* [API](#api)
  - [Template API](#template-api)
  - [Config API](#config-api)
  - [Data API](#data-api)
  - [Middleware API](#middleware-api)
  - [Task API](#task-api)
  - [](#-task--indexjs-l114-)[.task](index.js#L114)
  - [](#-watch--indexjs-l180-)[.watch](index.js#L180)

* [Related projects](#related-projects)
* [Why use runtim annotation?](#why-use-djantajs-compiler-rc-)
* [Running tests](#running-tests)
* [Contributing](#contributing)
* [Troubleshooting](#troubleshooting)
* [Major changes](#major-changes)
* [Author](#author)
* [License](#license)


## The "@bundle" annotation

### Overview
In your project's Gruntfile, add a section named `bundlerc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bundlerc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  bundlerc: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  bundlerc: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## The "@plugin" annotation

### Overview
In your project's Gruntfile, add a section named `bundlerc` to the data object passed into `grunt.initConfig()`.

```js
const Runtime = require ('djantajs-infinite-runtime');
/**
 * So far, the plugin annotation might take place you class definition level as follow:
 * @plugin(
 *  name="CarRentalService",
 *  version="1.0.1",
 *  engine=[">=7.6.0"],
 *  imports=["MyTiersBillingService", "MyS3BillStorageService@>=0.2.8"],
 *  tags=["finance", "trading", "accounting", "payment"],
 *  portes=[
 *      {name: "searchEngineManager"},
 *      {name:"quotes" description:'Here\'s where any other tiers provider can join me and offer their quotation service'}
 *  ],
 *  singleton=true,
 *  description="This's how you can fully configure our service to enrich and enhance you ecosytem"
 * )
 */
module.exports = class CarRentalService extends Runtime.AbstractPlugin {
    /**
     * Qualified default explicit constructor declaration
     */
    constructor () {
        super ({name: 'CarRentalService'});
    }
};
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  bundlerc: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  bundlerc: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## The "@resource" annotation

### Overview
In your project's Gruntfile, add a section named `bundlerc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bundlerc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  bundlerc: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  bundlerc: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Related projects

* [assemble](https://www.npmjs.com/package/assemble): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt,… [more](https://www.npmjs.com/package/assemble) | [homepage](http://assemble.io)
* [composer](https://www.npmjs.com/package/composer): API-first task runner with three methods: task, run and watch. | [homepage](https://github.com/jonschlinkert/composer)
* [engine](https://www.npmjs.com/package/engine): Template engine based on Lo-Dash template, but adds features like the ability to register helpers… [more](https://www.npmjs.com/package/engine) | [homepage](https://github.com/jonschlinkert/engine)
* [template](https://www.npmjs.com/package/template): Render templates using any engine. Supports, layouts, pages, partials and custom template types. Use template… [more](https://www.npmjs.com/package/template) | [homepage](https://github.com/jonschlinkert/template)

## Why use djantajs-compiler-rc?

It's magical and make the server to boot less than and 5 second instead or minutes. If that's not enough for you, it's also the most powerful and easy-to-use .djanta-rc.json generator for djantajs-infinite-runtime. And it's magical.

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/djantaio/djantajs-compiler-rc/issues/new).

## Troubleshooting

1. First things first, please make sure to run `npm cache clear`, then do `npm i djantajs-compiler-rc --save[-dev]`. If that doesn't clear things up, try #2.
2. Create [an issue](https://github.com/djantaio/djantajs-compiler-rc/issues). We'd love to help, so please be sure to provide as much detail as possible, including:

* version of verb and djantajs-compiler-rc
* platform
* any error messages or other information that might be useful.

## Release History
_(Nothing yet)_

**Stanislas Koffi ASSOUTOVI**

* [github/djantaio](https://github.com/djantaio)
* [twitter/djantaio](http://twitter.com/djantaio)

## License

Copyright © 2015-2017 [Stanislas Koffi ASSOUTOVI](https://github.com/djantaio)
Released under the MIT license.
