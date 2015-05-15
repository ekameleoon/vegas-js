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

core.strings.formatTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

core.strings.formatTest.prototype             = new buRRRn.ASTUce.TestCase() ;
core.strings.formatTest.prototype.constructor = core.strings.formatTest ;

proto = core.strings.formatTest.prototype ;

// ----o Public Methods

proto.testDefault = function () 
{
    this.assertEquals( "hello" , core.strings.format( "hello" ) , "#1" ) ;
    this.assertEquals( "world" , core.strings.format( "world" , 1 , true ) , "#2" ) ;
}

proto.testEmpty = function () 
{
    this.assertEquals( "" , core.strings.format( ""   ) , "#1" ) ;
    this.assertEquals( "" , core.strings.format( null ) , "#2" ) ;
}

proto.testBasicArguments = function () 
{
    this.assertEquals( "apples,oranges,grapes"  , core.strings.format( "{0},{1},{2}" , "apples" , "oranges", "grapes" ) , "#1" ) ;
    this.assertEquals( "oranges,apples,oranges" , core.strings.format( "{1},{0},{1}" , "apples" , "oranges", "grapes" ) , "#2" ) ;
}

proto.testArrayOfArguments = function () 
{
    this.assertEquals( "apples,oranges,grapes"  , core.strings.format( "{0},{1},{2}" , ["apples" , "oranges", "grapes"] )  , "#1" ) ;
    this.assertEquals( "oranges,apples,oranges" , core.strings.format( "{1},{0},{1}" , ["apples" , "oranges", "grapes"] )  , "#2" ) ;
    this.assertEquals( "apples,oranges,grapes,abricot"  , core.strings.format( "{0},{1},{2},{3}" , ["apples" , "oranges"] , "grapes" , "abricot" ) , "#3" ) ;
}

proto.testObject = function () 
{
    this.assertEquals( "core.strings.format"  , core.strings.format( "{path}.{name}" , { name : "format" , path:"core.strings" } ) , "#1" ) ;
    this.assertEquals( "core.strings.format"  , core.strings.format( "{path}{separator}{name}" , { name : "format" , path:"core.strings" , separator:"." } ) , "#2" ) ;
    this.assertEquals( "core.strings.format()"  , core.strings.format( "{path}{0}{name}{1}" , { name : "format" , path:"core.strings" } , "." , "()" ) , "#3" ) ;
    this.assertEquals( "core.strings.format with the name:'format' and the path:'core.strings'"  , core.strings.format( "{path}.{name} with the name:'{name}' and the path:'{path}'" , { name : "format" , path:"core.strings" } ) , "#4" ) ;
}

// ----o Encapsulate

delete proto ;