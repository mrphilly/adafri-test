import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators } from "@angular/forms";
import { countries, genders, ages, devices, imageSizes, days, bids, adFormat, youtubeChannels, sites } from "../../shared-modules/data";
import { detach, Browser, createElement, isNullOrUndefined, EventHandler } from "@syncfusion/ej2-base";
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import * as $ from 'jquery';
import { FormValidators, urlValidator } from '../../shared-modules/form-validators';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { PublishCampaignComponent } from 'src/app/shared-modules/publish-campaign/publish-campaign.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ChipListComponent } from '@syncfusion/ej2-angular-buttons';
let EditCampaignComponent = class EditCampaignComponent {
    constructor(youtubeService, auth, _formBuilder, afs, route, displayService) {
        this.youtubeService = youtubeService;
        this.auth = auth;
        this._formBuilder = _formBuilder;
        this.afs = afs;
        this.route = route;
        this.displayService = displayService;
        this.uid = "";
        this.email = "";
        this.format = [];
        this.days = [];
        this.countries = countries();
        this.youtubeChannels = youtubeChannels();
        /*  public sites = sites(); */
        this.genders = genders();
        this.ages = ages();
        this.devices = devices();
        this.imageSizes = imageSizes();
        this.ays = days();
        this.sitesData = sites();
        this.daysFields = { text: 'name', value: 'name' };
        this.countryData = countries();
        this.gendersData = genders();
        this.devicesData = devices();
        this.agesData = ages();
        this.dataBids = bids();
        this.adFormat = adFormat();
        this.fieldsBids = { text: 'name', value: 'id' };
        this.fieldsAdFormat = { text: 'name', value: 'dimensions' };
        this.youtubeChannelsData = youtubeChannels();
        this.fieldsCountry = { text: 'name', value: 'id' };
        this.fieldsYoutubeChannels = { text: 'name', value: 'id' };
        this.fieldsAges = { text: 'name', value: 'id' };
        this.fieldsGenders = { text: 'name', value: 'id' };
        this.fieldsDevices = { text: 'name', value: 'id' };
        this.fieldsSites = { text: 'name', value: 'id' };
        this.placeholderCountry = 'Sélectionner vos pays';
        this.placeholderYoutubeChannels = 'Sélectionnez vos Chaines Youtube ';
        this.placeholderSites = 'Sélectionnez vos sites ';
        this.placeholderAges = 'Sélectionnez vos âges ';
        this.placeholderGenders = 'Sélectionnez vos genres';
        this.placeholderDevices = 'Sélectionnez vos appareils ';
        this.enableGroupCheckBox = true;
        this.mode = 'CheckBox';
        this.bidType = '';
        this.euroCurrency = 658;
        this.valueBidsSelected = 'CPM';
        this.cpcValue = 0.06;
        this.cpmValue = 0.06;
        this.valueCurrencyCpm = 0;
        this.valueCurrencyCpc = 0;
        this.valueDailyBudget = 0;
        this.valueTotalBudget = 0;
        this.numberImpressionsTotal = 0;
        this.numberImpressionsDaily = 0;
        this.numberOfDays = 0;
        this.minBidsValue = 0.04;
        this.toastTitle = "";
        this.toastContent = "";
        this.toastCssClass = "";
        this.showToast = false;
        this.disableBudget = true;
        this.showSpinnerCampaign = true;
        this.pendingCampaign = true;
        this.successCampaign = false;
        this.errorCampaign = false;
        this.buttonSubmitCampaign = true;
        this.buttonSpinnerCreateCampaign = false;
        this.buttonProgressCampaign = false;
        this.buttonCreateCampaign = false;
        this.buttonListCampaign = false;
        this.goBackToBudgetButton = true;
        this.headerText = [];
        this.startDateFrench = "";
        this.startDateFormattedGoogle = "";
        this.endDateFrench = "";
        this.endDateFormattedGoogle = "";
        this.startDateEnglish = "";
        this.endDateEnglish = "";
        this.uniqueDaysSchedule = [];
        this.selectedFormat = [];
        this.IMAGE_LIST = [];
        this.spinSettings = { position: 'Right', width: 20, template: '<div class="template"></div>' };
        this.today = new Date(new Date().toDateString());
        this.currentYear = this.today.getFullYear();
        this.currentMonth = this.today.getMonth();
        this.currentDay = this.today.getDate();
        this.minDateCampaign = new Date(this.currentYear, this.currentMonth, this.currentDay);
        this.campaignType = "";
        this.isGoogleDisplay = false;
        this.isYoutube = false;
        this.isNativeCampaignAds = false;
        this.loaderEdit = true;
        this.idCampaignRef = "";
        this.country = [];
        this.listSitesDisplay = [];
        this.listSitesDropdown = [];
        this.listCountryDisplay = [];
        this.listAgesDisplay = [];
        this.listGendersDisplay = [];
        this.listDevicesDisplay = [];
        this.listChannelsDisplay = [];
        this.listCountryDropdown = [];
        this.listAgesDropdown = [];
        this.listGendersDropdown = [];
        this.listDevicesDropdown = [];
        this.listChannelsDropdown = [];
        this.ad_group_id = 0;
        this.campaign_id = 0;
        this.ad_group_id_firebase = "";
        this.campaign_id_firebase = "";
        this.currentLocation = [];
        this.currentCriterionLocation = [];
        this.ageList = [];
        this.generalList = [];
        this.currentUrlPromote = "";
        this.currentStartDateFrench = "";
        this.currentEndDateFrench = "";
        this.currentStartDateEnglish = "";
        this.currentEndDateEnglish = "";
        this.currentCampaignName = "";
        this.currentCampaignType = "";
        this.maxStartDate = new Date();
        this.minEndDate = new Date();
        this.minStartDate = new Date();
        this.campaignStarted = true;
        this.campaignEnded = false;
        this.elementModel = { placeholder: 'Enter your name' };
        this.customFn = (args) => {
            var _data = [];
            this.afs.collection('adwords-display', (ref) => ref.where('name', '==', name)).valueChanges().forEach(data => {
                _data = data;
            });
            return _data.length > 0;
        };
        this.path = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
        this.allowExtensions = '.png, .jpg, .jpeg';
        this.filesName = [];
        this.filesDetails = [];
        this.filesList = [];
    }
    getCampaignType() {
        return new Promise(resolve => {
            this.route.params.subscribe(param => {
                this.campaignType === param.type;
            });
            resolve('ok');
        });
    }
    ngOnInit() {
        this.route.params.subscribe(param => {
            if (param) {
                if (param.type === "Display" || param.type === "Native") {
                    this.idCampaignRef = param.id;
                    this.firstFormGroup = this._formBuilder.group({
                        name: ['', [Validators.required], [FormValidators.displayCampaignNameValidator(this.afs)]],
                        landingPage: ['', [Validators.required, urlValidator]],
                        daterange: ['', Validators.required],
                        countries: [[], Validators.required],
                        sites: [[], Validators.required],
                        genders: [[], Validators.required],
                        ages: [[], Validators.required],
                        devices: [[], Validators.required],
                    });
                    this.secondFormGroup = this._formBuilder.group({
                        imagesSize: ['', Validators.required]
                    });
                    this.nameForm = this._formBuilder.group({
                        name: ['', [Validators.required], [FormValidators.displayCampaignNameValidator(this.afs)]]
                    });
                    this.statusForm = this._formBuilder.group({
                        status: ['', Validators.required]
                    });
                    this.dateForm = this._formBuilder.group({
                        date: ['', Validators.required]
                    });
                    this.startDateForm = this._formBuilder.group({
                        date: ['', Validators.required]
                    });
                    this.endDateForm = this._formBuilder.group({
                        date: ['', Validators.required]
                    });
                    this.endDateForm = this._formBuilder.group({
                        date: ['', Validators.required]
                    });
                    this.urlForm = this._formBuilder.group({
                        url: ['', [Validators.required, urlValidator]]
                    });
                    this.sitesForm = this._formBuilder.group({
                        sites: ['', Validators.required]
                    });
                    this.countryForm = this._formBuilder.group({
                        country: ['', Validators.required]
                    });
                    this.ageForm = this._formBuilder.group({
                        ages: ['', Validators.required]
                    });
                    this.genderForm = this._formBuilder.group({
                        genders: ['', Validators.required]
                    });
                    this.deviceForm = this._formBuilder.group({
                        devices: ['', Validators.required]
                    });
                    this.channelsForm = this._formBuilder.group({
                        channels: ['', Validators.required]
                    });
                    this.budgetForm = this._formBuilder.group({
                        budget: ["", [Validators.required, Validators.min(8000)]],
                        bidChoose: [[], Validators.required],
                        cpm: ["", Validators.nullValidator],
                        cpc: ["", Validators.nullValidator]
                    });
                    this.isGoogleDisplay = true;
                    this.isYoutube = false;
                }
                else if (param.type === "Youtube") {
                    this.isYoutube = true;
                    this.isGoogleDisplay = false;
                    this.firstFormGroup = this._formBuilder.group({
                        name: ['', [Validators.required], [FormValidators.displayCampaignNameValidator(this.afs)]],
                        landingPage: ['', [Validators.required, urlValidator]],
                        daterange: ['', Validators.required],
                        countries: [[], Validators.required],
                        youtubeChannels: [[], Validators.required],
                        genders: [[], Validators.required],
                        ages: [[], Validators.required],
                        devices: [[], Validators.required],
                    });
                    this.secondFormGroup = this._formBuilder.group({
                        imagesSize: ['', Validators.required]
                    });
                    this.budgetForm = this._formBuilder.group({
                        budget: ["", [Validators.required, Validators.min(8000)]],
                        bidChoose: [[], Validators.required],
                        cpm: ["", Validators.nullValidator],
                        cpc: ["", Validators.nullValidator]
                    });
                    console.log('youtube');
                }
            }
        });
        this.getCampaignType();
    }
    checkStartDates(startDateEnglish) {
        return new Promise(resolve => {
            var now = new Date();
            var start = new Date(startDateEnglish.toString().replace(/-/g, '/'));
            now.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            if (start <= now) {
                resolve('started');
            }
            else {
                resolve('not started');
            }
        });
    }
    checkEndDates(endDateEnglish) {
        return new Promise(resolve => {
            var now = new Date();
            var end = new Date(endDateEnglish.toString().replace(/-/g, '/'));
            now.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            if (end < now) {
                resolve('ended');
            }
            else {
                resolve('not ended');
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
    getListSitesDropdownForDropdown(data) {
        return new Promise(resolve => {
            this.displayService.getAdGroup(data.ad_group_id_firebase).valueChanges().forEach(result => {
                this.listSitesDropdown = this.sitesData.filter(item1 => !result.criterion_placement.some(item2 => (item2.id === item1.id)));
                resolve('ok');
            });
        });
    }
    getListSitesDropdownForDisplay(data) {
        return new Promise(resolve => {
            this.displayService.getAdGroup(data.ad_group_id_firebase).valueChanges().forEach(result => {
                console.log(result);
                this.listSitesDisplay = result.criterion_placement;
                resolve('ok');
            });
        });
    }
    getListAgesDropdownForDisplay(data) {
        return new Promise(resolve => {
            this.displayService.getAdGroup(data.ad_group_id_firebase).valueChanges().forEach(result => {
                console.log(result);
                this.listAgesDisplay = this.ages.filter(item1 => result.ages.some(item2 => (item2 === item1.id)));
                resolve('ok');
            });
        });
    }
    getListGendersDropdownForDisplay(data) {
        return new Promise(resolve => {
            this.displayService.getAdGroup(data.ad_group_id_firebase).valueChanges().forEach(result => {
                console.log(result);
                this.listGendersDisplay = this.genders.filter(item1 => result.sexes.some(item2 => (item2 === item1.id)));
                resolve('ok');
            });
        });
    }
    getListDeviceDropdownForDisplay(data) {
        return new Promise(resolve => {
            this.displayService.getAdGroup(data.ad_group_id_firebase).valueChanges().forEach(result => {
                console.log(result);
                this.listDevicesDisplay = this.devices.filter(item1 => result.devices.some(item2 => (item2 === item1.id)));
                resolve('ok');
            });
        });
    }
    getListCountyDropdownForDropdown(data) {
        return new Promise(resolve => {
            this.listCountryDropdown = this.countries.filter(item1 => !data['zones'].some(item2 => (item2.id === item1.id)));
            resolve('ok');
        });
    }
    getListAgesDropdownForDropdown(data) {
        return new Promise(resolve => {
            this.displayService.getAdGroup(data.ad_group_id_firebase).valueChanges().forEach(result => {
                this.listAgesDropdown = this.ages.filter(item1 => !result.ages.some(item2 => (item2 === item1.id)));
                resolve('ok');
            });
        });
    }
    getListGenderDropdownForDropdown(data) {
        return new Promise(resolve => {
            this.displayService.getAdGroup(data.ad_group_id_firebase).valueChanges().forEach(result => {
                console.log(result);
                this.listGendersDropdown = this.genders.filter(item1 => !result.sexes.some(item2 => (item2 === item1.id)));
                resolve('ok');
            });
        });
    }
    getListDeviceDropdownForDropdown(data) {
        return new Promise(resolve => {
            this.displayService.getAdGroup(data.ad_group_id_firebase).valueChanges().forEach(result => {
                console.log(result);
                this.listDevicesDropdown = this.devices.filter(item1 => !result.devices.some(item2 => (item2 === item1.id)));
                resolve('ok');
            });
        });
    }
    actionBeginName(e) {
        console.log(e);
        /*  if (this.nameForm.valid) {
           this.loaderEdit=true
           this.displayService.updateCampaignName(this.idCampaignRef, this.nameForm.controls.name.value, this.email, this.campaign_id, this.currentCampaignType)
         } else {
           
       } */
    }
    checkCampaignDates() {
        return new Promise(resolve => {
            this.checkStartDates(this.currentStartDateEnglish).then(res_start => {
                console.log(this.currentStartDateEnglish);
                console.log(res_start);
                if (res_start === "started") {
                    this.campaignStarted = true;
                    this.minEndDate = new Date(new Date().setDate(new Date().getDate() + 1));
                    resolve('ok');
                    this.checkEndDates(this.currentEndDateEnglish).then(res_end => {
                        if (res_end === "ended") {
                            this.campaignEnded = true;
                            resolve('ok');
                        }
                        else if (res_end === "not ended") {
                            resolve('ok');
                            this.campaignEnded = false;
                        }
                    });
                }
                else if (res_start === "not started") {
                    resolve('ok');
                    this.campaignStarted = false;
                }
            });
        });
    }
    actionSuccess(e) {
        if (this.nameForm.valid) {
            this.loaderEdit = true;
            this.displayService.updateCampaignName(this.idCampaignRef, this.nameForm.controls.name.value, this.email, this.campaign_id, this.currentCampaignType).then(res_update => {
                if (res_update === "ok") {
                    this.loaderEdit = false;
                    this.ToastAdafriComponent.toast.title = "Service Campagne";
                    this.ToastAdafriComponent.toast.content = "Nom de la campagne mis à jour !";
                    this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                    this.ToastAdafriComponent.toast.show();
                }
            });
            console.log(this.nameForm.controls.name.value);
        }
        else {
            console.log('not valid');
            e.cancel;
        }
    }
    setDisplayData() {
        return new Promise(resolve => {
            this.getUserCredentials().then(res_credentials => {
                if (res_credentials === "ok") {
                    this.displayService.getCampaign(this.idCampaignRef).valueChanges().forEach(data => {
                        /*    this.DateRange.startDate = new Date(data['startDateEnglish'])
                           this.DateRange.endDate = new Date(data['endDateEnglish']) */
                        /* this.firstFormGroup.controls.name.patchValue(data['name'])
                        this.firstFormGroup.controls.landingPage.patchValue(data['urlPromote'])
                        this.firstFormGroup.controls.countries.patchValue(data['zones']) */
                        /*  this.firstFormGroup.controls.sites.patchValue(data['placement']) */
                        /* this.firstFormGroup.controls.genders.patchValue(data['genders'])
                        this.firstFormGroup.controls.ages.patchValue(data['ages'])
                        this.firstFormGroup.controls.devices.patchValue(data['devices']) */
                        this.currentCampaignName = data['name'];
                        this.currentCampaignType = data['type'];
                        this.currentUrlPromote = data['urlPromote'];
                        this.currentStartDateEnglish = data['startDateEnglish'];
                        this.currentStartDateFrench = data['startDateFrench'];
                        this.currentEndDateEnglish = data['endDateEnglish'];
                        this.currentEndDateFrench = data['endDateFrench'];
                        this.maxStartDate = new Date(new Date(this.currentEndDateEnglish).setDate(new Date(this.currentEndDateEnglish).getDate() - 1));
                        this.minEndDate = new Date(new Date(this.currentStartDateEnglish).setDate(new Date(this.currentStartDateEnglish).getDate() + 1));
                        this.secondFormGroup.controls.imagesSize.patchValue(data['format']);
                        this.budgetForm.controls.budget.patchValue(data['dailyBudget']);
                        this.budgetForm.controls.bidChoose.patchValue(data['strategie']);
                        this.IMAGE_LIST = data['images'];
                        this.ad_group_id = data['ad_group_id'];
                        this.ad_group_id_firebase = data['ad_group_id_firebase'];
                        this.campaign_id = data['id_campagne'];
                        this.campaign_id_firebase = data['id'];
                        this.listCountryDisplay = data['criterion_zones'];
                        this.currentLocation = data['zones'];
                        this.currentCriterionLocation = data['criterion_zones'];
                        this.getListSitesDropdownForDropdown(data).then(res_dropdown => {
                            if (res_dropdown === "ok") {
                                this.getListSitesDropdownForDisplay(data).then(res_display => {
                                    if (res_display === "ok") {
                                        this.getListCountyDropdownForDropdown(data).then(res_country => {
                                            if (res_country === "ok") {
                                                this.getListAgesDropdownForDropdown(data).then(res_ages => {
                                                    if (res_ages === "ok") {
                                                        this.getListAgesDropdownForDisplay(data).then(res_age_display => {
                                                            if (res_age_display === "ok") {
                                                                this.getListGenderDropdownForDropdown(data).then(res_gender => {
                                                                    if (res_gender === "ok") {
                                                                        this.getListGendersDropdownForDisplay(data).then(res_gender_display => {
                                                                            if (res_gender_display === "ok") {
                                                                                this.getListDeviceDropdownForDropdown(data).then(res_devices => {
                                                                                    if (res_devices === "ok") {
                                                                                        this.getListDeviceDropdownForDisplay(data).then(res_devices_display => {
                                                                                            if (res_devices_display === "ok") {
                                                                                                this.checkCampaignDates().then(res_check => {
                                                                                                    if (res_check === "ok") {
                                                                                                        this.generalList = [data];
                                                                                                        this.toolbarCampaign = ['Edit', 'Update', 'Cancel'];
                                                                                                        this.editSettingsSites = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', showDeleteConfirmDialog: true, showConfirmDialog: true };
                                                                                                        this.editSettingsCampaign = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', showDeleteConfirmDialog: true, showConfirmDialog: true };
                                                                                                        this.toolbarSites = ['Add'];
                                                                                                        this.commandsSites = [{ type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } }];
                                                                                                        resolve('ok');
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
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                        /*     this.countryParams = {
                                                params: {
                                                    allowFiltering: true,
                                                    dataSource: new DataManager(this.listSitesDropdown),
                                                    fields: { text: 'name', value: 'id' },
                                                    query: new Query(),
                                                    actionComplete: () => false
                                                }
                                            }; */
                                    }
                                });
                            }
                        });
                        console.log(this.IMAGE_LIST);
                        if (data['strategie'] === "CPM") {
                            this.budgetForm.controls.cpm.setValue(data['bid']);
                        }
                        else if (data['strategie'] === "CPC") {
                            this.budgetForm.controls.cpc.setValue(data['bid']);
                        }
                        this.dropElement = document.getElementsByClassName('control-section')[0];
                        if (Browser.isDevice) {
                            document.getElementById('dropimage').style.padding = '0px 10%';
                        }
                        document.getElementById('browse').onclick = () => {
                            if (this.selectedFormat.length > 0) {
                                document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                                return false;
                            }
                            else {
                                this.ToastAdafriComponent.toast.title = "Avertissement !";
                                this.ToastAdafriComponent.toast.content = "Veuillez choisir un format ";
                                this.ToastAdafriComponent.toast.cssClass = "e-toast-warning";
                                this.ToastAdafriComponent.toast.showCloseButton = true;
                                this.ToastAdafriComponent.toast.timeOut = 5000;
                                this.ToastAdafriComponent.toast.show();
                            }
                        };
                    });
                }
            }).catch(err => {
                alert('pas de connexion');
            });
        });
    }
    setYoutubeData() {
        return new Promise(resolve => {
            this.getUserCredentials().then(res_credentials => {
                if (res_credentials === "ok") {
                    this.spinner.message = "Chargement...";
                    this.youtubeService.getListCampaign(this.uid).subscribe(data => {
                        this.DateRange.startDate = new Date(data['startDateEnglish']);
                        this.DateRange.endDate = new Date(data['endDateEnglish']);
                        this.firstFormGroup.controls.name.patchValue(data['name']);
                        this.firstFormGroup.controls.landingPage.patchValue(data['urlPromote']);
                        this.firstFormGroup.controls.countries.patchValue(data['zones']);
                        this.firstFormGroup.controls.youtubeChannels.patchValue(data['youtubeChannels']);
                        this.firstFormGroup.controls.genders.patchValue(data['genders']);
                        this.firstFormGroup.controls.ages.patchValue(data['ages']);
                        this.firstFormGroup.controls.devices.patchValue(data['devices']);
                        this.secondFormGroup.controls.imagesSize.patchValue(data['format']);
                        this.budgetForm.controls.budget.patchValue(data['dailyBudget']);
                        this.budgetForm.controls.bidChoose.patchValue(data['strategie']);
                        this.IMAGE_LIST = data['images'];
                        console.log(this.IMAGE_LIST);
                        if (data['strategie'] === "CPM") {
                            this.budgetForm.controls.cpm.setValue(data['bid']);
                        }
                        else if (data['strategie'] === "CPC") {
                            this.budgetForm.controls.cpc.setValue(data['bid']);
                        }
                        this.dropElement = document.getElementsByClassName('control-section')[0];
                        if (Browser.isDevice) {
                            document.getElementById('dropimage').style.padding = '0px 10%';
                        }
                        document.getElementById('browse').onclick = () => {
                            if (this.selectedFormat.length > 0) {
                                document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                                return false;
                            }
                            else {
                                this.ToastAdafriComponent.toast.title = "Avertissement !";
                                this.ToastAdafriComponent.toast.content = "Veuillez choisir un format ";
                                this.ToastAdafriComponent.toast.cssClass = "e-toast-warning";
                                this.ToastAdafriComponent.toast.showCloseButton = true;
                                this.ToastAdafriComponent.toast.timeOut = 5000;
                                this.ToastAdafriComponent.toast.show();
                            }
                        };
                        resolve('ok');
                    });
                }
            });
        });
    }
    setResponsiveDisplay() {
        return new Promise(resolve => {
            this.getUserCredentials().then(res_credentials => {
                if (res_credentials === "ok") {
                    this.displayService.getListCampaign(this.uid).subscribe(data => {
                        this.DateRange.startDate = new Date(data['startDateEnglish']);
                        this.DateRange.endDate = new Date(data['endDateEnglish']);
                        this.firstFormGroup.controls.name.patchValue(data['name']);
                        this.firstFormGroup.controls.landingPage.patchValue(data['urlPromote']);
                        this.firstFormGroup.controls.countries.patchValue(data['zones']);
                        this.firstFormGroup.controls.sites.patchValue(data['placement']);
                        this.firstFormGroup.controls.genders.patchValue(data['genders']);
                        this.firstFormGroup.controls.ages.patchValue(data['ages']);
                        this.firstFormGroup.controls.devices.patchValue(data['devices']);
                        this.secondFormGroup.controls.imagesSize.patchValue(data['format']);
                        this.budgetForm.controls.budget.patchValue(data['dailyBudget']);
                        this.budgetForm.controls.bidChoose.patchValue(data['strategie']);
                        this.IMAGE_LIST = data['images'];
                        console.log(this.IMAGE_LIST);
                        if (data['strategie'] === "CPM") {
                            this.budgetForm.controls.cpm.setValue(data['bid']);
                        }
                        else if (data['strategie'] === "CPC") {
                            this.budgetForm.controls.cpc.setValue(data['bid']);
                        }
                        this.isNativeCampaignAds = true;
                        this.isGoogleDisplay = false;
                        resolve('ok');
                    });
                }
            });
        });
    }
    actionCompleteSites(args) {
        if (args.requestType === 'add') {
            const dialog = args.dialog;
            dialog.header = 'Ajouter des sites';
        }
        else if (args.requestType === 'delete') {
            var criterion = args['data'][0].criterion_id;
            var placement = args['data'][0].id;
            this.displayService.removePlacement(criterion, placement, this.campaign_id, this.ad_group_id, this.ad_group_id_firebase).then(res_remove => {
                if (res_remove === "ok") {
                    this.sitesForm.reset();
                    this.ToastAdafriComponent.toast.title = "Service Campagne";
                    this.ToastAdafriComponent.toast.content = "Emplacement suprrimé avec succès !";
                    this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                    this.ToastAdafriComponent.toast.show();
                }
            });
            console.log(args);
        }
    }
    actionBeginSites(args) {
        if (args.requestType === 'save') {
            if (this.sitesForm.valid) {
                args.data = this.sitesForm;
            }
            else {
                args.cancel = true;
            }
        }
    }
    actionCompleteCountry(args) {
        if (args.requestType === 'add') {
            const dialog = args.dialog;
            dialog.header = 'Zones de diffusions';
        }
        else if (args.requestType === 'delete') {
            var criterion = args['data'][0].criterion_id;
            var country = args['data'][0].id;
            this.displayService.removeLocation(criterion, country, this.idCampaignRef, this.campaign_id).then(res_remove => {
                if (res_remove === "ok") {
                    this.countryForm.reset();
                    this.ToastAdafriComponent.toast.title = "Service Campagne";
                    this.ToastAdafriComponent.toast.content = "Pays supprimé avec succès !";
                    this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                    this.ToastAdafriComponent.toast.show();
                }
            });
            console.log(args);
        }
    }
    actionBeginCountry(args) {
        if (args.requestType === 'save') {
            if (this.countryForm.valid) {
                args.data = this.sitesForm;
                this.displayService.addNewtargetLocation(this.idCampaignRef, this.countryForm.controls.country.value, this.campaign_id).then(res_add => {
                    if (res_add === "ok") {
                        this.ToastAdafriComponent.toast.title = "Service Campagne";
                        this.ToastAdafriComponent.toast.content = "Pays ajouté avec succès !";
                        this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                        this.ToastAdafriComponent.toast.show();
                    }
                });
            }
            else {
                args.cancel = true;
            }
        }
    }
    actionBeginAges(args) {
        if (args.requestType === 'save') {
            if (this.ageForm.valid) {
                args.data = this.ageForm;
                this.displayService.enableAge(this.ageForm.controls.ages.value, this.campaign_id, this.ad_group_id, this.ad_group_id_firebase).then(res_remove => {
                    if (res_remove === "ok") {
                        this.ageForm.reset();
                        this.ToastAdafriComponent.toast.title = "Service Campagne";
                        this.ToastAdafriComponent.toast.content = "Âge ajouté avec succès !";
                        this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                        this.ToastAdafriComponent.toast.show();
                    }
                });
            }
            else {
                args.cancel = true;
            }
        }
    }
    actionCompleteAges(args) {
        if (args.requestType === 'add') {
            const dialog = args.dialog;
            dialog.header = 'Ajouter des sites';
        }
        else if (args.requestType === 'delete') {
            var criterion = args['data'][0].id;
            this.displayService.removeAge(criterion, this.campaign_id, this.ad_group_id, this.ad_group_id_firebase).then(res_remove => {
                if (res_remove === "ok") {
                    this.ToastAdafriComponent.toast.title = "Service Campagne";
                    this.ToastAdafriComponent.toast.content = "Genre suprrimé avec succès !";
                    this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                    this.ToastAdafriComponent.toast.show();
                }
            });
        }
    }
    actionBeginGenders(args) {
        if (args.requestType === 'save') {
            if (this.genderForm.valid) {
                args.data = this.genderForm;
                this.displayService.enableGender(this.genderForm.controls.genders.value, this.campaign_id, this.ad_group_id, this.ad_group_id_firebase).then(res_remove => {
                    if (res_remove === "ok") {
                        this.genderForm.reset();
                        this.ToastAdafriComponent.toast.title = "Service Campagne";
                        this.ToastAdafriComponent.toast.content = "Genre ajouté avec succès !";
                        this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                        this.ToastAdafriComponent.toast.show();
                    }
                });
            }
            else {
                args.cancel = true;
            }
        }
    }
    actionCompleteGenders(args) {
        if (args.requestType === 'add') {
            const dialog = args.dialog;
            dialog.header = 'Ajouter des genres';
        }
        else if (args.requestType === 'delete') {
            var criterion = args['data'][0].id;
            this.displayService.removeGender(criterion, this.campaign_id, this.ad_group_id, this.ad_group_id_firebase).then(res_remove => {
                if (res_remove === "ok") {
                    this.ToastAdafriComponent.toast.title = "Service Campagne";
                    this.ToastAdafriComponent.toast.content = "Genre suprrimé avec succès !";
                    this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                    this.ToastAdafriComponent.toast.show();
                }
            });
        }
    }
    actionBeginDevices(args) {
        if (args.requestType === 'save') {
            if (this.deviceForm.valid) {
                this.displayService.enableDevice(this.deviceForm.controls.devices.value, this.campaign_id, this.ad_group_id, this.ad_group_id_firebase).then(res_remove => {
                    if (res_remove === "ok") {
                        this.deviceForm.reset();
                        this.ToastAdafriComponent.toast.title = "Service Campagne";
                        this.ToastAdafriComponent.toast.content = "Appareil ajouté avec succès !";
                        this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                        this.ToastAdafriComponent.toast.show();
                    }
                });
            }
            else {
                args.cancel = true;
            }
        }
    }
    actionCompleteDevices(args) {
        if (args.requestType === 'add') {
            const dialog = args.dialog;
            dialog.header = 'Ajouter des appareils';
        }
        else if (args.requestType === 'delete') {
            var criterion = args['data'][0].id;
            this.displayService.removeDevice(criterion, this.campaign_id, this.ad_group_id, this.ad_group_id_firebase).then(res_remove => {
                if (res_remove === "ok") {
                    this.ToastAdafriComponent.toast.title = "Service Campagne";
                    this.ToastAdafriComponent.toast.content = "Appareil suprrimé avec succès !";
                    this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                    this.ToastAdafriComponent.toast.show();
                }
            });
        }
    }
    actionCompleteCampaign(args) {
        if (args.requestType === 'save') {
            if (this.campaignStarted === true) {
                if (this.endDateForm.valid && this.urlForm.valid) {
                    this.loaderEdit = true;
                    if ((new Date(new Date(this.currentEndDateEnglish).setHours(0, 0, 0, 0)).getTime() === new Date(new Date(this.DatePickerEnd.value).setHours(0, 0, 0, 0)).getTime()) && this.urlForm.controls.url.value === this.currentUrlPromote) {
                        this.loaderEdit = false;
                    }
                    else if ((new Date(new Date(this.currentEndDateEnglish).setHours(0, 0, 0, 0)).getTime() === new Date(new Date(this.DatePickerEnd.value).setHours(0, 0, 0, 0)).getTime()) && this.urlForm.controls.url.value !== this.currentUrlPromote) {
                        this.displayService.updateCampaign(this.idCampaignRef, { urlPromote: this.urlForm.controls.url.value }).then(res_url_update => {
                            if (res_url_update === "ok") {
                                this.loaderEdit = false;
                                this.ToastAdafriComponent.toast.title = "Service Campagne";
                                this.ToastAdafriComponent.toast.content = "Url de promotion de la campagne mis à jour!";
                                this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                this.ToastAdafriComponent.toast.show();
                            }
                        });
                    }
                    else if ((new Date(new Date(this.currentEndDateEnglish).setHours(0, 0, 0, 0)).getTime() !== new Date(new Date(this.DatePickerEnd.value).setHours(0, 0, 0, 0)).getTime()) && this.urlForm.controls.url.value === this.currentUrlPromote) {
                        this.displayService.updateCampaignEndDate(this.idCampaignRef, this.campaign_id, this.numberOfDays, this.endDateEnglish, this.endDateFrench, this.endDateFormattedGoogle, this.DatePickerEnd.value).then(res_update => {
                            if (res_update === "ok") {
                                this.loaderEdit = false;
                                this.ToastAdafriComponent.toast.title = "Service Campagne";
                                this.ToastAdafriComponent.toast.content = "Date de campagne mis à jour!";
                                this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                this.ToastAdafriComponent.toast.show();
                            }
                        });
                    }
                    else {
                        this.displayService.updateCampaignEndDate(this.idCampaignRef, this.campaign_id, this.numberOfDays, this.endDateEnglish, this.endDateFrench, this.endDateFormattedGoogle, this.DatePickerEnd.value).then(res_update => {
                            if (res_update === "ok") {
                                this.displayService.updateCampaign(this.idCampaignRef, { urlPromote: this.urlForm.controls.url.value }).then(res_url_update => {
                                    if (res_url_update === "ok") {
                                        this.loaderEdit = false;
                                        this.ToastAdafriComponent.toast.title = "Service Campagne";
                                        this.ToastAdafriComponent.toast.content = "Date et url de promotion de la campagne mis à jour!";
                                        this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                        this.ToastAdafriComponent.toast.show();
                                    }
                                });
                            }
                        });
                    }
                }
                else {
                    args.cancel = true;
                }
            }
            else {
                if (this.startDateForm.valid && this.endDateForm.valid && this.urlForm.valid) {
                    if ((new Date(new Date(this.currentStartDateEnglish).setHours(0, 0, 0, 0)).getTime() === new Date(new Date(this.DatePickerStart.value).setHours(0, 0, 0, 0)).getTime()) && (new Date(new Date(this.currentEndDateEnglish).setHours(0, 0, 0, 0)).getTime() === new Date(new Date(this.DatePickerEnd.value).setHours(0, 0, 0, 0)).getTime()) && this.urlForm.controls.url.value === this.currentUrlPromote) {
                        this.loaderEdit = false;
                    }
                    else if ((new Date(new Date(this.currentStartDateEnglish).setHours(0, 0, 0, 0)).getTime() === new Date(new Date(this.DatePickerStart.value).setHours(0, 0, 0, 0)).getTime()) && (new Date(new Date(this.currentEndDateEnglish).setHours(0, 0, 0, 0)).getTime() === new Date(new Date(this.DatePickerEnd.value).setHours(0, 0, 0, 0)).getTime()) && this.urlForm.controls.url.value !== this.currentUrlPromote) {
                        this.displayService.updateCampaign(this.idCampaignRef, { urlPromote: this.urlForm.controls.url.value }).then(res_url_update => {
                            if (res_url_update === "ok") {
                                this.loaderEdit = false;
                                this.ToastAdafriComponent.toast.title = "Service Campagne";
                                this.ToastAdafriComponent.toast.content = "Url de promotion de la campagne mis à jour!";
                                this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                this.ToastAdafriComponent.toast.show();
                            }
                        });
                    }
                    else if ((new Date(new Date(this.currentStartDateEnglish).setHours(0, 0, 0, 0)).getTime() !== new Date(new Date(this.DatePickerStart.value).setHours(0, 0, 0, 0)).getTime()) && (new Date(new Date(this.currentEndDateEnglish).setHours(0, 0, 0, 0)).getTime() === new Date(new Date(this.DatePickerEnd.value).setHours(0, 0, 0, 0)).getTime()) && this.urlForm.controls.url.value === this.currentUrlPromote) {
                        this.displayService.updateCampaignStartDate(this.idCampaignRef, this.campaign_id, this.numberOfDays, this.startDateEnglish, this.startDateFrench, this.startDateFormattedGoogle, this.DatePickerStart.value).then(res_update => {
                            if (res_update === "ok") {
                                this.loaderEdit = false;
                                this.ToastAdafriComponent.toast.title = "Service Campagne";
                                this.ToastAdafriComponent.toast.content = "Date de campagne mis à jour!";
                                this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                this.ToastAdafriComponent.toast.show();
                            }
                        });
                    }
                    else if ((new Date(new Date(this.currentStartDateEnglish).setHours(0, 0, 0, 0)).getTime() === new Date(new Date(this.DatePickerStart.value).setHours(0, 0, 0, 0)).getTime()) && (new Date(new Date(this.currentEndDateEnglish).setHours(0, 0, 0, 0)).getTime() !== new Date(new Date(this.DatePickerEnd.value).setHours(0, 0, 0, 0)).getTime()) && this.urlForm.controls.url.value === this.currentUrlPromote) {
                        this.displayService.updateCampaignEndDate(this.idCampaignRef, this.campaign_id, this.numberOfDays, this.endDateEnglish, this.endDateFrench, this.endDateFormattedGoogle, this.DatePickerEnd.value).then(res_update => {
                            if (res_update === "ok") {
                                this.loaderEdit = false;
                                this.ToastAdafriComponent.toast.title = "Service Campagne";
                                this.ToastAdafriComponent.toast.content = "Date de campagne mis à jour!";
                                this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                this.ToastAdafriComponent.toast.show();
                            }
                        });
                    }
                    else {
                        this.displayService.updateCampaignStartDate(this.idCampaignRef, this.campaign_id, this.numberOfDays, this.startDateEnglish, this.startDateFrench, this.startDateFormattedGoogle, this.DatePickerStart.value).then(res_update => {
                            if (res_update === "ok") {
                                this.displayService.updateCampaign(this.idCampaignRef, { urlPromote: this.urlForm.controls.url.value }).then(res_url_update_start => {
                                    if (res_url_update_start === "ok") {
                                        this.displayService.updateCampaignEndDate(this.idCampaignRef, this.campaign_id, this.numberOfDays, this.endDateEnglish, this.endDateFrench, this.endDateFormattedGoogle, this.DatePickerEnd.value).then(res_update_end => {
                                            if (res_update_end === "ok") {
                                                this.loaderEdit = false;
                                                this.ToastAdafriComponent.toast.title = "Service Campagne";
                                                this.ToastAdafriComponent.toast.content = "Dates et url de promotion de la campagne mis à jour!";
                                                this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                                this.ToastAdafriComponent.toast.show();
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            }
        }
        else if (args.requestType === 'beginEdit') {
            setTimeout(() => {
                console.log(this.campaignStarted);
                if (this.campaignStarted === false) {
                    this.DatePickerStart.value = new Date(this.currentStartDateEnglish);
                    this.DatePickerEnd.value = new Date(this.currentEndDateEnglish);
                    this.urlForm.controls.url.patchValue(this.currentUrlPromote);
                }
                else {
                    if (this.campaignEnded === false) {
                        this.DatePickerEnd.value = new Date(this.currentEndDateEnglish);
                        this.urlForm.controls.url.patchValue(this.currentUrlPromote);
                    }
                }
            }, 500);
        }
    }
    ngAfterViewInit() {
        this.route.params.subscribe(param => {
            if (param.type == "Youtube") {
                setTimeout(() => {
                    this.setYoutubeData().then(res_youtube => {
                        if (res_youtube === "ok") {
                            this.loaderEdit = false;
                        }
                    });
                }, 500);
            }
            else if (param.type === "Display") {
                setTimeout(() => {
                    this.setDisplayData().then(res_display => {
                        if (res_display === "ok") {
                            this.loaderEdit = false;
                        }
                    });
                }, 500);
            }
            else if (param.type === "Native") {
                setTimeout(() => {
                    this.setResponsiveDisplay().then(res_responsive_display => {
                        if (res_responsive_display === "ok") {
                            this.loaderEdit = false;
                        }
                    });
                }, 500);
            }
        });
    }
    onTypinglandingPage() {
        if (this.firstFormGroup.get('landingPage').valid) {
            if (document.getElementById('landingPageUrl').classList.contains('e-error')) {
                document.getElementById('landingPageUrl').classList.remove('e-error');
            }
        }
        else {
            if (!document.getElementById('landingPageUrl').classList.contains('e-error')) {
                document.getElementById('landingPageUrl').classList.add('e-error');
            }
        }
    }
    onTypinglandingPageModify() {
        if (this.urlForm.get('url').valid) {
            if (document.getElementById('landingPageUrl').classList.contains('e-error')) {
                document.getElementById('landingPageUrl').classList.remove('e-error');
            }
        }
        else {
            if (!document.getElementById('landingPageUrl').classList.contains('e-error')) {
                document.getElementById('landingPageUrl').classList.add('e-error');
            }
        }
    }
    onTypingNameCampaign() {
        if (this.nameForm.valid) {
            if (document.getElementById('nameCampaign').classList.contains('e-error')) {
                document.getElementById('nameCampaign').classList.remove('e-error');
            }
        }
        else {
            if (!document.getElementById('nameCampaign').classList.contains('e-error')) {
                document.getElementById('nameCampaign').classList.add('e-error');
            }
        }
    }
    selectAllSites() {
        this.multiselectSites.selectAll(true);
    }
    uploadFile(args) {
        this.uploadObj.upload([this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)]], true);
    }
    onFileUpload(args) {
        let li = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
        let iconEle = li.querySelector('#iconUpload');
        iconEle.style.cursor = 'not-allowed';
        iconEle.classList.add('e-uploaded');
        EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
        let progressValue = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue) && li.querySelector('.progressbar')) {
            li.getElementsByTagName('progress')[0].value = progressValue;
        }
    }
    onUploadSuccess(args) {
        let spinnerElement = document.getElementById('dropArea');
        let li = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
        if (li && !isNullOrUndefined(li.querySelector('.progressbar'))) {
            li.querySelector('.progressbar').style.visibility = 'hidden';
        }
        if (args.operation === 'upload') {
            EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
            li.setAttribute('title', args.e.currentTarget.statusText);
            li.querySelector('.file-name').style.color = 'green';
            li.querySelector('.e-icons').onclick = () => {
                this.generateSpinner(this.dropElement.querySelector('#dropArea'));
            };
        }
        else {
            if (!isNullOrUndefined(li)) {
                detach(li);
            }
            if (!isNullOrUndefined(spinnerElement)) {
                hideSpinner(spinnerElement);
                detach(spinnerElement.querySelector('.e-spinner-pane'));
            }
        }
        li.querySelector('#removeIcon').removeAttribute('.e-file-remove-btn');
        li.querySelector('#removeIcon').setAttribute('class', 'e-icons e-file-delete-btn');
    }
    generateSpinner(targetElement) {
        createSpinner({ target: targetElement, width: '25px' });
        showSpinner(targetElement);
    }
    onUploadFailed(args) {
        let li = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
        li.querySelector('.file-name').style.color = 'red';
        li.setAttribute('title', args.e.currentTarget.statusText);
        if (args.operation === 'upload') {
            EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
            li.querySelector('.progressbar').style.visibility = 'hidden';
        }
    }
    actionComplete(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            args.dialog.header = "Modifier la campagne " + args.rowData.name;
        }
        else if ((args.requestType === 'delete')) {
            this.youtubeService.deleteCampaign(args.data[0].id);
        }
        else if ((args.requestType === 'save')) {
            if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.budgetForm.valid) {
                var campaign = args.rowData;
                this.setBid().then(res => {
                    if (res === "ok") {
                        this.youtubeService.updateCampaign(campaign.id, { name: this.firstFormGroup.controls.name.value, urlPromote: this.firstFormGroup.controls.landingPage.value, startDate: this.DateRange.startDate, endDate: this.DateRange.endDate, startDateFrench: this.startDateFrench, endDateFrench: this.endDateFrench, startDateEnglish: this.startDateEnglish, endDateEnglish: this.endDateEnglish, startDateFormattedGoogle: this.startDateFormattedGoogle, endDateFormattedGoogle: this.endDateFormattedGoogle, format: this.format, strategie: this.budgetForm.controls.bidChoose.value, bid: this.bid, dailyBudget: this.valueDailyBudget, budget: this.valueTotalBudget, realBudget: this.valueTotalBudget, ages: this.firstFormGroup.controls.ages.value, genders: this.firstFormGroup.controls.genders.value, devices: this.firstFormGroup.controls.devices.value, placement: this.firstFormGroup.controls.youtubeChannels.value, zones: this.firstFormGroup.controls.countries.value, images: this.IMAGE_LIST }).then(update => {
                            if (update === "ok") {
                                this.ToastAdafriComponent.toast.title = "Service campagne";
                                this.ToastAdafriComponent.toast.content = "Camapagne " + campaign.name + " modifiée avec succès";
                                this.ToastAdafriComponent.toast.position = { X: 'Right', Y: 'Top' };
                                this.ToastAdafriComponent.toast.cssClass = "e-toast-success";
                                this.ToastAdafriComponent.toast.show();
                            }
                        });
                    }
                });
            }
        }
    }
    getDatesBetweenDates(startDate, endDate) {
        return new Promise(resolve => {
            let dates = [];
            //to avoid modifying the original date
            const theDate = new Date(startDate);
            while (theDate < endDate) {
                dates = [...dates, new Date(theDate)];
                theDate.setDate(theDate.getDate() + 1);
            }
            dates = [...dates, endDate];
            resolve(dates);
        });
    }
    getDaysTable(data) {
        return new Promise(resolve => {
            var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var days = [];
            data.forEach(dates => {
                days.push(DAYS[new Date(dates).getDay()]);
            });
            resolve(days);
        });
    }
    getUniqueDays(data) {
        return new Promise(resolve => {
            var uniqueData = [];
            $.each(data, function (i, el) {
                if ($.inArray(el, uniqueData) === -1)
                    uniqueData.push(el);
            });
            resolve(uniqueData);
        });
    }
    setDaysDataFormComponent(uniqueDays) {
        return new Promise(resolve => {
            this.days = this.days.filter(function (entry1) {
                return uniqueDays.some(function (entry2) { return entry1.en === entry2; });
            });
            resolve('ok');
        });
    }
    datePickerEndChange() {
        var debut = new Date(new Date(this.currentStartDateEnglish.replace(/-/g, '/')));
        var fin = new Date(new Date(this.DatePickerEnd.value));
        this.numberOfDays = ((fin.getTime() - debut.getTime()) / (1000 * 3600 * 24)) + 1;
        var end = new Date(this.DatePickerEnd.value);
        this.endDateFrench = [('0' + (end.getDate())).slice(-2), ('0' + (end.getMonth() + 1)).slice(-2), end.getFullYear()].join('/');
        this.endDateFormattedGoogle = [end.getFullYear(), ('0' + (end.getMonth() + 1)).slice(-2), ('0' + (end.getDate())).slice(-2)].join('');
        this.endDateEnglish = [('0' + (end.getMonth() + 1)).slice(-2), ('0' + (end.getDate())).slice(-2), end.getFullYear()].join('-');
        console.log(this.numberOfDays);
        console.log(this.endDateFrench);
        console.log(this.endDateFormattedGoogle);
        console.log(this.endDateEnglish);
    }
    datePickerStartChange() {
        var debut = new Date(new Date(this.DatePickerStart.value));
        var fin = new Date(new Date(this.currentEndDateEnglish.replace(/-/g, '/')));
        this.numberOfDays = ((fin.getTime() - debut.getTime()) / (1000 * 3600 * 24)) + 1;
        /*  var start = new Date(new Date(this.currentEndDateEnglish.replace(/-/g, '/'))); */
        this.startDateFrench = [('0' + (debut.getDate())).slice(-2), ('0' + (debut.getMonth() + 1)).slice(-2), debut.getFullYear()].join('/');
        this.startDateFormattedGoogle = [debut.getFullYear(), ('0' + (debut.getMonth() + 1)).slice(-2), ('0' + (debut.getDate())).slice(-2)].join('');
        this.startDateEnglish = [('0' + (debut.getMonth() + 1)).slice(-2), ('0' + (debut.getDate())).slice(-2), debut.getFullYear()].join('-');
        console.log(this.numberOfDays);
        console.log(this.startDateFrench);
        console.log(this.startDateFormattedGoogle);
        console.log(this.startDateEnglish);
    }
    dateCampaignChange() {
        this.getDatesBetweenDates(this.DateRange.startDate, this.DateRange.endDate).then(dates => {
            this.getDaysTable(dates).then(days => {
                this.getUniqueDays(days).then(uniqueDays => {
                    //console.log(uniqueDays)
                    this.uniqueDaysSchedule = [];
                    this.uniqueDaysSchedule = uniqueDays;
                    this.setDaysDataFormComponent(uniqueDays).then(res => {
                        if (res === "ok") {
                            this.daysData = this.days;
                        }
                    });
                });
            });
            /* //console.log(DAYS[new Date(dates).getDay()])
            days.push(DAYS[new Date(dates).getDay()]) */
        });
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
        this.endDateFrench = [('0' + (end.getMonth() + 1)).slice(-2), ('0' + (end.getDate())).slice(-2), end.getFullYear()].join('-');
        //console.log(this.numberOfDays)
        /*    if (this.today.getTime() === new Date(this.DateRange.startDate).getTime()) {
       
             var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
             var start = new Date(this.DateRange.startDate)
             var days = []
       
            
              this.enableSchedule()
             
             var today = new Date(new Date())
             var hour = today.getHours().toString()
             var minutes = ""
             var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
             //console.log(time)
             this.maxDateSchedule = new Date(this.DateRange.endDate)
             this.getMinDateSchedule(today, minutes, hour).then(res => {
               //console.log((typeof(res)))
               if (res !== undefined) {
                 
                 this.minDateSchedule = res
                 this.DateTimePicker.refresh()
                 this.DateTimePicker.enabled = true
                 this.DateTimePicker.value = null
                 this.endTime.value = null
                 this.endTime.enabled = false
                 this.endTime.refresh()
                  
               }
             })
             
           } else {
             this.minDateSchedule = new Date(this.DateRange.startDate)
             this.maxDateSchedule = new Date(this.DateRange.endDate)
           } */
    }
    tabSelected(e) {
        if (e.isSwiped) {
            e.cancel = true;
        }
    }
    btnClicked(e) {
        switch (e.target.id) {
            case 'goImages':
                if (this.firstFormGroup.valid) {
                    this.tab.enableTab(1, true);
                    this.tab.select(1);
                    setTimeout(() => {
                        this.dropElement = document.getElementsByClassName('control-section')[0];
                        if (Browser.isDevice) {
                            document.getElementById('dropimage').style.padding = '0px 10%';
                        }
                        document.getElementById('browse').onclick = () => {
                            if (this.selectedFormat.length > 0) {
                                document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                                return false;
                            }
                            else {
                                this.ToastAdafriComponent.toast.title = "Avertissement !";
                                this.ToastAdafriComponent.toast.content = "Veuillez choisir un format ";
                                this.ToastAdafriComponent.toast.cssClass = "e-toast-warning";
                                this.ToastAdafriComponent.toast.showCloseButton = true;
                                this.ToastAdafriComponent.toast.timeOut = 5000;
                                this.ToastAdafriComponent.toast.show();
                            }
                        };
                    }, 500);
                }
                else {
                }
                break;
            case 'goBudget':
                if (this.secondFormGroup.valid) {
                    this.getImages().then(res => {
                        if (res === "ok") {
                            if (this.IMAGE_LIST.length > 0) {
                                this.tab.enableTab(2, true);
                                this.tab.select(2);
                            }
                            else {
                            }
                        }
                    });
                }
                break;
            case 'goBackToImage':
                this.tab.enableTab(1, true);
                this.tab.select(1);
                /*  setTimeout(() => {
                   $('#dropArea > ejs-uploader > div').append(this.imageHTML)
                   
                 },500) */
                this.tab.enableTab(2, false);
                break;
            case 'goBackToGeneral':
                this.tab.enableTab(0, true);
                this.tab.select(0);
                this.tab.enableTab(1, false);
                break;
            case 'goToDone':
                if (this.budgetForm.valid) {
                    this.tab.enableTab(3, true);
                    this.tab.select(3);
                }
                break;
            case 'goBackToBudget':
                /* Change the preferred train chosen already */
                this.buttonSubmitCampaign = true;
                this.goBackToBudgetButton = true;
                this.buttonListCampaign = false;
                this.buttonCreateCampaign = false;
                this.tab.enableTab(2, true);
                this.tab.select(2);
                this.tab.enableTab(3, false);
                break;
            case 'goBackToDetails':
                /* Update passenger detail before confirming the payment */
                this.tab.enableTab(2, true);
                this.tab.select(2);
                this.tab.enableTab(3, false);
                break;
        }
    }
    getImages() {
        return new Promise(resolve => {
            var image_list = document.getElementById('dropArea').getElementsByTagName('ejs-uploader')[0].getElementsByClassName("e-upload")[0].getElementsByTagName('ul')[0].getElementsByTagName("li");
            for (var i = 0; i < image_list.length; i++) {
                this.IMAGE_LIST.push({ "data": image_list[i].getElementsByClassName('wrapper')[0].getElementsByTagName('img')[0].src });
            }
            resolve('ok');
        });
    }
    select(args, injectedData) {
        if (args.item.text === 'Publier') {
            this.publishCampaignComponent.email = this.email;
            this.publishCampaignComponent.uid = this.uid;
            this.publishCampaignComponent.injectedData = injectedData;
            this.publishCampaignComponent.onOpenDialog();
        }
    }
    onSelect(args) {
        if (!this.dropElement.querySelector('li')) {
            this.filesDetails = [];
        }
        if (isNullOrUndefined(document.getElementById('dropArea').querySelector('.e-upload-files'))) {
            this.parentElement = createElement('ul', { className: 'e-upload-files text-center' });
            document.getElementsByClassName('e-upload')[0].appendChild(this.parentElement);
        }
        //console.log(args)
        //console.log(this.filesDetails)
        let validFiles = this.validateFiles(args, this.filesDetails);
        if (validFiles.length === 0) {
            args.cancel = true;
            return;
        }
        for (let i = 0; i < validFiles.length; i++) {
            this.formSelectedData(validFiles[i], this);
        }
        this.filesDetails = this.filesDetails.concat(validFiles);
        args.cancel = true;
        //console.log(validFiles)
    }
    validateFiles(args, viewedFiles) {
        let modifiedFiles = [];
        let validFiles = [];
        let isModified = false;
        if (args.event.type === 'drop') {
            isModified = true;
            let allImages = ['png', 'jpg', 'jpeg'];
            let files = args.filesData;
            for (let file of files) {
                if (allImages.indexOf(file.type) !== -1) {
                    modifiedFiles.push(file);
                }
            }
        }
        let files = modifiedFiles.length > 0 || isModified ? modifiedFiles : args.filesData;
        if (this.filesName.length > 0) {
            for (let file of files) {
                if (this.filesName.indexOf(file.name) === -1) {
                    this.filesName.push(file.name);
                    validFiles.push(file);
                }
            }
        }
        else {
            for (let file of files) {
                this.filesName.push(file.name);
                validFiles.push(file);
            }
        }
        return validFiles;
    }
    formSelectedData(file, proxy) {
        let liEle = createElement('li', { className: 'e-upload-file-list', attrs: { 'data-file-name': file.name } });
        let imageTag = createElement('IMG', { className: 'upload-image', attrs: { 'alt': 'Image' } });
        let wrapper = createElement('span', { className: 'wrapper' });
        wrapper.appendChild(imageTag);
        liEle.appendChild(wrapper);
        liEle.appendChild(createElement('div', { className: 'name file-name', innerHTML: file.name, attrs: { 'title': file.name } }));
        liEle.appendChild(createElement('div', { className: 'file-size', innerHTML: proxy.uploadObj.bytesToSize(file.size) }));
        let clearbtn;
        let uploadbtn;
        clearbtn = createElement('span', { id: 'removeIcon', className: 'e-icons e-file-remove-btn', attrs: { 'title': 'Supprimer' } });
        EventHandler.add(clearbtn, 'click', this.removeFiles, proxy);
        /* liEle.setAttribute('title', 'Ready to Upload'); */
        /*  uploadbtn = createElement('span', {className: 'e-upload-icon e-icons e-file-remove-btn', attrs: {'title': 'Upload'}});
         uploadbtn.setAttribute('id', 'iconUpload'); EventHandler.add(uploadbtn, 'click', this.uploadFile, proxy); */
        let progressbarContainer;
        progressbarContainer = createElement('progress', { className: 'progressbar', id: 'progressBar', attrs: { value: '0', max: '100' } });
        liEle.appendChild(clearbtn);
        /*liEle.appendChild(uploadbtn); */
        liEle.appendChild(progressbarContainer);
        this.readURL(liEle, file).then(res => {
            if (res === "ok") {
                document.querySelector('.e-upload-files').appendChild(liEle);
                proxy.filesList.push(liEle);
                setTimeout(() => {
                    var len = document.getElementsByClassName('e-upload-file-list').length;
                    for (var i = 0; i < len; i++) {
                        /*  //console.log('width: ' + document.getElementsByClassName('e-upload-file-list').item(i).getElementsByTagName('img')[0].naturalWidth)
                          //console.log('height: '+ document.getElementsByClassName('e-upload-file-list').item(i).getElementsByTagName('img')[0].naturalHeight) */
                    }
                }, 1000);
            }
            else {
                this.ToastAdafriComponent.toast.title = "Avertissement !";
                this.ToastAdafriComponent.toast.content = "Image " + file.name + " invalide";
                this.ToastAdafriComponent.toast.cssClass = "e-toast-error";
                this.ToastAdafriComponent.toast.timeOut = 5000;
                this.ToastAdafriComponent.toast.showCloseButton = true;
                this.ToastAdafriComponent.toast.show();
            }
        });
    }
    readURL(li, args) {
        return new Promise(resolved => {
            let preview = li.querySelector('.upload-image');
            let file = args.rawFile;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                const img = new Image();
                img.src = reader.result;
                var self = this;
                img.onload = () => {
                    const height = img.naturalHeight;
                    const width = img.naturalWidth;
                    this.selectedFormat.some((selected) => {
                        if (selected.width === width && selected.heigth === height) {
                            preview.src = img.src;
                            resolved('ok');
                        }
                        else {
                            resolved('error');
                        }
                    });
                };
                if (file) {
                    reader.readAsDataURL(file);
                }
            }, false);
        });
    }
    onFileRemove(args) {
        args.postRawFile = false;
    }
    setBid() {
        return new Promise(resolve => {
            if (this.bidType === "CPM") {
                this.bid = this.budgetForm.controls.cpm.value;
                resolve("ok");
            }
            else {
                this.bid = this.budgetForm.controls.cpm.value;
                resolve("ok");
            }
        });
    }
    removeFiles(args) {
        let removeFile = this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)];
        let statusCode = removeFile.statusCode;
        if (statusCode === '2' || statusCode === '1') {
            this.uploadObj.remove(removeFile, true);
            this.uploadObj.element.value = '';
        }
    }
    selectAllCountries() {
        this.multiselectCountries.selectAll(true);
    }
    selectAllYoutubeChannels() {
        this.multiselectYoutubeChannels.selectAll(true);
    }
    selectAllGenders() {
        this.multiselectGenders.selectAll(true);
    }
    selectAllAges() {
        this.multiselectAges.selectAll(true);
    }
    selectAllDevices() {
        this.multiselectDevices.selectAll(true);
    }
    focusIn(target) {
        target.parentElement.classList.add('e-input-focus');
    }
    focusOut(target) {
        target.parentElement.classList.remove('e-input-focus');
    }
    multiselectFormatChange(event) {
        /* //console.log(event)
        
        //console.log(this.multiselectAdFormat.value) */
        this.selectedFormat = [];
        this.format = event.value;
        for (var i = 0; i < this.multiselectAdFormat.value.length; i++) {
            var format = this.multiselectAdFormat.value[i].toString().split(" ");
            var width = format[0];
            var height = format[1];
            this.selectedFormat.push({
                "width": parseInt(width),
                "heigth": parseInt(height)
            });
            //console.log(this.selectedFormat)
        }
        /* if (this.selectedFormat.length > 0) {
          this.enableSchedule()
        } */
    }
    bidsChange(value) {
        this.disableBudget = false;
        this.budgetForm.get('budget').enable();
        this.budgetForm.controls.budget.updateValueAndValidity();
        if (value === 'CPM') {
            this.budgetForm.controls.cpm.setValue(this.cpmValue);
            this.budgetForm.controls.cpm.setValidators([Validators.required, Validators.min(this.minBidsValue)]);
            this.budgetForm.controls.cpm.updateValueAndValidity();
            this.budgetForm.controls.cpc.setValidators([Validators.nullValidator]);
            this.budgetForm.controls.cpc.updateValueAndValidity();
            this.bidType = 'CPM';
        }
        else if (value === 'CPC') {
            this.budgetForm.controls.cpc.setValue(this.cpcValue);
            this.budgetForm.controls.cpc.setValidators([Validators.required, Validators.min(this.minBidsValue)]);
            this.budgetForm.controls.cpc.updateValueAndValidity();
            this.budgetForm.controls.cpm.setValidators([Validators.nullValidator]);
            this.budgetForm.controls.cpm.updateValueAndValidity();
            this.bidType = 'CPC';
        }
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
    cpmChange(value) {
        if (this.budgetForm.controls.cpm.valid) {
            this.cpmValue = value;
            this.defaultBidConvert = this.cpmValue * this.euroCurrency;
            this.valueCurrencyCpm = this.cpmValue * this.euroCurrency;
            this.setInputControlState(this.budgetForm, 'cpm', 'cpmCampaign');
        }
        else {
            this.setInputControlState(this.budgetForm, 'cpm', 'cpmCampaign');
        }
        /*     this.defaultBid = value / 655
            this.defaultBidConvert = value
            //console.log(Number((this.defaultBid).toFixed(2))) */
    }
    cpcChange(value) {
        if (this.budgetForm.controls.cpc.valid) {
            this.cpcValue = value;
            this.defaultBidConvert = this.cpcValue * this.euroCurrency;
            this.valueCurrencyCpc = this.cpcValue * this.euroCurrency;
            this.setInputControlState(this.budgetForm, 'cpc', 'cpcCampaign');
        }
        else {
            this.setInputControlState(this.budgetForm, 'cpc', 'cpcCampaign');
        }
        /*  this.defaultBid = value / 655
         this.defaultBidConvert = value
         //console.log(Number((this.defaultBid).toFixed(2))) */
    }
    budgetChange(value) {
        this.valueDailyBudget = value;
        this.valueTotalBudget = value * this.numberOfDays;
        if (this.bidType === "CPM") {
            if (this.budgetForm.get('budget').valid) {
                this.numberImpressionsTotal = (this.valueTotalBudget * this.euroCurrency * 1000) / this.cpmValue;
                this.numberImpressionsDaily = (this.valueDailyBudget * this.euroCurrency * 1000) / this.cpmValue;
                this.ToastAdafriComponent.toast.title = "Impressions";
                this.ToastAdafriComponent.toast.content = "Nombre d'impressions par jours: " + (parseInt(this.numberImpressionsDaily.toString())).toString() + "<br> Nombre d'impressions total: " + (parseInt(this.numberImpressionsTotal.toString())).toString();
                this.ToastAdafriComponent.playSong = "ok";
                this.ToastAdafriComponent.toast.timeOut = 10000;
                this.ToastAdafriComponent.toast.showCloseButton = true;
                this.ToastAdafriComponent.toast.cssClass = "e-toast-info";
                this.ToastAdafriComponent.toast.position = { X: 'Right', Y: 'Top' };
                this.ToastAdafriComponent.toast.show();
                this.setInputControlState(this.budgetForm, 'budget', 'budgetCampaign');
            }
            else {
                this.setInputControlState(this.budgetForm, 'budget', 'budgetCampaign');
            }
        }
        else if (this.bidType === "CPC") {
            if (this.budgetForm.get('budget').valid) {
                this.setInputControlState(this.budgetForm, 'budget', 'budgetCampaign');
                this.numberImpressionsTotal = (this.valueTotalBudget * this.euroCurrency * 1000) / this.cpcValue;
                this.numberImpressionsDaily = (this.valueDailyBudget * this.euroCurrency * 1000) / this.cpcValue;
                this.ToastAdafriComponent.toast.title = "Impressions";
                this.ToastAdafriComponent.toast.content = "Nombre d'impressions par jours: " + this.numberImpressionsDaily + "<br> Nombre d'impressions total: " + this.numberImpressionsTotal;
                this.ToastAdafriComponent.playSong = "ok";
                this.ToastAdafriComponent.toast.timeOut = 10000;
                this.ToastAdafriComponent.toast.showCloseButton = true;
                this.ToastAdafriComponent.toast.cssClass = "e-toast-info";
                this.ToastAdafriComponent.toast.position = { X: 'Right', Y: 'Top' };
                this.ToastAdafriComponent.toast.show();
            }
            else {
                this.setInputControlState(this.budgetForm, 'budget', 'budgetCampaign');
            }
        }
        /*  this.defaultBid = value / 655
         this.defaultBidConvert = value
         //console.log(Number((this.defaultBid).toFixed(2))) */
    }
};
tslib_1.__decorate([
    ViewChild('dateCampaignPicker', { static: false })
], EditCampaignComponent.prototype, "DateRange", void 0);
tslib_1.__decorate([
    ViewChild('dateTimePicher', { static: false })
], EditCampaignComponent.prototype, "DateTimePicker", void 0);
tslib_1.__decorate([
    ViewChild('dateStartPicker', { static: false })
], EditCampaignComponent.prototype, "DatePickerStart", void 0);
tslib_1.__decorate([
    ViewChild('dateEndPicker', { static: false })
], EditCampaignComponent.prototype, "DatePickerEnd", void 0);
tslib_1.__decorate([
    ViewChild('stepper', { static: false })
], EditCampaignComponent.prototype, "stepper", void 0);
tslib_1.__decorate([
    ViewChild('gridSites', { static: false })
], EditCampaignComponent.prototype, "gridSites", void 0);
tslib_1.__decorate([
    ViewChild('multiselectCountries', { static: false })
], EditCampaignComponent.prototype, "multiselectCountries", void 0);
tslib_1.__decorate([
    ViewChild('multiselectYoutubeChannels', { static: false })
], EditCampaignComponent.prototype, "multiselectYoutubeChannels", void 0);
tslib_1.__decorate([
    ViewChild('multiselectAges', { static: false })
], EditCampaignComponent.prototype, "multiselectAges", void 0);
tslib_1.__decorate([
    ViewChild('multiselectGenders', { static: false })
], EditCampaignComponent.prototype, "multiselectGenders", void 0);
tslib_1.__decorate([
    ViewChild('multiselectDevices', { static: false })
], EditCampaignComponent.prototype, "multiselectDevices", void 0);
tslib_1.__decorate([
    ViewChild('multiselectAdFormat', { static: false })
], EditCampaignComponent.prototype, "multiselectAdFormat", void 0);
tslib_1.__decorate([
    ViewChild('multiselectSites', { static: false })
], EditCampaignComponent.prototype, "multiselectSites", void 0);
tslib_1.__decorate([
    ViewChild('startHourPicker ', { static: false })
], EditCampaignComponent.prototype, "startHourPicker", void 0);
tslib_1.__decorate([
    ViewChild('endHourPicker ', { static: false })
], EditCampaignComponent.prototype, "endHourPicker", void 0);
tslib_1.__decorate([
    ViewChild('bidsChooserComponent ', { static: false })
], EditCampaignComponent.prototype, "bidsChooserComponent", void 0);
tslib_1.__decorate([
    ViewChild(TabComponent, { static: false })
], EditCampaignComponent.prototype, "tab", void 0);
tslib_1.__decorate([
    ViewChild('previewupload', { static: false })
], EditCampaignComponent.prototype, "uploadObj", void 0);
tslib_1.__decorate([
    ViewChild('toast', { static: false })
], EditCampaignComponent.prototype, "ToastAdafriComponent", void 0);
tslib_1.__decorate([
    ViewChild('progressButton', { static: false })
], EditCampaignComponent.prototype, "progressButton", void 0);
tslib_1.__decorate([
    ViewChild(PublishCampaignComponent, { static: false })
], EditCampaignComponent.prototype, "publishCampaignComponent", void 0);
tslib_1.__decorate([
    ViewChild(SpinnerComponent, { static: false })
], EditCampaignComponent.prototype, "spinner", void 0);
tslib_1.__decorate([
    ViewChild(ChipListComponent, { static: false })
], EditCampaignComponent.prototype, "chip", void 0);
tslib_1.__decorate([
    ViewChild('formElement', { static: false })
], EditCampaignComponent.prototype, "element", void 0);
tslib_1.__decorate([
    ViewChild('inplaceEditor', { static: false })
], EditCampaignComponent.prototype, "ejDate", void 0);
EditCampaignComponent = tslib_1.__decorate([
    Component({
        selector: 'app-edit-campaign',
        templateUrl: './edit-campaign.component.html',
        styleUrls: ['./edit-campaign.component.scss']
    })
], EditCampaignComponent);
export { EditCampaignComponent };
//# sourceMappingURL=edit-campaign.component.js.map