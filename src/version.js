"use strict" ;

/**
 * The string expression of the current VEGAS version.
 * @name version
 * @type string
 * @global
 */
export const version = '<@VERSION@>' ;

var lib  = 'VEGAS JS' ;
var link = 'https://bitbucket.org/ekameleon/vegas-js' ;

var skip  = false ;

/**
 * Logs out the version and renderer information for this running instance of VEGAS JS.
 * If you don't want to see this message you can run `vegas.skipHello()` before creating your application.
 * @name sayHello
 * @function
 * @global
 */
export function sayHello( name = 'VEGAS JS' , link = 'https://bitbucket.org/ekameleon/vegas-js' , version = "1.0.0" )
{
    if( skip )
    {
        return ;
    }
    try
    {
        if ( navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
        {
            const args = [
                `\n %c %c %c ${name} ${version} %c %c ${link} %c %c\n\n`,
                'background: #ff0000; padding:5px 0;',
                'background: #AA0000; padding:5px 0;',
                'color: #F7FF3C; background: #000000; padding:5px 0;',
                'background: #AA0000; padding:5px 0;',
                'color: #F7FF3C; background: #ff0000; padding:5px 0;',
                'background: #AA0000; padding:5px 0;',
                'background: #ff0000; padding:5px 0;',
            ];

            window.console.log.apply( console , args );
        }
        else if (window.console)
        {
            window.console.log(`${name} ${version} - ${link}`);
        }
    }
    catch( error )
    {
        // do nothing
    }
}

/**
 * Skips the hello message of renderers that are created after this is run.
 * @name global
 * @function
 * @global
 */
export function skipHello()
{
    skip = true ;
}

try
{
    if ( window )
    {
        window.addEventListener( 'load' , function load()
        {
            window.removeEventListener( "load", load, false ) ;
            sayHello(lib,link,version) ;
        }, false );
    }
}
catch( error )
{
    // do nothing
}
