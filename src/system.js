/*
  Version: MPL 1.1/GPL 2.0/LGPL 2.1
 
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at
  http://www.mozilla.org/MPL/
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the
  License.
  
  The Original Code is [maashaack framework].
  
  The Initial Developers of the Original Code are
  Zwetan Kjukov <zwetan@gmail.com> and Marc Alcaraz <ekameleon@gmail.com>.
  Portions created by the Initial Developers are Copyright (C) 2006-2011
  the Initial Developers. All Rights Reserved.
  
  Contributor(s):
  
  Alternatively, the contents of this file may be used under the terms of
  either the GNU General Public License Version 2 or later (the "GPL"), or
  the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
  in which case the provisions of the GPL or the LGPL are applicable instead
  of those above. If you wish to allow use of your version of this file only
  under the terms of either the GPL or the LGPL, and not to allow others to
  use your version of this file under the terms of the MPL, indicate your
  decision by deleting the provisions above and replace them with the notice
  and other provisions required by the LGPL or the GPL. If you do not delete
  the provisions above, a recipient may use your version of this file under
  the terms of any one of the MPL, the GPL or the LGPL.
*/

// constants

SRC     = "./" ;
SUFFIX  = ".js" ;

if ( _global.system == undefined )
{
    getPackage("system") ;
}

if ( _global.system )
{
    getPackage("system.data") ;
    getPackage("system.data.collections") ;
    getPackage("system.data.iterators") ;
    getPackage("system.data.maps") ;
    getPackage("system.data.queues") ;
    getPackage("system.errors") ;
    getPackage("system.evaluators") ;
    getPackage("system.events") ;
    getPackage("system.formatters") ;
    getPackage("system.ioc") ;
    getPackage("system.logging") ;
    getPackage("system.logging.targets") ;
    getPackage("system.numeric") ;
    getPackage("system.process") ;
    getPackage("system.signals") ;
    
    // system
    
    require( "system.Cloneable" ) ;
    require( "system.Comparable" ) ;
    require( "system.Comparator" ) ;
    require( "system.Enum" ) ;
    require( "system.Equatable" ) ;
    require( "system.Serializable" ) ;
    require( "system.Serializer" ) ;
    require( "system.Sortable" ) ;
    
    // system.data
    
    require( "system.data.Boundable"       ) ;
    require( "system.data.Collection"      ) ;
    require( "system.data.Data"            ) ;
    require( "system.data.Identifiable"    ) ;
    require( "system.data.Iterable"        ) ;
    require( "system.data.Iterator"        ) ;
    require( "system.data.Map"             ) ;
    require( "system.data.OrderedIterator" ) ;
    require( "system.data.Queue"           ) ;
    require( "system.data.Set"             ) ;
    require( "system.data.Typeable"        ) ;
    require( "system.data.Validator"       ) ;
    require( "system.data.ValueObject"     ) ;
    
    // system.data.collections
    
    require( "system.data.collections.ArrayCollection"     ) ;
    require( "system.data.collections.CollectionFormatter" ) ;
    require( "system.data.collections.TypedCollection"     ) ;
    
    // system.data.iterators
    
    require( "system.data.iterators.ArrayIterator"      ) ;
    require( "system.data.iterators.IterableFormatter"  ) ;
    require( "system.data.iterators.MapIterator"        ) ;
    require( "system.data.iterators.PageByPageIterator" ) ;
    require( "system.data.iterators.ProtectedIterator"  ) ;
    
    // system.data.maps
    
    require( "system.data.maps.ArrayMap"     ) ;
    require( "system.data.maps.MapEntry"     ) ;
    require( "system.data.maps.MapFormatter" ) ;
    
    // system.data.queues
    
    require( "system.data.queues.CircularQueue" ) ;
    require( "system.data.queues.LinearQueue"   ) ;
    
    // system.errors
    
    require( "system.errors.ConcurrencyError"    ) ;
    require( "system.errors.InvalidChannelError" ) ;
    require( "system.errors.InvalidFilterError"  ) ;
    require( "system.errors.NonUniqueKeyError"   ) ;
    require( "system.errors.NoSuchElementError"  ) ;
    
    // system.evaluators
    
    require( "system.evaluators.Evaluable" ) ;
    require( "system.evaluators.PropertyEvaluator" ) ;
    require( "system.evaluators.RomanEvaluator" ) ;
    
    // system.events
    
    require( "system.events.CoreEventDispatcher" ) ;
    require( "system.events.Delegate"            ) ;
    require( "system.events.Event"               ) ;
    require( "system.events.EventDispatcher"     ) ;
    require( "system.events.EventFactory"        ) ;
    require( "system.events.EventListener"       ) ;
    require( "system.events.EventListenerBatch"  ) ;
    require( "system.events.EventListenerEntry"  ) ;
    require( "system.events.EventListenerGroup"  ) ;
    require( "system.events.EventPhase"          ) ;
    require( "system.events.EventQueue"          ) ;
    require( "system.events.EventTarget"         ) ;
    require( "system.events.FrontController"     ) ;
    require( "system.events.IEventDispatcher"    ) ;
    
    // system.data.formatters
    
    require( "system.formatters.ExpressionFormatter" ) ;
    require( "system.formatters.Formattable" ) ;
    
    // system.ioc
    
    require( "system.ioc.TypePolicy" ) ;
    
    // system.logging
    
    require( "system.logging.Loggable"      ) ;
    require( "system.logging.Logger"        ) ;
    require( "system.logging.LoggerEntry"   ) ;
    require( "system.logging.LoggerFactory" ) ;
    require( "system.logging.LoggerLevel"   ) ;
    require( "system.logging.LoggerStrings" ) ;
    require( "system.logging.LoggerTarget"  ) ;
    
    // system.logging.targets
    
    require( "system.logging.targets.LineFormattedTarget" ) ;
    require( "system.logging.targets.TraceTarget"         ) ;
    
    // system.numeric
    
    require( "system.numeric.PRNG"        ) ;
    require( "system.numeric.Range"       ) ;
    require( "system.numeric.RomanNumber" ) ;
    
    // system.process
    
    require( "system.process.Action"        ) ;
    require( "system.process.ActionEntry"   ) ;
    require( "system.process.Batch"         ) ;
    require( "system.process.BatchTask"     ) ;
    require( "system.process.Chain"         ) ;
    require( "system.process.CoreAction"    ) ;
    require( "system.process.Initializer"   ) ;
    require( "system.process.Lockable"      ) ;
    require( "system.process.Priority"      ) ;
    require( "system.process.Resetable"     ) ;
    require( "system.process.Resumable"     ) ;
    require( "system.process.Runnable"      ) ;
    require( "system.process.Startable"     ) ;
    require( "system.process.Stoppable"     ) ;
    require( "system.process.Task"          ) ;
    require( "system.process.TaskGroup"     ) ;
    require( "system.process.TaskPhase"     ) ;
    require( "system.process.TimeoutPolicy" ) ;
    require( "system.process.Timer"         ) ;
    
    // system.signals
    
    require( "system.signals.Receiver"       ) ;
    require( "system.signals.Signal"         ) ;
    require( "system.signals.SignalEntry"    ) ;
    require( "system.signals.Signaler"       ) ;
    require( "system.signals.SignalStrings"  ) ;
}