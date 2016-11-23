"use strict" ;

/**
 * Executes a function on each item in the object. Each invocation of iterator is called with three arguments: (value, key, ref).
 * @name forEach
 * @memberof core.objects
 * @function
 * @param {Object} object The reference of the object to enumerate.
 * @param {Function} callback The function to run on each item in the object. This function can contain a simple command (for example, a trace() statement) or a more complex operation, and is invoked with three arguments; the value of an item, the key of an item, and the object reference : <code>function callback(item:*, key:*, ref:Object):void;</code>.
 * @param {Object} [context=null] An object to use as this for the callback function.
 * @param {*} [breaker=null] value to stop the enumeration. If this argument is null the behaviour is forgotten.
 * @example
 * var object = { one:1 , two:2 , three:3 , four:4 , five:5 } ;
 *
 * var action = function( value , key , ref )
 * {
 *     trace( "key:" + key + " value:" + value ) ;
 *     return value ;
 * }
 *
 * forEach( object , action ) ;
 *
 * trace( "----" ) ;
 *
 * forEach( object , action, null, 3 ) ;
 *
 * trace( "----" ) ;
 *
 * forEach( [1,2,3,4] , action ) ; // use the Array.forEach method over Array objects.
 */
export function forEach( object , callback , context = null , breaker = null ) /*Object*/
{
    if( !object )
    {
        return ;
    }
    if( ("forEach" in object) && ( object.forEach instanceof Function ) )
    {
        object.forEach( callback , context ) ;
    }
    else
    {
        for ( var key in object )
        {
            if( object.hasOwnProperty(key) )
            {
                if( breaker !== null )
                {
                    if ( callback.call( context , object[key] , key , object ) === breaker )
                    {
                        return;
                    }
                }
                else
                {
                     callback.call( context , object[key] , key , object ) ;
                }
            }
        }
    }
}