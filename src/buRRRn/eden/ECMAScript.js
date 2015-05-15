
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is eden: ECMAScript data exchange notation. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

/* Constructor: ECMAScript
*/
buRRRn.eden.ECMAScript = function( /*String*/ source, /*Object*/ scope, /*Object*/ callback )
    {
    buRRRn.eden.GenericParser.call( this, source, callback );
    
    if( scope == null )
        {
        scope = _global;   //default assignment scope
        }
    
    var scopepath;
    
    if( scope != _global )
        {
        scopepath = GetObjectPath( scope );
        }
    
    if( this.config.autoAddScopePath &&
        (scopepath != undefined) && (scopepath != "_global") )
        {
        this.addAuthorized( scopepath + ".*" );
        }
    
    this._ORC          = "\uFFFC"; //Object Replacement Character
    this.inAssignement = false;
    this.inConstructor = false;
    this.inFunction    = false;
    this.scope         = scope;
    this.scopepath     = scopepath;
    }

buRRRn.eden.ECMAScript.prototype = new buRRRn.eden.GenericParser();

buRRRn.eden.ECMAScript.prototype.constructor = buRRRn.eden.ECMAScript;

/* Method: eval
*/
buRRRn.eden.ECMAScript.prototype.eval = function()
    {
    var value, tmp;
    value = this._ORC;
    
    while( this.hasMoreChar() )
        {
        this.next();
        this.scanSeparators();
        
        tmp = this.scanValue();
        
        if( tmp != this._ORC )
            {
            value = tmp;
            }
        
        /* note: poor man semicolon auto-insertion */
        if( this.ch == " ")
            {
            this.ch = ";";
            }
        }
    
    return this.onParsed( value );
    }

/* StaticMethod: evaluate
*/
buRRRn.eden.ECMAScript.evaluate = function( /*String*/ source, /*Object*/ scope, /*Object*/ callback )
    {
    var parser = new buRRRn.eden.ECMAScript( source, scope, callback );
    return parser.eval();
    }

/* Method: isOctalNumber
*/
buRRRn.eden.ECMAScript.prototype.isOctalNumber = function( /*String*/ num )
    {
    var i;
    
    if( (num.indexOf( "." ) > -1) ||
        (num.indexOf( "e" ) > -1) ||
        (num.indexOf( "E" ) > -1) )
        {
        return false;
        }
    
    num = num.split("");
    
    for( i=0; i<num.length; i++ )
        {
        if( !this.isOctalDigit( num[i] ) )
            {
            return false;
            }
        }
    
    return true;
    }

/* Method: isDigitNumber
*/
buRRRn.eden.ECMAScript.prototype.isDigitNumber = function( /*String*/ num )
    {
    var i;
    num = num.split( "" );
    
    for( i=0; i<num.length; i++ )
        {
        if( !this.isDigit( num[i] ) )
            {
            return false;
            }
        }
    
    return true;
    }

/* Method: isIdentifierStart
   
   note:
   identifiers
   see: ECMA-262 spec 7.6 (PDF p26/188)
*/
buRRRn.eden.ECMAScript.prototype.isIdentifierStart = function( /*char*/ c )
        {
        if( this.isAlpha( c ) || (c == "_") || (c == "$" ) )
            {
            return true;
            }
        
        if( c.charCodeAt( 0 ) < 128 )
            {
            return false;
            }
        
        return false;
        }

/* Method: isIdentifierPart
*/
buRRRn.eden.ECMAScript.prototype.isIdentifierPart = function( /*char*/ c )
    {
    if( this.isIdentifierStart( c ) )
        {
        return true;
        }
    
    if( this.isDigit( c ) )
        {
        return true;
        }
    
    if( c.charCodeAt( 0 ) < 128 )
        {
        return false;
        }
    
    return false;
    }

/* Method: isLineTerminator
   
   note:
   line terminators
   "\n" - \u000A - LF
   "\R" - \u000D - CR
   ???  - \u2028 - LS
   ???  - \u2029 - PS
   see: ECMA-262 spec 7.3 (PDF p24/188)
*/
buRRRn.eden.ECMAScript.prototype.isLineTerminator = function( /*char*/ c )
    {
    switch( c )
        {
        case "\u000A": case "\u000D": case "\u2028": case "\u2029":
        return true;
        
        default:
        return false;
        }
    }

