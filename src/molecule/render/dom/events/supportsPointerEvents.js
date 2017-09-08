"use strict" ;

/**
 * Does the device support pointer events
 * https://www.w3.org/Submission/pointer-events/
 * @name supportsPointerEvents
 * @readonly
 * @member {boolean}
 * @memberof molecule.render.dom.events
 * @version 1.0.8
 * @since 1.0.8
 */
export var supportsPointerEvents = !!window.PointerEvent;