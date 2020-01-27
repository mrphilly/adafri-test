import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators } from "@angular/forms";
import { countries, genders, sites, ages, devices, imageSizes, days, bids, adYoutube, RangeData } from "../../shared-modules/data";
import { detach, Browser, createElement, isNullOrUndefined, EventHandler } from "@syncfusion/ej2-base";
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import * as $ from 'jquery';
import { FormValidators, urlValidator } from '../../shared-modules/form-validators';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { PublishCampaignComponent } from 'src/app/shared-modules/publish-campaign/publish-campaign.component';
let ListDisplayCampaignComponent = class ListDisplayCampaignComponent {
    constructor(displayService, auth, _formBuilder, afs) {
        this.displayService = displayService;
        this.auth = auth;
        this._formBuilder = _formBuilder;
        this.afs = afs;
        this.chartData = RangeData;
        this.uid = "";
        this.email = "";
        this.format = [];
        this.countries = countries();
        this.sites = sites();
        this.genders = genders();
        this.ages = ages();
        this.devices = devices();
        this.imageSizes = imageSizes();
        this.days = days();
        this.daysFields = { text: 'name', value: 'name' };
        this.countryData = countries();
        this.gendersData = genders();
        this.devicesData = devices();
        this.agesData = ages();
        this.dataBids = bids();
        this.adFormat = adYoutube();
        this.fieldsBids = { text: 'name', value: 'id' };
        this.fieldsAdFormat = { text: 'name', value: 'dimensions' };
        this.sitesData = sites();
        this.fieldsCountry = { text: 'name', value: 'id' };
        this.fieldsSites = { text: 'name', value: 'id' };
        this.fieldsAges = { text: 'name', value: 'id' };
        this.fieldsGenders = { text: 'name', value: 'id' };
        this.fieldsDevices = { text: 'name', value: 'id' };
        // set the placeholder to the MultiSelect input
        this.placeholderCountry = 'Sélectionner vos pays';
        this.placeholderSites = 'Sélectionnez vos sites ';
        this.placeholderAges = 'Sélectionnez vos âges ';
        this.placeholderGenders = 'Sélectionnez vos genres';
        this.placeholderDevices = 'Sélectionnez vos appareils ';
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
        this.rules = { TodayCustom: { required: true } };
        this.path = {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        };
        this.allowExtensions = '.png, .jpg, .jpeg';
        this.filesName = [];
        this.filesDetails = [];
        this.filesList = [];
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.getUserCredentials().then(res => {
            if (res === "ok") {
                this.displayService.getListCampaign(this.uid).subscribe(data => {
                    this.data = data;
                    console.log(this.uid);
                    console.log(data);
                });
            }
        });
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
                budget: ["", [Validators.required, Validators.min(8000)]],
                bidChoose: [[], Validators.required],
                cpm: ["", Validators.nullValidator],
                cpc: ["", Validators.nullValidator]
            });
            setTimeout(() => {
                this.DateRange.startDate = new Date(args.rowData.startDateEnglish);
                this.DateRange.endDate = new Date(args.rowData.endDateEnglish);
                this.firstFormGroup.controls.name.patchValue(args.rowData.name);
                this.firstFormGroup.controls.landingPage.patchValue(args.rowData.urlPromote);
                this.firstFormGroup.controls.countries.patchValue(args.rowData.zones);
                this.firstFormGroup.controls.sites.patchValue(args.rowData.placement);
                this.firstFormGroup.controls.genders.patchValue(args.rowData.genders);
                this.firstFormGroup.controls.ages.patchValue(args.rowData.ages);
                this.firstFormGroup.controls.devices.patchValue(args.rowData.devices);
                this.secondFormGroup.controls.imagesSize.patchValue(args.rowData.format);
                this.budgetForm.controls.budget.patchValue(args.rowData.dailyBudget);
                this.budgetForm.controls.bidChoose.patchValue(args.rowData.strategie);
                this.IMAGE_LIST = args.rowData.images;
                console.log(this.IMAGE_LIST);
                if (args.rowData.strategie === "CPM") {
                    this.budgetForm.controls.cpm.setValue(args.rowData.bid);
                }
                else if (args.rowData.strategie === "CPC") {
                    this.budgetForm.controls.cpc.setValue(args.rowData.bid);
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
            }, 500);
        }
        else if ((args.requestType === 'delete')) {
            this.displayService.deleteCampaign(args.data[0].id);
        }
        else if ((args.requestType === 'save')) {
            if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.budgetForm.valid) {
                var campaign = args.rowData;
                this.setBid().then(res => {
                    if (res === "ok") {
                        this.displayService.updateCampaign(campaign.id, { name: this.firstFormGroup.controls.name.value, urlPromote: this.firstFormGroup.controls.landingPage.value, startDate: this.DateRange.startDate, endDate: this.DateRange.endDate, startDateFrench: this.startDateFrench, endDateFrench: this.endDateFrench, startDateEnglish: this.startDateEnglish, endDateEnglish: this.endDateEnglish, startDateFormattedGoogle: this.startDateFormattedGoogle, endDateFormattedGoogle: this.endDateFormattedGoogle, format: this.format, strategie: this.budgetForm.controls.bidChoose.value, bid: this.bid, dailyBudget: this.valueDailyBudget, budget: this.valueTotalBudget, realBudget: this.valueTotalBudget, ages: this.firstFormGroup.controls.ages.value, genders: this.firstFormGroup.controls.genders.value, devices: this.firstFormGroup.controls.devices.value, placement: this.firstFormGroup.controls.sites.value, zones: this.firstFormGroup.controls.countries.value, images: this.IMAGE_LIST }).then(update => {
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
    select(args, injectedData) {
        if (args.item.text === 'Publier') {
            this.publishCampaignComponent.email = this.email;
            this.publishCampaignComponent.uid = this.uid;
            this.publishCampaignComponent.injectedData = injectedData;
            this.publishCampaignComponent.onOpenDialog();
        }
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
], ListDisplayCampaignComponent.prototype, "DateRange", void 0);
tslib_1.__decorate([
    ViewChild('dateTimePicher', { static: false })
], ListDisplayCampaignComponent.prototype, "DateTimePicker", void 0);
tslib_1.__decorate([
    ViewChild('stepper', { static: false })
], ListDisplayCampaignComponent.prototype, "stepper", void 0);
tslib_1.__decorate([
    ViewChild('gridSchedule', { static: false })
], ListDisplayCampaignComponent.prototype, "gridSchedule", void 0);
tslib_1.__decorate([
    ViewChild('multiselectCountries', { static: false })
], ListDisplayCampaignComponent.prototype, "multiselectCountries", void 0);
tslib_1.__decorate([
    ViewChild('multiselectSites', { static: false })
], ListDisplayCampaignComponent.prototype, "multiselectSites", void 0);
tslib_1.__decorate([
    ViewChild('multiselectAges', { static: false })
], ListDisplayCampaignComponent.prototype, "multiselectAges", void 0);
tslib_1.__decorate([
    ViewChild('multiselectGenders', { static: false })
], ListDisplayCampaignComponent.prototype, "multiselectGenders", void 0);
tslib_1.__decorate([
    ViewChild('multiselectDevices', { static: false })
], ListDisplayCampaignComponent.prototype, "multiselectDevices", void 0);
tslib_1.__decorate([
    ViewChild('multiselectAdFormat', { static: false })
], ListDisplayCampaignComponent.prototype, "multiselectAdFormat", void 0);
tslib_1.__decorate([
    ViewChild('startHourPicker ', { static: false })
], ListDisplayCampaignComponent.prototype, "startHourPicker", void 0);
tslib_1.__decorate([
    ViewChild('endHourPicker ', { static: false })
], ListDisplayCampaignComponent.prototype, "endHourPicker", void 0);
tslib_1.__decorate([
    ViewChild('bidsChooserComponent ', { static: false })
], ListDisplayCampaignComponent.prototype, "bidsChooserComponent", void 0);
tslib_1.__decorate([
    ViewChild(TabComponent, { static: false })
], ListDisplayCampaignComponent.prototype, "tab", void 0);
tslib_1.__decorate([
    ViewChild('previewupload', { static: false })
], ListDisplayCampaignComponent.prototype, "uploadObj", void 0);
tslib_1.__decorate([
    ViewChild('toast', { static: false })
], ListDisplayCampaignComponent.prototype, "ToastAdafriComponent", void 0);
tslib_1.__decorate([
    ViewChild('progressButton', { static: false })
], ListDisplayCampaignComponent.prototype, "progressButton", void 0);
tslib_1.__decorate([
    ViewChild(PublishCampaignComponent, { static: false })
], ListDisplayCampaignComponent.prototype, "publishCampaignComponent", void 0);
ListDisplayCampaignComponent = tslib_1.__decorate([
    Component({
        selector: 'app-list-display-campaign',
        templateUrl: './list-display-campaign.component.html',
        styleUrls: ['./list-display-campaign.component.scss']
    })
], ListDisplayCampaignComponent);
export { ListDisplayCampaignComponent };
//# sourceMappingURL=list-display-campaign.component.js.map