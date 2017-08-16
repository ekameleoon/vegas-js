"use strict"

/**
 * The label components.
 * @name label
 * @const
 * @memberof molecule.render.aframe.components
 */
export const label =
{
    schema :
    {
        color : { default : "#FF0000"      } ,
        font  : { default : "36px Georgia" } ,
        text  : { default : ""             }
    },

    dependencies : [ "draw" ] ,

    update : function()
    {
        let draw   = this.el.components.draw ;
        let ctx    = draw.ctx;
        let canvas = draw.canvas;

        ctx.fillStyle = this.el.getAttribute('color') ;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = this.data.color ;
        ctx.font = this.data.font ;
        ctx.textAlign    = 'center' ;
        ctx.textBaseline = 'middle' ;
        ctx.fillText(this.data.text, canvas.width * 0.5, canvas.height * 0.5);

        draw.render();
    }
};