/* jshint -W079 */
"use strict" ;

/**
 * Cancels an animation frame request previously scheduled through a call to </code>requestAnimationFrame</code>.
 * @module cancelAnimationFrame
 * @memberof core
 * @instance
 * @function
 * @param {number} requestID - The ID value returned by the call to </code>requestAnimationFrame</code> that requested the callback.
 * @example
 * var start = performance.now() ;
 * var id ;
 *
 * function step( timestamp )
 * {
 *     var progress = timestamp - start;
 *     console.log( 'step: ' + progress ) ;
 *     if (progress < 2000)
 *     {
 *         id = requestAnimationFrame(step);
 *     }
 * }
 *
 * id = requestAnimationFrame(step);
 *
 * cancelAnimationFrame(id); // abord the animation
 */
export { cancelAnimationFrame } from '../polyfill/requestAnimationFrame.js' ;