
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

/* Constructor: Money
   implements: IMoney
   
   A simple Money.
*/
buRRRn.ASTUce.samples.Money = function( /*Int*/ amount, /*String*/ currency )
    {
    this._amount = amount;
    this._currency = currency;
    }

/* Method: toString
*/
buRRRn.ASTUce.samples.Money.prototype.toString = function()
    {
    return "["+this.amount()+this.currency()+"]";
    }

/* Method: equals
*/
buRRRn.ASTUce.samples.Money.prototype.equals = function( /*Object*/ obj )
    {
    if( obj instanceof buRRRn.ASTUce.samples.Money )
        {
        if( this.isZero() )
            {
            return obj.isZero();
            }
        
        return( (this.currency() == obj.currency()) && (this.amount() == obj.amount()) );
        }
    
    return false;
    }

/* Method: plus
   Adds a money to this money.
*/
buRRRn.ASTUce.samples.Money.prototype.plus = function( /*IMoney*/ m )
    {
    return m.addMoney( this );
    }

/* Method: addMoney
   Adds a simple Money to this money.
   This is a helper method for implementing double dispatch.
*/
buRRRn.ASTUce.samples.Money.prototype.addMoney = function( /*Money*/ m )
    {
    if( m.currency() == this.currency() )
        {
        return new buRRRn.ASTUce.samples.Money( this.amount() + m.amount() , this.currency() );
        }
    
    return buRRRn.ASTUce.samples.MoneyBag.create( this, m );
    }

/* Method: addMoneyBag
   Adds a MoneyBag to this money.
   This is a helper method for implementing double dispatch
*/
buRRRn.ASTUce.samples.Money.prototype.addMoneyBag = function( /*MoneyBag*/ mb )
    {
    return mb.addMoney( this );
    }

/* Getter: currency
*/
buRRRn.ASTUce.samples.Money.prototype.currency = function()
    {
    return this._currency;
    }

/* Getter: amount
*/
buRRRn.ASTUce.samples.Money.prototype.amount = function()
    {
    return this._amount;
    }

/* Method: isZero
   Tests whether this money is zero.
*/
buRRRn.ASTUce.samples.Money.prototype.isZero = function()
    {
    return( this.amount() == 0 );
    }

/* Method: multiply
   Multiplies a money by the given factor.
*/
buRRRn.ASTUce.samples.Money.prototype.multiply = function( /*Int*/ factor )
    {
    return( new buRRRn.ASTUce.samples.Money( (this.amount()*factor), this.currency() ) );
    }

/* Method: negate
   Negates this money.
*/
buRRRn.ASTUce.samples.Money.prototype.negate = function()
    {
    return( new buRRRn.ASTUce.samples.Money( -this.amount(), this.currency() ) );
    }

/* Method: minus
   Subtracts a money from this money.
*/
buRRRn.ASTUce.samples.Money.prototype.minus = function( /*IMoney*/ m )
    {
    return( this.plus( m.negate() ) );
    }

/* Method: appendTo
   Append this to a MoneyBag.
*/
buRRRn.ASTUce.samples.Money.prototype.appendTo = function( /*MoneyBag*/ mb )
    {
    mb.appendMoney( this );
    }

