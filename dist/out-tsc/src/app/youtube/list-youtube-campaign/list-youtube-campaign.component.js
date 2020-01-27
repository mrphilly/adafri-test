import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ListYoutubeCampaignComponent = class ListYoutubeCampaignComponent {
    constructor(youtubeService, auth) {
        this.youtubeService = youtubeService;
        this.auth = auth;
        this.uid = "";
        this.email = "";
    }
    ngOnInit() {
        /*   this.headerText = [
                { 'text': '1. Général' },
                { 'text': '2. Images' },
                { 'text': '3. Budget' },
            { 'text': '4. Done' }]; */
    }
    ngAfterViewInit() {
        this.getUserCredentials().then(res => {
            if (res === "ok") {
                this.youtubeService.getListCampaign(this.uid).subscribe(data => {
                    this.data = data;
                });
            }
        });
    }
    getUserCredentials() {
        return new Promise(resolve => {
            this.auth.user.forEach(child => {
                this.uid = child.uid;
                this.email = child.email;
                resolve('ok');
            });
        });
    }
};
ListYoutubeCampaignComponent = tslib_1.__decorate([
    Component({
        selector: 'app-list-youtube-campaign',
        templateUrl: './list-youtube-campaign.component.html',
        styleUrls: ['./list-youtube-campaign.component.scss']
    })
], ListYoutubeCampaignComponent);
export { ListYoutubeCampaignComponent };
//# sourceMappingURL=list-youtube-campaign.component.js.map