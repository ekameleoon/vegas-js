/* jshint -W079 */
"use strict" ;

/**
 * The <code>requestAnimationFrame()</code> method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes as an argument a callback to be invoked before the repaint.
 * @module requestAnimationFrame
 * @function
 * @instance
 * @memberof core
 * @param {Function} callback - A parameter specifying a function to call when it's time to update your animation for the next repaint. The callback has one single argument, a <code>DOMHighResTimeStamp</code>, which indicates the current time (the time returned from <code>Performance.now()</code> ) for when requestAnimationFrame starts to fire callbacks.
 * @return {number} A long integer value, the request id, that uniquely identifies the entry in the callback list. This is a non-zero value, but you may not make any other assumptions about its value. You can pass this value to window.cancelAnimationFrame() to cancel the refresh callback request.
 * @example
 * var start = performance.now() ;
 *
 * function step( timestamp )
 * {
 *     var progress = timestamp - start;
 *     console.log( 'tick: ' + progress ) ;
 *     if (progress < 2000)
 *     {
 *         id = requestAnimationFrame(step);
 *     }
 * }
 *
 * var id = requestAnimationFrame(step);
 */
export { requestAnimationFrame } from '../polyfill/requestAnimationFrame.js' ;