import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListDisplayCampaignComponent } from "./list-display-campaign/list-display-campaign.component";
import { CreateDisplayCampaignComponent } from "./create-display-campaign/create-display-campaign.component";
import { SelectTypeCampaignComponent } from './select-type-campaign/select-type-campaign.component';
import { CreateResponsiveDisplayCampaignComponent } from './create-responsive-display-campaign/create-responsive-display-campaign.component';
import { EditorAdafriComponent } from '../shared-modules/editor-adafri/editor-adafri.component';
import { EditCampaignComponent } from '../shared-modules/edit-campaign/edit-campaign.component';
const routes = [
    { path: 'list', component: ListDisplayCampaignComponent },
    { path: 'display/create', component: CreateDisplayCampaignComponent },
    { path: 'native/create', component: CreateResponsiveDisplayCampaignComponent },
    { path: 'select', component: SelectTypeCampaignComponent },
    { path: 'editor', component: EditorAdafriComponent },
    { path: 'edit/:type/:id', component: EditCampaignComponent },
];
let GoogleRoutingModule = class GoogleRoutingModule {
};
GoogleRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], GoogleRoutingModule);
export { GoogleRoutingModule };
//# sourceMappingURL=google-routing.module.js.map