import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NotifyService } from './notify.service';
let CoreModule = class CoreModule {
};
CoreModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        providers: [AuthService, AuthGuard, NotifyService]
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map