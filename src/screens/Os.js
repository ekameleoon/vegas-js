'use strict';

import { Device } from './Device.js' ;

/**
 * Get the os informations
 * @summary Get the os informations
 * @name Os
 * @class
 * @memberof screens
 */
export function Os()
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _name : { writable : true  , value : null } ,

        /**
         * @private
         */
        _type : { writable : true  , value : null } ,

        /**
         * @private
         */
        _version : { writable : true  , value : null }
    });

    this.__initialize__();
}

Os.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Os } ,

    /**
     * Get the name of the os
     * @return The name of the os
     * @name name
     * @memberof screens
     */
    name : { get : function() { return this._name ; } } ,

    /**
     * Get the type of the os
     * @return The type of the os
     * @name version
     * @memberof screens
     */
    type : { get : function() { return this._type ; } } ,

    /**
     * Get the version of the os
     * @return The version of the os
     * @name version
     * @memberof screens
     */
    version : { get : function() { return this._version ; } } ,

    /**
     * Initialize the browser informations.
     * @private
     */
    __initialize__ : { writable : true , value : function()
    {
        let ua = navigator.userAgent;
        let name = "";
        let type = "";
        let version = "";


        if( /iPad/.test( ua ) )
        {
            name = Os.IPAD;
            type = Device.MOBILE;
        }
        else if( /iPod/.test( ua ) )
        {
            name = Os.IPOD;
            type = Device.MOBILE;
        }
        else if( /iPhone/.test( ua ) )
        {
            name = Os.IPHONE;
            type = Device.MOBILE;
        }
        else if( /Mac OS/.test( ua ) )
        {
            name = Os.MAC;
            type = Device.DESKTOP;
        }
        else if( /Windows Phone/.test( ua ) )
        {
            name = Os.WINDOWS;
            type = Device.MOBILE;
        }
        else if( /Windows/.test( ua ) )
        {
            name = Os.WINDOWS;
            type = Device.DESKTOP;
        }
        else if( /Android/.test( ua ) )
        {
            name = Os.ANDROID;
            type = Device.MOBILE;
        }
        else if( /Linux/.test( ua ) )
        {
            name = Os.LINUX;
            type = Device.DESKTOP;
        }

        this._name    = name;
        this._type    = type;
        this._version = version;
    }}
});

Object.defineProperties( Os ,
{
    /**
    * The <code>'Android'</code> os.
    * @memberof screens.Os
    * @const
    * @type {string}
    */
    ANDROID : { value : 'Android' , enumerable : true } ,

    /**
    * The <code>'iPad'</code> os.
    * @memberof screens.Os
    * @const
    * @type {string}
    */
    IPAD : { value : 'iPad' , enumerable : true } ,

    /**
    * The <code>'iPod'</code> os.
    * @memberof screens.Os
    * @const
    * @type {string}
    */
    IPOD : { value : 'iPod' , enumerable : true } ,

    /**
    * The <code>'iPhone'</code> os.
    * @memberof screens.Os
    * @const
    * @type {string}
    */
    IPHONE : { value : 'iPhone' , enumerable : true } ,

    /**
    * The <code>'Linux'</code> os.
    * @memberof screens.Os
    * @const
    * @type {string}
    */
    LINUX : { value : 'Linux' , enumerable : true } ,

    /**
    * The <code>'Mac'</code> os.
    * @memberof screens.Os
    * @const
    * @type {string}
    */
    MAC : { value : 'Mac' , enumerable : true } ,

    /**
    * The <code>'Windows'</code> os.
    * @memberof screens.Os
    * @const
    * @type {string}
    */
    WINDOWS : { value : 'Windows' , enumerable : true } ,

    /**
    * The <code>'Windows Phone'</code> os.
    * @memberof screens.Os
    * @const
    * @type {string}
    */
    WINDOWS_PHONE : { value : 'Windows Phone' , enumerable : true }
} );
