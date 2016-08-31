'use strict' ;

export function trace()
{
    Object.setPrototypeOf( arguments , Array.prototype ) ;
    console.log.apply( null , arguments ) ;
}