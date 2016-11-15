"use strict" ;


import { Motion }    from '../../../src/system/transitions/Motion.js' ;
import { TweenUnit } from '../../../src/system/transitions/TweenUnit.js' ;

import chai  from 'chai' ;

const assert = chai.assert ;

describe( 'system/transitions/TweenUnit.js' , () =>
{
    var tween = new TweenUnit() ;

    it('instanceof TweenUnit', () =>
    {
        assert.isTrue( tween instanceof TweenUnit );
    });

    it('instanceof Motion', () =>
    {
        assert.isTrue( tween instanceof Motion );
    });

    it('tween.duration === 0', () =>
    {
        assert.strictEqual( tween.duration , 0 );
    });

    it('tween.fps is NaN', () =>
    {
        assert.isTrue( isNaN(tween.fps) );
    });

    it('tween.position === 0', () =>
    {
        assert.strictEqual( tween.position , 0 );
    });

    it('tween.useSeconds === false', () =>
    {
        assert.isFalse( tween.useSeconds );
    });
});
