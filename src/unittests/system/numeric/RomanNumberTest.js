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

system.numeric.RomanNumberTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.numeric.RomanNumberTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.numeric.RomanNumberTest.prototype.constructor = system.numeric.RomanNumberTest ;

proto = system.numeric.RomanNumberTest.prototype ;

// ----o Public Methods

proto.testConstructor = function()
{
    var rn = new system.numeric.RomanNumber();
    this.assertNotNull( rn ) ;
}

proto.testConstructorAsRomanString = function()
{
    var rn = new system.numeric.RomanNumber( "MMVIII" );
    this.assertEquals( 2008, rn.valueOf() );
}

proto.testDefault = function()
{
    var rn = new system.numeric.RomanNumber();
    this.assertEquals( "" , rn.toString() );
}

proto.testBasicOperators = function()
{
    var rn  = new system.numeric.RomanNumber( 2008 );
    var rn2 = new system.numeric.RomanNumber( rn.valueOf()  + 1 );
    var rn3 = new system.numeric.RomanNumber( rn2.valueOf() - 1 );
    
    this.assertEquals( 2009, rn2.valueOf() , "#1");
    this.assertEquals( "MMIX", rn2.toString() , "#2");
    
    this.assertEquals( 2008, rn3.valueOf() , "#3");
    this.assertEquals( "MMVIII", rn3.toString() , "#4");
}

proto.testMaxRange = function()
{
    try
    {
        new system.numeric.RomanNumber( system.numeric.RomanNumber.MAX + 1 );
    }
    catch( e )
    {
        this.assertEquals( e.message, "Max value for a RomanNumber is 3999" , "over maximum range throws a specific RangeError message.") ;
        this.assertTrue( e instanceof RangeError , "over maximum range throws a RangeError object.") ;
    }
}

proto.testMinRange = function()
{
    try
    {
        new system.numeric.RomanNumber( system.numeric.RomanNumber.MIN - 1 );
    }
    catch( e )
    {
        this.assertTrue( e instanceof RangeError , "under minimum range throws a RangeError object." ) ;
        this.assertEquals( e.message, "Min value for a RomanNumber is 0" , "under minimum range throws a specific RangeError message.") ;
    }
}

// parse

proto.testParseBasic = function()
{
    var rn = new system.numeric.RomanNumber();
    this.assertEquals( "M", rn.parse( 1000 ) );
    this.assertEquals( "D", rn.parse(  500 ) );
    this.assertEquals( "C", rn.parse(  100 ) );
    this.assertEquals( "L", rn.parse(   50 ) );
    this.assertEquals( "X", rn.parse(   10 ) );
    this.assertEquals( "V", rn.parse(    5 ) );
    this.assertEquals( "I", rn.parse(    1 ) );
    this.assertEquals( "",  rn.parse(    0 ) );
}

proto.testParseAdditionRule = function()
{
    var rn = new system.numeric.RomanNumber();
    
    this.assertEquals( "MI", rn.parse( 1001 ) );
    this.assertEquals( "MD", rn.parse( 1500 ) );
    this.assertEquals( "MDC", rn.parse( 1600 ) );
    this.assertEquals( "CCLXVII", rn.parse( 267 ) );
}

proto.testParseShortestNotationRule = function()
{
    var rn = new system.numeric.RomanNumber();
    
    this.assertEquals( "LV",   rn.parse( 55 ) );
    this.assertEquals( "LXVI", rn.parse( 66 ) );
}

proto.testParseSubstractionRule = function()
{
    var rn = new system.numeric.RomanNumber();
    
    this.assertEquals( "XL",   rn.parse(   40 ) );
    this.assertEquals( "XLIV", rn.parse(   44 ) );
    this.assertEquals( "XLIX", rn.parse(   49 ) );
    this.assertEquals( "XCIX", rn.parse(   99 ) );
    this.assertEquals( "CM",   rn.parse(  900 ) );
    this.assertEquals( "MCM",  rn.parse( 1900 ) );
}

