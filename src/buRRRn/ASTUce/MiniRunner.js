
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is ASTUce: ActionScript Test Unit compact edition. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

/* Constructor: MiniRunner
   A trace based tool to run tests.
   
   See this as the bare minimum :).
*/
buRRRn.ASTUce.MiniRunner = function( /*String*/ suiteName )
    {
    if( suiteName == null )
        {
        suiteName = "MAIN";
        }
    
    this.suite   = new buRRRn.ASTUce.TestSuite( suiteName );
    this.result  = new buRRRn.ASTUce.TestResult();
    this.printer = new buRRRn.ASTUce.ResultPrinter();
    }

/* Method: setUp
*/
buRRRn.ASTUce.MiniRunner.prototype.setUp = function()
    {
    
    }
    
/* Method: run
*/
buRRRn.ASTUce.MiniRunner.prototype.run = function()
    {
    this.setUp();
    
    var time1, time2, runtime;
    time1 = new Date();
    
    this.suite.run( this.result );
    time2 = new Date();
    runtime = time2.valueOf() - time1.valueOf();
    
    this.printer.print( this.result, runtime );
    }

