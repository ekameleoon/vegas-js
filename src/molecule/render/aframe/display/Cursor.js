"use strict"

import { AEntity } from './AEntity.js' ;

import { isString } from './core/isString.js' ;
import { Timer }    from './system/process/Timer.js' ;
import { Signal }   from './system/signals/Signal.js' ;

/**
 * Creates a new Cursor instance.
 * @name Cursor
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.AEntity
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 * @param {String} [defaultObject=buttonMode] The default raycaster 'objects' value.
 */
export function Cursor( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * Emits click.
         * @name click
         * @memberof molecule.render.aframe.display.Cursor
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        click : { value : new Signal() } ,

        /**
         * Emits when mouse down.
         * @name down
         * @memberof molecule.render.aframe.display.Cursor
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        down : { value : new Signal() } ,

        /**
         * Emits when mouse out.
         * @name out
         * @memberof molecule.render.aframe.display.Cursor
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        out : { value : new Signal() } ,

        /**
         * Emits when mouse over.
         * @name over
         * @memberof molecule.render.aframe.display.Cursor
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        over : { value : new Signal() } ,

        /**
         * Emits when mouse up.
         * @name up
         * @memberof molecule.render.aframe.display.Cursor
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        up : { value : new Signal() } ,

        /**
         * @private
         */
         _enabled             : { writable : true , value : true } ,
         _intersection        : { writable : true , value : null } ,
         _intersectionCleared : { writable : true , value : null } ,
         _launchedRaycaster   : { writable : true , value : false } ,
         _objects             : { writable : true , value : 'button' } ,
         _mouseDown           : { writable : true , value : null } ,
         _mouseUp             : { writable : true , value : null } ,
         _notifyClick         : { writable : true , value : null } ,
         _target              : { writable : true , value : null } ,
         _timer               : { value : new Timer( 0 , 1 ) }
    });

    AEntity.call( this , init ) ;

    this.objects = this._objects ;
}

