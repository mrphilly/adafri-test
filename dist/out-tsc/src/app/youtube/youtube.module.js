import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CreateYoutubeCampaignComponent } from './create-youtube-campaign/create-youtube-campaign.component';
import { ListYoutubeCampaignComponent } from './list-youtube-campaign/list-youtube-campaign.component';
import { YoutubeService } from './services/youtube.service';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { enableRipple } from '@syncfusion/ej2-base';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
const DEFAULT_FONT_PICKER_CONFIG = {
    // Google API Key
    apiKey: 'AIzaSyAN1VolxTqz1jn1Fzr5LdVneCjJ-FC6JT4'
};
enableRipple(true);
let YoutubeModule = class YoutubeModule {
};
YoutubeModule = tslib_1.__decorate([
    NgModule({
        declarations: [CreateYoutubeCampaignComponent, ListYoutubeCampaignComponent],
        imports: [
            YoutubeRoutingModule,
            SharedModulesModule,
        ],
        providers: [YoutubeService]
    })
], YoutubeModule);
export { YoutubeModule };
//# sourceMappingURL=youtube.module.js.map