proto.testParseSpecialCase = function()
{
    var rn = new system.numeric.RomanNumber();
    
    this.assertEquals( "DCLXVI",   rn.parse(  666 ) ); //Using every symbol except M in descending order gives the beast number.
    this.assertEquals( "MCDXLIV",  rn.parse( 1444 ) ); //Smallest pandigital number (each symbol is used)
    this.assertEquals( "MDCLXVI",  rn.parse( 1666 ) ); //Largest efficient pandigital number (each symbol occurs exactly once)
    this.assertEquals( "MCMXLV",   rn.parse( 1945 ) );
    this.assertEquals( "MCMXCVII", rn.parse( 1997 ) );
    this.assertEquals( "MCMXCIX",  rn.parse( 1999 ) );
}

// parseRomanString 
 
proto.testParseRomanStringBasic = function()
{
    this.assertEquals( 1000, system.numeric.RomanNumber.parseRomanString( "M" ) );
    this.assertEquals(  500, system.numeric.RomanNumber.parseRomanString( "D" ) );
    this.assertEquals(  100, system.numeric.RomanNumber.parseRomanString( "C" ) );
    this.assertEquals(   50, system.numeric.RomanNumber.parseRomanString( "L" ) );
    this.assertEquals(   10, system.numeric.RomanNumber.parseRomanString( "X" ) );
    this.assertEquals(    5, system.numeric.RomanNumber.parseRomanString( "V" ) );
    this.assertEquals(    1, system.numeric.RomanNumber.parseRomanString( "I" ) );
    this.assertEquals(    0, system.numeric.RomanNumber.parseRomanString( ""  ) );
}

proto.testParseRomanStringAdditionRule = function()
{
    this.assertEquals( 1001, system.numeric.RomanNumber.parseRomanString( "MI" ) );
    this.assertEquals( 1500, system.numeric.RomanNumber.parseRomanString( "MD" ) );
    this.assertEquals( 1600, system.numeric.RomanNumber.parseRomanString( "MDC" ) );
    this.assertEquals( 267,  system.numeric.RomanNumber.parseRomanString( "CCLXVII" ) );
}

proto.testParseRomanStringShortestNotationRule = function()
{
    this.assertEquals( 55, system.numeric.RomanNumber.parseRomanString( "LV" ) );
    this.assertEquals( 66, system.numeric.RomanNumber.parseRomanString( "LXVI" ) );
}

proto.testParseRomanStringSubstractionRule = function()
{
    this.assertEquals( 40,   system.numeric.RomanNumber.parseRomanString( "XL" ) );
    this.assertEquals( 44,   system.numeric.RomanNumber.parseRomanString( "XLIV" ) );
    this.assertEquals( 49,   system.numeric.RomanNumber.parseRomanString( "XLIX" ) );
    this.assertEquals( 99,   system.numeric.RomanNumber.parseRomanString( "XCIX" ) );
    this.assertEquals( 900,  system.numeric.RomanNumber.parseRomanString( "CM" ) );
    this.assertEquals( 1900, system.numeric.RomanNumber.parseRomanString( "MCM" ) );
}

proto.testParseRomanStringSpecialCase = function()
{
    this.assertEquals(  666, system.numeric.RomanNumber.parseRomanString( "DCLXVI"   )) ; //Using every symbol except M in descending order gives the beast number.
    this.assertEquals( 1444, system.numeric.RomanNumber.parseRomanString( "MCDXLIV"  )) ; //Smallest pandigital number (each symbol is used)
    this.assertEquals( 1666, system.numeric.RomanNumber.parseRomanString( "MDCLXVI"  )) ; //Largest efficient pandigital number (each symbol occurs exactly once)
    this.assertEquals( 1945, system.numeric.RomanNumber.parseRomanString( "MCMXLV"   )) ;
    this.assertEquals( 1997, system.numeric.RomanNumber.parseRomanString( "MCMXCVII" )) ;
    this.assertEquals( 1999, system.numeric.RomanNumber.parseRomanString( "MCMXCIX"  )) ;
}  

proto.testParseRomanStringBadChars = function()
{
    this.assertEquals(  0, system.numeric.RomanNumber.parseRomanString( "A" ) );
    this.assertEquals(  0, system.numeric.RomanNumber.parseRomanString( "DCA" ) );  
    this.assertEquals(  0, system.numeric.RomanNumber.parseRomanString( "MCMXCIA" ) );
    this.assertEquals(  0, system.numeric.RomanNumber.parseRomanString( "MCMXCAI" ) );
}

//////////

delete proto ;