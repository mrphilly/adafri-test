import * as tslib_1 from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { PublishCampaignComponent } from '../publish-campaign/publish-campaign.component';
let ListCampaignsComponent = class ListCampaignsComponent {
    constructor(displayService, snackBar, router, auth, youtubeService) {
        this.displayService = displayService;
        this.snackBar = snackBar;
        this.router = router;
        this.auth = auth;
        this.youtubeService = youtubeService;
        this.toolbarEdit = false;
        this.textSelected = "";
        this.headerText = [];
        this.loader = false;
        this.email = "";
        this.uid = "";
        this.publishComponent = false;
        this.dataCampaign = [];
    }
    goEditCampaign(id, type) {
        if (type === "Youtube") {
            this.router.navigate(['/dashboard/youtube/edit', type, id]);
        }
        else {
            this.router.navigate(['/dashboard/google/edit', type, id]);
        }
    }
    deleteSelectedCampain(id, campaign_id, type, ad_group_id_firebase) {
        this.loader = true;
        if (type === "Display" || type === "Native") {
            setTimeout(() => {
                this.spinner.message = "Suppression de la campagne en cours...";
                if (campaign_id === 0) {
                    this.displayService.deleteCampaign(id).then(res_delete => {
                        if (res_delete === "ok") {
                            this.loader = false;
                        }
                    });
                }
                else {
                    this.displayService.removeCampaign(id, campaign_id, ad_group_id_firebase).then(res_delete => {
                        if (res_delete === "ok") {
                            this.loader = false;
                        }
                    });
                }
            }, 500);
        }
        else if (type === "Youtube") {
            setTimeout(() => {
                this.spinner.message = "Suppression de la campagne en cours...";
                if (campaign_id === 0) {
                    this.youtubeService.deleteCampaign(id).then(res_delete => {
                        if (res_delete === "ok") {
                            this.loader = false;
                        }
                    });
                }
                else {
                    this.youtubeService.removeCampaign(id, campaign_id, ad_group_id_firebase).then(res_delete => {
                        if (res_delete === "ok") {
                            this.loader = false;
                        }
                    });
                }
            }, 500);
        }
    }
    activateCampaign(id, campaign_id, type) {
        this.loader = true;
        setTimeout(() => {
            this.spinner.message = "Activation de la campagne en cours";
            if (type === "Display" || type === "Native") {
                this.displayService.enableCampaign(id, campaign_id).then(res_activate => {
                    if (res_activate === "ok") {
                        this.spinner.message = "Campagne activée avec succès";
                        this.loader = false;
                    }
                });
            }
            else if (type === "Youtube") {
                this.youtubeService.enableCampaign(id, campaign_id).then(res_activate => {
                    if (res_activate === "ok") {
                        this.spinner.message = "Campagne activée avec succès";
                        this.loader = false;
                    }
                });
            }
        }, 500);
    }
    pauseCampaign(id, campaign_id, type) {
        this.loader = true;
        setTimeout(() => {
            this.spinner.message = "Désactivation de la campagne en cours";
            if (type === "Display" || type === "Native") {
                this.displayService.disableCampaign(id, campaign_id).then(res_activate => {
                    if (res_activate === "ok") {
                        this.spinner.message = "Campagne désactivée avec succès";
                        this.loader = false;
                    }
                });
            }
            else if (type === "Youtube") {
                this.youtubeService.disableCampaign(id, campaign_id).then(res_activate => {
                    if (res_activate === "ok") {
                        this.spinner.message = "Campagne déactivée avec succès";
                        this.loader = false;
                    }
                });
            }
        }, 500);
    }
    getUserCredentials() {
        return new Promise(resolve => {
            this.auth.user.forEach(child => {
                //console.log(child)
                this.uid = child.uid;
                this.email = child.email;
                resolve('ok');
            });
        });
    }
    publishCampaign(injectedData) {
        this.getUserCredentials().then(res_credentials => {
            if (res_credentials === "ok") {
                this.publishComponent = true;
                setTimeout(() => {
                    this.publishCampaignComponent.email = this.email;
                    this.publishCampaignComponent.uid = this.uid;
                    this.publishCampaignComponent.injectedData = injectedData;
                    this.publishCampaignComponent.onOpenDialog();
                }, 500);
            }
        });
    }
    ngOnInit() {
        this.gridLines = 'Both';
        this.selectionOptions = { type: 'Multiple' };
        this.toolbarOptions = ['Search', 'ColumnChooser'];
        this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
            'Copy', 'Edit', 'Delete', 'Save', 'Cancel', 'FirstPage', 'PrevPage',
            'LastPage', 'NextPage'];
    }
    rowSelected(args) {
        console.log(this.gridCampaign.getSelectedRecords());
        if (this.gridCampaign.getSelectedRows().length === 1) {
            this.textSelected = "1 campagne sélectionnée";
        }
        else if (this.gridCampaign.getSelectedRows().length > 1) {
            this.textSelected = this.gridCampaign.getSelectedRecords().length.toString() + " campagnes sélectionnées";
        }
        else if (this.gridCampaign.getSelectedRows().length === 0) {
        }
        const selectedrecords = this.gridCampaign.getSelectedRecords();
    }
    openSnackBar(message, action) {
        this.snackBar.open(message, action, {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
        });
    }
};
tslib_1.__decorate([
    ViewChild(SpinnerComponent, { static: false })
], ListCampaignsComponent.prototype, "spinner", void 0);
tslib_1.__decorate([
    ViewChild('gridCampaign', { static: false })
], ListCampaignsComponent.prototype, "gridCampaign", void 0);
tslib_1.__decorate([
    ViewChild(PublishCampaignComponent, { static: false })
], ListCampaignsComponent.prototype, "publishCampaignComponent", void 0);
tslib_1.__decorate([
    Input()
], ListCampaignsComponent.prototype, "dataCampaign", void 0);
ListCampaignsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-list-campaigns',
        templateUrl: './list-campaigns.component.html',
        styleUrls: ['./list-campaigns.component.scss']
    })
], ListCampaignsComponent);
export { ListCampaignsComponent };
//# sourceMappingURL=list-campaigns.component.js.map