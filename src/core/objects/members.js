"use strict" ;

/**
 * Returns all the public members of an object, either by key or by value.
 * @name members
 * @memberof core.objects
 * @function
 * @instance
 * @param {object} o The target object to enumerate.
 * @param {boolean} [byValue=false] The optional flag indicates if the function return an Array of strings (keys) or of values.
 * @return An array containing all the string key names or values (if the #byValue argument is true). The method returns null if no members are finding.
 * @example
 * var o = { a : 5 , b : 6 } ;
 * trace( core.dump( core.objects.members( o ) ) ) ; // [a,b]
 * trace( core.dump( core.objects.members( o , true ) ) ) ; // [5,6]
 */
export function members( o , byValue = false )
{
    byValue = Boolean( byValue === true ) ;
    var members  = [];
    if( byValue )
    {
        for( var prop  in o )
        {
            if( o.hasOwnProperty(prop) )
            {
                members.push( o[prop] );
            }
        }
    }
    else
    {
        for( var member  in o )
        {
            if( o.hasOwnProperty(member) )
            {
                members.push( member );
            }
        }
    }
    return members.length > 0 ? members : null ;
}