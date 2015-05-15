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

system.evaluators.RomanEvaluatorTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.evaluators.RomanEvaluatorTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.evaluators.RomanEvaluatorTest.prototype.constructor = system.evaluators.RomanEvaluatorTest ;

proto = system.evaluators.RomanEvaluatorTest.prototype ;

// ----o Initialize

proto.setUp = function()
{
    this.evaluator = new system.evaluators.RomanEvaluator() ;
}

proto.tearDown = function()
{
    this.evaluator = null ;
}

// ----o Public Methods

proto.testInterface = function () 
{
    this.assertTrue(  this.evaluator instanceof system.evaluators.Evaluable ) ;
}

proto.testEvalInvalidValue = function ()
{
    this.assertNull( this.evaluator.eval( {} ) ) ;
}

proto.testEvalRange = function()
{
    try
    {    
        this.evaluator.eval(-1) ;
        this.fail( "01-01 - The eval method failed." ) ;
    }
    catch( er )
    {
        this.assertTrue( er instanceof RangeError , "01-02 - The eval method failed." ) ;
        this.assertEquals( er.message , "Min value for a RomanNumber is 0" , "01-03 - The eval method failed." ) ;
    }
    
    try
    {    
        this.evaluator.eval( 4000 ) ;
        this.fail( "02-01 - The eval method failed." ) ;
    }
    catch( er )
    {
        this.assertTrue( er instanceof RangeError , "02-02 - The eval method failed." ) ;
        this.assertEquals(er.message , "Max value for a RomanNumber is 3999" , "02-03 - The eval method failed." ) ;
    }
}

proto.testEvalNumberToString = function()
{
    this.assertEquals( this.evaluator.eval( 1 )    , "I"         , "01 - eval( 1 ) failed." ) ;
    this.assertEquals( this.evaluator.eval( 2 )    , "II"        , "02 - eval( 2 ) failed." ) ;
    this.assertEquals( this.evaluator.eval( 3 )    , "III"       , "03 - eval( 3 ) failed." ) ;
    this.assertEquals( this.evaluator.eval( 4 )    , "IV"        , "04 - eval( 4 ) failed." ) ;
    this.assertEquals( this.evaluator.eval( 5 )    , "V"         , "05 - eval( 5 ) failed." ) ;
    this.assertEquals( this.evaluator.eval( 6 )    , "VI"        , "06 - eval( 6 ) failed." ) ;
    this.assertEquals( this.evaluator.eval( 9 )    , "IX"        , "07 - eval( 9 ) failed." ) ;
    this.assertEquals( this.evaluator.eval( 10 )   , "X"         , "08 - eval( 10 ) failed." ) ;
    this.assertEquals( this.evaluator.eval( 11 )   , "XI"        , "09 - eval( 11 ) failed." ) ;
    this.assertEquals( this.evaluator.eval( 50 )   , "L"         , "10 - eval( 50 ) failed." ) ;
    
    this.assertEquals( this.evaluator.eval( 2459 ) , "MMCDLIX"   , "11 - eval( 2459 ) failed." ) ;
    this.assertEquals( this.evaluator.eval( 3999 ) , "MMMCMXCIX" , "12 - eval( 3999 ) failed." ) ;
    this.assertEquals( this.evaluator.eval( 1997 ) , "MCMXCVII"  , "13 - eval( 1997 ) failed." ) ;
}

proto.testEvalStringToNumber = function()
{
    this.assertEquals( this.evaluator.eval(   "I" ) ,  1  , "01 - eval(  'I'  ) failed." ) ;
    this.assertEquals( this.evaluator.eval(  "II" ) ,  2  , "02 - eval(  'II' ) failed." ) ;
    this.assertEquals( this.evaluator.eval( "III" ) ,  3  , "03 - eval( 'III' ) failed." ) ;
    this.assertEquals( this.evaluator.eval(  "IV" ) ,  4  , "04 - eval(  'IV' ) failed." ) ;
    this.assertEquals( this.evaluator.eval(   "V" ) ,  5  , "05 - eval(   'V' ) failed." ) ;
    this.assertEquals( this.evaluator.eval(  "VI" ) ,  6  , "06 - eval(  'VI' ) failed." ) ;
    this.assertEquals( this.evaluator.eval(  "IX" ) ,  9  , "07 - eval(  'IX' ) failed." ) ;
    this.assertEquals( this.evaluator.eval(   "X" ) , 10  , "08 - eval(   'X' ) failed." ) ;
    this.assertEquals( this.evaluator.eval(  "XI" ) , 11  , "08 - eval(  'XI' ) failed." ) ;
    this.assertEquals( this.evaluator.eval(   "L" ) , 50  , "08 - eval(   'L' ) failed." ) ;
    
    this.assertEquals( this.evaluator.eval(   "MMCDLIX" ) , 2459 , "11 - eval(   'MMCDLIX' ) failed." ) ;
    this.assertEquals( this.evaluator.eval( "MMMCMXCIX" ) , 3999 , "12 - eval( 'MMMCMXCIX' ) failed." ) ;
    this.assertEquals( this.evaluator.eval(  "MCMXCVII" ) , 1997 , "13 - eval(  'MCMXCVII' ) failed." ) ;
}

proto.testToString = function () 
{
    this.assertEquals( "[RomanEvaluator]" , this.evaluator.toString() ) ;
}

delete proto ;
