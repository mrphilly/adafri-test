import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let PaymentService = class PaymentService {
    constructor(afs, http, auth) {
        this.afs = afs;
        this.http = http;
        this.auth = auth;
        this.auth.user.forEach(child => {
            this.uid = child.uid;
            this.paymentsCollection = this.afs.collection('transactions', (ref) => ref.where('owner', '==', child.uid));
            this.currentUser = child.displayName;
            this.email = child.email;
        });
    }
    ngOnInit() {
    }
    prepareSavePayment(uid, type, value, paymentKey, campaign_id, campaign_name) {
        var event = new Date();
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', 'second': 'numeric' };
        var date = event.toLocaleDateString('fr-FR', options);
        const userDoc = this.afs.doc(`users/${uid}`);
        const newPayment = {
            uid: uid,
            type: type,
            value: value,
            key: paymentKey,
            campaign_id: campaign_id,
            campaign_name: campaign_name,
            date: date
        };
        return Object.assign({}, newPayment);
    }
    createTransaction(uid, type, value, paymentKey, campaign_id, campaign_name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => {
                this.payment = this.prepareSavePayment(uid, type, value, paymentKey, campaign_id, campaign_name);
                const docRef = this.paymentsCollection.add(this.payment);
                resolve("ok");
            });
        });
    }
};
PaymentService = tslib_1.__decorate([
    Injectable()
], PaymentService);
export { PaymentService };
//# sourceMappingURL=payment.service.js.map