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

system.logging.LoggerTargetTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.logging.LoggerTargetTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.logging.LoggerTargetTest.prototype.constructor = system.logging.LoggerTargetTest ;

proto = system.logging.LoggerTargetTest.prototype ;

// ----o Public Methods

proto.setUp = function()
{
    this.target = new system.logging.LoggerTarget() ;
}

proto.tearDown = function()
{
    this.target = undefined ;
}

proto.testConstructor = function () 
{
    this.assertNotNull( this.target ) ; 
}

proto.testInherit = function () 
{
    this.assertTrue( this.target instanceof system.signals.Receiver ) ; 
}

proto.testFactory = function () 
{
    this.assertEquals( this.target.factory , system.logging.Log , "01 - The factory property failed.") ;
    
    var factory = new system.logging.LoggerFactory() ;
    
    this.target.factory = factory ;
    
    this.assertEquals( this.target.factory , factory , "02 - The factory property failed.") ;
}

proto.testFiltersDefault = function () 
{
    this.assertNotNull( this.target.filters , "1") ;
    this.assertTrue( this.target.filters instanceof Array , "2") ;
    this.assertEquals( 1 , this.target.filters.length , "3") ;
    this.assertEquals( "*" , this.target.filters[0] , "4") ;
}

proto.testFiltersNormal = function () 
{
    this.target.filters = ["test", "system.*"] ;
    this.assertNotNull( this.target.filters , "1") ;
    this.assertTrue( this.target.filters instanceof Array , "2") ;
    this.assertEquals( 2 , this.target.filters.length , "3" ) ;
    this.assertEquals( "test" , this.target.filters[0] , "4") ;
    this.assertEquals( "system.*" , this.target.filters[1] , "5") ;
}

proto.testFiltersNull = function () 
{
    this.target.filters = null ;
    this.assertNotNull( this.target.filters , "1") ;
    this.assertTrue( this.target.filters instanceof Array , "2") ;
    this.assertEquals( 1 , this.target.filters.length , "3") ;
    this.assertEquals( "*" , this.target.filters[0] , "4") ;
}

proto.testFiltersRepeatFilter = function () 
{
    this.target.filters = ["test" , "test" , "system.*" ] ;
    this.assertNotNull( this.target.filters , "1") ;
    this.assertTrue( this.target.filters instanceof Array , "2") ;
    this.assertEquals( 2 , this.target.filters.length , "3" ) ;
    this.assertEquals( "test" , this.target.filters[0] , "4") ;
    this.assertEquals( "system.*" , this.target.filters[1] , "5") ;
}

proto.testFiltersWithNullFilter = function () 
{
    try
    {
        this.target.filters = [ null ] ;
        this.fail("01") ;
    }
    catch( e )
    {
        this.assertTrue( e instanceof system.errors.InvalidFilterError , "02") ;
        this.assertEquals( e.message , "filter must not be null or empty." , "03") ;
    }
}

// TODO finalize the tests when the filters are invalid !!

proto.testLevel = function () 
{
    this.assertEquals( system.logging.LoggerLevel.ALL , this.target.level , "1") ;
    
    this.target.level = system.logging.LoggerLevel.DEBUG ;
    
    this.assertEquals( system.logging.LoggerLevel.DEBUG , this.target.level , "2") ;
}

proto.testAddFilter = function () 
{
    this.assertFalse( this.target.addFilter( "*" ) , "1-0" ) ;
    this.assertNotNull( this.target.filters , "1-1") ;
    this.assertTrue( this.target.filters instanceof Array , "1-2") ;
    this.assertEquals( 1 , this.target.filters.length , "1-3" ) ;
    this.assertEquals( "*" , this.target.filters[0] , "1-4") ;
    
    this.assertTrue( this.target.addFilter( "test" ) , "2-0" ) ;
    this.assertNotNull( this.target.filters , "2-1") ;
    this.assertTrue( this.target.filters instanceof Array , "2-2") ;
    this.assertEquals( 2 , this.target.filters.length , "2-3" ) ;
    this.assertEquals( "*" , this.target.filters[0] , "2-4") ;
    this.assertEquals( "test" , this.target.filters[1] , "2-4") ;
    
    this.assertFalse( this.target.addFilter( "test" ) , "3-0" ) ;
    this.assertNotNull( this.target.filters , "3-1") ;
    this.assertTrue( this.target.filters instanceof Array , "3-2") ;
    this.assertEquals( 2 , this.target.filters.length , "3-3" ) ;
    this.assertEquals( "*" , this.target.filters[0] , "3-4") ;
    this.assertEquals( "test" , this.target.filters[1] , "3-4") ;
}

proto.testRemoveFilter = function () 
{
    this.target.addFilter( "test" ) ;
    
    this.assertTrue( this.target.removeFilter( "test" ) , "1-0" ) ;
    this.assertNotNull( this.target.filters , "1-1") ;
    this.assertTrue( this.target.filters instanceof Array , "1-2") ;
    this.assertEquals( 1 , this.target.filters.length , "1-3" ) ;
    this.assertEquals( "*" , this.target.filters[0] , "1-4") ;
}

///////

delete proto ;