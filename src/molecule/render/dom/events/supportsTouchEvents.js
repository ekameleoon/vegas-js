"use strict" ;

/**
 * Does the device support touch events
 * https://www.w3.org/TR/touch-events/
 * @readonly
 * @member {boolean}
 * @memberof molecule.render.dom.events
 * @version 1.0.8
 * @since 1.0.8
 */
export var supportsTouchEvents = 'ontouchstart' in window;