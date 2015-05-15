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

system.numeric.RangeTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.numeric.RangeTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.numeric.RangeTest.prototype.constructor = system.numeric.RangeTest ;

proto = system.numeric.RangeTest.prototype ;

// ----o Public Methods

proto.setUp = function()
{
    this.range = new system.numeric.Range(100,200) ;
}

proto.tearDown = function()
{
    this.range = undefined ;
}

proto.testConstructor = function () 
{
    this.assertNotNull( this.range ) ; 
}

proto.testDEGREE = function()
{
    this.assertNotNull( system.numeric.Range.DEGREE  , "system.numeric.Range.DEGREE not must be null.") ;
    this.assertTrue( system.numeric.Range.DEGREE instanceof system.numeric.Range  , "system.numeric.Range.DEGREE must be a system.numeric.Range object.") ;
    this.assertEquals( system.numeric.Range.DEGREE.min , 0, "system.numeric.Range.DEGREE min value failed.") ;
    this.assertEquals( system.numeric.Range.DEGREE.max , 360, "system.numeric.Range.DEGREE max value failed.") ;
}

proto.testPERCENT = function()
{
    this.assertNotNull( system.numeric.Range.PERCENT  , "system.numeric.Range.PERCENT not must be null.") ;
    this.assertTrue( system.numeric.Range.PERCENT instanceof system.numeric.Range  , "system.numeric.Range.PERCENT must be a system.numeric.Range object.") ;
    this.assertEquals( system.numeric.Range.PERCENT.min , 0, "system.numeric.Range.PERCENT min value failed.") ;
    this.assertEquals( system.numeric.Range.PERCENT.max , 100, "system.numeric.Range.PERCENT max value failed.") ;
}

proto.testCOLOR = function()
{
    this.assertNotNull( system.numeric.Range.COLOR  , "system.numeric.Range.COLOR not must be null.") ;
    this.assertTrue( system.numeric.Range.COLOR instanceof system.numeric.Range  , "system.numeric.Range.COLOR must be a system.numeric.Range object.") ;
    this.assertEquals( system.numeric.Range.COLOR.min , -255, "system.numeric.Range.COLOR min value failed.") ;
    this.assertEquals( system.numeric.Range.COLOR.max , 255, "system.numeric.Range.COLOR max value failed.") ;
}

proto.testUNITY = function()
{
    this.assertNotNull( system.numeric.Range.UNITY  , "system.numeric.Range.UNITY not must be null.") ;
    this.assertTrue( system.numeric.Range.UNITY instanceof system.numeric.Range  , "system.numeric.Range.UNITY must be a system.numeric.Range object.") ;
    this.assertEquals( system.numeric.Range.UNITY.min , 0, "system.numeric.Range.UNITY min value failed.") ;
    this.assertEquals( system.numeric.Range.UNITY.max , 1, "system.numeric.Range.UNITY max value failed.") ;
}

proto.testMax = function()
{
    this.assertEquals( this.range.min , 100, "range.min value failed.") ;
}

proto.testMin = function()
{
    this.assertEquals( this.range.max , 200, "range.max value failed.") ;
}

proto.testClamp = function()
{
    this.assertEquals( this.range.clamp(0) , 100, "range.clamp(0) failed.") ;
    this.assertEquals( this.range.clamp(400) , 200, "range.clamp(400) failed.") ;
    this.assertEquals( this.range.clamp(150) , 150, "range.clamp(150) failed.") ;
}

proto.testClone = function()
{
    var clone /*Range*/ = this.range.clone() ;
    this.assertNotNull( clone , "range.clone() as system.numeric.Range not must be null.") ;
    this.assertNotSame( this.range, clone, "range and this clone not must be the same") ;
    this.assertEquals( this.range.min , clone.min, "compare range.min and clone.min failed.") ;
    this.assertEquals( this.range.max , clone.max, "compare range.max and clone.max failed.") ;
}   

proto.testCombine = function()
{
    var r1 /*Range*/ = new system.numeric.Range(0,100) ;
    var r2 /*Range*/ = new system.numeric.Range(200,300) ;
    
    var r3 /*Range*/ = r1.combine(r2) ;
    
    this.assertEquals( r3.min ,   0 , "Range.combine(" + r1 + "," + r2 + ").min failed.") ;
    this.assertEquals( r3.max , 300 , "Range.combine(" + r1 + "," + r2 + ").max failed.") ;
} 

