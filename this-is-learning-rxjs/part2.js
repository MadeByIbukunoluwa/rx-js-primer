

// The iteratir and Observer patterns 


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

counter = 0;

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
