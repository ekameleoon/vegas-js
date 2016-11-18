# VEGAS JS OpenSource Framework - Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
* Adds the --match and --reporter arguments in the 'gulp test' and 'gulp ut' tasks.
* Adds the core.arrays.swap function.
* Adds an example of the Tween class with the Pixi library.
* Adds the graphics package with this first implementations : Align, Border, CardinalCoordinates, Corner, ZOrder, etc.

### Changed
* Updates the core.arrays.sortOn method.
* Refactoring of the polyfill files.

### Fixed
* Fix the performance.now() method.

## [1.0.6] - 2016-11-16
### Added
* Adds the vegas.sayHello and vegas.skipHello methods
* Adds the vegas.sayHello prompt
* Adds the new basic example to illustrate the skyHello method usage.

### Changed
* Changes the gulp versioning based on the package.json file

### Removed
* Removes the htdocs/ folder, use now the examples/ folder only

## [1.0.5] - 2016-11-15
### Added
* Adds the core.easings package with all the easing functions.
* Adds the system.transitions package.
* Adds the system.transitions.TweenUnit class and example.
* Adds the system.transitions.Tween class and example.
* Adds the system.transitions unit tests

### Changed
* Changes the gulp tasks

## [1.0.0] - 2016-08-31
### Added
* Use ES6
* First implementation with rollup + babel + gulp
* Adds the core package (arrays, strings, etc.)
* Adds the system package (signals, datas, etc.)

## [0.0.0] - 2015-05-15
### Added
* First Vegas Javascript copy from Google Code
