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
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * <p><b>Example :</b></p>
 * <pre>
 * PropertyEvaluator = system.evaluators.PropertyEvaluator ;
 * 
 * var obj =
 * {
 *     message : "hello world" ,
 *     title   : "my title"    ,
 *     menu    :
 *     {
 *         title : "my menu title" ,
 *         label : "my label"
 *     }
 * }
 * 
 * var evaluator = new PropertyEvaluator( obj ) ;
 * 
 * // valid expressions
 * 
 * trace( evaluator.eval( "message"    ) ) ; // hello world
 * trace( evaluator.eval( "title"      ) ) ; // my title
 * trace( evaluator.eval( "menu.title" ) ) ; // my menu title
 * trace( evaluator.eval( "menu.label" ) ) ; // my label
 * 
 * // invalid expressions
 * 
 * trace( evaluator.eval( ""            ) ) ; // null
 * trace( evaluator.eval( "unknow"      ) ) ; // null
 * trace( evaluator.eval( "menu.unknow" ) ) ; // null
 * 
 * // change the "undefineable" value returns in the eval() method when the evaluation failed.
 * 
 * evaluator.undefineable = "empty" ;
 * trace( evaluator.eval( "unknow" ) ) ; // empty ;
 * 
 * evaluator.undefineable = undefined ;
 * trace( evaluator.eval( "unknow" ) ) ; // undefined ;
 * 
 * // activate the throwError mode.
 * 
 * evaluator.throwError = true ;
 * 
 * try
 * {
 *     evaluator.eval( "test" ) ;
 * }
 * catch( e )
 * {
 *     trace( e ) ; // ##EvalError: [object PropertyEvaluator] eval failed with the expression : test##
 * }
 * </pre>
 */
if ( system.evaluators.PropertyEvaluator == undefined ) 
{
    /**
     * @requires
     */
    require( "system.evaluators.Evaluable" ) ;
    
    /**
     * Creates a new PropertyEvaluator instance.
     * @param target the target object use in the evaluator.
     */
    system.evaluators.PropertyEvaluator = function ( target ) 
    {
        this.target = target ;
    }
    
    /**
     * @extends system.evaluators.Evaluable
     */
    proto = system.evaluators.PropertyEvaluator.extend( system.evaluators.Evaluable ) ;
     
    /**
     * The separator of the expression evaluator.
     */
    proto.separator /*String*/ = "." ;
    
    /**
     * The target reference use in the evaluator.
     */
    proto.target = null ;
    
    /**
     * Indicates if the eval() method throws errors or return null when an error is throwing.
     */
    proto.throwError /*Boolean*/ = false ;
    
    /**
     * This attributs defines the value returns from the eval() method if the expression can't be evaluate.
     */
    proto.undefineable = null ;
    
    /**
     * Evaluates the specified object.
     */
    proto.eval = function ( o )  
    {
        if ( o != null && ( typeof(o) == "string" || o instanceof String ) && this.target != null )
        {
            var exp /*String*/ = String(o) ;
            if ( exp.length > 0 )
            {
                var value = this.target ;
                var members /*Array*/ = exp.split( this.separator ) ;
                var len /*int*/ = members.length ;
                for ( var i /*int*/ = 0 ; i < len ; i++ )
                {
                    if ( members[i] in value )
                    {
                        value = value[ members[i] ] ;
                    }
                    else
                    {
                        if ( this.throwError )
                        {
                            throw new EvalError( this + " eval failed with the expression : " + o ) ;
                        }
                        return this.undefineable ;
                    }
                }
                return value ;
            }
        }
        return this.undefineable ;
    }
    
    delete proto ;
}