/*jshint laxbreak: true*/
/*jshint freeze: false*/
"use strict" ;

if ( !Function.prototype.bind )
{
    Function.prototype.bind = function (oThis)
    {
        if (typeof this !== "function")
        {
            throw new TypeError( 'Function.prototype.bind called on incompatible ' + this );
        }

        var  aArgs = Array.prototype.slice.call(arguments, 1),
           fToBind = this,
              fNOP = function () {},
            fBound = function ()
            {
                return fToBind.apply
                (
                    this instanceof fNOP ? this : oThis ,
                    aArgs.concat(Array.prototype.slice.call(arguments))
                );
             };

        if ( this.prototype )
        {
            fNOP.prototype = this.prototype;
        }

        fBound.prototype = new fNOP();

        return fBound;
  };
}

if ( Function.prototype.name === undefined )
{
    // Missing in IE9-11.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
    Object.defineProperty( Function.prototype, 'name',
    {
        get : function ()
        {
            return this.toString().match( /^\s*function\s*(\S*)\s*\(/ )[ 1 ];
        }
    } );
}