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

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };
    if (this.prototype)
    {
        fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}

if ( Object.assign === undefined )
{
    // Missing in IE.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    ( function () {

        Object.assign = function ( target )
        {
            if ( target === undefined || target === null )
            {
                throw new TypeError( 'Cannot convert undefined or null to object' );
            }

            var output = Object( target );

            for ( var index = 1; index < arguments.length; index ++ )
            {
                var source = arguments[ index ];
                if ( source !== undefined && source !== null )
                {
                    for ( var nextKey in source )
                    {
                        if ( Object.prototype.hasOwnProperty.call( source, nextKey ) )
                        {
                            output[ nextKey ] = source[ nextKey ];
                        }
                    }
                }
            }
            return output;
        };
    } )();
}

if ( Math.sign === undefined )
{
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
    Math.sign = function ( x )
    {
        return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;
    };
}

if ( Function.prototype.name === undefined )
{
    // Missing in IE9-11.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
    Object.defineProperty( Function.prototype, 'name',
    {
        get: function ()
        {
            return this.toString().match( /^\s*function\s*(\S*)\s*\(/ )[ 1 ];
        }
    } );
}