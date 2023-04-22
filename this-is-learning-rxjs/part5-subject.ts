import { BehaviorSubject,Observable,of,throwError,catchError,map,mapTo,shareReplay,switchMap,tap } from "rxjs";
import {fromFetch} from "rxjs/fetch"


// has an error fetch is not defined 
interface User {
    readonly email:string;

    readonly name:string;

    readonly username: string;
}

class UserService {
    private user = new BehaviorSubject<User | undefined>(undefined);

    user$:Observable<User | undefined> = this.user.asObservable();

    isAuthenticated$:Observable<boolean> = this.user.pipe(
        map((user) => user !== undefined)
    )

    logIn(username:string,password:string):Observable<void> {
        return fromFetch(
            "[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)"
          ).pipe(
            
            switchMap((response) => response.json()),

            map((users) =>
              users.find((user:User) => user.username === username)
            )
          ,
          switchMap((user) =>
            user
              ? of(user)
              : throwError(
                  () => new Error(`No user with username "${username}"`)
                )
          ),

            tap({
              error:()=> this.user.next(undefined),
  
              next:(user) => this.user.next(user)
            }),
  
            map(() => undefined)
        )
    }

    logOut():Observable<void> {
        return fromFetch(
          "[https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/)"
        ).pipe(
            catchError((error) => of(error)),
            
            tap(() => this.user.next(undefined)),

            map(()=> undefined)
        );
    }
}


let userService = new UserService()

// userService.logIn('ibukun','').subscribe((val) => console.log(val))
userService.logIn("john", "").subscribe((val) => console.log(val));