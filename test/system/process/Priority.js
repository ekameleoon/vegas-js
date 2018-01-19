"use strict" ;

import { isPrioritizable } from 'system/process/Priority.js' ;
import { Priority } from 'system/process/Priority.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.process.Priority' , () =>
{
    it('Priority is a constructor function', () =>
    {
        assert.isFunction( Priority );
    });

    let priority = new Priority() ;

    it('new Priority().constructor === Priority', () =>
    {
        assert.equal( priority.constructor , Priority );
    });

    it('new Priority().priority', () =>
    {
        assert.property( priority , "priority" );
        assert.isNotFunction( priority.priority );
    });

    it('new Priority().toString() === "[Priority]"', () =>
    {
        let priority = new Priority() ;
        assert.equal( priority.toString() , "[Priority]" );
    });
});

describe( 'system.process.isPrioritizable()' , () =>
{
    it('#isPrioritizable(new Priority()) === true', () =>
    {
        assert.isTrue( isPrioritizable(new Priority()) );
    });

    it('#isPrioritizable({priority:1}) === true', () =>
    {
        assert.isTrue( isPrioritizable({priority:1}) );
    });

    it('#isPrioritizable({priority:function(){}}) === false', () =>
    {
        assert.isFalse( isPrioritizable({priority:function(){}}) );
    });

    it('#isPrioritizable() === false', () =>
    {
        assert.isFalse( isPrioritizable() );
    });
    it('#isPrioritizable(null) === false', () =>
    {
        assert.isFalse( isPrioritizable(null) );
    });
    it('#isPrioritizable("foo") === false', () =>
    {
        assert.isFalse( isPrioritizable("foo") );
    });
});