/* Method: isReservedKeyword
   
   note:
   Reserved Keywords
   see: ECMA-262 spec 7.5.2 p13 (PDF p25/188)
*/
buRRRn.eden.ECMAScript.prototype.isReservedKeyword = function( /*String*/ identifier )
    {
    if( !this.config.strictMode )
        {
        identifier = identifier.toLowerCase();
        }
    
    switch( identifier )
        {
        case "break":
        case "case": case "catch": case "continue":
        case "default": case "delete": case "do":
        case "else":
        case "finally": case "for": case "function":
        case "if": case "in": case "instanceof":
        case "new":
        case "return":
        case "switch":
        case "this": case "throw": case "try": case "typeof":
        case "var": case "void":
        case "while": case "with":
        this.log( String.format( this.strings.reservedKeyword, identifier ) );
        return true;
        
        default:
        return false;
        }
    }

/* Method: isFutureReservedKeyword
   
   note:
   Future Reserved Keywords
   see: ECMA-262 spec 7.5.3
*/
buRRRn.eden.ECMAScript.prototype.isFutureReservedKeyword = function( /*String*/ identifier )
    {
    if( !this.config.strictMode )
        {
        identifier = identifier.toLowerCase();
        }
    
    switch( identifier )
        {
        case "abstract":
        case "boolean": case "byte":
        case "char": case "class": case "const":
        case "debugger": case "double":
        case "enum": case "export": case "extends":
        case "final": case "float":
        case "goto":
        case "implements": case "import": case "int": case "interface":
        case "long":
        case "native":
        case "package": case "private": case "protected": case "public":
        case "short": case "static": case "super": case "synchronized":
        case "throws": case "transient":
        case "volatile":
        this.log( String.format( this.strings.futurReservedKeyword, identifier ) );
        return true;
        
        default:
        return false;
        }
    }

/* Method: isValidpath
*/
buRRRn.eden.ECMAScript.prototype.isValidPath = function( /*String*/ path )
    {
    var i, paths, subpath;
    
    if( path.indexOf( "." ) > -1 )
        {
        paths = path.split( "." );
        }
    else
        {
        paths = [ path ];
        }
    
    for( i=0; i<paths.length; i++ )
        {
        subpath = paths[i];
        
        if( this.isReservedKeyword( subpath ) ||
            this.isFutureReservedKeyword( subpath ) )
            {
            this.log( String.format( this.strings.notValidPath, path ) );
            return false;
            }
        }
    
    if( this.config.autoAddScopePath &&
        (this.scopepath != undefined) && (this.scope != _global) )
        {
        path = this.scopepath + "." + path;
        }
    
    if( this.config.security && !this.isAuthorized( path ) )
        {
        this.log( String.format( this.strings.notAuthorizedPath, path ) );
        return this.config.undefineable;
        }
//     else
//         {
//         trace( path + " is authorized (isValidPath)" );
//         }
    
    return true;
    }

/* Method: doesExistInGlobal
*/
buRRRn.eden.ECMAScript.prototype.doesExistInGlobal = function( /*String*/ path )
    {
    var i, paths, subpath, scope;    
    scope = _global;
    
    if( path.indexOf( "." ) > -1 )
        {
        paths = path.split( "." );
        }
    else
        {
        paths = [ path ];
        }
    
    for( i=0; i<paths.length; i++ )
        {
        subpath = paths[i];
        
        if( this.isDigitNumber( subpath ) )
            {
            subpath = parseInt( subpath );
            }
        
        if( scope[ subpath ] == undefined )
            {
            return false;
            }
        
        scope = scope[ subpath ];
        }
    
    return true;
    }

/* Method: createPath
*/
buRRRn.eden.ECMAScript.prototype.createPath = function( /*String*/ path )
    {
    var i, scope, paths;
    scope = this.scope;
    
    if( path.indexOf( "." ) > -1 )
        {
        paths = path.split( "." );
        }
    else
        {
        paths = [ path ];
        }
    
    for( i=0; i<paths.length; i++ )
        {
        path = paths[i];
        
        if( scope[path] == undefined )
            {
            scope[path] = {};
            }
        
        scope = scope[path];
        }
    }

