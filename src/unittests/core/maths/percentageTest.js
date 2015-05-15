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

core.maths.percentageTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

core.maths.percentageTest.prototype             = new buRRRn.ASTUce.TestCase() ;
core.maths.percentageTest.prototype.constructor = core.maths.percentageTest ;

proto = core.maths.percentageTest.prototype ;

// ----o Public Methods

proto.testPercentage = function()
{
    var result ;
    
    result = core.maths.percentage( 10, 100 ) ;
    this.assertEquals( result , 10 , "core.maths.getPercent( 10, 100 ) failed" ) ;
    
    result = core.maths.percentage( 50, 100 ) ;
    this.assertEquals( result , 50 , "core.maths.getPercent( 50, 100 ) failed" ) ;
    
    result = core.maths.percentage( 68, 425 ) ;
    this.assertEquals( result , 16 , "core.maths.getPercent( 68, 425 ) failed" ) ;
    
    result = core.maths.percentage( NaN, NaN ) ;
    this.assertEquals( result , NaN , "core.maths.getPercent( NaN, NaN ) failed" ) ;
    
    result = core.maths.percentage( NaN, 100 ) ;
    this.assertEquals( result , NaN , "core.maths.getPercent( NaN, 100 ) failed" ) ;
    
    result = core.maths.percentage( 25, NaN ) ;
    this.assertEquals( result , NaN , "core.maths.getPercent( 25, NaN ) failed" ) ;
}

// ----o Encapsulate

delete proto ;