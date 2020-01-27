import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators } from "@angular/forms";
import { countries, genders, sites, ages, devices, imageSizes } from "../data";
import { detach, Browser, createElement, isNullOrUndefined, EventHandler } from "@syncfusion/ej2-base";
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
let CreateCampaignComponent = class CreateCampaignComponent {
    constructor(_formBuilder) {
        this._formBuilder = _formBuilder;
        this.isLinear = false;
        this.countries = countries();
        this.sites = sites();
        this.genders = genders();
        this.ages = ages();
        this.devices = devices();
        this.imageSizes = imageSizes();
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
        this.firstFormGroup = this._formBuilder.group({
            name: ['', Validators.required],
            start: ['', Validators.required],
            end: ['', Validators.required],
            countries: [[], Validators.required],
            sites: [[], Validators.required],
            genders: [[], Validators.required],
            ages: [[], Validators.required],
            devices: [[], Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            daterange: ['', Validators.required],
            secondCtrl: ['', Validators.required]
        });
        //****************
    }
    ngAfterViewInit() {
        this.dropElement = document.getElementsByClassName('control-section')[0];
        if (Browser.isDevice) {
            document.getElementById('dropimage').style.padding = '0px 10%';
        }
        document.getElementById('browse').onclick = () => {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        document.getElementById('clearbtn').onclick = () => {
            if (!this.dropElement.querySelector('ul')) {
                return;
            }
            detach(this.dropElement.querySelector('ul'));
            this.filesList = [];
            this.filesDetails = [];
            this.filesName = [];
            if (this.dropElement.querySelector('#dropArea').classList.contains('e-spinner-pane')) {
                hideSpinner(this.dropElement.querySelector('#dropArea'));
                detach(this.dropElement.querySelector('.e-spinner-pane'));
            }
        };
        document.getElementById('uploadbtn').onclick = () => {
            if (this.dropElement.querySelector('ul') && this.filesDetails.length > 0) {
                this.uploadObj.upload(this.filesDetails, true);
            }
        };
    }
    onSelectAll() {
        const selected = this.countries.map(item => item.name);
        this.firstFormGroup.get('countries').patchValue(selected);
    }
    onClearAll() {
        this.firstFormGroup.get('countries').patchValue([]);
    }
    onSelect(args) {
        if (!this.dropElement.querySelector('li')) {
            this.filesDetails = [];
        }
        if (isNullOrUndefined(document.getElementById('dropArea').querySelector('.e-upload-files'))) {
            this.parentElement = createElement('ul', { className: 'e-upload-files' });
            document.getElementsByClassName('e-upload')[0].appendChild(this.parentElement);
        }
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
        clearbtn = createElement('span', { id: 'removeIcon', className: 'e-icons e-file-remove-btn', attrs: { 'title': 'Remove' } });
        EventHandler.add(clearbtn, 'click', this.removeFiles, proxy);
        liEle.setAttribute('title', 'Ready to Upload');
        uploadbtn = createElement('span', { className: 'e-upload-icon e-icons e-file-remove-btn', attrs: { 'title': 'Upload' } });
        uploadbtn.setAttribute('id', 'iconUpload');
        EventHandler.add(uploadbtn, 'click', this.uploadFile, proxy);
        let progressbarContainer;
        progressbarContainer = createElement('progress', { className: 'progressbar', id: 'progressBar', attrs: { value: '0', max: '100' } });
        liEle.appendChild(clearbtn);
        liEle.appendChild(uploadbtn);
        liEle.appendChild(progressbarContainer);
        this.readURL(liEle, file);
        document.querySelector('.e-upload-files').appendChild(liEle);
        proxy.filesList.push(liEle);
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
    readURL(li, args) {
        let preview = li.querySelector('.upload-image');
        let file = args.rawFile;
        let reader = new FileReader();
        reader.addEventListener('load', () => { preview.src = reader.result; }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    onFileRemove(args) {
        args.postRawFile = false;
    }
};
tslib_1.__decorate([
    ViewChild('previewupload', { static: false })
], CreateCampaignComponent.prototype, "uploadObj", void 0);
CreateCampaignComponent = tslib_1.__decorate([
    Component({
        selector: 'app-create-campaign',
        templateUrl: './create-campaign.component.html',
        styleUrls: ['./create-campaign.component.scss']
    })
], CreateCampaignComponent);
export { CreateCampaignComponent };
//# sourceMappingURL=create-campaign.component.js.map