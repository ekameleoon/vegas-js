"use strict" ;

import { Iterator }   from 'system/data/Iterator.js' ;
import { isIterator } from 'system/data/Iterator.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.data.Iterator' , () =>
{
    let iterator = new Iterator() ;

    it('#delete'   , () => { assert.isFunction( iterator.delete );   });
    it('#hasNext'  , () => { assert.isFunction( iterator.hasNext );  });
    it('#key'      , () => { assert.isFunction( iterator.key );      });
    it('#next'     , () => { assert.isFunction( iterator.next );     });
    it('#reset'    , () => { assert.isFunction( iterator.reset );    });
    it('#seek'     , () => { assert.isFunction( iterator.seek );     });

    it('#toString === [Iterator]' , () =>
    {
        assert.equal( iterator.toString() , '[Iterator]' );
    });

    describe( '#isIterator' , () =>
    {
        it('isIterator(new Iterator()) === true' , () => { assert.isTrue( isIterator(iterator) ); });

        let fake1 =
        {
            delete : () => {} , hasNext : () => {} , key : ()  => {} ,
            next : () => {}   , reset   : () => {} , seek : () => {}
        };

        it('isIterator(fake1)) === true'  , () => {  assert.isTrue( isIterator(fake1) ); });

        it('isIterator(null))  === false' , () => { assert.isFalse( isIterator(null) ); });
        it('isIterator("foo")) === false' , () => { assert.isFalse( isIterator("foo") ); });

        let fake2 =
        {
            delete : () => {} , hasNext : () => {} , key  : () => {} ,
            next   : () => {} , reset   : () => {}
        };
        it('isIterator(fake2)) === false' , () => { assert.isFalse( isIterator(fake2) ); });

        let fake3 =
        {
            delete : () => {} , hasNext : () => {} , key : ()  => {} ,
            next : () => {}   , seek : () => {}
        };
        it('isIterator(fake3)) === false' , () => { assert.isFalse( isIterator(fake3) ); });


        let fake4 =
        {
            delete : () => {} , hasNext : () => {} , key : ()  => {} ,
            reset   : () => {} , seek : () => {}
        };
        it('isIterator(fake4)) === false' , () => { assert.isFalse( isIterator(fake4) ); });

        let fake5 =
        {
            delete : () => {} , hasNext : () => {} ,
            next : () => {}   , reset   : () => {} , seek : () => {}
        };
        it('isIterator(fake5)) === false' , () => { assert.isFalse( isIterator(fake5) ); });

        let fake6 =
        {
            delete : () => {} , key : ()  => {} ,
            next : () => {}   , reset   : () => {} , seek : () => {}
        };
        it('isIterator(fake6)) === false' , () => { assert.isFalse( isIterator(fake6) ); });

        let fake7 =
        {
            hasNext : () => {} , key : ()  => {} ,
            next : () => {}   , reset   : () => {} , seek : () => {}
        };
        it('isIterator(fake7)) === false' , () => { assert.isFalse( isIterator(fake7) ); });

        let fake8 =
        {
            delete : 'nofunction' , hasNext : () => {} , key  : ()  => {} ,
            next   : () => {}     , reset   : () => {} , seek : () => {}
        };
        it('isIterator(fake8)) === false' , () => { assert.isFalse( isIterator(fake8) ); });

        let fake9 =
        {
            delete : () => {} , hasNext : 'nofunction' , key  : () => {} ,
            next   : () => {} , reset   : () => {}     , seek : () => {}
        };
        it('isIterator(fake9)) === false' , () => { assert.isFalse( isIterator(fake9) ); });

        let fake10 =
        {
            delete : () => {} , hasNext : () => {} , key  : 'nofunction' ,
            next   : () => {} , reset   : () => {} , seek : () => {}
        };
        it('isIterator(fake10)) === false' , () => { assert.isFalse( isIterator(fake10) ); });

        let fake11 =
        {
            delete : () => {}     , hasNext : () => {} , key  : () => {} ,
            next   : 'nofunction' , reset   : () => {} , seek : () => {}
        };
        it('isIterator(fake11)) === false' , () => { assert.isFalse( isIterator(fake11) ); });

        let fake12 =
        {
            delete : () => {} , hasNext : () => {}     , key  : () => {} ,
            next   : () => {} , reset   : 'nofunction' , seek : () => {}
        };
        it('isIterator(fake12)) === false' , () => { assert.isFalse( isIterator(fake12) ); });

        let fake14 =
        {
            delete : () => {} , hasNext : () => {} , key  : () => {} ,
            next   : () => {} , reset   : () => {} , seek : 'nofunction'
        };
        it('isIterator(fake14)) === false' , () => { assert.isFalse( isIterator(fake14) ); });
    });
});


