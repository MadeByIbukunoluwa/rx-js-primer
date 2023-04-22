# Rxjs

## Race condition definitions

A race condition can bed defined as an undesirable situation when a device or system attempts to perform two or more operations at the same time but because of the nature of the system , the operations must be done in a proper order to be done correctly

- When two threads use the same variable at a given time or access a share variable
- The order of when things happen are nor considered properly
-

## Introduction to asynchronous operations

Asynchronous operations are the core of todasys web development

- A lot of interactions in a modern web environment involve working with them
- Clicking a mouse
- Loading data from a backend
- Waiting for something to happen before rendering a piece of UI
They are native ones, though, not so powerful ,they are

- setTimeout/setInterval
- Promises
- Generator

Async await are just wrappers for promises, syntactic sugar

## Issues in Asynchrnous Programming

Asynchronous programming issues
Starting one async operation after a previous one is finished  

- preventing race conditions
- Repeating failed async operations on error or successful completion
- Combining the results of a few asynchronous operations in different ways
- Recalculating displayed data on each periodical async data update
- Canceling async operations if it is not needed anymore

With promises combination of async requests results or repeat / retry methods remain very challenging

We have a solution called Observables!

## What is RXJS

RXJS is a library for reactive programming using Observables which makes it easier to compose asynchronous or callback based code

RxJs is the javascript implementation of Reactive programming (or the Reactive Extentions) paradigm

REACTIVE PROGRAMMING helps handle ASYNC operations by treating those as streams of data

The main entity (which wraps our data) from that library is the Observable

## What is an Observable?

An observable is an object that represents a stream of data to which we can subscribe to receive events / error notifications and which we can manipulate using special functions called operators

Lets use some metaphors to understand Observables

Array of future values
[1, 2, 3, 4, 5]; // if its a normal array , we can access its values, all its values are there instantly m

[1, 2, 3, 4, 5].map((x) => x + 1); // 2,3,4,5,6
We can also transform these value as well

This is similar for observables but some of the values are in place now and the other values will be received later

[1 <--some time---> 2 <--time→...]

[1 <--sometime--->2 <--time→...].pipe(map(x => x+1)) // [2…..3…..etc]

It is important to understand that most values will arrive and be handled later (at the moment of arrival).
[1 <--sometime--->2 <--time→...].pipe(map(x => x+1)) // [2…..3…..etc]

## Push vs Pull based value fetching

Generally we use pull based value fetching in programming a great example of pull based value fetching are functions
They are there but we , the consumers off the value determine when ew want to call the function to receive and handle the data

On the other hand a click  MouseEvent listener is a push based system - we never know when the event will be pushed to us - the producer determines when we will receive the values - but when the values arrive, we will handle them ourselves

Example
If we talk about arrays , for instance we can get any value when we want
let array = [1,2,3,4,]
array[I]

But in the case of Observables the receiver, that is the subscriber or observer cannot control when the producer will emit  values

### In summary

An Observable is an object that represents a stream of data spread over time , delivered via a push based system

Which can be subscribes to in order to receive and handle those values

Which can the be transformed with special functions called operators

## Differences between promises and Observables

Main similarity - they both represent the results of an asynchronous operation

Promises are only one case of asynchronous operations a singular operation with a final and conlusive result

We cannot represents a stream of events like a click with a promise because a Promise works once and its destroyed afterwards
But observables streams of RxJs gives us the ability to create streams listen to their events handle error cases
And also handle the situation when the stream completes

We can treat Observables as a more powerful version of promisees which deals with multiple events rather than one instance

## Difference between Observables and promises

