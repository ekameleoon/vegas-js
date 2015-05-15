
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is eden: ECMAScript data exchange notation. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/


/* Singleton: buRRRn.eden
   The eden application.
*/
buRRRn.eden = {};

/* StaticProperty: logs
*/
buRRRn.eden.logs = [];

/* PrivateStaticMethod: _trace
   Allows to display messages in the console.
*/
buRRRn.eden._trace = function( /*String*/ message )
    {
    trace( message );
    }

/* StaticMethod: log
   Add a message to the logs queue.
*/
buRRRn.eden.log = function( /*String*/ message )
    {
    buRRRn.eden.logs.push( message );
    
    if( this.config.verbose )
        {
        buRRRn.eden._trace( message );
        }
    }

/* StaticMethod: showLogs
   Display all the logs in the console.
*/
buRRRn.eden.showLogs = function()
    {
    for( var i=0; i<this.logs.length; i++ )
        {
        this._trace( this.logs[i] );
        }
    }

/* StaticEvent: onParsed
   To override.
*/
buRRRn.eden.onParsed = function( value )
    {
    return value;
    }

/* StaticMethod: deserialize
   Dynamically interpret a source string.
   That's it, a small and fast ECMAScript parser.
*/
buRRRn.eden.deserialize = function( /*String*/ source, /*Object*/ scope, /*Object*/ callback )
    {
    return buRRRn.eden.ECMAScript.evaluate( source, scope, callback );
    }

/* StaticMethod: serialize
   Takes an object reference
   and serialize it as an ECMAScript string.
*/
buRRRn.eden.serialize = function( /*Object*/ reference, /*Int*/ indent )
    {
    
    if( !this.config.compress )
        {
        if( indent == null )
            {
            indent = 0;
            }
        }
    
    if( reference === _global )
        {
        return _global.ToSource( indent );
        }
    
    if( reference === undefined )
        {
        return this.config.undefineable;
        }
    
    if( reference === null )
        {
        return "null";
        }
    
    return reference.toSource( indent );
    }

/* StaticMethod: addAuthorized
   
*/
buRRRn.eden.addAuthorized = function( /*String*/ path, /*...*/ pathN )
    {
    var paths, i;
    paths = Array.fromArguments( arguments );
    
    for( i=0; i<paths.length; i++ )
        {
        if( !this.config.authorized.contains( paths[i] ) )
            {
            this.config.authorized.push( paths[i] );
            }
        }
    }

/* StaticMethod: removeAuthorized
   
*/
buRRRn.eden.removeAuthorized = function( /*String*/ path, /*...*/ pathN )
    {
    var paths, i, found;
    paths = Array.fromArguments( arguments );
    
    for( i=0; i<paths.length; i++ )
        {
        found = this.config.authorized.indexOf( paths[i] );
        if( found > -1 )
            {
            this.config.authorized.splice( found, 1 );
            }
        }
    }

/* StaticMethod: isAuthorized
   
*/
buRRRn.eden.isAuthorized = function( /*String*/ path )
{
    var i, strictMode, pathMode, firstLetter, whiteList, whiteListPath;
    strictMode  = this.config.strictMode;
    pathMode    = false;
    firstLetter = path.charAt( 0 );
    
    if( path.indexOf( "." ) > -1 )
    {
        pathMode = true;
    }
    
    if( !strictMode )
    {
        firstLetter = firstLetter.toLowerCase();
    }
    
    var filterFirstLetter = function( value, index, arrObj )
    {
        if( !strictMode )
        {
            value = value.toLowerCase();
        }
        
        if( value.startsWith( firstLetter ) )
        {
            return true;
        }
        
        return false;
    }
    
    whiteList = this.config.authorized.filter( filterFirstLetter );
    
    if( whiteList.length == 0 )
    {
        return false;
    }
    
    for( i=0; i<whiteList.length; i++ )
    {
        whiteListPath = whiteList[i];
        
        if( pathMode &&
            whiteListPath.endsWith( "*" ) &&
            path.startsWith( whiteListPath.replace( "*", "" ) ) )
        {
            return true;
        }
        else if( path == whiteListPath.replace( ".*", "" ) )
        {
            return true;
        }
    }
    
    return false;
}

// ----o load eden library

ext  = ".js" ;
path = "./"  ;

load( path + "buRRRn/eden/config"        + ext ) ;
load( path + "buRRRn/eden/strings"       + ext ) ;
load( path + "buRRRn/eden/GenericParser" + ext ) ;
load( path + "buRRRn/eden/ECMAScript"    + ext ) ;

delete ext ;
delete path ;
