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

// ---o Constructor

core.strings.whiteSpaceCharsTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

core.strings.whiteSpaceCharsTest.prototype             = new buRRRn.ASTUce.TestCase() ;
core.strings.whiteSpaceCharsTest.prototype.constructor = core.strings.whiteSpaceCharsTest ;

// ----o Public Methods

core.strings.whiteSpaceCharsTest.prototype.testLineTerminatorCharsLength = function () 
{
    this.assertEquals( 26 , core.strings.whiteSpaceChars.length , "The length of the whiteSpaceChars array is not good.") ;
}

core.strings.whiteSpaceCharsTest.prototype.testLineTerminatorCharsContent = function () 
{
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u0009") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u000A") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u000B") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u000C") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u000D") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u0020") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u00A0") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u1680") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u180E") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2000") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2001") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2002") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2003") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2004") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2005") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2006") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2007") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2008") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2009") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u200A") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u200B") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2028") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u2029") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u202F") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u205F") > -1 ) ;
    this.assertTrue( core.strings.whiteSpaceChars.indexOf("\u3000") > -1 ) ;
}