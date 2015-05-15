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
 * Contains all white space chars.
 * <p><b>Note :</b></p>
 * <ul>
 * <li>http://developer.mozilla.org/es4/proposals/string.html</li>
 * <li>http://www.fileformat.info/info/unicode/category/Zs/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/category/Zl/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/category/Zp/list.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/200b/index.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/feff/index.htm</li>
 * <li>http://www.fileformat.info/info/unicode/char/2060/index.htm</li>
 * </ul>
 */
core.strings.whiteSpaceChars = 
[ 
    "\u0009" /*Horizontal tab*/ ,
    "\u000A" /*Line feed or New line*/,
    "\u000B" /*Vertical tab*/,
    "\u000C" /*Formfeed*/,
    "\u000D" /*Carriage return*/,
    "\u0020" /*Space*/,
    "\u00A0" /*Non-breaking space*/,
    "\u1680" /*Ogham space mark*/,
    "\u180E" /*Mongolian vowel separator*/,
    "\u2000" /*En quad*/,
    "\u2001" /*Em quad*/,
    "\u2002" /*En space*/,
    "\u2003" /*Em space*/,
    "\u2004" /*Three-per-em space*/,
    "\u2005" /*Four-per-em space*/,
    "\u2006" /*Six-per-em space*/,
    "\u2007" /*Figure space*/,
    "\u2008" /*Punctuation space*/,
    "\u2009" /*Thin space*/,
    "\u200A" /*Hair space*/,
    "\u200B" /*Zero width space*/,
    "\u2028" /*Line separator*/,
    "\u2029" /*Paragraph separator*/,
    "\u202F" /*Narrow no-break space*/,
    "\u205F" /*Medium mathematical space*/,
    "\u3000" /*Ideographic space*/ 
];