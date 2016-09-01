"use strict" ;

import { Enum } from '../Enum.js' ;

/**
 * Creates a new TimeoutPolicy instance.
 * @example
 * <pre>
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
 * </pre>
 * @param value The value of the enumeration.
 * @param name The name key of the enumeration.
 */
export function TimeoutPolicy( value /*int*/ , name /*String*/ )
{
    Enum.call( this , value , name ) ;
}

/**
 * @extends Object
 */
TimeoutPolicy.prototype = Object.create( Enum.prototype );
TimeoutPolicy.prototype.constructor = TimeoutPolicy;

Object.defineProperties( TimeoutPolicy ,
{
    /**
     * Designates the infinity timeout policy (0).
     */
    INFINITY : { value : new TimeoutPolicy( 0 , 'infinity' ) , enumerable : true } ,

    /**
     * Designates the limited timeout policy (1).
     */
    LIMIT    : { value : new TimeoutPolicy( 1 , 'limit' ) , enumerable : true }
})

