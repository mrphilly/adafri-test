import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let StartedComponent = class StartedComponent {
    constructor(displayService, auth) {
        this.displayService = displayService;
        this.auth = auth;
        this.numberCampaignsDisplay = 0;
        this.numberCampaignsYoutube = 0;
        this.numberCampaignsResponsiveDisplay = 0;
        this.numberCampaignsFacebook = 0;
        this.numberCampaigns = 0;
        this.uid = "";
        this.accountValue = 0;
    }
    getUserCredentials() {
        return new Promise(resolve => {
            this.auth.user.forEach(child => {
                this.uid = child.uid;
                this.accountValue = child.account_value;
                resolve('ok');
            });
        });
    }
    getCampaignLength() {
        return new Promise(resolve => {
            this.displayService.getListCampaign(this.uid).subscribe(campaigns => {
                this.numberCampaignsDisplay = campaigns.length;
                resolve('ok');
            });
        });
    }
    ngOnInit() {
        this.getUserCredentials().then(credentialsResponse => {
            if (credentialsResponse === "ok") {
                this.getCampaignLength().then(response => {
                    if (response === "ok") {
                        this.numberCampaigns = this.numberCampaignsDisplay + this.numberCampaignsResponsiveDisplay + this.numberCampaignsYoutube + this.numberCampaignsFacebook;
                        console.log(this.uid);
                        console.log(this.numberCampaignsDisplay);
                    }
                });
            }
        });
    }
    ngAfterViewInit() {
    }
};
StartedComponent = tslib_1.__decorate([
    Component({
        selector: 'app-started',
        templateUrl: './started.component.html',
        styleUrls: ['./started.component.scss']
    })
], StartedComponent);
export { StartedComponent };
//# sourceMappingURL=started.component.js.map