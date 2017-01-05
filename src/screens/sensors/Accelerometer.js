"use strict" ;

import { Signal }  from '../../system/signals/Signal.js' ;

/**
 * The Accelerometer class dispatches events based on activity detected by the device's motion sensor. This data represents the device's location or movement along a 3-dimensional axis.
 * @summary The Accelerometer class get the device's location or movement.
 * @name Accelerometer
 * @class
 * @memberof screens.sensors
 */
export function Accelerometer()
{
    Object.defineProperties( this ,
    {
        /**
         * This signal emit when accelerometer update.
         * @name update
         * @memberof screens.sensors.Accelerometer
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        update : { value : new Signal() } ,

        /**
         * @private
         */
        _isSupported : { writable : true  , value : false }
    });

    this.__initialize__() ;
}

Accelerometer.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Accelerometer } ,

    /**
     * Get if accelerometer is supported
     * @name isSupported
     * @memberof screens.sensors.Accelerometer
     * @instance
     * @readonly
     */
    isSupported : { get : function() { return this._isSupported ; } } ,

    /**
     * Notify when the accelerometer update.
     * @name notifyUpdate
     * @memberof screens.sensors.Accelerometer
     * @function
     * @instance
     */
    notifyUpdate : { writable : true , value : function( event )
    {
        if( this._isSupported && this.update.connected() )
        {
            this.update.emit( event , this ) ;
        }
    }},

    /**
     * Initialize the internal Accelerometer.
     * @private
     */
    __initialize__ : { writable : true , value : function()
    {
        if( !!window.DeviceMotionEvent )
        {
            this._isSupported = true ;
        }

        // -------- Behaviors
        if( this._isSupported === true )
        {
            window.addEventListener( "devicemotion" , this.notifyUpdate.bind( this ) , false );
        }
    }}
});
