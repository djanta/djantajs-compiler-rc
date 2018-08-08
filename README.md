# djantajs-compiler-rc

[![Build Status](https://travis-ci.org/djantaio/djantajs-compiler-rc.svg)](https://travis-ci.org/djantaio/djantajs-compiler-rc)

[![npm](https://img.shields.io/npm/v/djantajs-compiler-rc.svg?style=flat)](https://github.com/djanta/djantajs-compiler-rc)
[![npm downloads](https://img.shields.io/npm/dw/djantajs-compiler-rc.svg?style=flat)](https://www.npmjs.com/package/djantajs-compiler-rc)
[![Build Status](https://travis-ci.org/djanta/djantajs-compiler-rc.svg?branch=master)](https://travis-ci.org/djanta/djantajs-compiler-rc)
[![Coverage Status](https://coveralls.io/repos/github/djanta/djantajs-compiler-rc/badge.svg?branch=master)](https://coveralls.io/github/djanta/djantajs-compiler-rc?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/312ea725f33a184b0464/maintainability)](https://codeclimate.com/github/djanta/djantajs-compiler-rc/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/312ea725f33a184b0464/test_coverage)](https://codeclimate.com/github/djanta/djantajs-compiler-rc/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/djanta/djantajs-compiler-rc/badge.svg)](https://snyk.io/test/github/djanta/djantajs-compiler-rc)

> Uses djantajs runtime compiler that extract all known annotation from your code and then generate the .djanta-rc.json configuration.

## Table of contents

* [Dependencies](#dependencies)
* [Prerequisites](#Prerequisites)
* [Services](#services)
  - [Http Service](#webappservice)
    - [Portes](#portes)
* [Related projects](#related-projects)
* [Why use runtime annotation?](#why-use-djantajs-compiler-rc-)
* [Running tests](#running-tests)
* [Contributing](#contributing)
* [Troubleshooting](#troubleshooting)
* [Major changes](#major-changes)
* [Author](#author)
* [License](#license)

## Why use djantajs-compiler-rc?

It's magical and make the server to boot less than a couple of seconds instead or minutes. Therefore, by using the framework provided annotation, this module will be able to parse them all generate our project `.djanta-rc.json` at build lifecycle. If that's not enough for you, it's also the most powerful and easy-to-use. And it's magical.

## Getting Started

This version of the module requires at least npm `>=4.6.0` and node `>=6.0.0`

If you haven't used [npm](https://npmjs.com/) before, be sure to check out the [Getting Started](https://docs.npmjs.com/getting-started/what-is-npm) guide. Once you're familiar with that process, you may install this module with this command:

## Install

Install with [npm](https://www.npmjs.com/):

```shell
npm i djantajs-compiler-rc --save-dev
```

Once you install the compiler, you might also want the `.djanta-rc.json` to be automatically generatated. Therefore, we've provided the `Grunt` task which you can install as follow:

```shell
npm i grunt-djantajs-compiler --save-dev
```

The `Grunt` task configuration is available at: [](https://github.com/djanta/grunt-djantajs-compiler/blob/master/README.md)

<b>However, as to day, the `Gulp` task generator is coming soon ...</b>

## Usage

Once this module has been sucessfully installed and well configured, it may be enabled and ready to be used inside your project with this line of JavaScript:

```js
let { Handler, ModuleBase } = require('djantajs-compiler-rc');
```

## TL;TR

In the following sections, we'll learn how to deploy the core platform provided annotions to describe your **`djantaJS`** compliant application. 

## Annotation "@bundle" vs "packags.json"

### Overview

In your project's Gruntfile, add a section named `bundlerc` to the data object passed into `grunt.initConfig()`.

```js
@bundle
```

### Retention

The bundle annotation has been provided and will only be declared with class level retention.

### Expected instance properties (Options)

#### name
**Type:** `String` <br/>
**Default value:** `${package.name}` <br/>
**Required:** `false`

A litteral string value which can better introduce your bundle name. By default, the **`npm`** manifest name will be used instead.

#### version
**Type:** `String` <br/>
**Default value:** `${package.version}` <br/>
**Required:** `false`

A string value that'll to define the latest version of your bundle. This has been instroduced due of some reasons when certains application 
like to diverge their functional version from the technical version i.e: `package.json`. However, this version must follow the sementic versioning taxinomy: `<major>.<minor>.<patch>` 

#### enabled
**Type:** `Boolean` <br/>
**Default value:** `true` <br/>
**Required:** `false`

A boolean value that you can set to `false`to exclude the all bundle to be scaned at build time or to be deploy at runtime. If unspecified, the default value is set to `true`

#### order
**Type:** `Number` <br/>
**Default value:** `1000` <br/>
**Required:** `false`

A boolean value that you can set to `false`to exclude the all bundle to be scaned at build time or to be deploy at runtime. If unspecified, the default value is set to `true`

#### imports
**Type:** `Array` <br/>
**Default value:** `` <br/>
**Required:** `false`

An array value to list which other bundle(s) this bundle depends on.

#### tags
**Type:** `Array` <br/>
**Default value:** `` <br/>
**Required:** `false`

An array of short tag list which fit well your bundle.


### Usage Examples

```js
/**
 * @bundle(name: 'MyCustomizedBundleName', version='1.0.1', enabled=true, order=1, 
 *   tags=['testing', 'documentation'],
 *   homepage='www.djantajs.io'
 *   imports=['BundleOne', 'BundleTow', '...'],
 *   author='DJANTA, LLC'
 * )
 */
module.exports = class MyCustomizedBundle {
   /**
    * Qualified default class constructor
    */
   constructor () {}
   
   // ... can implement anything you'd like here.
}
```
### Result @ `.djanta-rc.json`

```json
{
  "package": "my-real-npm-package-name", //mandatory extracted from your package.json
  "name": "MyCustomizedBundleName",
  "homepage": "www.djantajs.io",
  "version": "1.0.1",
  "author": "DJANTA, LLC",
  "imports": "['BundleOne', 'BundleTow', '...']",
  "tags": "['testing', 'documentation']"
}
```

## Annotation @plugin aka "service"

### Overview

The following annotation called `plugin` represent one of the most important, powerful and the most used annotation we've ever provided. 
Therefore, this's basically the annotion you'll be uising to describe each service provided by your `djantajs` contribution.

```js
@plugin
```

### Retention

The plugin annotation has been provided as class retention level.

### Expected instance properties (Options)

#### name
**Type:** `String` <br/>
**Default value:** ` ` <br/>
**Required:** `true`

A litteral string value that'll be use to lookup for your service implementation across the platform. Basically this value should be consider as uniq key.

#### version
**Type:** `String` <br/>
**Default value:** `1.0.0` <br/>
**Required:** `false`

A string value that'll to define the latest version of your service. This has been instroduced as a helper to handle the service versioning or upgrade. This'll be useful to ensure your service migration.
However, this version must follow the sementic versioning taxinomy: `<major>.<minor>.<patch>`

#### imports
**Type:** `Array` <br/>
**Default value:** ` ` <br/>
**Required:** `false`

An array value to list which other service this service is pending on.

#### tags
**Type:** `Array` <br/>
**Default value:** ` ` <br/>
**Required:** `false`

An array of tag list to shortly describe the service purpose.

#### portes
**Type:** `Array` <br/>
**Default value:** ` ` <br/>
**Required:** `false`

An array of porte where any 3rd party can enrich your service at.

#### description
**Type:** `String` <br/>
**Default value:** ` ` <br/>
**Required:** `true`

A litteral string value that'll be use to lookup for your service implementation across the platform. Basically this value should be consider as uniq key.

#### author
**Type:** `String` <br/>
**Default value:** ` ` <br/>
**Required:** `true`

A litteral string value that'll be use to lookup for your service implementation across the platform. Basically this value should be consider as uniq key.

#### settings
**Type:** `Array` <br/>
**Default value:** ` ` <br/>
**Required:** `false`

An array of tag list to shortly describe the service purpose.

### Usage Examples

```js
const { Plugin } = require ('djantajs-runtime');
/**
 * So far, the plugin annotation might take place you class definition level as follow:
 * 
 * @plugin(name="CarRentalService", version="1.0.1", engine=[">=7.6.0"],
 *  imports=["MyTiersBillingService", "MyS3BillStorageService@>=0.2.8"],
 *  tags=["finance", "trading", "accounting", "payment"],
 *  portes=[@porte(name='searchEngineManager', enabled=true, description='Qualified extension where anyone can contribute their car search engine'),
 *    @porte(name='quotes', enabled=true, description='Qualified extension where any outsider can contribute their pricing service')
 *  ],
 *  description="This's how you can provide your service to enrich the ecosytem",
 *  authors=["DJANTA, LLC"],
 *  settings=[@setting(name='my-setting-identifier', value=#{any value goes here}, description='Each setting description here!')]
 * )
 */
module.exports = class CarRentalService extends Plugin {
  /**
   * Qualified default explicit constructor declaration
   * @param {*} options construction plugin configurable option
   */
  constructor (options = {}) {
    super (options);
  }
  
  /**
   * Runtime invocable lifecycle ....
   */
  init (options = {}) {
    super.init(options);
    // Here i can do anything i want to initialize my plugin
  }
};
```

### Result @ `.djanta-rc.json`

```json
{
"plugins": [
    {
      "name": "CarRentalService",
      "enabled": true,
      "version": "1.0.1",
      "order": -1,
      "engine": [
        ">=7.6.0"
      ],
      "tags": [
        "finance",
        "trading",
        "accounting",
        "payment"
      ],
      "imports": ["MyS3BillStorageService@>=0.2.8", "MyTiersBillingService"],
      "portes": [
        {
          "name": "searchEngineManager",
          "enabled": true,
          "description": "Qualified extension where anyone can contribute their car search engine"
        },
        {
          "name": "quotes",
          "enabled": true,
          "description": "Qualified extension where any outsider can contribute their pricing service"
        }
      ],
      "settings": [
        {
          "name": "my-setting-identifier",
          "value": "#{any value goes here}",
          "description": "Each setting description here!"
        }
      ],
      "description": "This's how you can provide your service to enrich the ecosytem",
      "class": "services/cars-rental-service.js"
    }
  ]
}
```

## Annotation @porte

### Overview

This annotion must be used in conjugaison with the `@plugin` annotation to define the specified porte e.g **`contribution point`** provided by the current plugin.

```js
@porte
```

### Retention

The porte annotation has been provided as class retention level.

### Expected instance properties (Options)

#### name
**Type:** `String` <br/>
**Default value:** ` ` <br/>
**Required:** `true`

A litteral string value to define the porte name. Note the prote given name mnust be uniq per service.

#### enable
**Type:** `Boolean` <br/>
**Default value:** `true` <br/>
**Required:** `false`

A boolean value to enable or desable the porte accessibility. This value can just be set to `false` to desable the porte provisioning.

#### description
**Type:** `String` <br/>
**Default value:** ` ` <br/>
**Required:** `false`

A litteral string value to describle the given porte usage and goal. This'll be useful to other developers the purpose of the current porte.

### Usage Examples

```js
let { Plugin } = require ('djantajs-runtime');
/**
 * So far, the plugin annotation might take place you class definition level as follow:
 * @plugin(name="MyPorteDemoService", version="1.0.1", engine=[">=7.6.0"],
 *  portes=[@porte(name='my-feature-porte', enabled=true, 
 *      description='Anyone can now contribute to my service through this porte')
 *  ]
 * )
 */
module.exports = class MyPorteDemoServiceClass extends Plugin {
   /**
    * Qualified default class constructor
    * @param {*} options construction plugin configurable option
    */
   constructor(options = {}){
     super(options);
   }
}
```

### Result @ `.djanta-rc.json`

```json
{
  "plugins": [
    {
      "name": "MyPorteDemoService",
      "enabled": true,
      "version": "1.0.1",
      "order": -1,
      "engine": [
        ">=7.6.0"
      ],
      "portes": [
        {
          "name": "my-feature-porte",
          "enabled": true,
          "description": "Anyone can now contribute to my service through this porte"
        }
      ]
    }
  ]
}
```

## Annotation @setting

### Overview

This annotion must be used in conjugaison with the `@plugin` annotation to define the providedplugin **`default configuration`**.

```js
@setting
```

### Retention

The porte annotation has been provided as class retention level.

### Expected instance properties (Options)

#### name
**Type:** `String` <br/>
**Default value:** ` ` <br/>
**Required:** `true`

A litteral string value to define the setting mapping name.

#### description
**Type:** `String` <br/>
**Default value:** ` ` <br/>
**Required:** `false`

A litteral string value to describle the given setting usage and goal. This'll be useful to other developers the purpose of the current porte.

#### value
**Type:** `#Any` <br/>
**Default value:** ` ` <br/>
**Required:** `true`

Any data type you'd like to map with the given name.

### Usage Examples

```js
const { Plugin } = require ('djantajs-runtime');

/**
 * So far, the plugin annotation might take place you class definition level as follow:
 * @plugin(name="MyPorteDemoService", version="1.0.1", engine=[">=7.6.0"],
 *  settings=[@setting(name='my-setting-identifier', value=#{any value goes here}, description='Each setting description here!')]
 * )
 */
module.exports = class MySettingDemoServiceClass extends Plugin {
   /**
    * Qualified default class constructor
    * @param {*} options construction plugin configurable option
    */
   constructor(options = {}){
     super(options);
   }
}
```

### Result @ `.djanta-rc.json`

```json
{
  "plugins": [
    {
      "name": "MyPorteDemoService",
      "enabled": true,
      "version": "1.0.1",
      "order": -1,
      "engine": [
        ">=7.6.0"
      ],
      "settings": [
        {
          "name": "my-setting-identifier",
          "value": "#{any value goes here}",
          "description": "Each setting description here!"
        }
      ]
    }
  ]
}
```

## The "@contribution" annotation

### Overview
In your project's Gruntfile, add a section named `bundlerc` to the data object passed into `grunt.initConfig()`.

## The "@controller" annotation

### Overview
In your project's Gruntfile, add a section named `bundlerc` to the data object passed into `grunt.initConfig()`.

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

* version of djantajs-compiler-rc
* platform
* any error messages or other information that might be useful.

### Bad Pratices

## Release History
_(Nothing yet)_

**Koffi ASSOUTOVI**

* [github/djantaio](https://github.com/djantaio)
* [twitter/djantaio](http://twitter.com/djantaio)

## Roadmap

## License

Copyright © 2015-2018 [DJANTA, LLC](https://github.com/djanta/djantajs-compiler-rc/blob/master/LICENSE)

Released under the MIT license.
