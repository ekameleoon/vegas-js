
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is core2: ECMAScript core objects 2nd gig. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2003-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
  
    - eKameleon (ekameleon@gmail.com) [2006-06-13]
    
        in SSAS version, add _global.$GLOBAL_PRIVATE_POLICY property.
        I use this hack in _global.GetObjectPath method with FCS(1). 
        
        Protected all private objects if _global.$GLOBAL_PRIVATE_POLICY is 'true'.
    
*/

// ----o Init _global object

var _global = this ;

_global.$CORE2_FIXGETYEAR = false;
_global.$CORE2_ERROR_CTOR = false;
_global.$CORE2_FCTNSTRING = true;
_global.$GLOBAL_RESERVED  = 
[
    //
] ;

/**
 * ### WARNING - not original Core2 script !!! see contributors !
 * @see _global.asc : _global.GetObjectPath method.
 */
_global.$GLOBAL_PRIVATE_POLICY = true ;

// ---

_introspectGlobal = function() 
{
    for( var o in _global ) 
    {
        if( (o == "_introspectGlobal") | (o == "$GLOBAL_RESERVED") ) 
        {
            continue ;
        }
        _global.$GLOBAL_RESERVED.push( o );
    }
}

_introspectGlobal() ;

delete _introspectGlobal ;

// ----o load core2 framework

ext  = ".js" ;
path = "./"  ;

load( path + "buRRRn/core2/_global"       + ext ) ;
load( path + "buRRRn/core2/Array"         + ext ) ;
load( path + "buRRRn/core2/Boolean"       + ext ) ;
load( path + "buRRRn/core2/Date"          + ext ) ;
load( path + "buRRRn/core2/Error"         + ext ) ;
load( path + "buRRRn/core2/Function"      + ext ) ;
load( path + "buRRRn/core2/ICloneable"    + ext ) ;
load( path + "buRRRn/core2/IComparable"   + ext ) ;
load( path + "buRRRn/core2/IConvertible"  + ext ) ;
load( path + "buRRRn/core2/ICopyable"     + ext ) ;
load( path + "buRRRn/core2/IEquality"     + ext ) ;
load( path + "buRRRn/core2/IFormattable"  + ext ) ;
load( path + "buRRRn/core2/ISerializable" + ext ) ;
load( path + "buRRRn/core2/NullObject"    + ext ) ;
load( path + "buRRRn/core2/Number"        + ext ) ;
load( path + "buRRRn/core2/Object"        + ext ) ;
load( path + "buRRRn/core2/String"        + ext ) ;

delete ext ;
delete path ;
