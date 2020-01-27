import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListCampaignComponent } from "./list-campaign/list-campaign.component";
import { CreateCampaignComponent } from "./create-campaign/create-campaign.component";
const routes = [
    { path: 'list', component: ListCampaignComponent },
    { path: 'create', component: CreateCampaignComponent }
];
let FacebookRoutingModule = class FacebookRoutingModule {
};
FacebookRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], FacebookRoutingModule);
export { FacebookRoutingModule };
//# sourceMappingURL=facebook-routing.module.js.map