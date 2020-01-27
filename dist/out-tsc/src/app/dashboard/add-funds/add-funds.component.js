import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { SERVER, CURRENCY } from 'src/environments/environment';
const SERVER_URL = SERVER.url;
let AddFundsComponent = class AddFundsComponent {
    constructor(auth, _formBuilder, deviceService, route) {
        this.auth = auth;
        this._formBuilder = _formBuilder;
        this.deviceService = deviceService;
        this.route = route;
        this.uid = "";
        this.accountValue = 0;
        this.montant = 0;
        this.onOpenDialog = function (event) {
            // Call the show method to open the Dialog
            this.ejDialog.show();
        };
        // Sample level code to hide the Dialog when click the Dialog overlay
        this.onOverlayClick = () => {
            this.ejDialog.hide();
        };
    }
    ngOnInit() {
        this.paymentForm = this._formBuilder.group({
            amount: ["", [Validators.required, Validators.min(10), Validators.max(5000)]]
        });
        this.getUserCredentials().then(response_credentials => {
            if (response_credentials === "ok") {
            }
        });
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
    detectDevice() {
        return new Promise(resolve => {
            resolve(this.deviceService.browser);
        });
    }
    isMobile() {
        return new Promise(resolve => {
            resolve(this.deviceService.isDesktop());
        });
    }
    addFunds() {
        if (this.paymentForm.valid) {
            this.montant = this.paymentForm.controls.amount.value * CURRENCY.DOLLAR;
            var browser = "";
            var redirect = "";
            this.detectDevice().then(res => {
                browser = res;
                if (browser === "Opera") {
                    redirect = SERVER.opera;
                }
                else if (browser === "Chrome") {
                    redirect = SERVER.chrome;
                }
                else if (browser === "Safari") {
                    var current_browser_url = window.location.href;
                    if (current_browser_url.includes("www")) {
                        redirect = SERVER.safari1;
                    }
                    else {
                        redirect = SERVER.safari2;
                    }
                }
                var self = this;
                var key = this.generate(100);
                this.auth.updateUser(this.uid, { paymentKey: key }).then(res => {
                    //console.log("update user")
                    if (res === "ok") {
                        localStorage.setItem(key, this.montant.toString());
                        setTimeout(function () {
                            var btn = document.getElementById("targetButton");
                            var selector = pQuery(btn);
                            (new PayExpresse({
                                item_id: 1,
                            })).withOption({
                                requestTokenUrl: SERVER_URL + '/rechargeAmountBeforeBudget/' + self.montant + "/" + key + "/" + redirect,
                                method: 'POST',
                                headers: {
                                    "Accept": "application/json"
                                },
                                prensentationMode: PayExpresse.OPEN_IN_POPUP,
                                didPopupClosed: function (is_completed, success_url, cancel_url) {
                                    if (is_completed === true) {
                                    }
                                    else {
                                        //window.location.href = cancel_url
                                    }
                                },
                                willGetToken: function () {
                                    //////console.log("Je me prepare a obtenir un token");
                                    selector.prop('disabled', true);
                                    //var ads = []
                                },
                                didGetToken: function (token, redirectUrl) {
                                    //////console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                                    selector.prop('disabled', false);
                                },
                                didReceiveError: function (error) {
                                    //alert('erreur inconnu');
                                    selector.prop('disabled', false);
                                },
                                didReceiveNonSuccessResponse: function (jsonResponse) {
                                    //////console.log('non success response ', jsonResponse);
                                    //alert(jsonResponse.errors);
                                    selector.prop('disabled', false);
                                }
                            }).send({
                                pageBackgroundRadianStart: '#0178bc',
                                pageBackgroundRadianEnd: '#00bdda',
                                pageTextPrimaryColor: '#333',
                                paymentFormBackground: '#fff',
                                navControlNextBackgroundRadianStart: '#608d93',
                                navControlNextBackgroundRadianEnd: '#28314e',
                                navControlCancelBackgroundRadianStar: '#28314e',
                                navControlCancelBackgroundRadianEnd: '#608d93',
                                navControlTextColor: '#fff',
                                paymentListItemTextColor: '#555',
                                paymentListItemSelectedBackground: '#eee',
                                commingIconBackgroundRadianStart: '#0178bc',
                                commingIconBackgroundRadianEnd: '#00bdda',
                                commingIconTextColor: '#fff',
                                formInputBackgroundColor: '#eff1f2',
                                formInputBorderTopColor: '#e3e7eb',
                                formInputBorderLeftColor: '#7c7c7c',
                                totalIconBackgroundRadianStart: '#0178bc',
                                totalIconBackgroundRadianEnd: '#00bdda',
                                formLabelTextColor: '#292b2c',
                                alertDialogTextColor: '#333',
                                alertDialogConfirmButtonBackgroundColor: '#0178bc',
                                alertDialogConfirmButtonTextColor: '#fff',
                            });
                        }, 500);
                    }
                });
            });
        }
        else {
            this.getErrorMessageRechargement();
        }
    }
    generate(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    getErrorMessageRechargement() {
        return this.paymentForm.hasError('required') ? 'Saisir un montant' :
            this.paymentForm.hasError('max') ? 'Montant limite dépassé' :
                this.paymentForm.hasError('min') ? 'Montant faible' : '';
    }
};
tslib_1.__decorate([
    ViewChild('ejDialog', { static: false })
], AddFundsComponent.prototype, "ejDialog", void 0);
tslib_1.__decorate([
    ViewChild('container', { static: false })
], AddFundsComponent.prototype, "container", void 0);
AddFundsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-funds',
        templateUrl: './add-funds.component.html',
        styleUrls: ['./add-funds.component.scss']
    })
], AddFundsComponent);
export { AddFundsComponent };
//# sourceMappingURL=add-funds.component.js.map