"use strict" ;

export var skip = false ;

/**
 * Logs out the version and renderer information for this running instance of VEGAS JS.
 * If you don't want to see this message you can run `vegas.skipHello()` before creating your application.
 * @name sayHello
 * @function
 * @param {string} name - The name of the library.
 * @param {string} version - The version of the library.
 * @param {string} link - The url link of the library.
 * @global
 * @example
 * <!doctype html>
 * <html>
 *   <head>
 *      <meta charset="UTF-8">
 *      <title>Test VEGAS</title>
 *   </head>
 *   <body>
 *     <script src="./js/vegas.js"></script>
 *     <script>
 *     if( !vegas )
 *     {
 *         throw new Error("The VEGAS library is not found.") ;
 *     }
 *     // vegas.skipHello() ; // skip the library hello message
 *     window.onload = function()
 *     {
 *         vegas.trace( vegas.core.dump( vegas.metas ) ) ;
 *     }
 *     </script>
 *   </body>
 * </html>
 */
export function sayHello( name = '' , version = '' , link = '' )
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
 * Skips the default 'sayHello()' invokation at runtime.
 * @name skipHello
 * @function
 * @global
 * @example
 * <!doctype html>
 * <html>
 *   <head>
 *      <meta charset="UTF-8">
 *      <title>Test VEGAS</title>
 *   </head>
 *   <body>
 *     <script src="./js/vegas.js"></script>
 *     <script>
 *     if( !vegas )
 *     {
 *         throw new Error("The VEGAS library is not found.") ;
 *     }
 *     vegas.skipHello() ; // skip the library hello message
 *     window.onload = function()
 *     {
 *         vegas.trace( vegas.core.dump( vegas.metas ) ) ;
 *     }
 *     </script>
 *   </body>
 * </html>
 */
export function skipHello()
{
    skip = true ;
}