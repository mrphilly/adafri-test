import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { StartedComponent } from './started/started.component';
import { SelectTypeCampaignComponent } from './select-type-campaign/select-type-campaign.component';
import { AddFundsComponent } from './add-funds/add-funds.component';
import { PaymentsComponent } from './payments/payments.component';
const routes = [
    { path: '', component: DashboardComponent, children: [
            { path: '', component: StartedComponent },
            { path: 'select', component: SelectTypeCampaignComponent },
            { path: 'payments', component: PaymentsComponent },
            { path: 'payments/:key', component: PaymentsComponent },
            { path: 'addFunds', component: AddFundsComponent },
            { path: 'facebook', loadChildren: '../facebook/facebook.module#FacebookModule' },
            { path: 'google', loadChildren: '../google/google.module#GoogleModule' },
            { path: 'youtube', loadChildren: '../youtube/youtube.module#YoutubeModule' },
        ] },
];
let DashboardRoutingModule = class DashboardRoutingModule {
};
DashboardRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], DashboardRoutingModule);
export { DashboardRoutingModule };
//# sourceMappingURL=dashboard-routing.module.js.map