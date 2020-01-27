import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
let UserManagementComponent = class UserManagementComponent {
    constructor(fb, auth, dialog, data) {
        this.fb = fb;
        this.auth = auth;
        this.dialog = dialog;
        this.data = data;
    }
    ngOnInit() {
        this.changePassword = this.fb.group({
            "email": ['', [Validators.required, Validators.email]],
        });
    }
    resetDone() {
        this.isMailSend = true;
        this.data.changepassword = false;
        this.dialog.closeAll();
        this.auth.signOut();
    }
    resetPassword() {
        if (this.changePassword.valid) {
            this.auth.resetPasswordInit(this.changePassword.value['email'])
                .then(() => this.resetDone(), (rejectionReason) => alert(rejectionReason))
                .catch(e => alert('An error occurred while attempting to reset your password'));
        }
        else {
            alert('not valide');
        }
    }
};
UserManagementComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-management',
        templateUrl: './user-management.component.html',
        styleUrls: ['./user-management.component.css']
    }),
    tslib_1.__param(3, Inject(MAT_DIALOG_DATA))
], UserManagementComponent);
export { UserManagementComponent };
//# sourceMappingURL=user-management.component.js.map