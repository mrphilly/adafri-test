import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators } from "@angular/forms";
import { countries, genders, sites, ages, devices, imageSizes, days, HourSchedule, bids, adFormat } from "../../shared-modules/data";
import { detach, Browser, createElement, isNullOrUndefined, EventHandler } from "@syncfusion/ej2-base";
import { createSpinner, showSpinner, hideSpinner, Tooltip } from '@syncfusion/ej2-popups';
import { loadCldr } from '@syncfusion/ej2-base';
import { TimePicker } from '@syncfusion/ej2-angular-calendars';
import * as $ from 'jquery';
import { FormValidators, urlValidator } from '../../shared-modules/form-validators';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
loadCldr(require('cldr-data/supplemental/numberingSystems.json'), require('cldr-data/main/fr/ca-gregorian.json'), require('cldr-data/main/fr/numbers.json'), require('cldr-data/main/fr/timeZoneNames.json'), require('cldr-data/supplemental/weekdata.json')); // To load the culture based first day of week
class Config {
    constructor() {
        this.presets = [];
    }
    addPresets(presetOrArray) {
        // Concat will concat either Array or instance
        this.presets = this.presets.concat(presetOrArray);
    }
    getPresets() {
        return this.presets;
    }
}
let CreateDisplayCampaignComponent = class CreateDisplayCampaignComponent {
    constructor(_formBuilder, afs, displayService, auth, translate) {
        this._formBuilder = _formBuilder;
        this.afs = afs;
        this.displayService = displayService;
        this.auth = auth;
        this.translate = translate;
        this.isLinear = true;
        this.countries = countries();
        this.sites = sites();
        this.genders = genders();
        this.ages = ages();
        this.devices = devices();
        this.imageSizes = imageSizes();
        this.days = days();
        this.startHourSchedule = HourSchedule();
        this.endHourSchedule = HourSchedule();
        this.tableSchedule = [];
        this.showGridSchedule = false;
        this.showButtondelete = false;
        this.uniqueDaysSchedule = [];
        this.selectedDayForAdSchedule = [];
        this.startHoursChoose = "";
        this.endHoursChoose = "";
        this.startMinutesChoose = "";
        this.endMinutesChoose = "";
        this.selectedFormat = [];
        this.IMAGE_LIST = [];
        this.endTime = new TimePicker({
            enabled: false
        });
        this.today = new Date(new Date().toDateString());
        this.currentYear = this.today.getFullYear();
        this.currentMonth = this.today.getMonth();
        this.currentDay = this.today.getDate();
        this.minDateCampaign = new Date(this.currentYear, this.currentMonth, this.currentDay);
        this.startDateFrench = "";
        this.startDateFormattedGoogle = "";
        this.endDateFrench = "";
        this.endDateFormattedGoogle = "";
        this.startDateEnglish = "";
        this.endDateEnglish = "";
        this.headerText = [];
        this.daysFields = { text: 'name', value: 'name' };
        this.countryData = countries();
        this.gendersData = genders();
        this.devicesData = devices();
        this.agesData = ages();
        this.dataBids = bids();
        this.adFormat = adFormat();
        this.fieldsBids = { text: 'name', value: 'id' };
        this.fieldsAdFormat = { text: 'name', value: 'dimensions' };
        this.sitesData = sites();
        this.fieldsCountry = { text: 'name', value: 'id' };
        this.fieldsSites = { text: 'name', value: 'id', groupBy: 'countrie' };
        this.fieldsAges = { text: 'name', value: 'id' };
        this.fieldsGenders = { text: 'name', value: 'id' };
        this.fieldsDevices = { text: 'name', value: 'id' };
        // set the placeholder to the MultiSelect input
        this.placeholderCountry = 'Sélectionner vos pays';
        this.placeholderSites = 'Sélectionnez vos sites ';
        this.placeholderAges = 'Sélectionnez vos âges ';
        this.placeholderGenders = 'Sélectionnez vos genres';
        this.placeholderDevices = 'Sélectionnez vos appareils ';
        this.submitClicked = false;
        this.enableGroupCheckBox = true;
        this.endHourScheduleEnabled = false;
        // set mode value to the multiselect input
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
        this.spinSettings = { position: 'Right', width: 20, template: '<div class="template"></div>' };
        this.format = [];
        this.rules = { TodayCustom: { required: true } };
        this.uid = "";
        this.generalLabel = "";
        this.imageLabel = "";
        this.budgetLabel = "";
        this.doneLabel = "";
        // *****************************
        this.path = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
        this.allowExtensions = '.png, .jpg, .jpeg';
        this.filesName = [];
        this.filesDetails = [];
        this.filesList = [];
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
    getTranslatedItems() {
        return new Promise(resolve => {
            this.translate.get(['generalLabel', 'imageLabel', 'budgetLabel', 'doneLabel']).subscribe(translated => {
                console.log(translated);
                this.generalLabel = translated['generalLabel'];
                this.imageLabel = translated['imageLabel'];
                this.budgetLabel = translated['budgetLabel'];
                this.doneLabel = translated['doneLabel'];
            });
            resolve('ok');
        });
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            this.budgetForm = this._formBuilder.group({
                budget: ["", [Validators.required, Validators.min(10)]],
                bidChoose: [[], Validators.required],
                cpm: ["", Validators.nullValidator],
                cpc: ["", Validators.nullValidator]
            });
            yield this.getTranslatedItems().then(translate_response => {
                if (translate_response === "ok") {
                    console.log(this.generalLabel);
                    this.headerText = [
                        { 'text': '1. ' + this.generalLabel },
                        { 'text': '2. ' + this.imageLabel },
                        { 'text': '3. ' + this.budgetLabel },
                        { 'text': '4. ' + this.doneLabel }
                    ];
                    this.valueCurrencyCpm = this.cpmValue;
                    this.valueCurrencyCpc = this.cpcValue;
                    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
                    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
                    this.getUserCredentials().then(res => {
                        if (res === "ok") {
                            /* this.displayService.getListCampaign(this.uid).subscribe(data => {
                              this.data = data
                              this.toolbarOptions = ['Search'];
                           }) */
                        }
                    });
                }
            });
        });
    }
    getUserCredentials() {
        return new Promise(resolve => {
            this.auth.user.forEach(child => {
                //console.log(child)
                this.uid = child.uid;
                resolve('ok');
            });
        });
    }
    selectAllCountries() {
        this.multiselectCountries.selectAll(true);
    }
    selectAllSites() {
        this.multiselectSites.selectAll(true);
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
    /*  bidClick(e: ClickEventArgs) {
       this.firstFormGroup.value['bidChoose']=e.text
       if (e.text) {
         if (e.text === 'CPM (Recommandé)') {
           this.bidType = 'CPM'
           this.defaultBid = 0.06
           this.defaultBidConvert = this.defaultBid*this.euroCurrency
         } else if(e.text === 'CPC') {
           this.bidType = 'CPC'
           this.defaultBid = 0.06
           this.defaultBidConvert = this.defaultBid*this.euroCurrency
         }
        //console.log(e.text);
     
      }
     } */
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
    enableSchedule() {
        /*  if (this.uploadObj.element.classList.contains('disablegrid')) {
             this.uploadObj.element.classList.remove('disablegrid');
             document.getElementById('GridParent').classList.remove('wrapper');
         } else {
             this.gridSchedule.element.classList.add('disablegrid');
             document.getElementById('GridParent').classList.add('wrapper');
         } */
    }
    /*   load(args){
         this.gridSchedule.element.addEventListener('mousedown', (e: MouseEventArgs) => {
         if ((e.target as HTMLElement).classList.contains("e-rowcell")) {
         if (this.gridSchedule.isEdit)
             this.gridSchedule.endEdit();
             let index: number = parseInt((e.target as HTMLElement).getAttribute("Index"));
             this.gridSchedule.selectRow(index);
             this.gridSchedule.startEdit();
         };
         });
     } */
    /*  actionComplete(args) {
          if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
              const dialog = args.dialog;
              const CustomerID = 'dayFR';
              // change the header of the dialog
              dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData[CustomerID] : 'New Customer';
          }
      } */
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
            this.defaultBidConvert = this.cpmValue;
            this.valueCurrencyCpm = this.cpmValue;
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
            this.defaultBidConvert = this.cpcValue;
            this.valueCurrencyCpc = this.cpcValue;
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
                this.numberImpressionsTotal = (this.valueTotalBudget * 1000) / this.cpmValue;
                this.numberImpressionsDaily = (this.valueDailyBudget * 1000) / this.cpmValue;
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
                this.numberImpressionsTotal = (this.valueTotalBudget * 1000) / this.cpcValue;
                this.numberImpressionsDaily = (this.valueDailyBudget * 1000) / this.cpcValue;
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
    createFormGroup() {
        /*     this.jourDropdown.dataSource = days() */
        return this._formBuilder.group({
            Jour: ["", Validators.required],
            HeureDebut: ["", Validators.required],
            HeureFin: ["", Validators.required],
        });
    }
    actionBegin(args) {
        //console.log(args)
        if (args.requestType === 'add') {
            this.addScheduleForm = this.createFormGroup();
        }
        else if (args.requestType === 'beginEdit') {
            this.addScheduleForm = this.createFormGroup();
            for (const cols of this.gridSchedule.columns) {
                if (cols.field === 'Jour') {
                    cols.visible = false;
                }
            }
            setTimeout(() => {
                this.currentDayEdit = args.rowData['Jour'];
            }, 1000);
        }
        else if (args.requestType === 'save') {
            if (this.addScheduleForm.valid) {
                args.data = this.addScheduleForm.value;
                setTimeout(() => {
                    if (this.currentDayEdit === "") {
                        this.gridSchedule.getRowsObject().forEach(data => {
                            this.updateDaysDataFormComponent(this.addScheduleForm.value['Jour']).then(res => {
                                if (res === "ok") {
                                }
                            });
                        });
                    }
                    else {
                        if (this.addScheduleForm.value['Jour']) {
                        }
                    }
                }, 1000);
            }
            else {
                args.cancel = true;
            }
        }
    }
    multiselectDaysScheduleChange(event) {
        //console.log(event.value)
        this.selectedDayForAdSchedule = event.value;
    }
    startHourChange(event) {
        /*    //console.log(event.value.getHours())
           //console.log(event.value.getMinutes()) */
        this.startHoursChoose = event.value.getHours().toString();
        this.startMinutesChoose = event.value.getMinutes().toString();
        /*  //console.log(this.startHoursChoose + ":" + this.startMinutesChoose) */
        this.endHourScheduleEnabled = true;
        /* var date = new Date(event.value).getDate().toString()
        var month = new Date(event.value).getMonth().toString()
        var year = new Date(event.value).getFullYear().toString() */
        var today = new Date(new Date(event.value));
        var hour = today.getHours().toString();
        var minutes = "";
        this.getMinDateSchedule(today, minutes, hour).then(res => {
            //console.log()
            res.setMinutes(res.getMinutes() + 15);
            this.minValueEndHour = new Date(res);
        });
    }
    endHourChange(event) {
        /*  //console.log(event.value.getHours())
         //console.log(event.value.getMinutes()) */
        this.endHoursChoose = event.value.getHours().toString();
        this.endMinutesChoose = event.value.getMinutes().toString();
        /* //console.log(this.endHoursChoose + ":" + this.endMinutesChoose) */
    }
    actionComplete(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            if (Browser.isDevice) {
                args.dialog.height = window.innerHeight - 90 + 'px';
                args.dialog.dataBind();
            }
            // Set initail Focus
            if (args.requestType === 'beginEdit') {
                /*  (args.form.elements.namedItem('Jour') as HTMLInputElement).focus(); */
            }
            else if (args.requestType === 'add') {
                const dialog = args.dialog;
                dialog.enableResize = true;
                const CustomerID = 'dayFR';
                // change the header of the dialog
                dialog.header = 'Heures de diffusions';
                dialog.allowDragging = false;
            }
        }
    }
    getFirstForm() {
        if (this.firstFormGroup.valid) {
        }
        //console.log(this.firstFormGroup.value['name'])
        //console.log(this.firstFormGroup.value['daterange'])
        //console.log(this.firstFormGroup.value['countries'])
        //console.log(this.firstFormGroup.value['sites'])
        //console.log(this.firstFormGroup.value['genders'])
        //console.log(this.firstFormGroup.value['ages'])
        //console.log(this.firstFormGroup.value['devices'])
        //console.log(new Date(this.firstFormGroup.value['daterange'][0]))
        //console.log(new Date(this.firstFormGroup.value['daterange'][1]))
        //console.log(this.firstFormGroup.value['datetimepicker'])
        //console.log(this.firstFormGroup.value['endSchedule'])
        this.stepper.next();
    }
    getSecondForm() {
        //console.log(this.secondFormGroup.value['secondCtrl'])
    }
    getMinDateSchedule(today, minutes, hour) {
        return new Promise(resolve => {
            var ampm = today.getHours() >= 12 ? 'PM' : 'AM';
            //console.log(ampm)
            if (ampm === 'PM') {
                if (today.getHours() < 10) {
                    hour = "0" + today.getHours().toString();
                    if (today.getMinutes() > 0 && today.getMinutes() <= 15) {
                        minutes = "15";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                    else if (today.getMinutes() > 15 && today.getMinutes() <= 30) {
                        minutes = "30";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                    else if (today.getMinutes() > 30 && today.getMinutes() <= 45) {
                        minutes = "45";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                    else {
                        minutes = "15";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + (parseInt(hour) + 1).toString() + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                }
                else {
                    hour = today.getHours().toString();
                    if (today.getMinutes() > 0 && today.getMinutes() <= 15) {
                        minutes = "15";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                    else if (today.getMinutes() > 15 && today.getMinutes() <= 30) {
                        minutes = "30";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        //console.log(today.getMonth() +1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ")
                        resolve(this.minDateScheduleFormatted);
                    }
                    else if (today.getMinutes() > 30 && today.getMinutes() <= 45) {
                        minutes = "45";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                    else {
                        minutes = "15";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + (parseInt(hour) + 1).toString() + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                }
            }
            else {
                if (today.getHours() < 10) {
                    hour = "0" + today.getHours().toString();
                    if (today.getMinutes() > 0 && today.getMinutes() <= 15) {
                        minutes = "15";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                    else if (today.getMinutes() > 15 && today.getMinutes() <= 30) {
                        minutes = "30";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                    else if (today.getMinutes() > 30 && today.getMinutes() <= 45) {
                        minutes = "45";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                    else {
                        minutes = "15";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + (parseInt(hour) + 1).toString() + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                }
                else {
                    hour = today.getHours().toString();
                    if (today.getMinutes() > 0 && today.getMinutes() <= 15) {
                        minutes = "15";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                    else if (today.getMinutes() > 15 && today.getMinutes() <= 30) {
                        minutes = "30";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        //console.log(today.getMonth() +1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ")
                        resolve(this.minDateScheduleFormatted);
                    }
                    else if (today.getMinutes() > 30 && today.getMinutes() <= 45) {
                        minutes = "45";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + hour + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                    else {
                        minutes = "15";
                        //console.log(hour + ":" + minutes)
                        this.minDateScheduleFormatted = new Date(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear() + " " + (parseInt(hour) + 1).toString() + ":" + minutes + " ");
                        resolve(this.minDateScheduleFormatted);
                    }
                }
            }
        });
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
    updateDaysDataFormComponent(days) {
        return new Promise(resolve => {
            for (var i = 0; i < days.length; i++) {
                for (var j = 0; j < this.daysData.length; j++) {
                    if (days[i] === this.daysData[j]['name']) {
                        this.daysData.splice(j, 1);
                    }
                }
            }
            /*   this.daysData = this.daysData.filter(function(entry1) {
              return days.some(function(entry2) { return entry1 === entry2; });
              }); */
            resolve('ok');
        });
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
        this.endDateEnglish = [('0' + (end.getMonth() + 1)).slice(-2), ('0' + (end.getDate())).slice(-2), end.getFullYear()].join('-');
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
    checkboxChange(event) {
        //console.log(event)
    }
    dateTimePickerChange() {
        let endInput = document.getElementById('end');
        let value;
        this.endTime.enabled = true;
        this.endTime.value = null;
        endInput.value = '';
        value = new Date(this.minDateSchedule);
        value.setMinutes(value.getMinutes() + this.endTime.step);
        this.endTime.min = value;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            let tooltipLandingPage = new Tooltip({
                content: "Copiez collez l'URL de destination que vous souhaitez promouvoir",
                position: 'RightBottom'
            });
            tooltipLandingPage.appendTo('#tooltipLandingPage');
        }, 1000);
        this.budgetForm.controls.budget.disable();
    }
    setChipId() {
        document.getElementById('bidChooser').getElementsByClassName('e-chip')[0].setAttribute("id", "cpm");
        return new Promise(resolve => {
            document.getElementById('bidChooser').getElementsByClassName('e-chip')[1].setAttribute("id", "cpc");
            resolve('ok');
        });
    }
    get selectedSchedules() {
        return this.gridSchedule.getSelectedRows();
    }
    onEndScheduleChange() {
        /*    //console.log(this.endTime.value) */
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
    onTypingNameCampaign() {
        if (this.firstFormGroup.get('name').valid) {
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
    addSingleSchedule() {
        //console.log(this.DateTimePicker.value)
        //console.log(this.endTime.value)
        const tomorrow = new Date(this.DateTimePicker.value);
        tomorrow.setDate(tomorrow.getDate() + 1);
        var table = [];
        //console.log(tomorrow)
        /*  this.DateTimePicker.min = new Date(tomorrow.setHours(0,0,0,0)) */
        var options = { weekday: 'long' };
        //console.log(new Intl.DateTimeFormat('en-US', options).format(this.DateTimePicker.value));
        table.push({
            "dayFR": new Intl.DateTimeFormat('fr-FR', options).format(this.DateTimePicker.value),
            "dayEN": new Intl.DateTimeFormat('en-US', options).format(this.DateTimePicker.value).toUpperCase(),
            "startHourText": new Date(this.DateTimePicker.value).getHours() + " : " + new Date(this.DateTimePicker.value).getMinutes(),
            "endHourText": new Date(this.endTime.value).getHours() + " : " + new Date(this.endTime.value).getMinutes(),
            "startHours": new Date(this.DateTimePicker.value).getHours().toString(),
            "startMinutes": new Date(this.DateTimePicker.value).getMinutes().toString(),
            "endHours": new Date(this.endTime.value).getHours().toString(),
            "endMinutes": new Date(this.endTime.value).getMinutes().toString()
        });
        let config = new Config();
        config.addPresets(table);
        //console.log(config.getPresets()); // prints 4
        this.showGridSchedule = true;
        setTimeout(() => {
            this.gridSchedule.dataSource = config.getPresets();
            this.gridSchedule.locale = "fr";
            this.gridSchedule.refresh();
        }, 500);
        this.data = config.getPresets();
        this.selectionOptions = { checkboxMode: 'ResetOnRowClick' };
        this.DateTimePicker.value = null;
        this.DateTimePicker.refresh();
        this.endTime.value = null;
        this.endTime.enabled = false;
        this.endTime.refresh();
    }
    daysSelected(selection) {
        /*  //console.log(selection) */
        var index;
        for (var i = 0; i < selection.length; i++) {
            index = this.days.indexOf(selection[i]);
            if (index > -1) {
                this.days.splice(index, 1);
            }
        }
    }
    startHourSelected(selection) {
        //console.log(selection)
        var index;
        for (var i = 0; i < selection.length; i++) {
            index = this.endHourSchedule.indexOf(selection[i]);
            if (index > -1) {
                this.endHourSchedule.splice(index, 1);
            }
        }
    }
    onSelectAllCountries() {
        const selected = this.countries.map(item => item.name);
        this.firstFormGroup.get('countries').patchValue(selected);
    }
    onClearAllCountries() {
        this.firstFormGroup.get('countries').patchValue([]);
    }
    onSelectAllSites() {
        const selected = this.sites.map(item => item.name);
        this.firstFormGroup.get('sites').patchValue(selected);
    }
    onClearAllSites() {
        this.firstFormGroup.get('sites').patchValue([]);
    }
    onSelectAllAges() {
        const selected = this.ages.map(item => item.name);
        this.firstFormGroup.get('ages').patchValue(selected);
    }
    onClearAllAges() {
        this.firstFormGroup.get('ages').patchValue([]);
    }
    onSelectAllGenders() {
        const selected = this.genders.map(item => item.name);
        this.firstFormGroup.get('genders').patchValue(selected);
    }
    onClearAllGenders() {
        this.firstFormGroup.get('genders').patchValue([]);
    }
    onSelectAllDevices() {
        const selected = this.devices.map(item => item.name);
        this.firstFormGroup.get('devices').patchValue(selected);
    }
    onClearAllDevices() {
        this.firstFormGroup.get('devices').patchValue([]);
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
    getImages() {
        return new Promise(resolve => {
            var image_list = document.getElementById('dropArea').getElementsByTagName('ejs-uploader')[0].getElementsByClassName("e-upload")[0].getElementsByTagName('ul')[0].getElementsByTagName("li");
            for (var i = 0; i < image_list.length; i++) {
                var image = image_list[i].getElementsByClassName('wrapper')[0].getElementsByTagName('img')[0];
                this.IMAGE_LIST.push({ "data": image.src, "name": image_list[i].getElementsByClassName('name')[0].getAttribute('title'), "width": image.naturalWidth, "height": image.naturalHeight });
            }
            resolve('ok');
        });
    }
    uploadFile(args) {
        this.uploadObj.upload([this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)]], true);
    }
    removeFiles(args) {
        let removeFile = this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)];
        let statusCode = removeFile.statusCode;
        if (statusCode === '2' || statusCode === '1') {
            this.uploadObj.remove(removeFile, true);
            this.uploadObj.element.value = '';
        }
        let index = this.filesList.indexOf(args.currentTarget.parentElement);
        this.filesList.splice(index, 1);
        this.filesDetails.splice(index, 1);
        this.filesName.splice(this.filesName.indexOf(removeFile.name), 1);
        if (statusCode !== '2') {
            detach(args.currentTarget.parentElement);
        }
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
    isArrayInArray(arr, item) {
        var item_as_string = JSON.stringify(item);
        var contains = arr.some(function (ele) {
            return JSON.stringify(ele) === item_as_string;
        });
        return contains;
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
                    for (var i = 0; i < this.selectedFormat.length; i++) {
                        if (this.selectedFormat[i].width === width && this.selectedFormat[i].heigth === height) {
                            preview.src = img.src;
                            resolved('ok');
                        }
                    }
                    /*  this.selectedFormat.some((selected) => {
                       
                       if (selected.width === width && selected.heigth === height) {
                         preview.src = img.src
                         resolved('ok')
                        
                       } else {
             
                         resolved('error')
                 
                       }
                     }) */
                    /*  var isExist = this.isArrayInArray(this.selectedFormat, [{ "width": width.toString(), "height": height.toString() }])
                     //console.log(isExist)
                     if (isExist === true) {
                      
                       
                     } */
                    /* if (this.selectedFormat.includes(width.toString && height.toString())){
                        if (file) { reader.readAsDataURL(file); }
                      
                    } */
                    /*    for (let i = 0, p = Promise.resolve(); i <  self.selectedFormat.length; i++) {
                   p = p.then(_ => new Promise(resolve =>
                       setTimeout(function () {
                          if (width === parseInt(self.selectedFormat[i].width) && height === parseInt(self.selectedFormat[i].height)) {
                           //console.log('Width and Height matched', width, height);
                           preview.src = img.src
                           if (file) { reader.readAsDataURL(file); }
                           resolve()
                           resolved('ok')
                         } else {
                           //console.log('Width and Height not matched', width, height);
                           resolve();
                         }
                       }, Math.random() * 1000)
                   ));
               }
                   */
                    /* for (var i = 0; i < this.selectedFormat.length; i++){
                     
                    } */
                };
                if (file) {
                    reader.readAsDataURL(file);
                }
                /*  if (preview.naturalWidth === 852) {
                   preview.src = reader.result as string;
                   
                 } else {
                   //console.log(preview.name + " Not accepted")
                 } */
            }, false);
            /*  reader.onload = () => {
                const img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                  const height = img.naturalHeight;
                  const width = img.naturalWidth;
                  //console.log('Width and Height', width, height);
                };
              }; */
            /*     reader.addEventListener('load', () => {
                  //console.log(preview.)
                  //console.log(preview.height)
                  if (preview.naturalWidth === 852) {
                    preview.src = reader.result as string;
                    
                  } else {
                    //console.log(preview.name + " Not accepted")
                  }
                }, false);
               
                 */
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
    createCampaign() {
        this.buttonSubmitCampaign = false;
        this.buttonProgressCampaign = true;
        this.setBid().then(res => {
            if (res === "ok") {
                //console.log(this.firstFormGroup.controls.name.value)
                //console.log(this.DateRange.startDate)
                //console.log(this.DateRange.endDate)
                //console.log(this.numberOfDays)
                //console.log(this.valueTotalBudget)
                //console.log(this.valueDailyBudget)
                //console.log(this.firstFormGroup.controls.landingPage.value)
                //console.log(this.firstFormGroup.controls.countries.value)
                //console.log(this.firstFormGroup.controls.sites.value)
                //console.log(this.firstFormGroup.controls.ages.value)
                //console.log(this.firstFormGroup.controls.genders.value)
                //console.log(this.firstFormGroup.controls.devices.value)
                //console.log(this.budgetForm.controls.bidChoose.value)
                //console.log(this.bid)
                //console.log(this.IMAGE_LIST)
                this.displayService.createCampaign(this.uid, this.firstFormGroup.controls.name.value, "PAUSED", this.DateRange.startDate, this.DateRange.endDate, this.numberOfDays, this.valueTotalBudget, this.valueDailyBudget, this.valueTotalBudget, this.firstFormGroup.controls.landingPage.value, this.firstFormGroup.controls.countries.value, this.firstFormGroup.controls.sites.value, this.firstFormGroup.controls.ages.value, this.firstFormGroup.controls.genders.value, this.firstFormGroup.controls.devices.value, this.budgetForm.controls.bidChoose.value, this.bid, this.IMAGE_LIST, "Display", this.startDateFrench, this.endDateFrench, this.startDateFormattedGoogle, this.endDateFormattedGoogle, this.startDateEnglish, this.endDateEnglish, this.format).then(response => {
                    if (response === "ok") {
                        this.pendingCampaign = false;
                        this.errorCampaign = false;
                        this.successCampaign = true;
                        this.buttonSubmitCampaign = false;
                        this.goBackToBudgetButton = false;
                        this.buttonListCampaign = true;
                        this.buttonCreateCampaign = true;
                        this.tab.enableTab(0, false);
                        this.tab.enableTab(1, false);
                        this.tab.enableTab(2, false);
                        this.tab.select(3);
                    }
                    else {
                        this.successCampaign = false;
                        this.pendingCampaign = false;
                        this.errorCampaign = true;
                    }
                });
            }
        });
    }
    newCampaignAfterCreate() {
        /*    this.tab.enableTab(0, true)
           this.tab.select(0)
           this.tab.enableTab(3, false)
           this.imageHTML = document.querySelector('#dropArea > ejs-uploader > div > ul').innerHTML
           this.bidType = ""
           this.firstFormGroup.reset()
           this.secondFormGroup.reset()
           this.budgetForm.reset()
           this.successCampaign = false
           this.pendingCampaign = true
           this.errorCampaign = false
           this.buttonSubmitCampaign = true
           this.goBackToBudgetButton = true
           this.buttonListCampaign = false
           this.buttonCreateCampaign = false */
        window.location.reload();
    }
};
tslib_1.__decorate([
    ViewChild('dateCampaignPicker', { static: false })
], CreateDisplayCampaignComponent.prototype, "DateRange", void 0);
tslib_1.__decorate([
    ViewChild('dateTimePicher', { static: false })
], CreateDisplayCampaignComponent.prototype, "DateTimePicker", void 0);
tslib_1.__decorate([
    ViewChild('stepper', { static: false })
], CreateDisplayCampaignComponent.prototype, "stepper", void 0);
tslib_1.__decorate([
    ViewChild('gridSchedule', { static: false })
], CreateDisplayCampaignComponent.prototype, "gridSchedule", void 0);
tslib_1.__decorate([
    ViewChild('multiselectCountries', { static: false })
], CreateDisplayCampaignComponent.prototype, "multiselectCountries", void 0);
tslib_1.__decorate([
    ViewChild('multiselectSites', { static: false })
], CreateDisplayCampaignComponent.prototype, "multiselectSites", void 0);
tslib_1.__decorate([
    ViewChild('multiselectAges', { static: false })
], CreateDisplayCampaignComponent.prototype, "multiselectAges", void 0);
tslib_1.__decorate([
    ViewChild('multiselectGenders', { static: false })
], CreateDisplayCampaignComponent.prototype, "multiselectGenders", void 0);
tslib_1.__decorate([
    ViewChild('multiselectDevices', { static: false })
], CreateDisplayCampaignComponent.prototype, "multiselectDevices", void 0);
tslib_1.__decorate([
    ViewChild('multiselectAdFormat', { static: false })
], CreateDisplayCampaignComponent.prototype, "multiselectAdFormat", void 0);
tslib_1.__decorate([
    ViewChild('startHourPicker ', { static: false })
], CreateDisplayCampaignComponent.prototype, "startHourPicker", void 0);
tslib_1.__decorate([
    ViewChild('endHourPicker ', { static: false })
], CreateDisplayCampaignComponent.prototype, "endHourPicker", void 0);
tslib_1.__decorate([
    ViewChild('bidsChooserComponent ', { static: false })
], CreateDisplayCampaignComponent.prototype, "bidsChooserComponent", void 0);
tslib_1.__decorate([
    ViewChild(TabComponent, { static: false })
], CreateDisplayCampaignComponent.prototype, "tab", void 0);
tslib_1.__decorate([
    ViewChild('previewupload', { static: false })
], CreateDisplayCampaignComponent.prototype, "uploadObj", void 0);
tslib_1.__decorate([
    ViewChild('toast', { static: false })
], CreateDisplayCampaignComponent.prototype, "ToastAdafriComponent", void 0);
tslib_1.__decorate([
    ViewChild('progressButton', { static: false })
], CreateDisplayCampaignComponent.prototype, "progressButton", void 0);
CreateDisplayCampaignComponent = tslib_1.__decorate([
    Component({
        selector: 'app-create-display-campaign',
        templateUrl: './create-display-campaign.component.html',
        styleUrls: ['./create-display-campaign.component.scss']
    })
], CreateDisplayCampaignComponent);
export { CreateDisplayCampaignComponent };
//# sourceMappingURL=create-display-campaign.component.js.map