/* Method: scanComments
*/
buRRRn.eden.ECMAScript.prototype.scanComments = function()
    {
    this.next();
    
    switch( this.ch )
        {
        case "/":
        while( !this.isLineTerminator( this.ch ) )
            {
            this.next();
            }
        break;
        
        case "*":
        var ch_ = this.next();
        
        while( (ch_ != "*") && (this.ch != "/") )
            {
            ch_ = this.ch;
            this.next();
            
            if( this.ch == "" )
                {
                this.log( this.strings.unterminatedComment );
                break;
                }
            }

        this.next();
        delete ch_;
        break;
        
        case "":
        default:
        this.log( this.strings.errorComment );
        }
    }

/* Method: scanWhiteSpace
   
   note:
   White Space
   "\t" - \u0009 - TAB
   "\v" - \u000B - VT
   "\f" - \u000C - FF
   " "  - \u0020 - SP
   ???  - \u00A0 - NBSP
   see: ECMA-262 spec 7.2 (PDF p23/188)
*/
buRRRn.eden.ECMAScript.prototype.scanWhiteSpace = function()
    {
    var scan = true;
    
    while( scan )
        {
        switch( this.ch )
            {
            case "\u0009": case "\u000B": case "\u000C": case "\u0020": case "\u00A0":
            this.next();
            break;
            
            case "/":
            this.scanComments();
            break;
            
            default:
            scan = false;
            }
        }
    }

/* Method: scanSeparators
*/
buRRRn.eden.ECMAScript.prototype.scanSeparators = function()
    {
    var scan = true;
    
    while( scan )
        {
        switch( this.ch )
            {
            /* note:
               White Space
               "\t" - \u0009 - TAB
               "\v" - \u000B - VT
               "\f" - \u000C - FF
               " "  - \u0020 - SP
               ???  - \u00A0 - NBSP
               see: ECMA-262 spec 7.2 (PDF p23/188)
            */
            case "\u0009": case "\u000B": case "\u000C": case "\u0020": case "\u00A0":
            this.next();
            break;
            
            /* note:
               line terminators
               "\n" - \u000A - LF
               "\R" - \u000D - CR
               ???  - \u2028 - LS
               ???  - \u2029 - PS
               see: ECMA-262 spec 7.3 (PDF p24/188)
            */
            case "\u000A": case "\u000D": case "\u2028": case "\u2029":
            this.next();
            break;
            
            case "/":
            this.scanComments();
            break;
            
            default:
            scan = false;
            }
        }
    }

/* Method: scanIdentifier
*/
buRRRn.eden.ECMAScript.prototype.scanIdentifier = function()
    {
    var id = "";
    
    if( this.isIdentifierStart( this.ch ) )
        {
        id += this.ch;
        this.next();
        
        while( this.isIdentifierPart( this.ch ) )
            {
            id += this.ch;
            this.next();
            }
        }
    else
        {
        this.log( this.strings.errorIdentifier );
        }
    
    return id;
    }

/* Method: scanPath
*/
buRRRn.eden.ECMAScript.prototype.scanPath = function()
    {
    var path, subpath;
    path = "";
    
    if( this.isIdentifierStart( this.ch ) )
        {
        path += this.ch;
        this.next();
        
        while( this.isIdentifierPart( this.ch ) ||
              (this.ch == ".") ||
              (this.ch == "[") )
            {
            
            if( this.ch == "[" )
                {
                this.next();
                this.scanWhiteSpace();
                
                if( this.isDigit( this.ch ) )
                    {
                    subpath = String( this.scanNumber() );
                    this.scanWhiteSpace();
                    path += "." + subpath;
                    }
                else if( (this.ch == "\"") || (this.ch == "\'") )
                    {
                    subpath = this.scanString( this.ch );
                    this.scanWhiteSpace();
                    path += "." + subpath;
                    }
                else
                    {
                    trace( "ch = [" + this.ch + "]" );
                    }
                
                if( this.ch == "]" )
                    {
                    this.next();
                    continue;
                    }
                }
            
            path += this.ch;
            this.next();
            }
        }
    
    if( path.startsWith( "_global." ) )
        {
        path = path.substr( "_global.".length );
        }
    
    if( !this.inConstructor && this.ch == "(" )
        {
        this.inFunction = true;
        return this.scanFunction( path );
        }
    
    return path;
    }

