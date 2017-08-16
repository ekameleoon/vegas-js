"use strict" ;

import { Task } from '../../../system/process/Task.js' ;
import { ObjectDefinitionContainer } from '../../../system/ioc/ObjectDefinitionContainer.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.ioc.ObjectDefinitionContainer' , () =>
{
    describe( 'new ObjectDefinitionContainer()' , () =>
    {
        let container = new ObjectDefinitionContainer() ;

        it('container instanceof Task', () =>
        {
            assert.isTrue( container instanceof Task );
        });

        it('container.toString() === [ObjectDefinitionContainer]', () =>
        {
            assert.equal( container.toString() , "[ObjectDefinitionContainer]" );
        });
    });
});
