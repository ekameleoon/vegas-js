"use strict" ;

/**
 * Shuffles an array.
 * @name shuffle
 * @memberof core.arrays
 * @function
 * @instance
 * @param {Array} ar - The array to shuffle.
 * @return {Array} the shuffled array.
 * @example
 * var = [0,1,2,3,4,5,6,7,8,9] ;
 * trace( ar ) ;
 * shuffle( ar ) ;
 * trace( ar ) ;
 */
export function shuffle( ar  ) 
{
    if( ar instanceof Array )
    {
        let item ;
        let rdm  ;
        let tmp  = [] ;
        let len    = ar.length;
        let index  = len - 1 ;
        for ( var i  = 0 ; i < len ; i++ )
        {
            rdm  = Math.round( Math.random() * index ) ;
            item = ar[ rdm ] ;
            ar.splice( rdm , 1 ) ;
            tmp[tmp.length] = item ;
            index-- ;
        }
        while(--len > -1)
        {
            ar[len] = tmp[len] ;
        }
    }
    else
    {
        ar = null ;
    }
    return ar ;
}