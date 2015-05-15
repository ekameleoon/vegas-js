
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

/* Constructor: ResultPrinter
   (implements ITestListener)
*/
/*!## TODO: FIXME DOCUMENTATION */
buRRRn.ASTUce.ResultPrinter = function( /*String*/ writer )
    {
    this.writer = trace ; //default writer from core2
    this.column = 0;

    if( (writer != null) && (GetTypeOf( writer ) == "function") ) //core2
        {
        this.writer = writer;
        }
    }

/* Method: writeLine
*/
buRRRn.ASTUce.ResultPrinter.prototype.writeLine = function( /*String*/ message )
    {
    var writer;
    writer = this.getWriter();
    writer( message );
    }

/* Method: print
*/
buRRRn.ASTUce.ResultPrinter.prototype.print = function( /*TestResult*/ result, /*Number*/ runTime )
    {
    this.printHeader( runTime );
    this.printErrors( result );
    this.printFailures( result );
    this.printFooter( result );
    }

/* Method: printHeader
   
   note:
   the runTime parameter can either be a
   Number or a Date.
*/
/*!## TODO: refactor using runTime.valueOf() */
buRRRn.ASTUce.ResultPrinter.prototype.printHeader = function( /*Number*/ runTime )
    {
    this.writeLine( " " );
    this.writeLine( String.format( buRRRn.ASTUce.strings.PrtTime, this.elapsedTimeAsString( runTime ) ) ); //core2
    }

/* Method: printErrors
*/
buRRRn.ASTUce.ResultPrinter.prototype.printErrors = function( /*TestResult*/ result )
    {
    this.printDefects( result.errors(), result.errorCount(), buRRRn.ASTUce.strings.nameError );
    }

/* Method: printFailures
*/
buRRRn.ASTUce.ResultPrinter.prototype.printFailures = function( /*TestResult*/ result )
    {
    this.printDefects( result.failures(), result.failureCount(), buRRRn.ASTUce.strings.nameFailure );
    }

/* Method: printDefects
*/
buRRRn.ASTUce.ResultPrinter.prototype.printDefects = function( /*Array*/ booBoos, /*Int*/ count, /*String*/ type )
    {
    var i;
    
    if( count == 0 )
        {
        return;
        }
    
    if( count == 1 )
        {
        this.writeLine( " " );
        this.writeLine( String.format( buRRRn.ASTUce.strings.PrtOneDefect, count, type ) ); //core2
        }
    else
        {
        this.writeLine( " " );
        this.writeLine( String.format( buRRRn.ASTUce.strings.PrtMoreDefects, count, type ) ); //core2
        }
    
    for( i=0; i<booBoos.length; i++ )
        {
        this.printDefectHeader( booBoos[i], i );
        this.printDefectTrace( booBoos[i] );
        }
    }

/* Method: printDefectHeader
*/
buRRRn.ASTUce.ResultPrinter.prototype.printDefectHeader = function( /*TestFailure*/ booBoo, /*Int*/ count )
    {
    this.writeLine( count + ") " + booBoo.failedTest() );
    }

/* Method: printDefectTrace
*/
buRRRn.ASTUce.ResultPrinter.prototype.printDefectTrace = function( /*TestFailure*/ booBoo )
    {
    /*!## TODO: find a way to have more detais about the code stack */
    //this.writeLine( booBoo.exceptionMessage() ); //short error message
    this.writeLine( booBoo.thrownException() ); //long error message
    this.writeLine( " " );
    }

/* Method: printFooter
*/
buRRRn.ASTUce.ResultPrinter.prototype.printFooter = function( /*TestResult*/ result )
    {
    if( result.wasSuccessful() == true )
        {
        this.writeLine( " " );
        this.writeLine( String.format( buRRRn.ASTUce.strings.PrtOK, result.runCount(), (result.runCount() == 1 ? "": "s") ) ); //core2
        }
    else
        {
        this.writeLine( " " );
        this.writeLine( buRRRn.ASTUce.strings.PrtFailure );
        this.writeLine( String.format( buRRRn.ASTUce.strings.PrtFailureDetails, result.runCount(), result.failureCount(), result.errorCount() ) ); //core2
        }
        this.writeLine( " " );
    }

/* Method: elapsedTimeAsString
*/
buRRRn.ASTUce.ResultPrinter.prototype.elapsedTimeAsString = function( /*Number*/ runTime )
    {
    var dat, ms, s, m, h;
    dat = new Date( runTime.valueOf() );
    
    ms = dat.getUTCMilliseconds();
    s  = dat.getUTCSeconds();
    m  = dat.getUTCMinutes();
    h  = dat.getUTCHours();
    
    return String.format( buRRRn.ASTUce.strings.PrtElapsedTime, h, m, s, ms );
    }

/* Getter: getWriter
*/
buRRRn.ASTUce.ResultPrinter.prototype.getWriter = function()
    {
    return this.writer
    }

/* Method: addError
   see: <ITestListener.prototype.addError>
*/
buRRRn.ASTUce.ResultPrinter.prototype.addError = function( /*ITest*/ test, /*Error*/ e )
    {
    this.writeLine( "E" );
    }

/* Method: addFailure
   see: <ITestListener.addFailure>
*/
buRRRn.ASTUce.ResultPrinter.prototype.addFailure = function( /*ITest*/ test, /*AssertionFailedError*/ afe )
    {
    this.writeLine( "F" );
    }

/* Method: endTest
   see: <ITestListener.endTest>
*/
buRRRn.ASTUce.ResultPrinter.prototype.endTest = function( /*ITest*/ test )
    {
    
    }

/* Method: startTest
   see: <ITestListener.startTest>
*/
buRRRn.ASTUce.ResultPrinter.prototype.startTest = function( /*ITest*/ test )
    {
    
    }

