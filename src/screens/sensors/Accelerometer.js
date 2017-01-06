"use strict" ;

import { Signal }  from '../../system/signals/Signal.js' ;
import { Timer }  from '../../system/process/Timer.js' ;

/**
 * The Accelerometer class dispatches events based on activity detected by the device's motion sensor.
 * <p>This data represents the device's location or movement along a 3-dimensional axis.</p>
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
         * This timer used for accelerometer update.
         * @name timer
         * @memberof screens.sensors.Accelerometer
         * @type {system.process.Timer}
         * @instance
         * @const
         */
        timer : { value : new Timer() } ,

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
        _event : { writable : true  , value : null } ,

        /**
         * @private
         */
        _isSupported : { writable : true  , value : false } ,

        /**
         * @private
         */
        _interval : { writable : true  , value : 20 }
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
    notifyUpdate : { writable : true , value : function()
    {
        if( this._isSupported && this.update.connected() && this._event !== null )
        {
            this.update.emit( this._event , this ) ;
        }
    }},

    /**
     * Set the desired time interval for updates
     * @name setRequestedUpdateInterval
     * @memberof screens.sensors.Accelerometer
     * @instance
     * @readonly
     */
    setRequestedUpdateInterval : { set : function( value )
    {
        this._interval = value ;
        if( this._isSupported === true )
        {
            this.__launchTimer__();
        }
    }} ,

    /**
     * Initialize the internal Accelerometer.
     * @private
     */
    __initialize__ : { writable : true , value : function()
    {
        if( window !== undefined && window.DeviceMotionEvent !== undefined )
        {
            this._isSupported = true ;
        }

        // -------- Behaviors

        if( this._isSupported === true )
        {
            window.addEventListener( "devicemotion" , this.__update__.bind( this ) , false );
            this.__launchTimer__();
        }
    }},

    /**
     * Launch the internal timer for accelerometer update.
     * @private
     */
    __launchTimer__ : { writable : true , value : function()
    {
        this.timer.stop();

        this.timer.delay = this._interval ;
        this.timer.progressIt.connect( this.notifyUpdate.bind( this ) );
        this.timer.run();
    }},

    /**
     * Update the internal Accelerometer event.
     * @private
     */
    __update__ : { writable : true , value : function( event )
    {
        this._event = event;
    }}
});
