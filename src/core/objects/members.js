"use strict" ;

/**
 * Returns all the public members of an object, either by key or by value.
 * @param o The target object to enumerate.
 * @param byValue The optional flag indicates if the function return an Array of strings (keys) or of values (default false).
 * <p><b>Example :</b></p>
 * <code class="prettyprint">
 * var o = { a : 5 , b : 6 } ;
 * trace( core.dump( core.objects.members( o ) ) ) ; // [a,b]
 * trace( core.dump( core.objects.members( o , true ) ) ) ; // [5,6]
 * </code>
 * @return Array containing all the string key names or values (if the byValue argument is true). The method returns null if no members are finding.
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