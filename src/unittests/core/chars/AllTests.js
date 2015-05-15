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

load("unittests/core/chars/isAlphaTest.js"      ) ;
load("unittests/core/chars/isASCIITest.js"      ) ;
load("unittests/core/chars/isDigitTest.js"      ) ;
load("unittests/core/chars/isHexDigitTest.js"   ) ;
load("unittests/core/chars/isLowerTest.js"      ) ;
load("unittests/core/chars/isOctalDigitTest.js" ) ;
load("unittests/core/chars/isOperatorTest.js"   ) ;
load("unittests/core/chars/isUnicodeTest.js"    ) ;
load("unittests/core/chars/isUpperTest.js"      ) ;

core.chars.AllTests = {} ;

core.chars.AllTests.suite = function() 
{
    var TestSuite = buRRRn.ASTUce.TestSuite;
    
    var suite = new TestSuite( "core.chars unit tests" );
    
    //suite.simpleTrace = true;
    
    suite.addTest( new TestSuite( core.chars.isAlphaTest      ) ) ;
    suite.addTest( new TestSuite( core.chars.isASCIITest      ) ) ;
    suite.addTest( new TestSuite( core.chars.isDigitTest      ) ) ;
    suite.addTest( new TestSuite( core.chars.isHexDigitTest   ) ) ;
    suite.addTest( new TestSuite( core.chars.isLowerTest      ) ) ;
    suite.addTest( new TestSuite( core.chars.isOctalDigitTest ) ) ;
    suite.addTest( new TestSuite( core.chars.isOperatorTest   ) ) ;
    suite.addTest( new TestSuite( core.chars.isUnicodeTest    ) ) ;
    suite.addTest( new TestSuite( core.chars.isUpperTest      ) ) ;
    
    return suite ;
}
