import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let NotifyService = class NotifyService {
    constructor() {
        this._msgSource = new Subject();
        this.msg = this._msgSource.asObservable();
    }
    update(content, style) {
        const msg = { content, style };
        this._msgSource.next(msg);
    }
    clear() {
        this._msgSource.next(null);
    }
};
NotifyService = tslib_1.__decorate([
    Injectable()
], NotifyService);
export { NotifyService };
//# sourceMappingURL=notify.service.js.map