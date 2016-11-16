"use strict" ;

/**
 * The string expression of the current VEGAS version.
 */
export const version = '<@VERSION@>' ;

var library = 'VEGAS JS' ;
var link    = 'https://bitbucket.org/ekameleon/vegas-js' ;
var skip    = false ;

/**
 * Logs out the version and renderer information for this running instance of VEGAS JS.
 * If you don't want to see this message you can run `vegas.skipHello()` before creating your application.
 * @static
 */
export function sayHello()
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
                `\n %c %c %c ${library} ${version} %c %c ${link} %c %c\n\n`,
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
            window.console.log(`VEGAS JS 1.0.5 - https://bitbucket.org/ekameleon/vegas-js`);
        }
    }
    catch( error )
    {
        // do nothing
    }
}

/**
 * Skips the hello message of renderers that are created after this is run.
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
            sayHello() ;
        }, false );
    }
}
catch( error )
{
    // do nothing
}
