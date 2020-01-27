import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
import { CreateDisplayCampaignComponent } from './create-display-campaign/create-display-campaign.component';
import { CreateResponsiveDisplayCampaignComponent } from './create-responsive-display-campaign/create-responsive-display-campaign.component';
import { ListDisplayCampaignComponent } from './list-display-campaign/list-display-campaign.component';
import { ListResponsiveDisplayCampaignComponent } from './list-responsive-display-campaign/list-responsive-display-campaign.component';
import { GoogleDisplayService } from './services/google-display.service';
import { GoogleResponsiveDisplayService } from './services/google-responsive-display.service';
import { SelectTypeCampaignComponent } from './select-type-campaign/select-type-campaign.component';
import { GoogleRoutingModule } from './google-routing.module';
let GoogleModule = class GoogleModule {
};
GoogleModule = tslib_1.__decorate([
    NgModule({
        declarations: [CreateDisplayCampaignComponent, CreateResponsiveDisplayCampaignComponent, ListDisplayCampaignComponent, ListResponsiveDisplayCampaignComponent, SelectTypeCampaignComponent],
        imports: [
            GoogleRoutingModule,
            SharedModulesModule,
        ],
        providers: [GoogleDisplayService, GoogleResponsiveDisplayService
        ]
    })
], GoogleModule);
export { GoogleModule };
//# sourceMappingURL=google.module.js.map