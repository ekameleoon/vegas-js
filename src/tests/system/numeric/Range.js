"use strict" ;

import { isFloat } from '../../../core/isFloat.js' ;
import { isInt   } from '../../../core/isInt.js' ;
import { Range   } from '../../../system/numeric/Range.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.numeric.Range' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( '#empty' , () =>
        {
            it('new Range().min is NaN', () =>
            {
                let range = new Range() ;
                assert.isNaN( range.min ) ;
            });
            it('new Range().max is NaN', () =>
            {
                let range = new Range() ;
                assert.isNaN( range.max ) ;
            });
        });

        describe( '#with arguments' , () =>
        {
            it('new Range(2,8).min is NaN', () =>
            {
                let range = new Range(2,8) ;
                assert.equal( range.min , 2 ) ;
            });
            it('new Range(2,8).max is NaN', () =>
            {
                let range = new Range(2,8) ;
                assert.equal( range.max , 8 ) ;
            });

            it('new Range(2,8,false) freeze the min/max properties', () =>
            {
                let range = new Range(2,8,false) ;
                assert.throws( () => { range.max = 1 ; } , TypeError );
                assert.throws( () => { range.min = 5 ; } , TypeError );
            });
        });
    });

    describe( '#enumeration' , () =>
    {
        it('Range.COLOR', () =>
        {
            assert.instanceOf( Range.COLOR , Range ) ;
            assert.equal( Range.COLOR.max ,  255 ) ;
            assert.equal( Range.COLOR.min , -255 ) ;
            assert.throws( () => { Range.COLOR.max = 2 ; } , TypeError );
            assert.throws( () => { Range.COLOR.min = 2 ; } , TypeError );
        });

        it('Range.DEGREE', () =>
        {
            assert.instanceOf( Range.DEGREE , Range ) ;
            assert.equal( Range.DEGREE.max , 360 ) ;
            assert.equal( Range.DEGREE.min ,   0 ) ;
            assert.throws( () => { Range.DEGREE.max = 2 ; } , TypeError );
            assert.throws( () => { Range.DEGREE.min = 2 ; } , TypeError );
        });

        it('Range.PERCENT', () =>
        {
            assert.instanceOf( Range.PERCENT , Range ) ;
            assert.equal( Range.PERCENT.max , 100 ) ;
            assert.equal( Range.PERCENT.min ,   0 ) ;
            assert.throws( () => { Range.PERCENT.max = 2 ; } , TypeError );
            assert.throws( () => { Range.PERCENT.min = 2 ; } , TypeError );
        });

        it('Range.RADIAN', () =>
        {
            assert.instanceOf( Range.RADIAN , Range ) ;
            assert.equal( Range.RADIAN.max , Math.PI*2 ) ;
            assert.equal( Range.RADIAN.min , 0 ) ;
            assert.throws( () => { Range.RADIAN.max = 2 ; } , TypeError );
            assert.throws( () => { Range.RADIAN.min = 2 ; } , TypeError );
        });

        it('Range.UNITY', () =>
        {
            assert.instanceOf( Range.UNITY , Range ) ;
            assert.equal( Range.UNITY.max , 1 ) ;
            assert.equal( Range.UNITY.min , 0 ) ;
            assert.throws( () => { Range.UNITY.max = 2 ; } , TypeError );
            assert.throws( () => { Range.UNITY.min = 2 ; } , TypeError );
        });
    });

    describe( '#clamp' , () =>
    {
        let range = new Range(2,8) ;
        it('new Range(2,8).clamp(1) === 2', () =>
        {
            assert.equal( range.clamp(1) , 2 ) ;
        });
        it('new Range(2,8).clamp(2) === 2', () =>
        {
            assert.equal( range.clamp(2) , 2 ) ;
        });
        it('new Range(2,8).clamp(5) === 5', () =>
        {
            assert.equal( range.clamp(5) , 5 ) ;
        });
        it('new Range(2,8).clamp(8) === 8', () =>
        {
            assert.equal( range.clamp(8) , 8 ) ;
        });
        it('new Range(2,8).clamp(9) === 8', () =>
        {
            assert.equal( range.clamp(9) , 8 ) ;
        });
        it('new Range(2,8).clamp(NaN) === NaN', () =>
        {
            assert.isNaN( range.clamp(NaN) ) ;
        });
    });

    describe( '#combine' , () =>
    {
        let range = new Range(2,8) ;
        it('new Range(2,8).combine(new Range(1,8)) === [Range min:1 max:8]', () =>
        {
            let result = range.combine(new Range(1,8)) ;
            assert.equal( result.min , 1 ) ;
            assert.equal( result.max , 8 ) ;
        });
        it('new Range(2,8).combine(new Range(5,10)) === [Range min:2 max:10]', () =>
        {
            let result = range.combine(new Range(5,10)) ;
            assert.equal( result.min , 2 ) ;
            assert.equal( result.max , 10 ) ;
        });
        it('new Range(2,8).combine(new Range(1,10)) === [Range min:1 max:10]', () =>
        {
            let result = range.combine(new Range(1,10)) ;
            assert.equal( result.min ,  1 ) ;
            assert.equal( result.max , 10 ) ;
        });
        it('new Range(2,8).combine(null) === clone', () =>
        {
            let result = range.combine(null) ;
            assert.equal( result.min , range.min ) ;
            assert.equal( result.max , range.max ) ;
            assert.instanceOf( range , Range ) ;
            assert.notEqual( result , range ) ;
        });
        it('new Range(2,8).combine("foo") === clone', () =>
        {
            let result = range.combine("foo") ;
            assert.equal( result.min , range.min ) ;
            assert.equal( result.max , range.max ) ;
            assert.instanceOf( range , Range ) ;
            assert.notEqual( result , range ) ;
        });
    });

    describe( '#contains' , () =>
    {
        let range = new Range(2,8) ;
        it('new Range(2,8).contains(1) === false', () =>
        {
            assert.isFalse( range.contains(1) ) ;
        });
        it('new Range(2,8).contains(9) === false', () =>
        {
            assert.isFalse( range.contains(9) ) ;
        });
        it('new Range(2,8).contains(2) === true', () =>
        {
            assert.isTrue( range.contains(2) ) ;
        });
        it('new Range(2,8).contains(5) === true', () =>
        {
            assert.isTrue( range.contains(5) ) ;
        });
        it('new Range(2,8).contains(8) === true', () =>
        {
            assert.isTrue( range.contains(8) ) ;
        });
    });

    describe( '#equals' , () =>
    {
        let range = new Range(2,8) ;
        it('new Range(2,8).equals(new Range(2,8)) === true', () =>
        {
            assert.isTrue( range.equals(range) ) ;
            assert.isTrue( range.equals(new Range(2,8)) ) ;
        });
        it('new Range(2,8).equals(new Range(1,8)) === false', () =>
        {
            assert.isFalse( range.equals(new Range(1,8)) ) ;
        });
        it('new Range(2,8).equals(new Range(2,9)) === false', () =>
        {
            assert.isFalse( range.equals(new Range(2,9)) ) ;
        });
        it('new Range(2,8).equals({min:2,max:8}) === false, must be a Range instance', () =>
        {
            assert.isFalse( range.equals({min:2,max:8}) ) ;
        });
        it('new Range(2,8).equals(null) === false', () =>
        {
            assert.isFalse( range.equals(null) ) ;
        });
    });

    describe( '#expand' , () =>
    {
        let range = new Range(4,8) ;
        it('new Range(4,8).expand() === [Range min:4 max:8]', () =>
        {
            assert.equal( range.expand().toString() , "[Range min:4 max:8]" ) ;
        });
        it('new Range(4,8).expand(0.5) === [Range min:2 max:10]', () =>
        {
            assert.equal( range.expand(0.5,0.5).toString() , "[Range min:2 max:10]" ) ;
        });
        it('new Range(4,8).expand(1,1) === [Range min:0 max:12]', () =>
        {
            assert.equal( range.expand(1,1).toString() , "[Range min:0 max:12]" ) ;
        });
    });

    describe( '#getCentralValue' , () =>
    {
        let range = new Range(4,8) ;
        it('new Range(4,8).getCentralValue() === 6', () =>
        {
            assert.equal( range.getCentralValue() , 6 ) ;
        });
    });

    describe( '#getRandomFloat' , () =>
    {
        let range = new Range(4,8) ;
        it('new Range(4,8).getRandomFloat()', () =>
        {
            assert.isTrue( isFloat(range.getRandomFloat()) ) ;
        });
    });

    describe( '#getRandomInteger' , () =>
    {
        let range = new Range(4,8) ;
        it('new Range(4,8).getRandomInteger()', () =>
        {
            assert.isTrue( isInt(range.getRandomInteger()) ) ;
        });
    });

    describe( '#isOutOfRange' , () =>
    {
        let range = new Range(2,8) ;
        it('new Range(2,8).isOutOfRange(1) === true', () =>
        {
            assert.isTrue( range.isOutOfRange(1) ) ;
        });
        it('new Range(2,8).isOutOfRange(9) === true', () =>
        {
            assert.isTrue( range.isOutOfRange(9) ) ;
        });
        it('new Range(2,8).isOutOfRange(2) === false', () =>
        {
            assert.isFalse( range.isOutOfRange(2) ) ;
        });
        it('new Range(2,8).isOutOfRange(5) === false', () =>
        {
            assert.isFalse( range.isOutOfRange(5) ) ;
        });
        it('new Range(2,8).isOutOfRange(8) === false', () =>
        {
            assert.isFalse( range.isOutOfRange(8) ) ;
        });
    });

    describe( '#overlap' , () =>
    {
        let range = new Range(2,8) ;
        it('new Range(2,8).overlap(new Range(1,2))) === true', () =>
        {
            assert.isTrue( range.overlap(new Range(1,2)) ) ;
        });
        it('new Range(2,8).overlap(new Range(3,5))) === true', () =>
        {
            assert.isTrue( range.overlap(new Range(3,5)) ) ;
        });
        it('new Range(2,8).overlap(new Range(5,10))) === true', () =>
        {
            assert.isTrue( range.overlap(new Range(5,10)) ) ;
        });
        it('new Range(2,8).overlap(new Range(8,10))) === true', () =>
        {
            assert.isTrue( range.overlap(new Range(8,10)) ) ;
        });
        it('new Range(2,8).overlap(new Range(-1,1))) === false', () =>
        {
            assert.isFalse( range.overlap(new Range(-1,1)) ) ;
        });
        it('new Range(2,8).overlap(new Range(9,12))) === false', () =>
        {
            assert.isFalse( range.overlap(new Range(9,12)) ) ;
        });
    });

    describe( '#size' , () =>
    {
        it('new Range().size()) === NaN', () =>
        {
            assert.isNaN( (new Range()).size() ) ;
        });
        it('new Range(2,8).size()) === 6', () =>
        {
            assert.equal( (new Range(2,8)).size() , 6 ) ;
        });
    });

    describe( '#toString' , () =>
    {
        it('new Range().toString()) === [Range min:NaN max:NaN]', () =>
        {
            assert.equal( (new Range()).toString() , "[Range min:NaN max:NaN]" ) ;
        });
        it('new Range(2,8).toString()) === [Range min:2 max:8]', () =>
        {
            assert.equal( (new Range(2,8)).toString() , "[Range min:2 max:8]" ) ;
        });
    });
});
