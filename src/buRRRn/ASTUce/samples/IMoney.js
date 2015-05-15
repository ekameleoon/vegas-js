
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

/* Interface: IMoney
   The common interface for simple Monies and MoneyBags.
*/
buRRRn.ASTUce.samples.IMoney = function()
    {
    
    }

/* Method: plus
   Adds a money to this money.
*/
buRRRn.ASTUce.samples.IMoney.prototype.plus = function( /*IMoney*/ m )
    {
    
    }

/* Method: addMoney
   Adds a simple Money to this money.
   This is a helper method for implementing double dispatch.
*/
buRRRn.ASTUce.samples.IMoney.prototype.addMoney = function( /*Money*/ m )
    {
    
    }

/* Method: addMoneyBag
   Adds a MoneyBag to this money.
   This is a helper method for implementing double dispatch
*/
buRRRn.ASTUce.samples.IMoney.prototype.addMoneyBag = function( /*MoneyBag*/ mb )
    {
    
    }

/* Method: isZero
   Tests whether this money is zero.
*/
buRRRn.ASTUce.samples.IMoney.prototype.isZero = function()
    {
    
    }

/* Method: multiply
   Multiplies a money by the given factor.
*/
buRRRn.ASTUce.samples.IMoney.prototype.multiply = function( /*Int*/ factor )
    {
    
    }

/* Method: negate
   Negates this money.
*/
buRRRn.ASTUce.samples.IMoney.prototype.negate = function()
    {
    
    }

/* Method: minus
   Subtracts a money from this money.
*/
buRRRn.ASTUce.samples.IMoney.prototype.minus = function( /*IMoney*/ m )
    {
    
    }

/* Method: appendTo
   Append this to a MoneyBag.
*/
buRRRn.ASTUce.samples.IMoney.prototype.appendTo = function( /*MoneyBag*/ mb )
    {
    
    }

