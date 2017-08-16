"use strict" ;

export var Civility =
{
    MAN   : "man" ,
    WOMAN : "woman"
}

// ---------

export var User = function( name )
{
    this.name      = name ;
    this.firstname = null ;
    this.birthday  = null ;
    this.city      = null ;
    this.civility  = null ;
}

User.prototype.toString = function()
{
    return '[User ' + this.name + ']' ;
}

// ---------

export var UserFactory = function( blackList )
{
    this.blackList = blackList instanceof Array ? blackList : [] ;
}

UserFactory.prototype.build = function( pseudo )
{
    if ( this.blackList.indexOf( pseudo ) > -1 )
    {
        return null ;
    }
    return new User( pseudo ) ;
}

UserFactory.prototype.toString = function() { return '[UserFactory]' ; }

UserFactory.create = function( name )
{
    return new User(name) ;
}
