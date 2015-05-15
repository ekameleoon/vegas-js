
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is core2: ECMAScript core objects 2nd gig. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2003-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

/* Constructor: Date
   Enables basic storage and retrieval of dates and times.
*/

/* Method: clone
   Returns a copy by reference of this object.
*/
Date.prototype.clone = function()
    {
    return this;
    }

/* Method: copy
   Creates a new instance of Date with the same value of the current object.
*/
Date.prototype.copy = function()
    {
    return new Date( this.valueOf() );
    }

/* Method: equals
   compare if two Dates are equal by value.
   
   note:
   as the exact same date are never equal by value,
   we compare the eguality of the string representation of the dates.
*/
Date.prototype.equals = function( datObj )
    {
    if( (datObj == null) || (GetTypeOf( datObj ) != "date") )
        {
        return false;
        }
    
    return( this.toString() == datObj.toString() );
    }

/* Getter: getDate
   Returns the day of the month for the specified date
   according to local time (*ECMA-262*).
   
   note:
   The return value is an integer between 1 and 31
   that represents the date value in the Date object.
   
   (code)
   Date.prototype.getDate = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setDate
   Sets the day of the month for a specified date
   according to local time (*ECMA-262*).
   
   attention:
   If the value of the argument dayValue is greater than
   the number of days in the month stored in the Date object
   or is a negative number, the date is set to a date equal
   to numDate minus the number of days in the stored month.
   
   For example, if the stored date is January 5, 1996,
   and setDate(32) is called, the date changes to February 1, 1996.
   Negative numbers have a similar behavior.

   
   (code)
   Date.prototype.setDate = function( dayValue )
    {
    [native code]
    }
   (end)
*/

/* Method: getDay
   Returns the day of the week for the specified date
   according to local time (*ECMA-262*).
   
   note:
   The value returned from the getDay method is an integer between 0 and 6
   representing the day of the week and corresponds to a day of the week as follows
   
   0 - Sunday 
   1 - Monday 
   2 - Tuesday 
   3 - Wednesday 
   4 - Thursday 
   5 - Friday 
   6 - Saturday 

   
   (code)
   Date.prototype.getDay = function()
    {
    [native code]
    }
   (end)
*/

if( $CORE2_FIXGETYEAR )
    {
    /* Getter: getYear
       Returns the year of the specified date
       according to local time (*ECMA-262*).
       
       attention:
       consider this method deprecated, use getFullYear instead.
       
       - JScript v1.0
         setYear uses a value that is the result of the addition
         of 1900 to the year value provided by numYear, regardless
         of the value of the year.
         For example, to set the year to 1899 numYear is -1 and to
         set the year 2000 numYear is 100.
       
       - JavaScript 1.0 to 1.2
         https://bugzilla.mozilla.org/show_bug.cgi?id=22964
         Returns the year in the specified date according to local time.
         JavaScript 1.3: deprecated; also, getYear returns the year minus
         1900 regardless of the year specified
       
       (code)
       Date.prototype.getFullYear = function()
        {
        [native code]
        }
       (end)
    */
    /*!## FIXME: Not Tested */
    Date.prototype.getYear = Date.prototype.getFullYear;
    }

/* Setter: setYear
   Sets the year value in the Date object (*ECMA-262*).
   
   attention:
   consider this method deprecated, use setFullYear instead.
      
   (code)
   Date.prototype.setYear = function( year )
    {
    [native code]
    }
   (end)
*/
/*!## TODO: Should we provide a fix for setYear also or not ? */

/* Getter: getFullYear
   Returns the year of the specified date
   according to local time (*ECMA-262*).
   
   note:
   The getFullYear method returns the year as an absolute number.
   
   For example, the year 1976 is returned as 1976.
   
   This avoids the year 2000 problem where dates beginning with
   January 1, 2000 are confused with those beginning with January 1, 1900.
   
   (code)
   Date.prototype.getFullYear = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setFullYear
   Sets the full year for a specified date
   according to local time (*ECMA-262*).
   
   note:
   only the year argument is required, the others are optional.
   
   (code)
   Date.prototype.setFullYear = function( year, month, date )
    {
    [native code]
    }
   (end)
*/

/* Getter: getHours
   Returns the hour in the specified date
   according to local time (*ECMA-262*).
   
   note:
   The getHours method returns an integer between 0 and 23,
   indicating the number of hours since midnight.
   
   (code)
   Date.prototype.getHours = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setHours
   Sets the hours for a specified date
   according to local time (*ECMA-262*).
   
   note:
   only the hour argument is required, the others are optional.
   
   (code)
   Date.prototype.setHours = function( hour, min, sec, ms )
    {
    [native code]
    }
   (end)
*/

/* Getter: getMilliseconds
   Returns the milliseconds in the specified date
   according to local time (*ECMA-262*).
   
   (code)
   Date.prototype.getMilliseconds = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setMilliseconds
   Sets the milliseconds for a specified date
   according to local time (*ECMA-262*).
   
   (code)
   Date.prototype.setMilliseconds = function( ms )
    {
    [native code]
    }
   (end)
*/

/* Getter: getMinutes
   Returns the minutes in the specified date
   according to local time (*ECMA-262*).
   
   (code)
   Date.prototype.getMinutes = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setMinutes
   Sets the minutes for a specified date
   according to local time (*ECMA-262*).
   
   (code)
   Date.prototype.setMinutes = function( min, sec, ms )
    {
    [native code]
    }
   (end)
*/

