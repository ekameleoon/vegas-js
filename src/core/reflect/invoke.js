/*jslint bitwise: true */
"use strict" ;

/**
 * Invokes dynamically a class constructor.
 * @name invoke
 * @memberof core.reflect
 * @function
 * @instance
 * @param {function} c - The constructor (Function or Class) to invoke.
 * @param {array} [args] - the array of all arguments to pass to the constructor (max 32).
 * @return an instance of the class, or null if class can not construct.
 * @example
 * var ar = invoke( Array , [1,2,3]) ;
 * trace( dump( ar ) ) ; // 1,2,3
 */
export function invoke( c , a = null )
{
    if( !(c instanceof Function) )
    {
        return null ;
    }

    if( a === null || !(a instanceof Array) || (a.length === 0)  )
    {
        return new c();
    }

    // Note: if we ever need more than 32 args will use CC for that special case

    switch( a.length )
    {
        case 0:
        return new c();

        case 1:
        return new c( a[0] );

        case 2:
        return new c( a[0],a[1] );

        case 3:
        return new c( a[0],a[1],a[2] );

        case 4:
        return new c( a[0],a[1],a[2],a[3] );

        case 5:
        return new c( a[0],a[1],a[2],a[3],a[4] );

        case 6:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5] );

        case 7:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6] );

        case 8:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7] );

        case 9:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8] );

        case 10:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9] );

        case 11:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10] );

        case 12:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11] );

        case 13:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12] );

        case 14:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13] );

        case 15:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14] );

        case 16:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15] );

        case 17:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16] );

        case 18:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17] );

        case 19:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18] );

        case 20:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19] );

        case 21:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20] );

        case 22:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21] );

        case 23:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22] );

        case 24:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23] );

        case 25:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24] );

        case 26:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25] );

        case 27:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26] );

        case 28:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27] );

        case 29:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28] );

        case 30:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28],a[29] );

        case 31:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28],a[29],a[30] );

        case 32:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28],a[29],a[30],a[31] );

        default:
        return null;
    }
}