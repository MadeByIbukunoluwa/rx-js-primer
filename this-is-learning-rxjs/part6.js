import { of,from, switchMap, interval,timer, throwError,defer } from "rxjs"
import { fromFetch } from "rxjs/fetch"
// this example shows how to manually create an observable 



// const observable = new Observable(function subscribe(observer){
//         const id = setTimeout(()=> {
//             observer.next("Hello Rxjs"),
//             observer.complete();
//         },1000);
//     return function unsubscribe() {
//         clearTimeout(id)
//     }
// })

//Typical observer argument
const observer = {
    next:(val) => console.log("next",val),
    error:(err)=> console.log("error",err),
    complete:()=> console.log("complete") 
}
/**
 * The of operator is used to create an Observable from any type of value acepts a;; inputs and 
 * will complete as soon as it is completed
 * next : 'hello'
 * complete
 */


    of("hello").subscribe(observer)


    of([1,2,3]).subscribe(observer)
    

    of({foo:"bar"}).subscribe(observer)


    of(1, 2, 3, "hello", "world", { foo: "bar" }, [4, 5, 6]).subscribe(observer);

    /**
     * when of is called with no value, it will complete immediately
     * output:complete
     */
    of().subscribe(observer)


    /**
     * From is very similar to of, just that it only accpets an iterable or a Promise 
     * iterable is value that can be iterated over. 
     * For example: an Array, an Object, a Map, a Set, or a String. 
     * When you iterate over a String, you'll receive each character in that string.
     */
    from([1,2,3]).subscribe(observer)

    from("Hello world").subscribe(observer)

    const map = new Map();

    map.set(1,"jekklo")
    map.set(2,"bye");

    /**
 * output:
 * - next: [1, 'hello']
 * - next: [2, 'bye']
 * - complete
 */

from(map).subscribe(observer)

const set = new Set()

set.add(1)

set.add(2)

from(set).subscribe(observer)

/**
 * output:
 * - next:'hello world'
 * complete
 * In a case of a promise, from will unwrap the Promise and next the resolved value(or error the rejected value)
 * 
 */

from(Promise.resolve("hello world")).subscribe(observer)

from(Promise.reject("hello world")).subscribe(observer)


/**
 * this is used to convert Fetch API to Observable 
 * The main difference between the normal fetch and fromfetch is that , the normal fetch is eager (eagerly evaluated)
 * as soon as we invoke it, the request is made , as opposed to the fromFetch, it will not be invoked until you subscribe to it 
 */

//fetch is not defined 
//i need to update my node version 
// fromFetch("hhtps://jsonplaceholder.typicode.com/todos")
// .pipe(switchMap((response) => response.json()))
// .subscribe(observer)




/**
 * creates an Observable that emits integers from 0 in a specified interval 
 * Interval does not complete on its own we need to manually unsubscribe from it 
 * 
 * output:
 * - (1s) next: 0
 * - (2s) next: 1
 * - (3s) next: 2
 * - ...
 */

interval(1000).subscribe(observer)


/**
 * Create am Observable that will emit number o after a specified delay. This usage of timer() w
 * allow it to complete itself
 * Create an Observable that will emit integers starting with 0 after a specified delay, then will emit each value after a specified interval.
 *  This sounds similar to interval() but there is a slight difference 
 */
timer(1000).subscribe(observer)
/**
 * output:
 * - (1s) next: 0 (the first delay)
 * - (2s) next: 1 (1s interval)
 * - (3s) next: 2 (1s interval)
 * - ...
// */
// So what's this slight difference? We can pass 0 as the first argument t
// o timer(0, 1000) and this effectively gives us an Observable that emits right away then every 1s after that. interval() alone cannot achieve this.



timer(1000,1000).subscribe(observer)





/**
 * throwError() creates an Observable that, instead emits values, will throw an Error upon subscribe 
 * throwError() is usually used with operators that requires an Observable as return value. Two main use-cases are:
 * catchError(): After we handle an error from an Observable, we can use throwError() to forward this error to the next ErrorHandler
    obs.pipe(
  catchError((err) => {
    // handle error
    showNotification(err.message);
    // forward the error to the next ErrorHandler
    return throwError(err);
  })
);
 */

throwError(()=> "an error").subscribe(observer);


// (switch|concat|merge)Map + retryWhen(): This is an advanced use-case which we will explore further in Higher-order Operator post. 
// The basic idea is we can use throwError() to force retryWhen()
//  to occur which will retry the Observable pipeline.


// defer()
/**
 * defer() accepts an ObservableFactory (a function that returns an Observable) to create a dferred version of the 
 * original Observable
 * 
 * What special is that defer will use Observable factory to create a new Observable for every new Subscriber()
 */

const random$ = of(Math.random());


/**
 * the variable holds a creation operator that creates an Observable that emits a random number
 * all of them will ave the same values - of returns the same result for all 3 subscribers 
 */
random$.subscribe(observer)


random$.subscribe(observer)


random$.subscribe(observer)


random$.subscribe(observer)



const deferredRandom$ = defer(()=> of(Math.random()));



deferredRandom$.subscribe(observer)


deferredRandom$.subscribe(observer)


deferredRandom$.subscribe(observer)


deferredRandom$.subscribe(observer)

// With defer(), we have 3 different results for 3 different subscribers.
//  How does this help? Imagine you'd need to retry some Observable pipeline and at the beginning of this pipeline, 
//  you'd have a comparison against a value that can change, defer() makes sure that when the pipeline occurs (aka is subscribed to), 
//  the comparison happens with the latest values.


