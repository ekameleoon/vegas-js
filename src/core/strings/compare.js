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
 * Compares two strings.
 * <p>
 * The default comparaison algorithm use an ascending alphabetic order
 * with minuscule weighting less than majuscule.
 * </p>
 * 
 * @example basic usage
 * <listing version="3.0">
 * <code class="prettyprint">
 * var s0:String = "HELLO";
 * var s1:String = "hello";
 * var s2:String = "welcome";
 * var s3:String = "world";
 * 
 * trace( compare( s1, s2 ) ); //-1
 * trace( compare( s2, s1 ) ); //1
 * trace( compare( s1, s3 ) ); //1
 * trace( compare( s1, s1 ) ); //0
 * trace( compare( s1, s0 ) ); //0
 * trace( compare( s1, s0, true ) ); //-1
 * trace( compare( s0, s1, true ) ); //1
 * </code>
 * </listing>
 * 
 * @param str1 first string to compare with the second string
 * @param str2 second string to compare with the first string
 * @param strict (optional) take into account the string case, default to false
 * @return <p>
 * <ul>
 * <li> 0 if the two strings are considered equals</li>
 * <li>-1 if the first string is considered smaller (lower) than the second string</li>
 * <li> 1 if the first string is considered bigger (higher) than the second string</li>
 * </ul>
 * </p>
 */
core.strings.compare = function( str1 /*String*/ , str2 /*String*/ , strict /*Boolean*/ ) /*int*/ 
{
    strict = Boolean(strict) ;
    
    if( !strict )
    {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
    }
    
    if( str1 == str2 )
    {
        return 0;
    }
    else if( str1.length == str2.length )
    {
        var local /*int*/ = str1.localeCompare( str2 );
        if( local == 0 )
        {
            return 0;
        }
        else if( local < 0 )
        {
            return -1;
        }
        
        return 1;
    }
    else if( str1.length > str2.length )
    {
        return 1;
    }
    else
    {
        return -1;
    }
};