/* Method: scanFunction
*/
buRRRn.eden.ECMAScript.prototype.scanFunction = function( /*String*/ fcnPath )
    {
    var args, fcnName, fcnObj, fcnObjScope;
    
    if( fcnPath.indexOf( "." ) > -1 )
        {
        fcnName = fcnPath.split( "." ).pop();
        }
    else
        {
        fcnName = fcnPath;
        }
    
    this.scanWhiteSpace();
    
    args = [];
    
    this.next();
    this.scanSeparators();
    
    while( this.ch != "" )
        {
        if( this.ch == ")" )
            {
            this.next();
            break;
            }
        
        args.push( this.scanValue() );
        this.scanSeparators();
        
        if( this.ch == "," )
            {
            this.next();
            this.scanSeparators();
            }
        }
    
    if( !this.config.allowFunctionCall )
        {
        this.log( String.format( this.strings.notFunctionCallAllowed, fcnPath, args ) );
        return this.config.undefineable;
        }
    
    if( !this.isReservedKeyword( fcnPath ) &&
        !this.isFutureReservedKeyword( fcnPath ) )
        {
        fcnObj = eval( "_global." + fcnPath );
        
        if( fcnPath.indexOf( "." ) > -1 )
            {
            fcnObjScope = eval( "_global." + fcnPath.replace( "."+fcnName, "" ) );
            }
        else
            {
            fcnObjScope = null;
            }
        }
    else
        {
        this.log( String.format( this.strings.notValidFunction, fcnPath ) );
        return this.config.undefineable;
        }
    
    if( this.config.security && !this.isAuthorized( fcnPath ) )
        {
        this.log( String.format( this.strings.notAuthorizedFunction, fcnPath ) );
        return this.config.undefineable;
        }
//     else
//         {
//         trace( fcnPath + " is authorized (scanFunction)" );
//         }
    
    if( fcnObj == undefined )
        {
        this.log( String.format( this.strings.doesNotExist, fcnPath ) );
        return this.config.undefineable;
        }
    else
        {
        return fcnObj.apply( fcnObjScope, args );
        
//         switch( args.length )
//             {
//             case 9:
//             return fcnObj( args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8] );
//             case 8:
//             return fcnObj( args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7] );
//             case 7:
//             return fcnObj( args[0], args[1], args[2], args[3], args[4], args[5], args[6] );
//             case 6:
//             return fcnObj( args[0], args[1], args[2], args[3], args[4], args[5] );
//             case 5:
//             return fcnObj( args[0], args[1], args[2], args[3], args[4] );
//             case 4:
//             return fcnObj( args[0], args[1], args[2], args[3] );
//             case 3:
//             return fcnObj( args[0], args[1], args[2] );
//             case 2:
//             return fcnObj( args[0], args[1] );
//             case 1:
//             return fcnObj( args[0] );
//             case 0:
//             default:
//             return fcnObj();
//             }
        }
    
    this.log( this.strings.errorFunction );
    }