proto.testContains = function()
{
    this.assertTrue( this.range.contains(150) , "range.contains(150) failed");
    this.assertFalse( this.range.contains(1000) , "range.contains(1000) failed");
}

proto.testEquals = function()
{
    var r /*Range*/ = new system.numeric.Range(100,200) ;
    this.assertTrue( this.range.equals(r) , "range.equals(r) failed with r:" + r + " and range:" + this.range );
}

proto.testExpand = function()
{
    var r /*Range*/ ;
    
    r = this.range.expand() ;
    this.assertEquals(r , new system.numeric.Range(0,300) , "01 - Range expand failed.") ;
    
    r = this.range.expand(2 , 2) ;
    this.assertEquals(r , new system.numeric.Range(-100, 400) , "02 - Range expand failed.") ;
}

proto.testFilterNaNValue = function()
{
    this.assertEquals( system.numeric.Range.filterNaNValue(NaN), 0, "Range.filterNaNValue(NaN) failed.") ;
    this.assertEquals( system.numeric.Range.filterNaNValue(NaN, 2), 2, "Range.filterNaNValue(NaN, 2) failed.") ;
}

proto.testGetCentralValue = function()
{
    var middle = this.range.getCentralValue() ;
    this.assertEquals(middle, 150, "range.getCentralValue() failed:" + middle + " with range:" + this.range) ;
}

proto.testRandomFloat = function()
{
    var n = this.range.getRandomFloat() ;
    this.assertTrue( this.range.contains(n) , "Range getRandomFloat(" + this.range + ") failed, the value must be in the range.") ;
}

proto.testRandomInteger = function()
{
    var i = this.range.getRandomInteger() ;
    this.assertTrue( this.range.contains(i) , "Range getRandomInteger(" + this.range + ") failed, the value must be in the range.") ;
} 

proto.testIsOutOfRange = function()
{
    this.assertFalse( this.range.isOutOfRange(150) , this.range + ".isOutOfRange(150) failed");
    this.assertTrue( this.range.isOutOfRange(1000) , this.range + ".isOutOfRange(1000) failed");
}

proto.testOverLap = function()
{
    var r1 /*Range*/ = new system.numeric.Range(0, 50) ;
    var r2 /*Range*/ = new system.numeric.Range(0, 99) ;
    var r3 /*Range*/ = new system.numeric.Range(0, 100) ;
    var r4 /*Range*/ = new system.numeric.Range(0, 150) ;
    var r5 /*Range*/ = new system.numeric.Range(200, 300) ;
    var r6 /*Range*/ = new system.numeric.Range(201, 300) ;
    
    this.assertFalse( this.range.overlap(r1) , "#1 " + this.range + ".overlap(" + r1 + ") failed." ) ;
    
    this.assertFalse( this.range.overlap(r2) , "#2 " + this.range + ".overlap(" + r2 + ") failed." ) ;
    
    this.assertTrue ( this.range.overlap(r3) , "#3 " + this.range + ".overlap(" + r3 + ") failed." ) ;
    
    this.assertTrue( this.range.overlap(r4)  , "#4 " + this.range + ".overlap(" + r4 + ") failed." ) ;
    
    this.assertTrue( this.range.overlap(r5)  , "#5 " + this.range + ".overlap(" + r5 + ") failed." ) ;
    
    this.assertFalse( this.range.overlap(r6) , "#6 " + this.range + ".overlap(" + r6 + ") failed." ) ;
}

proto.testSize = function()
{
    this.assertEquals( this.range.size() , 100 , this.range + ".size() failed." ) ;
} 

proto.testToSource = function()
{
    this.assertEquals( this.range.toSource() , "new system.numeric.Range(100,200)" , this.range + ".toSource() failed." ) ;
}

proto.testToString = function()
{
    this.assertEquals( this.range.toString() , "[Range min:100 max:200]" , this.range + ".toString() failed." ) ;
}

//////////

delete proto ;