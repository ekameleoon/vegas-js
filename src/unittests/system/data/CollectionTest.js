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

system.data.CollectionTest = function( name ) 
{
    buRRRn.ASTUce.TestCase.call( this , name ) ;
}

// ----o Inherit

system.data.CollectionTest.prototype             = new buRRRn.ASTUce.TestCase() ;
system.data.CollectionTest.prototype.constructor = system.data.CollectionTest ;

// ----o Public Methods

system.data.CollectionTest.prototype.testInterface = function () 
{
    var c = new system.data.Collection() ;
    this.assertNotNull( c ) ;
}

system.data.CollectionTest.prototype.testMethods = function () 
{
    var c = new system.data.Collection() ;
    this.assertTrue( "add" in c      ,  "#0" ) ;
    this.assertTrue( "clear" in c    ,  "#1" ) ;
    this.assertTrue( "clone" in c    ,  "#2" ) ;
    this.assertTrue( "contains" in c ,  "#3" ) ;
    this.assertTrue( "get" in c      ,  "#4" ) ;
    this.assertTrue( "indexOf" in c  ,  "#5" ) ;
    this.assertTrue( "isEmpty" in c  ,  "#6" ) ;
    this.assertTrue( "iterator" in c ,  "#7" ) ;
    this.assertTrue( "remove" in c   ,  "#8" ) ;
    this.assertTrue( "size" in c     , " #9" ) ;
    this.assertTrue( "toArray" in c  , "#10" ) ;
    this.assertTrue( "toString" in c , "#11" ) ;
}