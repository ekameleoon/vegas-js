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

core.dumpTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

core.dumpTest.prototype             = new buRRRn.ASTUce.TestCase() ;
core.dumpTest.prototype.constructor = core.dumpTest ;

// ----o Public Methods

core.dumpTest.prototype.testArray = function () 
{
    this.assertEquals( "[]" , core.dump( [] ) ) ;
    this.assertEquals( "[1]" , core.dump( [1] ) ) ;
    this.assertEquals( "[1,2,3]" , core.dump( [1,2,3] ) ) ;
    this.assertEquals( "[\"hello\",\"world\"]" , core.dump( ["hello","world"] ) ) ;
    this.assertEquals( "[\"hello\",1,true]" , core.dump( ["hello",1,true] ) ) ;
    this.assertEquals( "\n[\n    \n]" , core.dump( [] , true ) ) ;
    this.assertEquals( "\n[\n    1\n]" , core.dump( [1] , true ) ) ;
}

core.dumpTest.prototype.testDate = function () 
{
    this.assertEquals( "new Date(2010,4,5,8,23,50,10)" , core.dump( new Date( 2010, 4, 5, 8, 23, 50, 10 ) ) ) ;
}

core.dumpTest.prototype.testObject = function () 
{
    this.assertEquals( "{}" , core.dump( {} ) ) ;
    this.assertEquals( "{prop:1}" , core.dump( { prop:1 } ) ) ;
    this.assertEquals( "{prop1:1,prop2:2}" , core.dump( { prop1:1 , prop2:2 } ) ) ;
    this.assertEquals( "{prop1:\"hello\",prop2:\"world\"}" , core.dump( { prop1:"hello", prop2:"world"} ) ) ;
    this.assertEquals( "\n{\n    \n}" , core.dump( {} , true ) ) ;
    this.assertEquals( "\n{\n    prop1:1\n}" , core.dump( {prop1:1} , true ) ) ;
    this.assertEquals( "\n{\n    prop1:1,\n    prop2:2\n}" , core.dump( {prop1:1,prop2:2} , true ) ) ;
    //FIXME this.assertEquals( "\n    {\n        \n    }" , core.dump( {} , true , 1 ) ) ;
}

core.dumpTest.prototype.testDate = function () 
{
    this.assertEquals( "\"hello world\""    , core.dump( "hello world" ) ) ;
    this.assertEquals( "\"hello\\bworld\""  , core.dump( "hello\bworld" ) ) ;
    this.assertEquals( "\"hello\\tworld\""  , core.dump( "hello\tworld" ) ) ;
    this.assertEquals( "\"hello\\nworld\""  , core.dump( "hello\nworld" ) ) ;
    this.assertEquals( "\"hello\\vworld\""  , core.dump( "hello\vworld" ) ) ;
    this.assertEquals( "\"hello\\fworld\""  , core.dump( "hello\fworld" ) ) ;
    this.assertEquals( "\"hello\\rworld\""  , core.dump( "hello\rworld" ) ) ;
    this.assertEquals( "\"hello\\\"world\"" , core.dump( "hello\"world" ) ) ;
    this.assertEquals( "\"hello\\\'world\"" , core.dump( "hello'world" ) ) ;
    this.assertEquals( "\"hello\\\\world\"" , core.dump( "hello\\world" ) ) ;
}

core.dumpTest.prototype.testCustomObjectWithToSource = function () 
{
    var MyClass = function( value )
    {
        this.value = value ;
    } ;
    MyClass.prototype.toSource = function() /*String*/
    {
        return "new MyClass(" + core.dump(this.value) + ")" ;
    }
    this.assertEquals( "new MyClass(\"hello world\")" , core.dump( new MyClass("hello world") ) ) ;
}
