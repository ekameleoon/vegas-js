"use strict" ;

import { ucFirst } from './core/strings/ucFirst.js' ;
import './polyfill/index.js' ;

/**
 * The VEGAS.js framework.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export { global }   from './core/global.js' ;
export { trace  }   from './core/trace.js' ;
export { core   }   from './core.js' ;
export { system }   from './system.js' ;
export { graphics } from './graphics.js' ;

//export { molecule } from './molecule.js' ;

/**
 * The string expression of the current VEGAS version.
 * @name version
 * @type string
 * @global
 */
export const version = '<@VERSION@>' ;


/**
 * The metadatas object to describe the VEGAS JS framework.
 * @name version
 * @type string
 * @global
 */
export const metas = Object.defineProperties( {} ,
{
    name        : { enumerable : true , value : ucFirst('<@NAME@>') } ,
    description : { enumerable : true , value : "<@DESCRIPTION@>" },
    version     : { enumerable : true , value : version } ,
    license     : { enumerable : true , value : "<@LICENSE@>" } ,
    url         : { enumerable : true , value : '<@HOMEPAGE@>' }
});

var skip = false ;

/**
 * Logs out the version and renderer information for this running instance of VEGAS JS.
 * If you don't want to see this message you can run `vegas.skipHello()` before creating your application.
 * @name sayHello
 * @function
 * @global
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
            sayHello(metas.name,metas.version,metas.url) ;
        }, false );
    }
}
catch( error )
{
    // do nothing
}