import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let SelectTypeCampaignComponent = class SelectTypeCampaignComponent {
    constructor(translate) {
        this.translate = translate;
        translate.addLangs(['en', 'fr']);
        if (localStorage.getItem('locale')) {
            const browserLang = localStorage.getItem('locale');
            translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        }
        else {
            localStorage.setItem('locale', 'fr');
            translate.setDefaultLang('fr');
        }
    }
    ngOnInit() {
    }
};
SelectTypeCampaignComponent = tslib_1.__decorate([
    Component({
        selector: 'app-select-type-campaign',
        templateUrl: './select-type-campaign.component.html',
        styleUrls: ['./select-type-campaign.component.scss']
    })
], SelectTypeCampaignComponent);
export { SelectTypeCampaignComponent };
//# sourceMappingURL=select-type-campaign.component.js.map