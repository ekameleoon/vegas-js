# VEGAS #

Vegas is an opensource framework based on ECMAScript.

This repository contains the Javascript [ES6](http://es6-features.org/) version of the framework.

### About ###

 * Author : Marc ALCARAZ (aka eKameleon)
 * Mail : ekameleon@gmail.com
 * Link : http://www.ooopener.com

### Licenses ###

Under tree opensource licenses : **MPL 1.1/GPL 2.0/LGPL 2.1**

 * License MPL 1.1 : http://www.mozilla.org/MPL/MPL-1.1.html
 * License GPL 2 : http://www.gnu.org/licenses/gpl-2.0.html
 * License LGPL 2.1 : http://www.gnu.org/licenses/lgpl-2.1.html

### Slack Community ###

![slack-logo-vector-download.jpg](https://bitbucket.org/repo/AEbB9b/images/3509366499-slack-logo-vector-download.jpg)

Send us your email to join the **VEGAS** community on Slack !

### Install ###

#### YARN / NPM ####

You can install VEGAS JS with [NPM](https://www.npmjs.com/package/vegas-js) or [Yarn](https://yarnpkg.com/).

```
#!shell
yarn install vegas-js --save-dev
```

or

```
#!shell
npm install vegas-js --save-dev
```

#### Bower ####

```
#!shell
bower install vegas-js
```

#### Tutorials ####

* [The system.transitions package](https://bitbucket.org/ekameleon/vegas-js/wiki/system.transitions)

#### Unit tests ####

We use the [Mocha](https://mochajs.org) and Chai (http://chaijs.com/) tools to run the unit tests of the VEGAS JS libraries.

```
#!shell
gulp ut
```

or watch your modifications with :

```
#!shell
gulp test
```

**Note** : You can use the two options **--match** and **--reporter** in the unit tests gulp task.

The **--match** option trigger the unit test engine (based on **[Mocha](https://mochajs.org/)**) to only run tests matching the given pattern which is internally compiled to a RegExp, for examples : 

```
#!shell
gulp ut --match graphics
```
Run all the graphics package unit tests.

```
#!shell
gulp ut --match graphics.CardinalDimension
```
Run only the graphics.CardinalDimension unit tests.


The **--reporter** option define the unit test result rendering in the terminal with the values : 'spec', 'dot', 'landing', 'dot', 'nyan', 'list', 'mochawesome'. By default the 'spec' value is used. 

```
#!shell
gulp ut --reporter nyan
```
![nyan.png](https://bitbucket.org/repo/E9RjA6/images/3930502565-nyan.png)

If you use the 'mochawesome' reporter, gulp generate in the './bin/tests' folder an HTML page who contains all the unit tests. For more informations, read the official documentation of [Mochawesome](https://github.com/adamgruber/mochawesome).

#### Documentation ####

The documentation of the framework is based on [JSDoc](http://usejsdoc.org/). 

Run the documentation build with gulp :
```
#!shell
gulp doc
```

The documentation is generated in the main project folder : **./docs**

### History ###

 * 1998 : Flash
 * 2000 : First framework concept and first libraries (components, tools, design patterns)
 * 2004 : First official SVN repository
 * 2007 : Fusion with the Maashaack framework (eden, etc.)
 * 2015 : Google Code must die - **VEGAS** move from an old Google Code SVN repository to this Bitbucket GIT repository and REBOOT this source code.
 * 2016 : Begin the new JS architecture of the VEGAS JS library based on ES6