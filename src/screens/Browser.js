'use strict' ;

import { Os } from './Os.js';

/**
 * Get the browser informations
 * @summary Get the browser informations
 * @name Browser
 * @class
 * @memberof screens
 */
export function Browser()
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
        _version : { writable : true  , value : null }

    });

    this.__initialize__();
}

Browser.prototype = Object.create( Object.prototype ,
{
    constructor : { value : Browser } ,

    /**
     * Get the name of the browser
     * @return The name of the browser
     * @name name
     * @memberof screens
     */
    name : { get : function() { return this._name ; } } ,

    /**
     * Get the version of the browser
     * @return The version of the browser
     * @name version
     * @memberof screens
     */
    version : { get : function() { return this._version ; } } ,

    /**
     * Initialize the browser infos
     * @private
     */
    __initialize__ : { writable : true , value : function()
    {
        let ua = navigator.userAgent;
        let name = "";
        let version = "";

        if( /Arora\/([\w\.-]+)/.test( ua ) )
        {
            name = Browser.ARORA;
            version = RegExp.$1;
        }
        else if( /Edge\/([\w\.-]+)/.test( ua ) )
        {
            name = Browser.EDGE;
            version = RegExp.$1;
        }
        else if( /Opera\/([\w\.-]+)/.test( ua ) )
        {
            name = Browser.OPERA;
            version = RegExp.$1;
        }
        else if( /OPR\/([\w\.-]+)/.test( ua ) )
        {
            name = Browser.OPERA;
            version = RegExp.$1;
        }
        else if( /Silk\/([\w\.-]+)/.test( ua ) )
        {
            name = Browser.SILK;
            version = RegExp.$1;
        }
        else if( /Chrome\/([\w\.-]+)/.test( ua ) && ( Os.name !== Os.WINDOWS_PHONE ) )
        {
            name = Browser.CHROME;
            version = RegExp.$1;
        }
        else if( /CriOS\/([\w\.-]+)/.test( ua ) )
        {
            name = Browser.CHROME;
            version = RegExp.$1;
        }
        else if( /Epiphany\/([\w\.-]+)/.test( ua ) )
        {
            name = Browser.EPIPHANY;
            version = RegExp.$1;
        }
        else if( /Firefox\D+([\w\.-]+)/.test( ua ) )
        {
            name = Browser.FIREFOX;
            version = RegExp.$1;
        }
        else if( /FxiOS\/([\w\.-]+)/.test( ua ) )
        {
            name = Browser.FIREFOX;
            version = RegExp.$1;
        }
        else if( /MSIE ([\w\.-]+)/.test( ua ) )
        {
            name = Browser.IE;
            version = RegExp.$1;
        }
        else if( /Midori\/([\w\.-]+)/.test( ua ) )
        {
            name = Browser.MIDORI;
            version = RegExp.$1;
        }
        else if( /Safari/.test( ua ) && ( Os.name !== Os.WINDOWS_PHONE ) )
        {
            name = Browser.SAFARI;
            if( /Version\/([\w\.-]+)/.test( ua ) )
            {
                version = RegExp.$1;
            }
        }
        else if( /Trident\/(\d+\.\d+)(.*)rv:([\w\.-]+)/.test( ua ) )
        {
            name = Browser.TRIDENT;
            version = RegExp.$3;
        }

        this._name    = name;
        this._version = version;
    }}
});

Object.defineProperties( Browser ,
{
    /**
    * The <code>'Arora'</code> browser.
    * @memberof screens.Browser
    * @const
    * @type {string}
    */
    ARORA : { value : 'Arora' , enumerable : true } ,

    /**
    * The <code>'chrome'</code> browser.
    * @memberof screens.Browser
    * @const
    * @type {string}
    */
    CHROME : { value : 'Chrome' , enumerable : true } ,

    /**
    * The <code>'epiphany'</code> browser.
    * @memberof screens.Browser
    * @const
    * @type {string}
    */
    EPIPHANY : { value : 'Epiphany' , enumerable : true } ,

    /**
    * The <code>'firefox'</code> browser.
    * @memberof screens.Browser
    * @const
    * @type {string}
    */
    FIREFOX : { value : 'Firefox' , enumerable : true } ,

    /**
    * The <code>'ie'</code> browser.
    * @memberof screens.Browser
    * @const
    * @type {string}
    */
    IE : { value : 'ie' , enumerable : true } ,

    /**
    * The <code>'midori'</code> browser.
    * @memberof screens.Browser
    * @const
    * @type {string}
    */
    MIDORI : { value : 'Midori' , enumerable : true } ,

    /**
    * The <code>'opera'</code> browser.
    * @memberof screens.Browser
    * @const
    * @type {string}
    */
    OPERA : { value : 'Opera' , enumerable : true } ,

    /**
    * The <code>'safari'</code> browser.
    * @memberof screens.Browser
    * @const
    * @type {string}
    */
    SAFARI : { value : 'Safari' , enumerable : true } ,

    /**
    * The <code>'trident'</code> browser.
    * @memberof screens.Browser
    * @const
    * @type {string}
    */
    TRIDENT : { value : 'Trident' , enumerable : true } ,

    /**
    * The <code>'edge'</code> browser.
    * @memberof screens.Browser
    * @const
    * @type {string}
    */
    EDGE : { value : 'Edge' , enumerable : true } ,

    /**
    * The <code>'silk'</code> browser.
    * @memberof screens.Browser
    * @const
    * @type {string}
    */
    SILK : { value : 'Silk' , enumerable : true }
} );
