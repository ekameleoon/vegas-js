'use strict' ;

/**
 * The {@link screens.Device} enumeration defines constants enumerating the possible type of the device.
 * @summary The {@link screens.Device} enumeration defines constants enumerating the possible type of the device.
 * @name Device
 * @namespace screens.Device
 * @memberof screens
 */
export var Device = Object.defineProperties( {} ,
{
    /**
     * Specifies a desktop device.
     * @memberof screens.Device
     * @type string
     * @default desktop
     */
    DESKTOP : { enumerable : true , value : "desktop" } ,

    /**
     * Specifies a mobile device.
     * @memberof screens.Device
     * @type string
     * @default mobile
     */
    MOBILE : { enumerable : true , value : "mobile" } ,

    /**
     * Specifies a tv device.
     * @memberof screens.Device
     * @type string
     * @default tv
     */
    TV : { enumerable : true , value : "tv" }
}) ;
