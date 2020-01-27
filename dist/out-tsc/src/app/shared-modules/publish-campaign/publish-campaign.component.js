import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { showSpinner, hideSpinner } from '@syncfusion/ej2-angular-popups';
import { SpinnerComponent } from '../spinner/spinner.component';
let PublishCampaignComponent = class PublishCampaignComponent {
    constructor(displayService, youtubeService, _formBuilder) {
        this.displayService = displayService;
        this.youtubeService = youtubeService;
        this._formBuilder = _formBuilder;
        this.today = new Date(new Date().toDateString());
        this.currentYear = this.today.getFullYear();
        this.currentMonth = this.today.getMonth();
        this.currentDay = this.today.getDate();
        this.minDateCampaign = new Date(this.currentYear, this.currentMonth, this.currentDay);
        this.visible = false;
        this.headerText = "";
        this.dialogContent = "";
        this.injectedData = [];
        this.email = "";
        this.uid = "";
        this.numberOfDays = 0;
        this.startDateFrench = "";
        this.startDateFormattedGoogle = "";
        this.endDateFrench = "";
        this.endDateFormattedGoogle = "";
        this.startDateEnglish = "";
        this.endDateEnglish = "";
        this.isvalidationForm = false;
        this.isSpinner = true;
        this.valueDailyBudget = 0;
        this.valueTotalBudget = 0;
        this.numberImpressionsTotal = 0;
        this.numberImpressionsDaily = 0;
        this.cpcValue = 0;
        this.cpmValue = 0;
        this.bidType = '';
        this.spinnerLabel = "";
        this.youtubeCampaign = false;
        this.adwordsCampaign = false;
        this.campaignOnProcess = false;
        this.init_text = "";
        this.loader = false;
        this.text_init = "Vous êtes sûr de votre action ?";
        // Initialize the Dialog component's target element.
        this.initilaizeTarget = () => {
            this.targetElement = this.container.nativeElement.parentElement;
        };
        //Animation options
        this.animationSettings = {
            effect: 'SideLeft',
            duration: 1000,
            delay: 0
        };
        this.showCloseIcon = true;
    }
    //To get all element of the dialog component after component get initialized.
    ngOnInit() {
        this.validationForm = this._formBuilder.group({
            daterange: ['', Validators.required],
            budget: ["", [Validators.required, Validators.min(10)]]
        });
    }
    ngAfterViewInit() {
    }
    checkDates() {
        return new Promise(resolve => {
            console.log(this.injectedData);
            var now = new Date();
            var start = new Date(this.injectedData.startDateEnglish.toString().replace(/-/g, '/'));
            now.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            if (start < now) {
                resolve('past');
                console.log("Selected date is in the past");
            }
            else {
                resolve('not past');
                console.log("Selected date is NOT in the past");
            }
        });
    }
    dateCampaignChange() {
        var debut = new Date(new Date(this.DateRange.startDate));
        var fin = new Date(new Date(this.DateRange.endDate));
        this.numberOfDays = ((fin.getTime() - debut.getTime()) / (1000 * 3600 * 24)) + 1;
        var start = new Date(this.DateRange.startDate);
        var end = new Date(this.DateRange.endDate);
        this.startDateFrench = [('0' + (start.getDate())).slice(-2), ('0' + (start.getMonth() + 1)).slice(-2), start.getFullYear()].join('/');
        this.endDateFrench = [('0' + (end.getDate())).slice(-2), ('0' + (end.getMonth() + 1)).slice(-2), end.getFullYear()].join('/');
        this.startDateFormattedGoogle = [start.getFullYear(), ('0' + (start.getMonth() + 1)).slice(-2), ('0' + (start.getDate())).slice(-2),].join('');
        this.endDateFormattedGoogle = [end.getFullYear(), ('0' + (end.getMonth() + 1)).slice(-2), ('0' + (end.getDate())).slice(-2)].join('');
        this.startDateEnglish = [('0' + (start.getMonth() + 1)).slice(-2), ('0' + (start.getDate())).slice(-2), start.getFullYear()].join('-');
        this.endDateEnglish = [('0' + (end.getMonth() + 1)).slice(-2), ('0' + (end.getDate())).slice(-2), end.getFullYear()].join('-');
        this.valueTotalBudget = this.valueDailyBudget * this.numberOfDays;
    }
    // Hide the Dialog when click the footer button.
    hideDialog() {
        this.ejDialog.hide();
    }
    // Enables the footer buttons
    // Sample level code to handle the button click action
    onOpenDialog() {
        // Call the show method to open the Dialog
        this.checkDates().then(response_check => {
            if (response_check === "not past") {
                this.ejDialog.position = {
                    X: 'center',
                    Y: 'center'
                };
                if (this.injectedData.type === "Youtube") {
                    this.youtubeCampaign = true;
                    this.adwordsCampaign = false;
                }
                else if (this.injectedData.type === "Display" || this.injectedData.type === "Native") {
                    this.adwordsCampaign = true;
                    this.youtubeCampaign = false;
                }
            }
            else if (response_check === "past") {
                this.bidType = this.injectedData.strategie;
                this.cpmValue = this.injectedData.bid;
                this.cpcValue = this.injectedData.bid;
                this.isvalidationForm = true;
                this.adwordsCampaign = true;
                this.youtubeCampaign = false;
                setTimeout(() => {
                    this.numberOfDays = this.injectedData.numberOfDays;
                    this.validationForm.controls.budget.patchValue(this.injectedData.dailyBudget);
                    this.valueDailyBudget = this.injectedData.dailyBudget;
                    this.valueTotalBudget = this.injectedData.budget;
                    this.DateRange.startDate = new Date(this.injectedData.startDateEnglish);
                    this.DateRange.endDate = new Date(this.injectedData.endDateEnglish);
                    this.DateRange.showTodayButton = true;
                    //createSpinner() method is used to create spinner
                    if (this.injectedData.type === "youtube") {
                    }
                    // showSpinner() will make the spinner visible
                }, 500);
            }
        });
        this.headerText = "Publier la campagne";
        this.init_text = "Vous allez publier la campagne " + this.injectedData.name + " ?";
        this.ejDialog.position = {
            X: 'left',
            Y: 'top'
        };
        this.ejDialog.enableResize = true;
        this.ejDialog.show();
    }
    showLoader() {
        showSpinner(document.getElementById('spinner'));
    }
    hideLoader() {
        hideSpinner(document.getElementById('spinner'));
    }
    publishCampaign() {
        /*  alert('click') */
        return new Promise(resolve => {
            if (this.isvalidationForm === false) {
                this.hideDialog();
                this.loader = true;
                setTimeout(() => {
                    this.spinnerComponent.message = "Paramettrage de la campagne en cours...";
                    this.displayService.publishCampaignToGoogle(this.uid, this.injectedData.id, this.email, this.injectedData.name, this.injectedData.startDateFormattedGoogle, this.injectedData.endDateFormattedGoogle, this.injectedData.budget, this.injectedData.dailyBudget, this.injectedData.numberOfDays, this.injectedData.strategie, this.injectedData.bid, this.injectedData.type).then(publish => {
                        if (publish === "ok") {
                            this.spinnerComponent.message = "Paramétrage des zones cibles...";
                            console.log(this.injectedData);
                            this.displayService.targetLocation(this.injectedData.name, this.injectedData.zones).then(res_location => {
                                if (res_location === "ok") {
                                    this.spinnerComponent.message = "Définition des emplacements de la campagne...";
                                    this.displayService.targetPlacement(this.injectedData.placement).then(placement_response => {
                                        if (placement_response === "ok") {
                                            this.spinnerComponent.message = "Ciblage des âges en cours...";
                                            this.displayService.targetAge(this.injectedData.ages).then(res_ages => {
                                                if (res_ages === "ok") {
                                                    this.spinnerComponent.message = "Ciblages des genres en cours...";
                                                    this.displayService.targetGenre(this.injectedData.genders).then(res_genders => {
                                                        if (res_genders === "ok") {
                                                            this.spinnerComponent.message = "Paramétrage des appareils ciblé...";
                                                            this.displayService.targetDevices(this.injectedData.devices).then(res_devices => {
                                                                if (res_devices === "ok") {
                                                                    this.spinnerComponent.message = "Création des annonces en cours...";
                                                                    var lengthImage = this.injectedData.images;
                                                                    var images = this.injectedData.images;
                                                                    for (var i = 0; i < lengthImage; i++) {
                                                                        if (lengthImage - 1 === i) {
                                                                            this.spinnerComponent.message = "Configuration de la campagne terminée.";
                                                                            this.loader = false;
                                                                            this.ToastAdafriComponent.toast.title = "Service campagne";
                                                                            this.ToastAdafriComponent.toast.content = "Campagne " + this.injectedData.name + " publiée avec succès";
                                                                            this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                                                            this.ToastAdafriComponent.toast.show();
                                                                        }
                                                                        else {
                                                                            this.displayService.addAd(this.uid, images[i].name, images[i].data, "", this.injectedData.urlPromote, [{ "width": images[i].width, "height": images[i].height }], "UPLOAD").then(res_add_ad => {
                                                                                if (res_add_ad === "ok") {
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                            resolve('ok');
                        }
                        else {
                            resolve('error');
                        }
                    });
                }, 500);
            }
            else {
                if (this.validationForm.valid && new Date(this.DateRange.startDate).setHours(0, 0, 0, 0) !== new Date(this.injectedData.startDateEnglish).setHours(0, 0, 0, 0) && new Date(this.DateRange.endDate).setHours(0, 0, 0, 0) !== new Date(this.injectedData.endDateEnglish).setHours(0, 0, 0, 0)) {
                    this.adwordsCampaign = false;
                    this.hideDialog();
                    this.loader = true;
                    setTimeout(() => {
                        this.spinnerComponent.message = "Modification des dates de campagne en cours";
                        this.displayService.updateCampaign(this.injectedData.id, {
                            startDateFrench: this.startDateFrench,
                            endDateFrench: this.endDateFrench,
                            startDateEnglish: this.startDateEnglish,
                            endDateEnglish: this.endDateEnglish,
                            startDate: this.DateRange.startDate,
                            endDate: this.DateRange.endDate,
                            budget: this.valueTotalBudget,
                            dailyBudget: this.valueDailyBudget,
                            numberOfDays: this.numberOfDays,
                            startDateFormattedGoogle: this.startDateFormattedGoogle,
                            endDateFormattedGoogle: this.endDateFormattedGoogle
                        }).then(update_response => {
                            if (update_response === "ok") {
                                this.displayService.publishCampaignToGoogle(this.uid, this.injectedData.id, this.email, this.injectedData.name, this.startDateFormattedGoogle, this.endDateFormattedGoogle, this.valueTotalBudget, this.valueDailyBudget, this.numberOfDays, this.injectedData.strategie, this.injectedData.bid, this.injectedData.type).then(publish => {
                                    if (publish === "ok") {
                                        this.spinnerComponent.message = "Paramétrage des zones cibles...";
                                        console.log(this.injectedData);
                                        this.displayService.targetLocation(this.injectedData.name, this.injectedData.zones).then(res_location => {
                                            if (res_location === "ok") {
                                                this.spinnerComponent.message = "Définition des emplacements de la campagne...";
                                                this.displayService.targetPlacement(this.injectedData.placement).then(placement_response => {
                                                    if (placement_response === "ok") {
                                                        this.spinnerComponent.message = "Ciblage des âges en cours...";
                                                        this.displayService.targetAge(this.injectedData.ages).then(res_ages => {
                                                            if (res_ages === "ok") {
                                                                this.spinnerComponent.message = "Ciblages des genres en cours...";
                                                                this.displayService.targetGenre(this.injectedData.genders).then(res_genders => {
                                                                    if (res_genders === "ok") {
                                                                        this.spinnerComponent.message = "Paramétrage des appareils ciblé...";
                                                                        this.displayService.targetDevices(this.injectedData.devices).then(res_devices => {
                                                                            if (res_devices === "ok") {
                                                                                this.spinnerComponent.message = "Configuration de la campagne terminée.";
                                                                                this.loader = false;
                                                                                this.ToastAdafriComponent.toast.title = "Service campagne";
                                                                                this.ToastAdafriComponent.toast.content = "Campagne " + this.injectedData.name + " publiée avec succès";
                                                                                this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                                                                this.ToastAdafriComponent.toast.show();
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                        resolve('ok');
                                    }
                                    else {
                                        resolve('error');
                                    }
                                });
                            }
                        });
                    }, 500);
                }
            }
        });
    }
    publishYoutubeCampaign() {
        /*  alert('click') */
        return new Promise(resolve => {
            if (this.isvalidationForm === false) {
                this.hideDialog();
                this.loader = true;
                setTimeout(() => {
                    this.spinnerComponent.message = "Paramettrage de la campagne en cours...";
                    this.youtubeService.publishYoutubeCampaignToGoogle(this.uid, this.injectedData.id, this.email, this.injectedData.name, this.injectedData.startDateFormattedGoogle, this.injectedData.endDateFormattedGoogle, this.injectedData.budget, this.injectedData.dailyBudget, this.injectedData.numberOfDays, this.injectedData.strategie, this.injectedData.bid, this.injectedData.type).then(publish => {
                        if (publish === "ok") {
                            this.spinnerComponent.message = "Paramétrage des zones cibles...";
                            console.log(this.injectedData);
                            this.youtubeService.targetLocation(this.injectedData.name, this.injectedData.zones).then(res_location => {
                                if (res_location === "ok") {
                                    this.spinnerComponent.message = "Définition des chaines de diffusion la campagne...";
                                    this.youtubeService.targetYoutueChannels(this.injectedData.youtubeChannels).then(placement_response => {
                                        if (placement_response === "ok") {
                                            this.spinnerComponent.message = "Ciblage des âges en cours...";
                                            this.youtubeService.targetAge(this.injectedData.ages).then(res_ages => {
                                                if (res_ages === "ok") {
                                                    this.spinnerComponent.message = "Ciblages des genres en cours...";
                                                    this.youtubeService.targetGenre(this.injectedData.genders).then(res_genders => {
                                                        if (res_genders === "ok") {
                                                            this.spinnerComponent.message = "Paramétrage des appareils ciblé...";
                                                            this.youtubeService.targetDevices(this.injectedData.devices).then(res_devices => {
                                                                if (res_devices === "ok") {
                                                                    this.spinnerComponent.message = "Configuration de la campagne terminée.";
                                                                    this.loader = false;
                                                                    this.ToastAdafriComponent.toast.title = "Service campagne";
                                                                    this.ToastAdafriComponent.toast.content = "Campagne " + this.injectedData.name + " publiée avec succès";
                                                                    this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                                                    this.ToastAdafriComponent.toast.show();
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                            resolve('ok');
                        }
                        else {
                            resolve('error');
                        }
                    });
                }, 500);
            }
            else {
                if (this.validationForm.valid) {
                    this.youtubeCampaign = false;
                    this.hideDialog();
                    this.loader = true;
                    setTimeout(() => {
                        this.youtubeService.updateCampaign(this.injectedData.id, {
                            startDateFrench: this.startDateFrench,
                            endDateFrench: this.endDateFrench,
                            startDateEnglish: this.startDateEnglish,
                            endDateEnglish: this.endDateEnglish,
                            startDate: this.DateRange.startDate,
                            endDate: this.DateRange.endDate,
                            budget: this.valueTotalBudget,
                            dailyBudget: this.valueDailyBudget,
                            numberOfDays: this.numberOfDays,
                            startDateFormattedGoogle: this.startDateFormattedGoogle,
                            endDateFormattedGoogle: this.endDateFormattedGoogle
                        }).then(update_response => {
                            if (update_response === "ok") {
                                this.youtubeService.publishYoutubeCampaignToGoogle(this.uid, this.injectedData.id, this.email, this.injectedData.name, this.startDateFormattedGoogle, this.endDateFormattedGoogle, this.valueTotalBudget, this.valueDailyBudget, this.numberOfDays, this.injectedData.strategie, this.injectedData.bid, this.injectedData.type).then(publish => {
                                    if (publish === "ok") {
                                        this.spinnerComponent.message = "Paramétrage des zones cibles...";
                                        console.log(this.injectedData);
                                        this.youtubeService.targetLocation(this.injectedData.name, this.injectedData.zones).then(res_location => {
                                            if (res_location === "ok") {
                                                this.spinnerComponent.message = "Définition des chaines de diffusion de la campagne...";
                                                this.youtubeService.targetYoutueChannels(this.injectedData.youtubeChannels).then(placement_response => {
                                                    if (placement_response === "ok") {
                                                        this.spinnerComponent.message = "Ciblage des âges en cours...";
                                                        this.youtubeService.targetAge(this.injectedData.ages).then(res_ages => {
                                                            if (res_ages === "ok") {
                                                                this.spinnerComponent.message = "Ciblages des genres en cours...";
                                                                this.youtubeService.targetGenre(this.injectedData.genders).then(res_genders => {
                                                                    if (res_genders === "ok") {
                                                                        this.spinnerComponent.message = "Paramétrage des appareils ciblé...";
                                                                        this.youtubeService.targetDevices(this.injectedData.devices).then(res_devices => {
                                                                            if (res_devices === "ok") {
                                                                                this.spinnerComponent.message = "Configuration de la campagne terminée.";
                                                                                this.loader = false;
                                                                                this.ToastAdafriComponent.toast.title = "Service campagne";
                                                                                this.ToastAdafriComponent.toast.content = "Campagne " + this.injectedData.name + " publiée avec succès";
                                                                                this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                                                                this.ToastAdafriComponent.toast.show();
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                        resolve('ok');
                                    }
                                    else {
                                        resolve('error');
                                    }
                                });
                            }
                        });
                    }, 500);
                }
            }
        });
    }
    budgetChange(value) {
        this.valueDailyBudget = value;
        this.valueTotalBudget = value * this.numberOfDays;
        if (this.bidType === "CPM") {
            if (this.validationForm.get('budget').valid) {
                this.numberImpressionsTotal = (this.valueTotalBudget * 1000) / this.cpmValue;
                this.numberImpressionsDaily = (this.valueDailyBudget * 1000) / this.cpmValue;
                this.ToastAdafriComponent.toast.title = "Impressions";
                this.ToastAdafriComponent.toast.content = "Nombre d'impressions par jours: " + (parseInt(this.numberImpressionsDaily.toString())).toString() + "<br> Nombre d'impressions total: " + (parseInt(this.numberImpressionsTotal.toString())).toString();
                this.ToastAdafriComponent.playSong = "ok";
                this.ToastAdafriComponent.toast.timeOut = 10000;
                this.ToastAdafriComponent.toast.showCloseButton = true;
                this.ToastAdafriComponent.toast.cssClass = "e-toast-info";
                this.ToastAdafriComponent.toast.position = {
                    X: 'Right',
                    Y: 'Top'
                };
                this.ToastAdafriComponent.toast.show();
                this.setInputControlState(this.validationForm, 'budget', 'budgetCampaign');
            }
            else {
                this.setInputControlState(this.validationForm, 'budget', 'budgetCampaign');
            }
        }
        else if (this.bidType === "CPC") {
            if (this.validationForm.get('budget').valid) {
                this.setInputControlState(this.validationForm, 'budget', 'budgetCampaign');
                this.numberImpressionsTotal = (this.valueTotalBudget * 1000) / this.cpcValue;
                this.numberImpressionsDaily = (this.valueDailyBudget * 1000) / this.cpcValue;
                this.ToastAdafriComponent.toast.title = "Impressions";
                this.ToastAdafriComponent.toast.content = "Nombre d'impressions par jours: " + this.numberImpressionsDaily + "<br> Nombre d'impressions total: " + this.numberImpressionsTotal;
                this.ToastAdafriComponent.playSong = "ok";
                this.ToastAdafriComponent.toast.timeOut = 10000;
                this.ToastAdafriComponent.toast.showCloseButton = true;
                this.ToastAdafriComponent.toast.cssClass = "e-toast-info";
                this.ToastAdafriComponent.toast.position = {
                    X: 'Right',
                    Y: 'Top'
                };
                this.ToastAdafriComponent.toast.show();
            }
            else {
                this.setInputControlState(this.validationForm, 'budget', 'budgetCampaign');
            }
        }
        /*  this.defaultBid = value / 655
         this.defaultBidConvert = value
         //console.log(Number((this.defaultBid).toFixed(2))) */
    }
    setInputControlState(form, field, id) {
        if (form.get(field).valid) {
            if (document.getElementById(id).classList.contains('e-error')) {
                document.getElementById(id).classList.remove('e-error');
            }
        }
        else {
            if (!document.getElementById(id).classList.contains('e-error')) {
                document.getElementById(id).classList.add('e-error');
            }
        }
    }
    focusIn(target) {
        target.parentElement.classList.add('e-input-focus');
    }
    focusOut(target) {
        target.parentElement.classList.remove('e-input-focus');
    }
};
tslib_1.__decorate([
    ViewChild('ejDialog', {
        static: false
    })
], PublishCampaignComponent.prototype, "ejDialog", void 0);
tslib_1.__decorate([
    ViewChild('container', {
        static: false
    })
], PublishCampaignComponent.prototype, "container", void 0);
tslib_1.__decorate([
    ViewChild('dateCampaignPicker', {
        static: false
    })
], PublishCampaignComponent.prototype, "DateRange", void 0);
tslib_1.__decorate([
    ViewChild('toast', {
        static: false
    })
], PublishCampaignComponent.prototype, "ToastAdafriComponent", void 0);
tslib_1.__decorate([
    ViewChild(SpinnerComponent, {
        static: false
    })
], PublishCampaignComponent.prototype, "spinnerComponent", void 0);
PublishCampaignComponent = tslib_1.__decorate([
    Component({
        selector: 'app-publish-campaign',
        templateUrl: './publish-campaign.component.html',
        styleUrls: ['./publish-campaign.component.scss']
    })
], PublishCampaignComponent);
export { PublishCampaignComponent };
//# sourceMappingURL=publish-campaign.component.js.map