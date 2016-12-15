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
        __name__ : { writable : true  , value : null } ,

        /**
         * @private
         */
        __version__ : { writable : true  , value : null }

    });

    this.getBrowserInfos();
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
    name : { get : function() { return this.__name__ ; } } ,

    /**
     * Get the version of the browser
     * @return The version of the browser
     * @name version
     * @memberof screens
     */
    version : { get : function() { return this.__version__ ; } } ,

    // ------- protected

    /**
     * Get the browser infos
     * @name getBrowserInfos
     * @memberof screens
     */
    getBrowserInfos : { writable : true , value : function()
    {
        let ua = navigator.userAgent;
        let name = "";
        let version = "";

        if( /Arora/.test( ua ) )
        {
            name = Browser.ARORA;
        }
        else if( /Edge\/(\d+)/.test( ua ) )
        {
            name = Browser.EDGE;
            version = parseInt( RegExp.$1 , 10 );
        }
        else if( /Opera\/(\d+)/.test( ua ) )
        {
            name = Browser.OPERA;
            version = parseInt( RegExp.$1 , 10 );
        }
        else if( /OPR\/(\d+)/.test( ua ) )
        {
            name = Browser.OPERA;
            version = parseInt( RegExp.$1 , 10 );
        }
        else if( /Chrome\/(\d+)/.test( ua ) && ( Os.name !== Os.WINDOWS_PHONE ) )
        {
            name = Browser.CHROME;
            version = parseInt( RegExp.$1 , 10 );
        }
        else if( /Epiphany/.test( ua ) )
        {
            name = Browser.EPIPHANY;
        }
        else if( /Firefox\D+(\d+)/.test( ua ) )
        {
            name = Browser.FIREFOX;
            version = parseInt( RegExp.$1 , 10 );
        }
        else if( /FxiOS\/(\d+)/.test( ua ) )
        {
            name = Browser.FIREFOX;
            version = parseInt( RegExp.$1 , 10 );
        }
        else if( /AppleWebKit/.test( ua ) && ( ( Os.name === Os.IPAD ) || ( Os.name === Os.IPOD ) || ( Os.name === Os.IPHONE ) ) )
        {
            name = Browser.SAFARI;
        }
        else if( /MSIE (\d+\.\d+);/.test( ua ) )
        {
            name = Browser.IE;
            version = parseInt( RegExp.$1 , 10 );
        }
        else if( /Midori/.test( ua ) )
        {
            name = Browser.MIDORI;
        }
        else if( /Safari/.test( ua ) && ( Os.name !== Os.WINDOWS_PHONE ) )
        {
            name = Browser.SAFARI;
        }
        else if( /Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test( ua ) )
        {
            name = Browser.TRIDENT;
            version = parseInt( RegExp.$3 , 10 );
        }
        else if( /Silk/.test( ua ) )
        {
            name = Browser.SILK;
        }

        this.__name__    = name;
        this.__version__ = version;
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
