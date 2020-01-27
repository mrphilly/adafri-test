import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
let HomeModule = class HomeModule {
};
HomeModule = tslib_1.__decorate([
    NgModule({
        declarations: [HomePageComponent],
        imports: [
            MaterialModule,
            SharedModulesModule
        ],
        exports: [HomePageComponent]
    })
], HomeModule);
export { HomeModule };
//# sourceMappingURL=home.module.js.map