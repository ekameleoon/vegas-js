# VEGAS JS#

**Vegas JS** - **version 1.0** is an *Opensource* Framework based on **ECMAScript** for develop crossplatform **Rich Internet Applications** and **Games**.

This project contains a set of libraries writing in **Javascript** and based on the [ES6](http://es6-features.org/) standard :

| package  | description                                                                                                                                                                                                                                                                                                                                         |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **[core](http://vegasjs.ooopener.com/core.html)**     | The [core](http://vegasjs.ooopener.com/core.html) package is specialized in functions utilities that are highly reusable without creating any dependencies : arrays, strings, chars, objects, numbers, maths, etc.                                                                                                                                                                                          |
| **[system](http://vegasjs.ooopener.com/system.html)**   | The [system](http://vegasjs.ooopener.com/system.html) package is the root for the **VEGAS JS** framework. It is the starting point of our RIA framework structure : signals, data, IoC, logger, tasks, transitions, logics, rules, models, etc.                                                                                                                                                                              |
| **[graphics](http://vegasjs.ooopener.com/graphics.html)** | The [graphics](http://vegasjs.ooopener.com/graphics.html) library is an intuitive graphics API to manipulate all display objects in your applications. Offers a lot of powerful functionality to create and work with graphics, colors and geometrics objects, all neatly wrapped up in a well designed, consistent and clean programming interface. |

### About

 * Author : Marc ALCARAZ (aka eKameleon)
 * Mail : ekameleon[at]gmail.com
 * Link : [http://www.ooopener.com](http://www.ooopener.com)

### License

Under tree opensource licenses :

 * [License MPL 1.1](http://www.mozilla.org/MPL/MPL-1.1.html)
 * [License GPL 2](http://www.gnu.org/licenses/gpl-2.0.html)
 * [License LGPL 2.1](http://www.gnu.org/licenses/lgpl-2.1.html)

## Resources

#### ⌜ Download

Download on **Bitbucket** the latest code, report an issue, ask a question or contribute :

 * [http://bitbucket.org/ekameleon/vegas-js](http://bitbucket.org/ekameleon/vegas-js)

#### ⌜ Documentation

Get started with the the **Vegas JS** API :

 * [http://vegasjs.ooopener.com/](http://vegasjs.ooopener.com/)

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
yarn add vegas-js --dev
```

or

```
npm install vegas-js --save-dev
```

#### ⌜ Bower

```
bower install vegas-js
```

## Builds

**VEGAS JS** use [Gulp](http://gulpjs.com/) and [Yarn](https://yarnpkg.com/) with a serie of powerful packages (Babel, Mocha, etc.) to build.


#### ⌜ Simple Build

1 - The first time, clone the **VEGAS JS** repository

2 - Initialize the project
```
yarn install
```

**Note:** See the <code>gulpfile.babel.js</code> file at the top of the project folder.

3 - Build the binaries (vegas.js and vegas.min.js), the unit tests and the documentation.
```
gulp
```

#### ⌜ Unit tests

We use the [Mocha](https://mochajs.org) and Chai (http://chaijs.com/) tools to run the unit tests of the VEGAS JS libraries.

```
gulp ut
```

or watch your modifications with :

```
gulp test
```

**Note** : You can use the two options **--match** and **--reporter** in the unit tests gulp task.

The **--match** option trigger the unit test engine (based on **[Mocha](https://mochajs.org/)**) to only run tests matching the given pattern which is internally compiled to a RegExp, for examples :

```
gulp ut --match graphics
```
Run all the graphics package unit tests.

```
gulp ut --match graphics.CardinalDimension
```
Run only the graphics.CardinalDimension unit tests.


The **--reporter** option define the unit test result rendering in the terminal with the values : 'spec', 'dot', 'landing', 'dot', 'nyan', 'list', 'mochawesome'. By default the 'spec' value is used.

```
gulp ut --reporter nyan
```
![nyan.png](https://bitbucket.org/repo/E9RjA6/images/3930502565-nyan.png)

If you use the 'mochawesome' reporter, gulp generate in the './bin/tests' folder an HTML page who contains all the unit tests. For more informations, read the official documentation of [Mochawesome](https://github.com/adamgruber/mochawesome).

```
gulp ut --reporter mochawesome
```

#### ⌜ Generates the documentation

The documentation of the framework is based on [JSDoc](http://usejsdoc.org/).

Run the documentation build with gulp :
```
gulp doc
```

The documentation is generated in the main project folder : **./docs**

## History

 * 1998 : Flash
 * 2000 : First framework concept and first libraries (components, tools, design patterns)
 * 2004 : First official SVN repository
 * 2007 : Fusion with the Maashaack framework (eden, etc.)
 * 2015 : Google Code must die - **VEGAS** move from an old Google Code SVN repository to this Bitbucket GIT repository and REBOOT this source code.
 * 2016 : Begin the new JS architecture of the VEGAS JS library based on ES6