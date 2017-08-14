"use strict"

/**
 * The draw component.
 * @name draw
 * @memberof molecule.render.aframe.display.components
 */
export const draw =
{
    /**
     * Defines and describes the property or properties of the component.
     * @name schema
     * @memberof molecule.render.aframe.display.components.canvas
     * @instance
     */
    schema :
    {
        width      : { default : 256       },
        height     : { default : 256       },
        background : { default : "#FFFFFF" }
    },

    /**
     * Invoked to create the new Canvas object.
     * @name create
     * @memberof molecule.render.aframe.display.components.canvas
     * @function
     * @instance
     */
    create : function (w, h)
    {
        var owner = this;

        var canvas = document.createElement("canvas");

        canvas.width = w;
        canvas.height = h;
        canvas.style = "display: none";

        owner.canvas = canvas;
        owner.ctx = canvas.getContext("2d");

        this.texture = new THREE.Texture(owner.canvas); //renders straight from a canvas

        if( this.el.object3D.children.length > 0 )
        {
            this.el.object3D.children[0].material = new THREE.MeshBasicMaterial();
            this.el.object3D.children[0].material.map = this.texture;
        }
        else
        {
            this.el.object3D.material = new THREE.MeshBasicMaterial();
            this.el.object3D.material.map = this.texture;
        }

        if( !this.el.hasLoaded )
        {
            this.el.addEventListener( "loaded" , function()
            {
                owner.render();
            });
        }
        else
        {
            owner.render();
        }
    },

    /**
     * Invoked when the component is initialized
     * @name init
     * @memberof molecule.render.aframe.display.components.canvas
     * @function
     * @instance
     */
    init : function()
    {
        this.registers = [] ;
        this.update();
    },

    /**
     * Invoked to register a new object to render.
     * @name register
     * @memberof molecule.render.aframe.display.components.canvas
     * @function
     * @instance
     */
    register : function( render )
    {
        this.registers.push( render );
    },

    /**
     * Invoked when the component is removed.
     * @name remove
     * @memberof molecule.render.aframe.display.components.canvas
     * @function
     * @instance
     */
    remove : function()
    {
        // do nothing yet
    },

    /**
     * Invoked when the component render all registered elements.
     * @name render
     * @memberof molecule.render.aframe.display.components.canvas
     * @function
     * @instance
     */
    render : function()
    {
        if( this.registers && this.registers.length > 0 )
        {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = this.data.background;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.registers.forEach( function( item )
            {
                item();
            });
        }
        this.texture.needsUpdate = true;
    },

    /**
     * Invoked when the component is updated
     * @name update
     * @memberof molecule.render.aframe.display.components.canvas
     * @function
     * @instance
     */
    update : function( oldData )
    {
        if ( !oldData )
        {
            this.create( this.data.width , this.data.height );
        }
    }
} ;