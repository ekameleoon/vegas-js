/*jshint unused: false*/
"use strict" ;

/**
 * Indicates if the specific objet is Groupable.
 * @function
 * @memberof molecule
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link molecule.Groupable|Groupable}.
 */
export function isGroupable( target )
{
    if( target )
    {
        return target instanceof Groupable ||
               ( ( 'group' in target ) && ( 'groupName' in target ) ) ;
    }

    return false ;
}

/**
 * This interface defines an object groupable in the application.
 * @name Groupable
 * @memberof molecule
 * @interface
 */
export function Groupable()
{
    Object.defineProperties( this ,
    {
        /**
         * Indicates with a boolean if this object is grouped.
         * @name group
         * @memberof molecule.Groupable
         * @default false
         * @type {boolean}
         * @instance
         */
        group : { value : false, configurable : true , writable : true } ,

        /**
         * Indicates the name of the group of this object.
         * @name groupName
         * @memberof molecule.Groupable
         * @default null
         * @type {string}
         * @instance
         */
        groupName : { value : null, configurable : true , writable : true }
    }) ;
}

Groupable.prototype = Object.create( Object.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Groupable , writable : true }
});