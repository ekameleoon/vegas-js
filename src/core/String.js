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
 * Returns 0 if the passed string is lower case else 1.
 * @return 0 if the passed string is lower case else 1.
 */
String.prototype.caseValue = function() /*Number*/
{
    return ( this.toLowerCase().valueOf() == this.valueOf() ) ? 0 : 1 ;
}

/**
 * Compares the two caracteres passed in argument for order.
 * @return <p>
 * <li>-1 if charA is "lower" than (less than, before, etc.) charB ;</li>
 * <li> 1 if charA is "higher" than (greater than, after, etc.) charB ;</li>
 * <li> 0 if charA and charB are equal.</li>
 * </p>
 */
String.compareChars = function( charA /*String*/ , charB /*String*/ ) /*Number*/
{
    var a /*String*/ = charA.charAt(0) ;
    var b /*String*/ = charB.charAt(0) ;
    if ( a.caseValue() < b.caseValue() ) 
    {
        return -1;
    }
    if ( a.caseValue() > b.caseValue() ) 
    {
        return 1 ;
    }
    if ( a < b ) 
    {
        return -1;
    }
    if ( a > b ) 
    {
        return 1;
    }
    return 0 ;
}

/**
 * Capitalize the first letter of a string, like the PHP function.
 */
String.prototype.ucFirst = function() /*String*/ 
{
    return this.charAt(0).toUpperCase() + this.substring(1) ;
}
    
/**
 * Capitalize each word in a string, like the PHP function.
 */
String.prototype.ucWords = function() /*String*/ 
{
    var ar /*Array*/ = this.split(" ") ;
    var l /*Number*/ = ar.length ;
    while(--l > -1) {
        ar[l] = ar[l].ucFirst() ;
    }
    return ar.join(" ") ;
}