/* Getter: getMonth
   Returns the month in the specified date
   according to local time (*ECMA-262*).
   
   (code)
   Date.prototype.getMonth = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setMonth
   Sets the month for a specified date
   according to local time (*ECMA-262*).
   
   (code)
   Date.prototype.setMonth = function( month, date )
    {
    [native code]
    }
   (end)
*/

/* Getter: getSeconds
   Returns the seconds in the specified date
   according to local time (*ECMA-262*).
   
   (code)
   Date.prototype.getSeconds = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setSeconds
   Sets the seconds for a specified date
   according to local time (*ECMA-262*).
   
   (code)
   Date.prototype.setSeconds = function( sec, ms )
    {
    [native code]
    }
   (end)
*/

/* Getter: getTime
   Returns the numeric value corresponding to the time
   for the specified date according to local time (*ECMA-262*).
   
   (code)
   Date.prototype.getTime = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setTime
   Sets the value of a Date object according to local time (*ECMA-262*).
   
   (code)
   Date.prototype.setTime = function( ms )
    {
    [native code]
    }
   (end)
*/

/* Method: getTimezoneOffset
   Returns the difference in minutes between the local time
   on the host computer and Universal Coordinated Time (UTC) (*ECMA-262*).
   
   (code)
   Date.prototype.getTimezoneOffset = function()
    {
    [native code]
    }
   (end)
*/

/* Getter: getUTCDate
   Returns the day (date) of the month in the specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.getUTCDate = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setUTCDate
   Sets the day of the month for a specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.setUTCDate = function( date )
    {
    [native code]
    }
   (end)
*/

/* Method: getUTCDay
   Returns the day of the week in the specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.getUTCDay = function()
    {
    [native code]
    }
   (end)
*/

/* Getter: getUTCFullYear
   Returns the year in the specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.getUTCFullYear = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setUTCFullYear
   Sets the full year for a specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.setUTCFullYear = function( year, month, date )
    {
    [native code]
    }
   (end)
*/

/* Getter: getUTCHours
   Returns the year in the specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.getUTCHours = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setUTCHours
   Sets the hour for a specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.setUTCHours = function( hour, min, sec, ms )
    {
    [native code]
    }
   (end)
*/

/* Getter: getUTCMilliseconds
   Returns the milliseconds in the specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.getUTCMilliseconds = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setUTCMilliseconds
   Sets the milliseconds for a specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.setUTCMilliseconds = function( ms )
    {
    [native code]
    }
   (end)
*/

/* Getter: getUTCMinutes
   Returns the minutes in the specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.getUTCMinutes = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setUTCMinutes
   Sets the minutes for a specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.setUTCMinutes = function( min, sec, ms )
    {
    [native code]
    }
   (end)
*/

/* Getter: getUTCMonth
   Returns the month according in the specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.getUTCMonth = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setUTCMonth
   Sets the month for a specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.setUTCMonth = function( month, date )
    {
    [native code]
    }
   (end)
*/

/* Getter: getUTCSeconds
   Returns the seconds in the specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.getUTCSeconds = function()
    {
    [native code]
    }
   (end)
*/

/* Setter: setUTCSeconds
   Sets the seconds for a specified date
   according to universal time (*ECMA-262*).
   
   (code)
   Date.prototype.setUTCSeconds = function( sec, ms )
    {
    [native code]
    }
   (end)
*/

/* StaticMethod: parse
   Returns the number of milliseconds in a date string
   since January 1, 1970, 00:00:00, local time (*ECMA-262*).
   
   note:
   the str argument is a string argument containing
   the date in a format such as "Mar 21, 2005 16:21:00".
   
   (code)
   Date.parse = function( str )
       {
       [native code]
       }
   (end)
*/

/* Method: toGMTString
   Converts a date to a string, using the Internet GMT conventions (*ECMA-262*).
   
   Date.prototype.toGMTString = function()
       {
       [native code]
       }
*/

/* Method: toSource
   Returns a string representing the source code of the object.
*/
Date.prototype.toSource = function()
    {
    var dat, i, y, m, d, h, mn, s, ms;
    
    y   = this.getFullYear();
    m   = this.getMonth();
    d   = this.getDate();
    h   = this.getHours();
    mn  = this.getMinutes();
    s   = this.getSeconds();
    ms  = this.getMilliseconds();
    
    dat = [ y, m, d, h, mn, s, ms ];
    
    dat.reverse();
    
    i=0;
    while( dat[i] == 0 )
        {
        dat.splice( 0, 1 );
        }
    
    dat.reverse();
    
    return "new Date(" + dat.join( "," ) + ")";
    }

/* Method: toString
   Returns a string representing the specified object (*ECMA-262*).
   
   (code)
   Date.prototype.toString = function()
       {
       [native code]
       }
   (end)
*/

/* Method: toUTCString
   Converts a date to a string, using the universal time convention (*ECMA-262*).
   
   Date.prototype.toUTCString = function()
       {
       [native code]
       }
*/

/* StaticMethod: UTC
   Returns the number of milliseconds in a Date object
   since January 1, 1970, 00:00:00, universal time (*ECMA-262*).
   
   note:
   only the arguments year, month, day are required,
   the others are optional.
   
   (code)
   Date.UTC = function( year, month, day, hour, min, sec, ms )
       {
       [native code]
       }
*/

/* Method: valueOf
   Returns the primitive value of the specified object (*ECMA-262*).
   
   (code)
   Date.prototype.valueOf = function()
       {
       [native code]
       }
   (end)
*/