/* Method: scanConstructor
*/
buRRRn.eden.ECMAScript.prototype.scanConstructor = function()
    {
    var ctor, args, ctorObj;
    this.scanWhiteSpace();
    
    this.inConstructor = true;
    ctor = this.scanPath();
    args = [];
    this.inConstructor = false;
    
    if( this.ch == "(" )
        {
        this.next();
        this.scanSeparators();
        
        while( this.ch != "" )
            {
            
            if( this.ch == ")" )
                {
                this.next();
                break;
                }
            
            args.push( this.scanValue() );
            this.scanSeparators();
            
            if( this.ch == "," )
                {
                this.next();
                this.scanSeparators();
                }
            }
        }
    
    if( !this.isReservedKeyword( ctor ) &&
        !this.isFutureReservedKeyword( ctor ) )
        {
        ctorObj = eval( "_global." + ctor );
        }
    else
        {
        this.log( String.format( this.strings.notValidConstructor, ctor ) );
        return this.config.undefineable;
        }
    
    if( this.config.security && !this.isAuthorized( ctor ) )
        {
        this.log( String.format( this.strings.notAuthorizedConstructor, ctor ) );
        return this.config.undefineable;
        }
//     else
//         {
//         trace( ctor + " is authorized (scanConstructor)" );
//         }
    
    if( ctorObj == undefined )
        {
        this.log( String.format( this.strings.doesNotExist, ctor ) );
        return this.config.undefineable;
        }
    else
        {
        switch( args.length )
            {
            case 9:
            return new ctorObj( args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8] );
            case 8:
            return new ctorObj( args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7] );
            case 7:
            return new ctorObj( args[0], args[1], args[2], args[3], args[4], args[5], args[6] );
            case 6:
            return new ctorObj( args[0], args[1], args[2], args[3], args[4], args[5] );
            case 5:
            return new ctorObj( args[0], args[1], args[2], args[3], args[4] );
            case 4:
            return new ctorObj( args[0], args[1], args[2], args[3] );
            case 3:
            return new ctorObj( args[0], args[1], args[2] );
            case 2:
            return new ctorObj( args[0], args[1] );
            case 1:
            return new ctorObj( args[0] );
            case 0:
            default:
            return new ctorObj();
            }
        }
    
    this.log( this.strings.errorConstructor );
    }

/* Method: scanString
*/
buRRRn.eden.ECMAScript.prototype.scanString = function( /*String*/ quote )
    {
    var str = "";
    
    if( this.ch == quote )
        {
        while( this.next().toBoolean() )
            {
            switch( this.ch )
                {
                case quote:
                this.next();
                return str;
                
                case "\\":
                /* note:
                   Escape Sequence
                   \ followed by one of ' " \ b f n r t v
                   or followed by x hexdigit hexdigit
                   or followed by u hexdigit hexdigit hexdigit hexdigit
                   see: ECMA-262 specs 7.8.4 (PDF p30 to p32/188)
                */
                switch( this.next() )
                    {
                    case "b": //backspace       - \u0008
                    str += "\b";
                    break;
                    
                    case "t": //horizontal tab  - \u0009
                    str += "\t";
                    break;
                    
                    case "n": //line feed       - \u000A
                    str += "\n";
                    break;
                    
                    /* TODO: check \v bug */
                    case "v": //vertical tab    - \u000B
                    str += "\v";
                    break;
                    
                    case "f": //form feed       - \u000C
                    str += "\f";
                    break;
                    
                    case "r": //carriage return - \u000D
                    str += "\r";
                    break;
                    
                    case "\"": //double quote   - \u0022
                    str += "\"";
                    break;
                    
                    case "\'": //single quote   - \u0027
                    str += "\'";
                    break;
                    
                    case "\\": //backslash      - \u005c
                    str += "\\";
                    break;
                    
                    case "u": //unicode escape sequence \uFFFF
                    var ucode = this.source.substring( this.pos, this.pos+4 );
                    str      += String.fromCharCode( parseInt( ucode, 16 ) );
                    this.pos += 4;
                    break;
                    
                    case "x": //hexadecimal escape sequence \xFF
                    var xcode = this.source.substring( this.pos, this.pos+2 );
                    str      += String.fromCharCode( parseInt( xcode, 16 ) );
                    this.pos += 2;
                    break;
                    
                    default:
                    str += this.ch;
                    }
                break;
                
                default:
                if( !this.isLineTerminator( this.ch ) )
                    {
                    str += this.ch;
                    }
                else
                    {
                    this.log( this.strings.errorLineTerminator );
                    }
                }
            
            }
        }
    
    this.log( this.strings.errorString );
    }

/* Method: scanArray
*/
buRRRn.eden.ECMAScript.prototype.scanArray = function()
    {
    var arr = [];
    
    if( this.ch == "[" )
        {
        this.next();
        this.scanSeparators();
        
        if( this.ch == "]" )
            {
            this.next();
            return arr;
            }
        
        while( this.ch != "" )
            {
            arr.push( this.scanValue() );
            this.scanSeparators();
            
            if( this.ch == "]" )
                {
                this.next();
                return arr;
                }
            else if( this.ch != "," )
                {
                break;
                }
            
            this.next();
            this.scanSeparators();
            }
        }
    
    this.log( this.strings.errorArray );
    }

