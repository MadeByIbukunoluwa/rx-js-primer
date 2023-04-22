import { from,map,skip,filter,take,first,distinct,distinctUntilChanged,timer,interval,combineLatest,withLatestFrom} from "rxjs"
import {fromFetch} from 'rxjs/fetch'
// The iterator and Observer patterns 


var arr = ['a', 'b' ,'c']

var iterator = arr.keys()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
 
class Subject {
    constructor() {
        this.callbacks = []
    }
    subscribe(fn) {
        this.callbacks.push(fn)
    }
    publish(data) {
        this.callbacks.forEach((fn) => fn(data))
    }
}

//usage
const subject = new Subject()

const observer1 = (data) => console.log(`Observer1 received data :${data}`)

subject.subscribe(observer1);

let counter = 0;

setInterval(()=> {
    subject.publish(`test data ${++counter}`)
},1000)


//Observabes - an implementation of the Observer pattern 

class Observable {
    /** Internal implementation detail */
    _subscribe;
    /**
     * @constructor
     * @param {Function} subscribe is the function that is called when the 
     * observabl is subscribed to.This function is give a subscriber/observer 
     * which provides the three methods on the Observer interface: 
     * onNext,onError and onCompleted
     */
    constructor(subscribe) {
        if(subscribe) {
            this._subscribe = subscribe;
        }
    }
    static of(...args) {
        return new Observable((obs)=> {
            args.forEach((val)=> obs.onNext(val));
            obs.onCompleted();

            return {
                unsubscribe:()=> {
                    // just make sure none of the original subscribers methods are never called 
                    obs = {
                        onNext:()=> {},
                        onError:()=> {},
                        onCompleted: () => {},
                    }
                }
            }
        })
    }
    // public api for registering an observer
    subscribe(onNext,onError,onCompleted) {
        if (typeof onNext === 'function') {
            return this._subscribe({
              onNext: onNext,
              onError: onError || (() => {}),
              onCompleted: onCompleted || (() => {}),
            });
        }
        else {
            return this._subscribe(onNext)
        }
    }

}

const obs = Observable.of(1,2,3,4)

obs.subscribe(console.log);


//RxJS operators used on a daily basis 
//Changing values in a stream 

/**
 * from creates a stream from items of an iterable value , if we pass an array it will create a stream with items from it 
 */

const source = from([1,2,3,6])

source.subscribe(console.log)

/**
 * We can trasform values in a strema with the map operator , it wokrs on every item in the stream one by one , it is fully analogous to the Array map operator 
 */

console.log('map')
const mappedSource = source.pipe(
    map((value) => value * 2 
))
mappedSource.subscribe((val) => console.log(val))
/**
 * the filter operator filters items from the stream based on a condition provided by a callback function
 * 
 */

console.log('filter')
const filteredSource = source.pipe(
    filter((value)=> value % 2 === 0)
)

filteredSource.subscribe((val) => console.log(val))
/**
 * skip implementation with filter 
 */

console.log('skip (filter)')
const skipWithFilter = source.pipe(
    filter((value,index) => index > 0)
)

skipWithFilter.subscribe((value) => console.log(value))


/**
 * the skip operator allows us to skip several values from the start of the stream 
 */


console.log('skip')
const skippedSource = source.pipe(skip(1))

skippedSource.subscribe((value) => console.log(value));

/**
 * The opposite of skip, take() takes the first several values from a stream and completes the stream (leaves the rest)
 * 
 */
console.log('take')
const takenSource = source.pipe(take(2))

takenSource.subscribe((value) => console.log(value));


/**
 * first() takes only the very first value from the stream , then completes it ,
 * NOTE - if the stream completes without emitting any value , an Empty Error will be thrown , so first() is fundamentally different form take(1)
 */

console.log('first')
const firstFromSource = source.pipe(first())

firstFromSource.subscribe((value) => console.log(value));

/** 
 * There are more ways we can filter values from a stream 
 */

/**
 * sometimes we want to operate on unique values, that is ignore duplicate values we can use the distinct operator , it will only pass values that have not been emitted yet 
 */

console.log('distinct')
const distinctSource = from([1, 2, 2, 1, 3, 2, 3, 1, 3, 2, 1, 1, 3])

distinctSource.pipe(distinct())

distinctSource.subscribe((value) => console.log(value))


/**
 * distinctUntilChanged will skip duplicate values only if they come one after the other 
 * distinctUnitlChanged will only skip duplicate values that immediately follow each other 
 */



console.log("distinctUntilChanged");

distinctSource.pipe(distinctUntilChanged()) 


distinctSource.subscribe((value) => console.log(value));


//Combining streams 
/**
 * timer creates a stream that emits a value (in milliseconds) we provide has passed, essentially working like setTimeout , but for streams
 */

const sourceTimer = timer(0,1000)

sourceTimer.subscribe((val) => console.log(val))


const sourceTimer2 = timer(500,1000);


sourceTimer2.subscribe((value) => console.log(value))


/**
 * interval 
 * a stream that emits values over tiem but repeatedly like setInterval 
 * emits incremental numbers periodically in time.
 */

const sourceInterval = interval(1000)



sourceInterval.subscribe((val) => console.log(val))



/**
 * we can combine the values from the two streams we created using timer and interval with the combineLatest method
 * despite the values of the streams being generated at different times , we manage to combine them into a single value which allows us to handle values from different streams simultaneously
 */


const sourceFirst = interval(1000)

const sourceSecond = interval(500)


const sourcesCombined = combineLatest([sourceFirst,sourceSecond]);



sourcesCombined.subscribe((val) => console.log(val))


/**
 * withLatestFrom we received a new value each tme any of the two streams emitted , but in situautipns we want to receive a new value only when the source Observable emits, we will use with LatestFrom()
 */


const sourceWithLatestFrom = sourceFirst.pipe(withLatestFrom(sourceSecond))


/**
 * mergeMap 
 */


/**
 * switchMap
 */