Cursor.prototype = Object.create( AEntity.prototype ,
{
    constructor : { writable : true , value : Cursor } ,

    /**
     * Indicates delay of the internal timer.
     * @type {number}
     * @name duration
     * @memberof molecule.render.aframe.display.Cursor
     * @instance
     */
    duration :
    {
        get : function () { return this._timer.delay ; } ,
        set : function( value )
        {
            this._timer.delay = value ;
        }
    },

    dispose : { value : function()
    {
        this.removeEventListener( 'addedToStage'     , this._addedToStage ) ;
        this.removeEventListener( 'removedFromStage' , this._removedFromStage ) ;
    }},

    /**
     * Enabled the cursor activity.
     * @name enabled
     * @memberof molecule.render.aframe.display.Cursor
     * @instance
     * @type Boolean
     * @default true
     */
    enabled :
    {
        get : function()
        {
            return this._enabled ;
        },
        set : function( value )
        {
            this._enabled = (value === true) ;

            if( this._enabled ===  true )
            {
                if( this._onStage === true && this._launchedRaycaster === false )
                {
                    this.launchRaycaster() ;
                }
            }
            else
            {
                if( this._launchedRaycaster === true )
                {
                    this.stopRaycaster() ;
                }
            }
        }
    },

    /**
     * The objects class to interacts with the cursor.
     * @name objects
     * @memberof molecule.render.aframe.display.Cursor
     * @instance
     */
    objects :
    {
        get : function()
        {
            return this._objects ;
        },
        set : function( value )
        {
            if( isString(this._objects) && this._objects !== '' )
            {
                this._objects = value ;
                this.setAttribute( 'raycaster' , 'objects' , '.' + this._objects ) ;
            }
            else
            {
                this._objects = '' ;
                this.setAttribute( 'raycaster' , '' ) ;
            }
        }
    },

    /**
     * Notify a click signal.
     * @name notifyClick
     * @memberof molecule.render.aframe.display.Cursor
     * @instance
     * @function
     */
    notifyClick : { value : function()
    {
        if( this._target )
        {
            if ( this.click.connected )
            {
                this.click.emit( this._target , this ) ;
            }

            this._target.dispatchEvent( new Event( 'click' ) ) ;
        }
    }},

    /**
     * Notify a signal when the mouse down on entity.
     * @name notifyDown
     * @memberof molecule.render.aframe.display.Cursor
     * @instance
     * @function
     */
    notifyDown : { value : function()
    {
        if ( this.down.connected )
        {
            this.down.emit( this._target , this ) ;
        }

        this._target.dispatchEvent( new Event( 'mousedown' ) ) ;
    }},

    /**
     * Notify a signal when the mouse over on entity.
     * @name notifyOver
     * @memberof molecule.render.aframe.display.Cursor
     * @instance
     * @function
     */
    notifyOver : { value : function()
    {
        if( this._target )
        {
            if ( this.over.connected )
            {
                this.over.emit( this._target , this ) ;
            }

            this._target.dispatchEvent( new Event( 'mouseenter' ) ) ;

            this._timer.run() ;
        }
    }},

    /**
     * Notify a signal when the mouse out on entity.
     * @name notifyOut
     * @memberof molecule.render.aframe.display.Cursor
     * @instance
     * @function
     */
    notifyOut : { value : function()
    {
        if( this._timer.running )
        {
            this._timer.stop() ;
        }
        if( this._target )
        {
            if ( this.out.connected )
            {
                this.out.emit( this._target , this ) ;
            }

            this._target.dispatchEvent( new Event( 'mouseleave' ) ) ;
        }
    }},

    /**
     * Notify a signal when the mouse up on entity.
     * @name notifyUp
     * @memberof molecule.render.aframe.display.Cursor
     * @instance
     * @function
     */
    notifyUp : { value : function()
    {
        if ( this.up.connected )
        {
            this.up.emit( this._target , this ) ;
        }

        this._target.dispatchEvent( new Event( 'mouseup' ) ) ;
    }},

    /**
     * Indicates if the internal timer delay is in seconds or in milliseconds (default milliseconds).
     * @type {boolean}
     * @name useSeconds
     * @memberof molecule.render.aframe.display.Cursor
     * @instance
     */
    useSeconds :
    {
        get : function() { return this._timer.useSeconds ; } ,
        set : function( flag  )
        {
            this._timer.useSeconds = flag ;
        }
    },

    /**
     * @private
     * @name __addedToStage
     * @memberof molecule.render.aframe.display.Cursor
     * @instance
     * @function
     */
    __addedToStage : { value : function()
    {
        this._onStage = true ;

        if( ( this._enabled === true ) && ( this._launchedRaycaster === false ) )
        {
            this.launchRaycaster() ;
        }
    }},

    /**
     * @private
     * @name __removedFromStage
     * @memberof molecule.render.aframe.display.Cursor
     * @instance
     * @function
     */
    __removedFromStage : { value : function()
    {
        this._onStage = false ;

        if( this._launchedRaycaster === true )
        {
            this.stopRaycaster() ;
        }
    }},

    launchRaycaster : { value : function()
    {
        this._notifyClick = this.notifyClick.bind( this ) ;

        this._intersection        = this.intersection.bind( this ) ;
        this._intersectionCleared = this.intersectionCleared.bind( this ) ;

        this._mouseDown = this.notifyDown.bind( this ) ;
        this._mouseUp = this.notifyUp.bind( this ) ;

        this._timer.finishIt.connect( this._notifyClick );

        this.element.addEventListener( 'raycaster-intersection'         , this._intersection ) ;
        this.element.addEventListener( 'raycaster-intersection-cleared' , this._intersectionCleared ) ;

        this._launchedRaycaster = true ;
    }},

    stopRaycaster : { value : function()
    {
        this.element.removeEventListener('raycaster-intersection' , this._intersection ) ;
        this.element.removeEventListener('raycaster-intersection-cleared' , this._intersectionCleared ) ;

        this._timer.finishIt.disconnect();

        this._notifyClick = null ;

        this._intersection = null ;
        this._intersectionCleared = null ;
        this._mouseDown = null ;
        this._mouseUp = null ;

        this._launchedRaycaster = false ;
    }},

    intersection : { value : function( event )
    {
        let cursor = this.element ;
        let index ;
        let intersected ;

        index = event.detail.els[0] === cursor ? 1 : 0 ;
        intersected = event.detail.els[ index ] ;

        // ignore cursor
        if( !intersected )
        {
            return ;
        }

        if( intersected === this._target )
        {
            return ;
        }

        // cleared current intersection
        if( this._target )
        {
            //
            this.notifyOut() ;
        }

        this._target = intersected ;

        this.notifyOver() ;
    }},

    intersectionCleared : { value : function( event )
    {
        let cursor = this.element ;
        let intersected = event.detail.el ;

        // ignore the cursor
        if( cursor === intersected )
        {
            return ;
        }

        // ignore
        if( intersected !== this._target )
        {
            return ;
        }

        this.notifyOut() ;
        this._target = null ;
    }}
}) ;
