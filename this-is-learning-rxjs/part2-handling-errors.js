import { from,map,throwError,catchError,of} from "rxjs";

//Handling errors in streams

/**
 * How do we handle errors when execptional situations arise ? 
//  */

// const source = from([1,2,3]).pipe(
//     map(()=>{
//         throw new Error("Unexpected!")
//     })
// )

// source.subscribe((val)=> console.log(val))

/**
 * In the first case, the error is not being handled at all, let us handle errors the RxJs way now,
 * In some situations,we may need to throw errors oursleves (eg if an invalid vaue arises in the stream )
 * This can be done with the throwError function 
 * it is a function that returns an Observable that immmediately throws an error 
 */


throwError(() => new Error("Something went wrong")).subscribe(
    // (value)=> console.log(value),
    // (error) => console.log(error)
    {
        next:(value) => console.log(value),
        // This is the error callback (we are just calling it callback for this sake , the callback method of passing observer arguments are actually deprecated) it gets called if there is an error in the stream , to handle it , we will need to use the catchError() operator 
        //
        error:(error) => console.log(error)
    }
)


/**
 * catchError() handles all errors that happen inisde the stream. When a stream happens , the old stream completes , so we need to return a new stream from that operator 
 */

const source2 = throwError(() => new Error("Something went wrong")).pipe(
    catchError(()=> of("Error handled"))
)

//will log "Error Handled"

source2.subscribe((value) => console.log(value))

// now the code will work correctly and all the errors will be handled