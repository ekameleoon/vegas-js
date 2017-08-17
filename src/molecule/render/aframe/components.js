"use strict" ;

// --------- Dependencies

import { draw }  from './components/draw.js' ;
import { label } from './components/label.js' ;

// ---------  IOC Definitions

export const components = [].concat
(
    { name : "draw"  , value : draw  } ,
    { name : "label" , value : label }
);

// components.forEach( ( component ) => AFRAME.registerComponent( component.name , component.value ) ) ;