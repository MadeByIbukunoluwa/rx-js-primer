"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var fetch_1 = require("rxjs/fetch");
var UserService = /** @class */ (function () {
    function UserService() {
        this.user = new rxjs_1.BehaviorSubject(undefined);
        this.user$ = this.user.asObservable();
        this.isAuthenticated$ = this.user.pipe((0, rxjs_1.map)(function (user) { return user !== undefined; }));
    }
    UserService.prototype.logIn = function (username, password) {
        var _this = this;
        return (0, fetch_1.fromFetch)("[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)").pipe((0, rxjs_1.switchMap)(function (response) { return response.json(); }), (0, rxjs_1.map)(function (users) {
            return users.find(function (user) { return user.username === username; });
        }), (0, rxjs_1.switchMap)(function (user) {
            return user
                ? (0, rxjs_1.of)(user)
                : (0, rxjs_1.throwError)(function () { return new Error("No user with username \"".concat(username, "\"")); });
        }), (0, rxjs_1.tap)({
            error: function () { return _this.user.next(undefined); },
            next: function (user) { return _this.user.next(user); }
        }), (0, rxjs_1.map)(function () { return undefined; }));
    };
    UserService.prototype.logOut = function () {
        var _this = this;
        return (0, fetch_1.fromFetch)("[https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/)").pipe((0, rxjs_1.catchError)(function (error) { return (0, rxjs_1.of)(error); }), (0, rxjs_1.tap)(function () { return _this.user.next(undefined); }), (0, rxjs_1.map)(function () { return undefined; }));
    };
    return UserService;
}());
var userService = new UserService();
// userService.logIn('ibukun','').subscribe((val) => console.log(val))
userService.logIn("john", "").subscribe(function (val) { return console.log(val); });
