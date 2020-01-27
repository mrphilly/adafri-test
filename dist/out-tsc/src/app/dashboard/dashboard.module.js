import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from "../material/material.module";
import { FacebookModule } from "../facebook/facebook.module";
import { TranslateModule } from "@ngx-translate/core";
import { CoreModule } from '../core/core.module';
import { GoogleModule } from '../google/google.module';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { StartedComponent } from './started/started.component';
import { SelectTypeCampaignComponent } from './select-type-campaign/select-type-campaign.component';
import { YoutubeModule } from '../youtube/youtube.module';
import { AddFundsComponent } from './add-funds/add-funds.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { MatSnackBarModule } from '@angular/material';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
let DashboardModule = class DashboardModule {
};
DashboardModule = tslib_1.__decorate([
    NgModule({
        declarations: [DashboardComponent, StartedComponent, SelectTypeCampaignComponent, AddFundsComponent, PaymentsComponent],
        imports: [
            CommonModule,
            DashboardRoutingModule,
            MaterialModule,
            FacebookModule,
            TranslateModule,
            ReactiveFormsModule,
            FormsModule,
            CoreModule,
            GoogleModule,
            YoutubeModule,
            DropDownButtonModule,
            DialogModule,
            SharedModulesModule,
            DeviceDetectorModule.forRoot(),
            MatSnackBarModule
        ],
    })
], DashboardModule);
export { DashboardModule };
//# sourceMappingURL=dashboard.module.js.map