/* Method: scanObject
*/
buRRRn.eden.ECMAScript.prototype.scanObject = function()
    {
    var member, value, obj;
    obj = {};
    
    if( this.ch == "{" )
        {
        this.next();
        this.scanSeparators();
        
        if( this.ch == "}" )
            {
            this.next();
            return obj;
            }
        
        while( this.ch != "" )
            {
            member = this.scanIdentifier();
            this.scanWhiteSpace();
            
            if( this.ch != ":" )
                {
                break;
                }
            
            this.next();
            this.inAssignement = true;
            value = this.scanValue();
            this.inAssignement = false;
            
            if( !this.isReservedKeyword( member ) &&
                !this.isFutureReservedKeyword( member ) )
                {
                obj[member] = value;
                }
            
            this.scanSeparators();
            
            if( this.ch == "}" )
                {
                this.next();
                return obj;
                }
            else if( this.ch != "," )
                {
                break;
                }
            
            this.next();
            this.scanSeparators();
            }
        }
    
    this.log( this.strings.errorObject );
    }

/* Method: scanNumber
*/
buRRRn.eden.ECMAScript.prototype.scanNumber = function()
    {
    var num, oct, hex, sign, value, isSignedExp;
    num  = "";
    oct  = "";
    hex  = "";
    sign = "";
    
    if( this.ch == "-" )
        {
        sign = "-";
        this.next();
        }
    
    if( this.ch == "0" )
        {
        this.next();
        
        if( (this.ch == "x") || (this.ch == "X") )
            {
            this.next();
            
            while( this.isHexDigit( this.ch ) )
                {
                hex += this.ch;
                this.next();
                }
            
            if( hex == "" )
                {
                this.log( this.strings.malformedHexadecimal );
                return NaN;
                }
            else
                {
                return Number( sign + "0x" + hex );
                }
            }
        else
            {
            num += "0";
            }
        }
    
    while( this.isDigit( this.ch ) )
        {
        num += this.ch;
        this.next();
        }
    
    if( this.ch == "." )
        {
        num += ".";
        this.next();
        
        while( this.isDigit( this.ch ) )
            {
            num += this.ch;
            this.next();
            }
        }

    if( this.ch == "e" )
        {
        num += "e";
        isSignedExp = this.next();
        
        if( (isSignedExp == "+") || (isSignedExp == "-") )
            {
            num += isSignedExp;
            this.next();
            }
        
        while( this.isDigit( this.ch ) )
            {
            num += this.ch;
            this.next();
            }
        }
    
    if( (num.charAt(0) == "0") && this.isOctalNumber( num ) )
        {
        value = parseInt( sign + num );
        }
    else
        {
        value = Number( sign + num );
        }
    
    if( !isFinite( value ) )
        {
        this.log( this.strings.errorNumber );
        return NaN;
        }
    else
        {
        return value;
        }
    }

/* Method: scanAssignement
*/
buRRRn.eden.ECMAScript.prototype.scanAssignement = function( /*String*/ path )
    {
    var basescope, scope, obj, value;
    basescope  = scope = this.scope;
    
    if( path.indexOf( "." ) > -1 )
        {
        var objPath, i;
        objPath = path.split( "." );
        
        for( i=0; i<objPath.length; i++ )
            {
            path = objPath[i];
            
            if( i == objPath.length-1 )
                {
                break;
                }
            
            if( scope[path] == undefined )
                {
                scope[path] = {};
                }
            
            scope = scope[path];
            }
        }
    
    this.scanWhiteSpace();
    
    if( this.ch == "=" )
        {
        this.inAssignement = true;
        this.next();
        this.scanWhiteSpace();
        
        if( this.isLineTerminator( this.ch ) )
            {
            /* TODO: check if undefineable value is not preferable here */
            return;
            }
        
        value = this.scanValue();
        scope[path] = value;
        
        this.inAssignement = false;
        }
    
    this.scope = basescope;
    }

