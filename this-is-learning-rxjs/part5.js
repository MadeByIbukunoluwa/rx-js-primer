import { exhaustMap,fromEvent,map,takeUntil, takeLast } from 'rxjs'

// script is not wokring , evern though it has been linked to the html

// const operators = require('rxjs')

// can't use require here, require is nto supported inthe browsers 
/**
 * RxJs can let us create streams from DOM events, they wil be Observables of events 
 */

// const leftClick$ = fromEvent(document,"click",)


// const keyPress$ = fromEvent(document.getElementById("form-control"),"keypress")


const recordButtonClick$ = fromEvent(document.getElementById("record-button"),"click")


const stopButtonClick$ = fromEvent(document.getElementById("stop-button"),"click");


const keyPress$ = fromEvent(document.body, "keypress");


const keylogger$ = recordButtonClick$.pipe(
    exhaustMap(()=> keyPress$.pipe(
        // map((event:KeyboardEvent)=> event.key)
        map((event)=> event.key),
        takeUntil(stopButtonClick$)
    ))
)


keylogger$.subscribe((key) => console.log(key))



//service with a subject

