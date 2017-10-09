'use strict' ;

/**
 * Handle cookie. Code originaly from https://github.com/madmurphy/cookies.js
 * @name Cookie
 * @class
 * @memberof molecule.render.dom.data
 * @constructor
 * @version 1.0.8
 * @since 1.0.8
 */
export function Cookie() {}

Cookie.prototype = Object.create( Object.prototype ,
{
    constructor : { value : Cookie } ,

    /**
     * Returns the cookie reference by key.
     * @name get
     * @memberof molecule.render.dom.data.Cookie
     * @instance
     * @function
     * @param {string} key - The key identifier of the cookie.
     */
    get : { value : function( key )
    {
        if( !key )
        {
            return null ;
        }
        return decodeURIComponent
        (
            document.cookie.replace
            (
                new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent( key ).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$") , "$1"
            )
        ) || null ;
    }},

    /**
     * Check if the cookie exists.
     * @name has
     * @memberof molecule.render.dom.data.Cookie
     * @instance
     * @function
     * @param {string} key - The key identifier of the cookie.
     */
    has : { value : function( key )
    {
        if( !key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key) ) { return false ; }
        return ( new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }},

    /**
     * Returns all cookies.
     * @name keys
     * @memberof molecule.render.dom.data.Cookie
     * @instance
     * @function
     */
    keys : { value : function()
    {
        let keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/) ;
        for ( let len = keys.length , id = 0 ; id < len; id++ )
        {
            keys[id] = decodeURIComponent(keys[id]) ;
        }
        return keys ;
    }},

    /**
     * Remove the specific cookie if exists.
     * @name remove
     * @memberof molecule.render.dom.data.Cookie
     * @instance
     * @function
     * @param {string} key - The key identifier of the cookie.
     */
    remove : { value : function( key , path = null , domain = null )
    {
        if( !this.has( key ) ) { return false ; }
        document.cookie = encodeURIComponent( key ) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( domain ? "; domain=" + domain : "" ) + ( path ? "; path=" + path : "" ) ;
        return true ;
    }},

    /**
     * set the cookie.
     * @name set
     * @memberof molecule.render.dom.data.Cookie
     * @instance
     */
    set : { value : function( key , value , end = Infinity , path = '' , domain = '' , secure = '' )
    {
        if( !key || /^(?:expires|max\-age|path|domain|secure)$/i.test( key ) ) { return false ; }
        let expires = "" ;
        if( end )
        {
            switch( end.constructor )
            {
                case Number :
                {
                    expires = end === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + end ;
                    /*
                     Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
                     version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
                     the end parameter might not work as expected. A possible solution might be to convert the the
                     relative time to an absolute time. For instance, replacing the previous line with:
                     */
                    /*
                     expires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
                     */
                    break;
                }
                case String :
                {
                    expires = "; expires=" + end ;
                    break;
                }
                case Date :
                {
                    expires = "; expires=" + end.toUTCString() ;
                    break;
                }
            }
        }
        document.cookie = encodeURIComponent( key ) + "=" + encodeURIComponent( value ) + expires + ( domain ? "; domain=" + domain : "" ) + ( path ? "; path=" + path : "" ) + ( secure ? "; secure" : "" ) ;
        return true ;
    }}
});