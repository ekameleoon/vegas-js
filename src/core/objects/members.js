"use strict" ;

/**
 * Returns all the public members of an object, either by key or by value.
 * @example
 * <pre><code>
 * var o = { a : 5 , b : 6 } ;
 * trace( core.dump( core.objects.members( o ) ) ) ; // [a,b]
 * trace( core.dump( core.objects.members( o , true ) ) ) ; // [5,6]
 * </code></pre>
 * @param {object} o The target object to enumerate.
 * @param {boolean} [byValue=false] The optional flag indicates if the function return an Array of strings (keys) or of values.
 * @return {array} An array containing all the string key names or values (if the #byValue argument is true). The method returns null if no members are finding.
 */
export function members( o /*Object*/ , byValue /*Boolean*/ ) /*Array*/
{
    byValue = Boolean( byValue === true ) ;
    var members /*Array*/ = [];
    if( byValue )
    {
        for( var prop /*String*/ in o )
        {
            if( o.hasOwnProperty(prop) )
            {
                members.push( o[prop] );
            }
        }
    }
    else
    {
        for( var member /*String*/ in o )
        {
            if( o.hasOwnProperty(member) )
            {
                members.push( member );
            }
        }
    }
    return members.length > 0 ? members : null ;
}