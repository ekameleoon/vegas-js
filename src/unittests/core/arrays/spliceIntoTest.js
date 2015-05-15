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

core.arrays.spliceIntoTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

core.arrays.spliceIntoTest.prototype             = new buRRRn.ASTUce.TestCase() ;
core.arrays.spliceIntoTest.prototype.constructor = core.arrays.spliceInto ;

// ----o Public Methods

core.arrays.spliceIntoTest.prototype.testSpliceInto1 = function () 
{
    var inserted  = [1, 2] ;
    var container = [3, 4] ;
    
    core.arrays.spliceInto( inserted, container ) ;
    
    this.assertEquals( container.length , 4 ) ;
    
    this.assertEquals( 1 , container[0] ) ;
    this.assertEquals( 2 , container[1] ) ;
    this.assertEquals( 3 , container[2] ) ;
    this.assertEquals( 4 , container[3] ) ;
}

core.arrays.spliceIntoTest.prototype.testSpliceInto2 = function () 
{
    var inserted  = [1, 2, 3, 4] ;
    var container = [3, 4, 7, 8] ;
    
    core.arrays.spliceInto( inserted, container , 0 , 4 ) ;
    
    this.assertEquals( container.length , 4 ) ;
    
    this.assertEquals( 1 , container[0] ) ;
    this.assertEquals( 2 , container[1] ) ;
    this.assertEquals( 3 , container[2] ) ;
    this.assertEquals( 4 , container[3] ) ;
}

core.arrays.spliceIntoTest.prototype.testSpliceInto3 = function () 
{
    var inserted  = [1, 2, 3, 4] ;
    var container = [5, 6, 7, 8] ;
    
    core.arrays.spliceInto( inserted, container , 0 , 2 ) ;
    
    this.assertEquals( container.length , 6 ) ;
    
    this.assertEquals( 1 , container[0] ) ;
    this.assertEquals( 2 , container[1] ) ;
    this.assertEquals( 3 , container[2] ) ;
    this.assertEquals( 4 , container[3] ) ;
    this.assertEquals( 7 , container[4] ) ;
    this.assertEquals( 8 , container[5] ) ;
}

core.arrays.spliceIntoTest.prototype.testSpliceInto4 = function () 
{
    var inserted  = [1, 2, 3, 4] ;
    var container = [5, 6, 7, 8] ;
    
    core.arrays.spliceInto( inserted, container , 1 , 2 ) ;
    
    this.assertEquals( container.length , 6 ) ;
    
    this.assertEquals( 5 , container[0] , "#1" ) ;
    this.assertEquals( 1 , container[1] , "#2" ) ;
    this.assertEquals( 2 , container[2] , "#3" ) ;
    this.assertEquals( 3 , container[3] , "#4" ) ;
    this.assertEquals( 4 , container[4] , "#5" ) ;
    this.assertEquals( 8 , container[5] , "#6" ) ;
}