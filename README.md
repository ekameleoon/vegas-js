# VEGAS JS

**Vegas JS** - **version 1.0** is an *Opensource* Framework based on **ECMAScript** for develop crossplatform **Rich Internet Applications** and **Games**.

This project contains a set of libraries writing in **Javascript** and based on the [ES6](http://es6-features.org/) standard :

| package  | description                                                                                                                                                                                                                                                                                                                                         |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **[core](https://vegasjs.ooopener.com/core.html)**     | The [core](https://vegasjs.ooopener.com/core.html) package is specialized in functions utilities that are highly reusable without creating any dependencies :  arrays, strings, chars, objects, numbers, maths, date, colors, etc.                                                                                                                                                                                          |
| **[system](https://vegasjs.ooopener.com/system.html)**   | The [system](https://vegasjs.ooopener.com/system.html) package is the root for the **VEGAS JS** framework. It is the starting point of our RIA framework structure : signals, W3C events, datas and collections (ADT), IoC container (Dependency Injection), logger, tasks, transitions, logics, rules, models, etc.                                                                                                                                                                              |
| **[graphics](https://vegasjs.ooopener.com/graphics.html)** | The [graphics](https://vegasjs.ooopener.com/graphics.html) library is an intuitive graphics API to manipulate all display objects in your applications. Offers a lot of powerful functionality to create and work with graphics, colors and geometrics objects, all neatly wrapped up in a well designed, consistent and clean programming interface. |

### About

 * Author : Marc ALCARAZ (aka eKameleon) - Creative Technologist and Digital Architect
 * Mail : ekameleon[at]gmail.com
 * LinkedIn : [https://www.linkedin.com/in/ekameleon/](https://www.linkedin.com/in/ekameleon/)

### License

Under tree opensource licenses :

 * [License MPL 2.0](https://www.mozilla.org/en-US/MPL/2.0/)
 * [License GPL 2.0+](https://www.gnu.org/licenses/gpl-2.0.html)
 * [License LGPL 2.1+](https://www.gnu.org/licenses/lgpl-2.1.html)

## Resources

#### ⌜ Download

Download on **Bitbucket** the latest code, report an issue, ask a question or contribute :

 * [https://bitbucket.org/ekameleon/vegas-js](https://bitbucket.org/ekameleon/vegas-js)

#### ⌜ Documentation

Get started with the the **Vegas JS** API :

 * [https://vegasjs.ooopener.com/](https://vegasjs.ooopener.com/)

#### ⌜ Tutorials

These tutorials helps you to understand the **VEGAS JS** Framework philosophy.

* [system.transitions](https://bitbucket.org/ekameleon/vegas-js/wiki/system.transitions) : Creates animations and tween effects in your projects.

#### ⌜ Slack Community

![slack-logo-vector-download.jpg](https://bitbucket.org/repo/AEbB9b/images/3509366499-slack-logo-vector-download.jpg)

Send us your email to join the **VEGAS** community on Slack !

## Install

#### ⌜ YARN / NPM

You can install VEGAS JS with [NPM](https://www.npmjs.com/package/vegas-js) or [Yarn](https://yarnpkg.com/).

```
$ yarn add vegas-js --dev
```

or

```
$ npm install vegas-js --save-dev
```

## Building and test the libraries

**VEGAS JS** use [Yarn](https://yarnpkg.com/) with a serie of powerful packages (Babel, Mocha, etc.) to compile and build this library.

#### ⌜ Simple Build

1 - The first time, initialize the project and run yarn :
```
$ yarn
```

2 - Test + compile all the libraries :
```
$ yarn build
```

#### ⌜ VEGAS (only) Build

1 - Build the **./dist/vegas.js** : not minified + no comments + sourcemap.
```
$ yarn dev
```

2 - Build the **./dist/vegas.js** and watch the changing into the **./src** folder.
```
$ yarn watch
```

3 - Build the **./dist/vegas.min.js** : minified + no comments.
```
$ yarn prod
```

4 - Build the **./dist/vegas.min.js** and the **./dist/vegas.js** libraries only.
```
$ yarn vegas
```

#### ⌜ Molecule

Molecule is an advanced extension of VEGAS JS to develop rich applications based on the standard DOM UI, [A-Frame](https://aframe.io/) or [PIXI JS](http://www.pixijs.com/).

1 - Build the **./dist/vegas.molecule.js** : not minified + no comments + sourcemap.
```
$ yarn molecule-dev
```

2 - Build the **./dist/vegas.molecule.js** and watch the changing into the **./src** folder.
```
$ yarn molecule-watch
```

3 - Build the **./dist/vegas.molecule.min.js** : vegas + molecule + minified + no comments.
```
$ yarn molecule-prod
```

4 - Build all the vegas+molecule libraries only.
```
$ yarn molecule
```

**Note :** See all the examples of the **molecule** library in the examples/ folder of the project.

#### ⌜ Examples

To launch the VEGAS HTML examples, use the command :
```
$ yarn example ./examples/molecule/pixi/basic.html
```

This command launch with the **BrowserSync** tool the html page of the example in your browser.

#### ⌜ Unit tests

We use the [Mocha](https://mochajs.org) and the Chai (http://chaijs.com/) tools to run the unit tests of the VEGAS JS libraries.

1 - Run all unit tests
```
$ yarn test
```

2 - Run a specific library, use one of this command :

```
$ yarn test-core
$ yarn test-system
$ yarn test-graphics
$ yarn test-molecule
```

The **--match** option trigger the unit test engine (based on **[Mocha](https://mochajs.org/)**) to only run tests matching the given pattern which is internally compiled to a RegExp, for examples :

```
$ yarn test -g graphics
```
Run all the graphics package unit tests.

```
$ yarn test -g graphics.CardinalDirection
$ yarn test -g core.arrays.contains
```
Run only the graphics.CardinalDimension unit tests or the core.arrays.contains module unit tests.

The **--reporter** option define the unit test result rendering in the terminal with the values : 'spec', 'dot', 'landing', 'dot', 'nyan', 'list', 'mochawesome'. By default the 'spec' value is used.

```
$ yarn test --reporter nyan
```
![nyan.png](https://bitbucket.org/repo/E9RjA6/images/3930502565-nyan.png)

#### ⌜ Generates the documentation

The documentation of the framework is based on [JSDoc](http://usejsdoc.org/).

Run the documentation build with gulp :
```
$ yarn doc
```

The documentation is generated in the folder : **./docs/bin**

## History

 * 1998 : Flash
 * 2000 : First framework concept and first libraries (components, tools, design patterns)
 * 2004 : First official SVN repository
 * 2007 : Fusion with the Maashaack framework (eden, etc.)
 * 2015 : Google Code must die - **VEGAS** move from an old Google Code SVN repository to this Bitbucket GIT repository and REBOOT this source code.
 * 2016 : Begin the new JS architecture of the VEGAS JS library based on ES6