import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CURRENCY } from 'src/environments/environment';
let PaymentsComponent = class PaymentsComponent {
    constructor(auth, route, router, paymentService, snackBar, notificationsService) {
        this.auth = auth;
        this.route = route;
        this.router = router;
        this.paymentService = paymentService;
        this.snackBar = snackBar;
        this.notificationsService = notificationsService;
        this.uid = "";
        this.accountValue = 0;
        this.email = "";
        this.first_name = "";
        this.last_name = "";
        this.telephone = "";
        this.adresse = "";
    }
    ngOnInit() {
        this.getUserCredentials();
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
    getCurrentUserCredentials() {
        return new Promise(resolve => {
            var response = [];
            this.auth.user.forEach(data => {
                response.push({
                    "uid": data.uid,
                    "email": data.email,
                    "account_value": data.account_value,
                    "paymentKey": data.paymentKey,
                    "first_name": data.first_name,
                    "last_name": data.last_name,
                    "addresse": data.addresse,
                    "telephone": data.telephone
                });
                resolve(response);
            });
        });
    }
    ngAfterViewInit() {
        this.getRoute().then(res => {
            if (res === "ok") {
                console.log('ok');
            }
        });
    }
    createNotification(uid, type, content, campaign_id, campaign_name) {
        return new Promise(resolve => {
            this.notificationsService.createNotification(uid, type, content, campaign_id, campaign_name);
            resolve('ok');
        });
    }
    getRoute() {
        return new Promise(resolve => {
            console.log(this.route.params);
            this.route.params.subscribe(params => {
                if (params['key'] !== undefined) {
                    this.getCurrentUserCredentials().then(credentials => {
                        var paymentKey = credentials[0]['paymentKey'];
                        this.uid = credentials[0]['uid'];
                        this.accountValue = credentials[0]['account_value'];
                        this.email = credentials[0]['email'];
                        this.first_name = credentials[0]['first_name'];
                        this.last_name = credentials[0]['last_name'];
                        this.adresse = credentials[0]['addresse'];
                        this.telephone = credentials[0]['telephone'];
                        if (paymentKey.toString() === params['key'].toString()) {
                            var montant = localStorage.getItem(paymentKey);
                            if (montant === null) {
                                this.router.navigate(['/dashboard/payments']);
                            }
                            else {
                                var new_value = 0;
                                new_value = parseInt(montant) / CURRENCY.DOLLAR + this.accountValue;
                                this.paymentService.createTransaction(this.uid, "Rechargement", new_value, params['key'], 0, "").then(paymentStatus => {
                                    if (paymentStatus === "ok") {
                                        this.auth.updateUser(this.uid, { account_value: new_value, paymentKey: "" }).then(res => {
                                            if (res != "error") {
                                                this.getNotificationId(this.uid).then(res => {
                                                    this.auth.updateNotification(res, { notification: "" }).then(() => {
                                                        localStorage.removeItem(paymentKey);
                                                        this.notificationsService.createNotification(this.uid, "Rechargement", "Le solde de votre compte a été mis à jour avec succès !", 0, "").then(notification_response => {
                                                            if (notification_response === "ok") {
                                                                window.location.replace('/dashboard/payments');
                                                            }
                                                        });
                                                        resolve("ok");
                                                    });
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                        else {
                            this.router.navigate(['/']);
                        }
                    });
                }
                else {
                    resolve("ok");
                }
            });
        });
    }
    getNotificationId(uid) {
        return new Promise(resolve => {
            this.auth.getNotificationData(uid).forEach(data => {
                resolve(data[0]['id']);
            });
        });
    }
    openSnackBar(message, action) {
        /*     this.snackBar.openFromComponent(ImageCreateComponent) */
        this.snackBar.open(message, action, {
            duration: 105000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
        });
    }
};
PaymentsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-payments',
        templateUrl: './payments.component.html',
        styleUrls: ['./payments.component.scss']
    })
], PaymentsComponent);
export { PaymentsComponent };
//# sourceMappingURL=payments.component.js.map