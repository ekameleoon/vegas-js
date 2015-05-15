/*
  Version: MPL 1.1/GPL 2.0/LGPL 2.1
 
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at
  http://www.mozilla.org/MPL/
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the
  License.
  
  The Original Code is [maashaack framework].
  
  The Initial Developers of the Original Code are
  Zwetan Kjukov <zwetan@gmail.com> and Marc Alcaraz <ekameleon@gmail.com>.
  Portions created by the Initial Developers are Copyright (C) 2006-2011
  the Initial Developers. All Rights Reserved.
  
  Contributor(s):
  
  Alternatively, the contents of this file may be used under the terms of
  either the GNU General Public License Version 2 or later (the "GPL"), or
  the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
  in which case the provisions of the GPL or the LGPL are applicable instead
  of those above. If you wish to allow use of your version of this file only
  under the terms of either the GPL or the LGPL, and not to allow others to
  use your version of this file under the terms of the MPL, indicate your
  decision by deleting the provisions above and replace them with the notice
  and other provisions required by the LGPL or the GPL. If you do not delete
  the provisions above, a recipient may use your version of this file under
  the terms of any one of the MPL, the GPL or the LGPL.
*/

/**
 * Dumps a string representation of any Array reference.
 * @param value an Array to dump.
 * @param prettyprint (optional) boolean option to output a pretty printed string
 * @param indent (optional) initial indentation
 * @param indentor (optional) initial string used for the indent
 * @return The dump string representation of any Array reference.
 */
core.dumpArray = function( value /*Array*/ , prettyprint /*Boolean*/ , indent /*int*/ , indentor /*String*/  ) /*String*/
{
    indent = isNaN(indent) ? 0 : indent ;
    prettyprint = Boolean( prettyprint ) ;
    if( indentor == null )
    {
        indentor = "    " ;
    }
    
    var source /*Array*/ = [];
    
    var i /*int*/ ;
    var l /*int*/ = value.length ;
    
    for( i = 0 ; i < l ; i++ )
    {
        if( value[i] === undefined )
        {
            source.push( "undefined" );
            continue;
        }
        if( value[i] === null )
        {
            source.push( "null" );
            continue;
        }
        if( prettyprint ) 
        { 
            indent++ ; 
        }
        source.push( core.dump( value[i], prettyprint, indent, indentor ) ) ;
        if( prettyprint ) 
        { 
            indent-- ; 
        }
    }
    if( prettyprint ) 
    { 
        var spaces /*Array*/ = [] ;
        for( i=0 ; i < indent ; i++ )
        {
            spaces.push( indentor );
        }
        var decal /*String*/ = "\n" + spaces.join( "" ) ;
        return decal + "[" + decal + indentor + source.join( "," + decal + indentor ) + decal + "]" ;
    }
    else
    {
        return "[" + source.join( "," ) + "]" ; 
    }
}