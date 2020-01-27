import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
let NotificationsService = class NotificationsService {
    constructor(afs, auth) {
        this.afs = afs;
        this.auth = auth;
        this.auth.user.forEach(child => {
            this.uid = child.uid;
            this.notificationsCollection = this.afs.collection('notifications', (ref) => ref.where('owner', '==', child.uid));
            this.currentUser = child.displayName;
            this.email = child.email;
        });
    }
    ngOnInit() {
    }
    prepareSaveNotification(uid, type, content, campaign_id, campaign_name) {
        const newNotification = {
            owner: uid,
            type: type,
            content: content,
            campaign_id: campaign_id,
            campaign_name: campaign_name,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            isArchived: false,
        };
        return Object.assign({}, newNotification);
    }
    createNotification(uid, type, content, campaign_id, campaign_name) {
        return new Promise(resolve => {
            this.notification = this.prepareSaveNotification(uid, type, content, campaign_id, campaign_name);
            const docRef = this.notificationsCollection.add(this.notification);
            resolve("ok");
        });
    }
};
NotificationsService = tslib_1.__decorate([
    Injectable()
], NotificationsService);
export { NotificationsService };
//# sourceMappingURL=notifications.service.js.map