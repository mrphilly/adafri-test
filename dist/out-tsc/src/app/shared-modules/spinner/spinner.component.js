import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-angular-popups';
let SpinnerComponent = class SpinnerComponent {
    constructor() {
        this.message = "Chargement...";
    }
    ngOnInit() {
    }
    showLoader() {
        showSpinner(document.getElementById('spinner'));
    }
    ngAfterViewInit() {
    }
    createLoader() {
        createSpinner({
            // Specify the target for the spinner to show
            target: document.getElementById('spinner'),
        });
    }
    hideLoader() {
        hideSpinner(document.getElementById('spinner'));
    }
};
tslib_1.__decorate([
    ViewChild('ejDialog', { static: false })
], SpinnerComponent.prototype, "spinnerDialog", void 0);
SpinnerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-spinner',
        templateUrl: './spinner.component.html',
        styleUrls: ['./spinner.component.scss']
    })
], SpinnerComponent);
export { SpinnerComponent };
//# sourceMappingURL=spinner.component.js.map