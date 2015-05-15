
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

/* Constructor: MoneyBag
   implements: IMoney
   
   A MoneyBag defers exchange rate conversions. For example adding 
   12 Swiss Francs to 14 US Dollars is represented as a bag 
   containing the two Monies 12 CHF and 14 USD. Adding another
   10 Swiss francs gives a bag with 22 CHF and 14 USD. Due to 
   the deferred exchange rate conversion we can later value a 
   MoneyBag with different exchange rates.
  
   A MoneyBag is represented as a list of Monies and provides 
   different constructors to create a MoneyBag.
   
   note:
   we have to include Array.prototype.indexOf for
   MoneyBag.prototype.appendMoney method to work.
*/
buRRRn.ASTUce.samples.MoneyBag = function()
    {
    this._monies = [];
    }

/* StaticMethod: create
*/
buRRRn.ASTUce.samples.MoneyBag.create = function( /*IMoney*/ m1, /*IMoney*/ m2 )
    {
    var result;
    result = new buRRRn.ASTUce.samples.MoneyBag();
    m1.appendTo( result );
    m2.appendTo( result );
    return result.simplify();
    }

/* Method: plus
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.plus = function( /*IMoney*/ m )
    {
    return m.addMoneyBag( this );
    }

/* Method: addMoney
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.addMoney = function( /*Money*/ m )
    {
    return buRRRn.ASTUce.samples.MoneyBag.create( m, this );
    }

/* Method: addMoneyBag
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.addMoneyBag = function( /*MoneyBag*/ mb )
    {
    return buRRRn.ASTUce.samples.MoneyBag.create( mb, this );
    }

/* Method: appendBag
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.appendBag = function( /*MoneyBag*/ aBag )
    {
    var i;
    for( i=0; i<aBag._monies.length; i++ )
        {
        this.appendMoney( aBag._monies[i] );
        }
    }

/* Method: appendMoney
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.appendMoney = function( /*Money*/ aMoney )
    {
    var old, sum;
    
    if( aMoney.isZero() )
        {
        return;
        }
    
    old = this.findMoney( aMoney.currency() );
    
    if( old == null )
        {
        this._monies.push( aMoney );
        return;
        }
    
    this._monies.splice( this._monies.indexOf( old ) , 1 );
    sum = old.plus( aMoney );
    
    if( sum.isZero() )
        {
        return;
        }
    
    this._monies.push( sum );
    }

/* Method: equals
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.equals = function( /*Object*/ obj )
    {
    var i, aMoneyBag, m;
    
    if( obj instanceof buRRRn.ASTUce.samples.MoneyBag )
        {
        aMoneyBag = obj;
        if( this.isZero() )
            {
            return( aMoneyBag.isZero() );
            }
        
        if( aMoneyBag._monies.length != this._monies.length )
            {
            return false;
            }
        
        for( i=0; i<this._monies.length; i++ )
            {
            m = this._monies[i];
            if( !aMoneyBag.contains( m ) )
                {
                return false;
                }
            }
        
        return true;
        }
    
    return false;
    }

/* Method: findMoney
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.findMoney = function( /*String*/ currency )
    {
    var i, m;
    for( i=0; i<this._monies.length; i++ )
        {
        m = this._monies[i];
        
        if( m.currency().equals( currency ) )
            {
            return m;
            }
        }
    return null;
    }

/* Method: contains
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.contains = function( /*Money*/ m )
    {
    var found;
    found = this.findMoney( m.currency() );
    
    if( found == null )
        {
        return false;
        }
    
    return( found.amount() == m.amount() );
    }

/* Method: isZero
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.isZero = function()
    {
    return( this._monies.length == 0 );
    }

/* Method: multiply
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.multiply = function( /*Int*/ factor )
    {
    var result, i, m;
    result = new buRRRn.ASTUce.samples.MoneyBag();
    
    if( factor != 0 )
        {
        for( i=0; i<this._monies.length; i++ )
            {
            m = this._monies[i];
            result.appendMoney( m.multiply( factor ) );
            }
        }
    
    return result;
    }

/* Method: negate
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.negate = function()
    {
    var result, i, m;
    result = new buRRRn.ASTUce.samples.MoneyBag();
    
    for( i=0; i<this._monies.length; i++ )
        {
        m = this._monies[i];
        result.appendMoney( m.negate() );
        }
    
    return result;
    }

/* Method: simplify
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.simplify = function()
    {
    if( this._monies.length == 1 )
        {
        return this._monies[0];
        }
    return this;
    }

/* Method: minus
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.minus = function( /*IMoney*/ m )
    {
    return this.plus( m.negate() );
    }

/* Method: toString
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.toString = function()
    {
    var str, i;
    str = "";
    for( i=0; i<this._monies.length; i++ )
        {
        str += this._monies[i].toString() ;
        }
    return "{" + str + "}";
    }

/* Method: appendTo
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.appendTo = function( /*MoneyBag*/ mb )
    {
    mb.appendBag( this );
    }