- Variation of operators that can emulate any async stream behaviour eg, cobble streams , repeat streams on success, retry on error etc
  - Modify Stream Data
  - Filter out data yo don’t need  (if delicate data is emitted)
  - Repeat /retry emissions on success or on failure (mostly used for Http requests wrapped in Observables  
  - Combination of streams is also possible with promises with Promises.all (all resolved) or Promise.race (any resolved) but with many more cases
  - Emission of more than one value , etc
  -

Observables are just advanced promises , promise emit one value and compete , Observables meet zero or many values and complete as well (either and complete are two different actions)

const source$ = this.http.get(‘<https://example.com)>

source$.subscribe({
 next:data => handleData(data),
 error:error => handleError(error),
        complete: () => completeHandler(),
)}

## Eagerly evaluated vs lazily evaluated

// Promise-wrapped http request
saveChanges(data) {
 return $http.post(‘<http://example.com>',data)
}

Observable wrapped http request
saveChanges(data) {
 return $http.post(‘<http://example.com>',data)
}

Immediately we call the first saveChanges function the code inside it is executed , we can say that it is eagerly evaluated , while the second one ( the observable wrapped request) is lazily evaluated meaning , the code inside will not execute even though the function is invoked

## What does this mean ?

Its means promises don’t care if they have consumers that wait for their result or not they will emit their value regardless

But Observables (precisely Cold Observables) will emit only if we subscribe to them

saveChanges(data).subscribe()

Promises can be canceled while Observables can be unsubscribed

Let us use a backend on input change example

saveChanges(event) {  
const text = event.target.value;
 $http.get('https://example.com?search=' + text).then(searchResult => showSearchResult(searchResult));
}

There are drawbacks to this approach , you cannot reject results of the previous requests if the user keeps typing ,(debounce) also, if might lead to to a race condition where a later request will come bak faster than an earlier one (leading to an incorrect response being displayed)

Observables can avoid this elegantly with the switchMap operator switchMap cancels previous request and sends a new one

## Easy to prevent race conditions with Observables and hard with promises

Let’ss say in a situation we periodically make network requests for updated data , in some situations later network requests will come back faster than earlier ones, but why?? We expect the first response we rendered first, and the second response be rendered second , but because of network latency it is not so

The second request response can come earlier than the first (old) response data , so the usr get non appropriate data displayed - this situation is called race conditions

TO prevent this with Observable wrap requests we can use concatMap , in that case, the request will only be done after the previous line is handled

## Usage of RxJs in Angular

Angular and RxJS go hand in hand , like the keys of a piano , there a lot of places where Angular entities API provides an Observable

Http Request in Angular re wrap in Observables which make it easier to implement repeat / retry logic and make parallel or subsequent requests

Reactive forms - form controls has a valueChanges property , each time the form or a specific field has changed you will know that

@ViewChildren decorator property has a .changes Observable API each time the list is re re rendered by Angular
You will know that

Interceptors allow to implement additional logic for HTTP requests (like refresh tokens)

Guards - can return an Observable of a boolean value to check asynchronously if a user can visit a route

Route Resolvers - do not render a page until the data necessary for it is in place

## Part2 Reactive Programming in RxJS

## Fundamentals of RxJS

What is declarative programming

What is the Observer Pattern, and how does it relate to the iterator pattern

## Declarative vs Imperative Programming

Declarative - we explicitly specify everything

Imperative - we shield away from explicit implementation details

When we deal with asynchronous programming, declarative style is preferable


Reactive programming is being to work with an asynchronous stream of data , you think of not was. Pipe where data is flowing from one end to another , you can now observe this stream of data and do something - react like applying business logic as data flows
The streams could be from anything mouse or touch -click events ,sensors etc

ReactiveX in which RxJs is a javascript implementation of , gives you a set of tools to help you compose data streams these tools are known as operators which can help you compose other data streams

In order to deal with streams of data like an event listener producing a stream of values emitted from each user click RxJs has more elegant and powerful tools such as Observables instead of handling it using callback functions

## Iterator and Observer patterns

Iterables - data types that implement the iterator interface (pretty common in javascript)
Consumers of an iterable tend to pull data from the producer using the next method, the consumer is the one in control of the data
In Js , it returns object on each invocation of the next method , in the last value the done property will be et to true , meaning it has pulled all the data from the iterator

By contrast in the observer pattern , the publisher of the data pushes data to its subscribers, so its in control of the flow of data

This concept is really straightforward , there is an object containing state that will change over time , in the classical observer pattern , this is called a subject in the classical observer pattern

All this object does is to accept callback functions from observers, which are objects that want to be notified whenever the subject’s state changes

Whenever such a state change happens the subject loops over all the observer callbacks , and invokes them with the new state as an argument

RxJS improves on this classical observer pattern by introducing a more robust interface for observers
One that just doesn’t provide a method for publishing data (onNext)
But also methods for notifying observers of errors (onError)
And also methods to notify when there is no more data to consume (onComplete)

## NOTE

By contrast, error and observable are exclusive, you either have one OR the other
This means in RxJs, it makes the observer pattern symmetric to the iterator pattern (in some sense)

## Streams of data

We have seen arrays - finite containers of data , and how their operators , like map and filter can be useful for understanding composition over containers

## Observable

Data structures like observables a much more appropriate for handling asynchronicity, they are data structures designed to work with potentially asynchronous potentially infinite streams of data while offering composable operators

In short, observables provide us with interfaces for consuming “infinite” streams of data

## Difference between arrays map and Observables

Array map will map over every element before moving to the next operation, and Observables, which iirc are transducers and instead process a single element through each operator in the pipeline before moving on

## How RxJs is used by Angular

### Fetching requests

### Interceptors - these also come with a lot of possibilities as RxJs Observables can be composed

### Forms

### Querying elements from the DOM - @Viewchldren and @ContentChildren

Both return a QueryList type

### Routing

Observables can be used when implementing route resolvers

Everything is a stream - push based architecture

## Service with a subject

A service with a subject pattern is the first stage of application state management for reactive applications

We can create a class that uses Subjects to manage shared state

## Functional Programming

- It is a programming paradigm that puts attention on functions
- It talks about abstract control flows, data mapping , operations , immutability, etc

What is functional Programming ?
Functional Programming comes from mathematical logic and lambda calculus
The lambda calculus helps us to describe programs as data transformations using function applications.

- Fp teaches us to decompose a problem into simple fns and chain them to get a single result
- Because of this, we can break the complexity of any program and achieve any problem as a sequence of steps

“OO makes code understandable by encapsulating moving parts. FP makes code understandable by minimizing moving parts.”

FP is declarative;

[read more](https://this-is-learning.github.io/rxjs-fundamentals-course/docs/part-7)
