import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListYoutubeCampaignComponent } from "./list-youtube-campaign/list-youtube-campaign.component";
import { CreateYoutubeCampaignComponent } from "./create-youtube-campaign/create-youtube-campaign.component";
import { EditCampaignComponent } from '../shared-modules/edit-campaign/edit-campaign.component';
const routes = [
    { path: 'list', component: ListYoutubeCampaignComponent },
    { path: 'create', component: CreateYoutubeCampaignComponent },
    { path: 'edit/:type/:id', component: EditCampaignComponent },
];
let YoutubeRoutingModule = class YoutubeRoutingModule {
};
YoutubeRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], YoutubeRoutingModule);
export { YoutubeRoutingModule };
//# sourceMappingURL=youtube-routing.module.js.map