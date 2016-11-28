"use strict" ;

import { Enum } from '../Enum.js' ;

/**
 * Defines the policy of the timeout states in your application.
 * @summary Defines the policies of the timeout states in your application.
 * @name TimeoutPolicy
 * @class
 * @memberof system.process
 * @extends system.Enum
 * @param {number} value - The value of the enumeration.
 * @param {string} name - The name key of the enumeration.
 * @example
 * var TimeoutPolicy = system.process.TimeoutPolicy  ;
 *
 * trace( TimeoutPolicy.INFINITY ) ;
 * trace( "infinity : " + TimeoutPolicy.INFINITY ) ;
 * trace( "toString : " + TimeoutPolicy.INFINITY.toString() ) ;
 * trace( "valueOf  : " + TimeoutPolicy.INFINITY.valueOf() ) ;
 *
 * trace( TimeoutPolicy.LIMIT ) ;
 * trace( "limit : " + TimeoutPolicy.LIMIT ) ;
 * trace( "toString : " + TimeoutPolicy.LIMIT.toString() ) ;
 * trace( "valueOf  : " + TimeoutPolicy.LIMIT.valueOf() ) ;
 */
export function TimeoutPolicy( value , name )
{
    Enum.call( this , value , name ) ;
}

TimeoutPolicy.prototype = Object.create( Enum.prototype );
TimeoutPolicy.prototype.constructor = TimeoutPolicy;

Object.defineProperties( TimeoutPolicy ,
{
    /**
     * Designates the infinity timeout policy (0).
     * @name INFINITY
     * @memberof system.process.TimeoutPolicy
     * @const
     * @type {system.process.TimeoutPolicy}
     */
    INFINITY : { value : new TimeoutPolicy( 0 , 'infinity' ) , enumerable : true } ,

    /**
     * Designates the limited timeout policy (1).
     * @name LIMIT
     * @memberof system.process.TimeoutPolicy
     * @const
     * @type {system.process.TimeoutPolicy}
     */
    LIMIT : { value : new TimeoutPolicy( 1 , 'limit' ) , enumerable : true }
});