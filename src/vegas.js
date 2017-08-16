"use strict" ;

import { sayHello } from './core/hello.js' ;
import { ucFirst } from './core/strings/ucFirst.js' ;

import './polyfill/index.js' ;

/**
 * The VEGAS.js framework.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export { global }    from './core/global.js' ;
export { sayHello }  from './core/hello.js' ;
export { skipHello } from './core/hello.js' ;
export { trace }     from './core/trace.js' ;

export { core }     from './core.js' ;
export { system }   from './system.js' ;
export { graphics } from './graphics.js' ;
export { molecule } from './molecule.js' ;
export { screens }  from './screens.js' ;

/**
 * The string expression of the current VEGAS version.
 * @name version
 * @type string
 * @global
 */
export const version = '<@VERSION@>' ;

/**
 * The metadatas object to describe the <b>VEGAS JS</b> framework.
 * @name metas
 * @property {string} name - The name of the library
 * @property {string} description - The description of the library
 * @property {string} version - The version of the library
 * @property {string} license - The license of the library
 * @property {string} url - The url of the library
 * @type Object
 * @global
 * @example
 * trace( core.dump( metas ) ) ;
 */
export const metas = Object.defineProperties( {} ,
{
    name        : { enumerable : true , value : ucFirst('<@NAME@>') } ,
    description : { enumerable : true , value : "<@DESCRIPTION@>" },
    version     : { enumerable : true , value : version } ,
    license     : { enumerable : true , value : "<@LICENSE@>" } ,
    url         : { enumerable : true , value : '<@HOMEPAGE@>' }
});

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
