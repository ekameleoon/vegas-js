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

/**
 * Defines an object that is bounded in size. 
 * <p>The size of the object can vary, but it can never exceed a preset maximum number of elements.</p> 
 * <p>This interface allows the querying of details associated with the maximum number of elements.</p>
 */
if ( system.data.Boundable == undefined) 
{
    /**
     * Creates a new Boundable instance.
     */
    system.data.Boundable = function () 
    { 
        
    }
    
    /**
     * @extends Object
     */
    proto = system.data.Boundable.extend( Object ) ;
    
    /**
     * Returns <code class="prettyprint">true</code> if the object is full.
     * @return <code class="prettyprint">true</code> if the object is full.
     */
    proto.isFull = function() /*Boolean*/
    {
        //
    }
    
    /**
     * Returns the max number of occurrences in the given collection.
     * @return the max number of occurrences in the given collection.
     */
    proto.maxSize = function() /*uint*/
    {
        //
    }
    
    // encapsulate
    
    delete proto ;
}