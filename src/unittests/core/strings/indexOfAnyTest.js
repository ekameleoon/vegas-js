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

core.strings.indexOfAnyTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

core.strings.indexOfAnyTest.prototype             = new buRRRn.ASTUce.TestCase() ;
core.strings.indexOfAnyTest.prototype.constructor = core.strings.indexOfAnyTest ;

// ----o Public Methods

core.strings.indexOfAnyTest.prototype.testIndexOfAny = function () 
{
    this.assertEquals( 1 , core.strings.indexOfAny("hello world", [2, "hello", 5])     , "#1" );
    this.assertEquals( 2 , core.strings.indexOfAny("Five = 5", [2, "hello", 5])        , "#2" );
    this.assertEquals( 1 , core.strings.indexOfAny("hello world", ["2", "hello", "5"]) , "#3" );
    this.assertEquals( 2 , core.strings.indexOfAny("Five = 5", ["2", "hello", "5"])    , "#4" );
    this.assertEquals( 1 , core.strings.indexOfAny("hello world", [2, "hello", 5], 1)  , "#5" );
}

core.strings.indexOfAnyTest.prototype.testIndexOfAnyWithStartIndex = function () 
{
    this.assertEquals( 0 , core.strings.indexOfAny("hello the big world", ["hello", "the", "big", "world"], 0) );
    this.assertEquals( 1 , core.strings.indexOfAny("hello the big world", ["hello", "the", "big", "world"], 1) );
    this.assertEquals( 2 , core.strings.indexOfAny("hello the big world", ["hello", "the", "big", "world"], 2) );
    this.assertEquals( 3 , core.strings.indexOfAny("hello the big world", ["hello", "the", "big", "world"], 3) );
}

core.strings.indexOfAnyTest.prototype.testIndexOfAnyWithStartIndexAndCount = function () 
{
    this.assertEquals( 3 , core.strings.indexOfAny("hello the big world", ["hello", "some", "strange", "world"], 1, 3) );
    this.assertEquals( 3 , core.strings.indexOfAny("hello the big world", ["hello", "some", "strange", "world"], 3, 3) );
}

core.strings.indexOfAnyTest.prototype.testIndexOfAnyNotFound = function () 
{
    this.assertEquals( -1 , core.strings.indexOfAny(null, ["hello"]));
    this.assertEquals( -1 , core.strings.indexOfAny("", ["hello"]));
    this.assertEquals( -1 , core.strings.indexOfAny("hello world", null));
    this.assertEquals( -1 , core.strings.indexOfAny("hello the big world", ["hello", "some", "strange", "world"], 1, 2));
    this.assertEquals( -1 , core.strings.indexOfAny("actionscript is good", [2, "hello", 5]));
}