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
 * Reports the index of the first occurrence in this instance of any character in a specified array of Unicode characters.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * result = core.strings.indexOfAny("hello world", [2, "hello", 5]) ;
 * trace( result ) ; // 0
 * 
 * result = core.strings.indexOfAny("Five = 5", [2, "hello", 5]) ;
 * trace( result ) ; // 2
 * 
 * result = core.strings.indexOfAny("actionscript is good", [2, "hello", 5]) ; 
 * trace( result ) ; // -1
 * </pre>
 * @return the index of the first occurrence in this instance of any character in a specified array of Unicode characters.
 */
core.strings.indexOfAny = function( source /*String*/ , anyOf /*Array*/ , startIndex /*uint*/ , count /*int*/ ) /*int*/
{
    startIndex = isNaN(startIndex) ? 0 : startIndex ;
    if ( startIndex < 0 )
    {
        startIndex = 0 ;
    }
    
    count = isNaN(count) ? -1 : ( ( count >= 0 ) ? count : -1 ) ;
    
    if( anyOf != null && source != null && source != "" )
    {
        var i /*int*/ ;
        var l /*int*/ = anyOf.length ;
        var endIndex /*int*/ ;
        if( ( count < 0 ) || ( count > l - startIndex ) )
        {
            endIndex = l - 1;
        }
        else
        {
            endIndex = startIndex + count - 1;
        }
        for( i = startIndex ; i <= endIndex ; i++ )
        {
            if( source.indexOf( anyOf[i] ) > - 1 )
            {
                return i ;
            }
        }
    }
    return - 1 ;
};
