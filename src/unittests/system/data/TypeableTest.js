/*

  Version: MPL 1.1/GPL 2.0/LGPL 2.1
 
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  
           http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is VEGAS Framework.
  
  The Initial Developer of the Original Code is
  ALCARAZ Marc (aka eKameleon)  <ekameleon@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2010
  the Initial Developer. All Rights Reserved.
  
  Contributor(s) :
  
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

system.data.TypeableTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.data.TypeableTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.data.TypeableTest.prototype.constructor = system.data.TypeableTest ;

proto = system.data.TypeableTest.prototype ;

// ----o Public Methods

proto.testConstructor = function () 
{
    var t = new system.data.Typeable() ;
    this.assertNotNull( t ) ;
}

proto.testInherit = function () 
{
    var t = new system.data.Typeable() ;
    this.assertTrue( t instanceof system.data.Validator ) ;
}

proto.testType = function () 
{
    var t = new system.data.Typeable() ;
    this.assertNull( t.type ) ;
    t.type = String ;
    this.assertEquals( String , t.type ) ;
}

proto.testSupportsPrimitiveString = function () 
{
    var check = new system.data.Typeable() ;
    
    check.type = "string" ;
    
    this.assertTrue( check.supports("hello") , "#1" ) ;
    this.assertTrue( check.supports(new String("hello")) , "#2" ) ;
    this.assertFalse( check.supports( 2 ) , "#3" ) ;
    this.assertFalse( check.supports( check ) , "#4" ) ;
}

proto.testSupportsCompositeString = function () 
{
    var check = new system.data.Typeable() ;
    
    check.type = String ;
    
    this.assertTrue( check.supports("hello") , "#1" ) ;
    this.assertTrue( check.supports(new String("hello")) , "#2" ) ;
    this.assertFalse( check.supports( 2 ) , "#3" ) ;
    this.assertFalse( check.supports( check ) , "#4" ) ;
}

proto.testSupportsPrimitiveNumber = function () 
{
    var check = new system.data.Typeable() ;
    
    check.type = "number" ;
    
    this.assertTrue( check.supports( 2 ) , "#1" ) ;
    this.assertTrue( check.supports( new Number(2) ) , "#2" ) ;
    this.assertFalse( check.supports( "hello" ) , "#3" ) ;
    this.assertFalse( check.supports( check ) , "#4" ) ;
}

proto.testSupportsCompositeNumber = function () 
{
    var check = new system.data.Typeable() ;
    
    check.type = Number ;
    
    this.assertTrue( check.supports( 2 ) , "#1" ) ;
    this.assertTrue( check.supports( new Number(2) ) , "#2" ) ;
    this.assertFalse( check.supports( "hello" ) , "#3" ) ;
    this.assertFalse( check.supports( check ) , "#4" ) ;
}

proto.testSupportsPrimitiveBoolean = function () 
{
    var check = new system.data.Typeable() ;
    
    check.type = "boolean" ;
    
    this.assertTrue( check.supports( true ) , "#1" ) ;
    this.assertTrue( check.supports( new Boolean(true) ) , "#2" ) ;
    this.assertFalse( check.supports( "hello" ) , "#3" ) ;
    this.assertFalse( check.supports( check ) , "#4" ) ;
}

proto.testSupportsCompositeBoolean = function () 
{
    var check = new system.data.Typeable() ;
    
    check.type = Boolean ;
    
    this.assertTrue( check.supports( true ) , "#1" ) ;
    this.assertTrue( check.supports( new Boolean(true) ) , "#2" ) ;
    this.assertFalse( check.supports( "hello" ) , "#3" ) ;
    this.assertFalse( check.supports( check ) , "#4" ) ;
}

proto.testSupportsCustomTypeFunction = function () 
{
    var check = new system.data.Typeable() ;
    
    check.type = system.data.Typeable ;
    
    this.assertFalse( check.supports( 1 ) , "#1" ) ;
    this.assertFalse( check.supports( true ) , "#2" ) ;
    this.assertFalse( check.supports( "hello" ) , "#3" ) ;
    this.assertTrue( check.supports( check ) , "#4" ) ;
}

proto.testSupportsNull = function () 
{
    var check = new system.data.Typeable() ;
    
    check.type = "string" ;
    
    this.assertFalse( check.supports( null ) , "#1" ) ;
    this.assertFalse( check.supports( undefined ) , "#2" ) ;
    
    check.type = String ;
    
    this.assertFalse( check.supports( null ) , "#3" ) ;
    this.assertFalse( check.supports( undefined ) , "#4" ) ;
    
    check.type = system.data.Typeable ;
    
    this.assertFalse( check.supports( null ) , "#5" ) ;
    this.assertFalse( check.supports( undefined ) , "#6" ) ;
}

proto.testValidate = function () 
{
    var check = new system.data.Typeable() ;
    
    check.type = "string" ;
    
    try
    {
        check.validate( 2 ) ;
        this.fail( "#1" ) ;
    }
    catch( e )
    {
        this.assertTrue( e instanceof TypeError , "#2" ) ;
        this.assertEquals( "[Typeable] validate('2') failed, the type is mismatch." , e.message , "#3" ) ; 
    }
}

////////

delete proto ;