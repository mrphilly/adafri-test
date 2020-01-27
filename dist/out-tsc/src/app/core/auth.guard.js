import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
let AuthGuard = class AuthGuard {
    constructor(auth, router, notify) {
        this.auth = auth;
        this.router = router;
        this.notify = notify;
    }
    canActivate(next, state) {
        return this.auth.user.pipe(take(1), map(user => !!user), tap(loggedIn => {
            if (!loggedIn) {
                /* alert('access denied');
                this.notify.update('You must be logged in!', 'error'); */
                this.router.navigate(['/login']);
            }
        }));
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable()
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map