/* PrivateMethod: _insertBracketForNumberIndex
*/
buRRRn.eden.ECMAScript.prototype._insertBracketForNumberIndex = function( /*String*/ path )
    {
    if( !this.config.arrayIndexAsBracket )
        {
        return path;
        }
    
    var paths = path.split( "." );
    
    for( var i=0; i<paths.length; i++ )
        {
        if( this.isDigitNumber( paths[i] ) )
            {
            paths[i] = "[" + paths[i] + "]";
            }
        else if( i != 0 )
            {
            paths[i] = "." + paths[i];
            }
        }
    
    return paths.join( "" );
    }

/* Method: scanExternalReference
*/
buRRRn.eden.ECMAScript.prototype.scanExternalReference = function( /*String*/ path )
    {
    var check, sign, target, valueTest;
    
    check = false;
    sign  = "";
    
    switch( path.charAt( 0 ) )
        {
        case "-":
        sign = "-";
        path = path.substr( 1 );
        break;
        
        case "+":
        path = path.substr( 1 );
        break;
        }
    
    check = this.doesExistInGlobal( path );
    
    if( check )
        {
        
        if( this.config.security && !this.isAuthorized( path ) )
            {
            this.log( String.format( this.strings.notAuthorizedExternalReference, path ) );
            return this.config.undefineable;
            }
//         else
//             {
//             trace( path + " is authorized (scanExternalReference)" );
//             }
        
        path = this._insertBracketForNumberIndex( path );
        
        valueTest = eval( "_global." + path );
        
        if( valueTest != undefined )
            {
            if( this.config.copyObjectByValue && (typeof( valueTest ) == "object") )
                {
                valueTest = valueTest.copy();
                }
            
            if( sign == "-" )
                {
                return -valueTest;
                }
            
            return valueTest;
            }
        }
    
    this.log( String.format( this.strings.extRefDoesNotExist, path ) );
    return this.config.undefineable;
    }

/* Method: scanKeyword
*/
buRRRn.eden.ECMAScript.prototype.scanKeyword = function( /*String*/ pre )
    {
    if( pre == null )
        {
        pre = "";
        }
    
    var word, baseword;
    baseword = this.scanPath();
    
    if( this.inFunction )
        {
        this.inFunction = false;
        return baseword;
        }
    
        word = pre + baseword;
    
    if( word == undefined )
        {
        return this._ORC;
        }
    
    switch( word )
        {
        case "":
        case "_global":
        case "undefined":
        return this.config.undefineable;
        
        // Null literal
        case "null":
        return null;
        
        // Boolean literals
        case "true":
        return true;
        
        case "false":
        return false;
        
        // Number literals
        case "NaN":
        return NaN;
        
        case "new":
        return this.scanConstructor();
        
        default:
        var externalReference = this.config.undefineable;
        
        /* coded in the train listening RUN-DMC "It's Tricky" ;) */
        if( !this.doesExistInGlobal( baseword ) )
            {
            if( this.isValidPath( baseword ) )
                {
                this.createPath( baseword );
                }
            else
                {
                return this.config.undefineable;
                }
            }
        else
            {            
            externalReference = this.scanExternalReference( word );
            
            if( (externalReference != this.config.undefineable) && this.inAssignement )
                {
                return externalReference;
                }
            }
        
        if( !this.inAssignement )
            {
            this.scanAssignement( baseword );
            }
        
        if( externalReference != this.config.undefineable )
            {
            return externalReference;
            }
        
        return this.config.undefineable;
        }
    
    this.log( this.strings.errorKeyword );
    }

/* Method: scanValue
*/
buRRRn.eden.ECMAScript.prototype.scanValue = function()
    {
    this.scanWhiteSpace();
    
    switch( this.ch )
        {
        case "{":
        return this.scanObject();
        
        case "[":
        return this.scanArray();
        
        case "\"": case "\'":
        return this.scanString( this.ch );
        
        case "-": case "+":
        if( this.isDigit( this.source.charAt( this.pos+1 ) ) )
            {
            return this.scanNumber();
            }
        else
            {
            var ch_ = this.ch;
            this.next();
            return this.scanKeyword( ch_ );
            }
        
        default:
        return this.isDigit( this.ch ) ? this.scanNumber() : this.scanKeyword();
        }
    }

