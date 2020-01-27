import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { usernameValidator, FormValidators } from 'src/app/shared-modules/form-validators';
import { UserManagementComponent } from 'src/app/shared-modules/user-management/user-management.component';
let HomePageComponent = class HomePageComponent {
    constructor(fb, auth, afs, dialog, translate, router) {
        this.fb = fb;
        this.auth = auth;
        this.afs = afs;
        this.dialog = dialog;
        this.translate = translate;
        this.router = router;
        this.USER_TYPE = "";
        this.loginErrorMessage = "";
        this.progressSignin = false;
        this.progressSignup = false;
        this.signupError = false;
        this.selectOption = false;
        this.islogged = false;
        this.isNotlogged = false;
        this.loader = true;
        this.translate.addLangs(['en', 'fr']);
        if (localStorage.getItem('locale')) {
            const browserLang = localStorage.getItem('locale');
            translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        }
        else {
            localStorage.setItem('locale', 'en');
            this.translate.setDefaultLang('en');
        }
    }
    changeLang(language) {
        localStorage.setItem('locale', language);
        this.translate.use(language);
    }
    toggleSignupModal() {
        if (this.modalSignin.isShown === true) {
            this.modalSignin.hide();
            this.modalSignup.show();
        }
        else {
            this.modalSignup.show();
        }
    }
    toggleLoginModal() {
        if (this.modalSignup.isShown === true) {
            this.modalSignup.hide();
            this.modalSignin.show();
        }
        else {
            this.modalSignin.show();
        }
    }
    buttonToggleChange(event) {
        this.USER_TYPE = event.value;
        if (this.USER_TYPE === "1") {
            this.signupForm.controls.entrepriseName.setValidators([Validators.required,
                Validators.minLength(4)]);
            this.signupForm.controls.postal.reset();
            this.signupForm.controls.postal.setValidators([Validators.required,
                Validators.minLength(4)]);
            this.signupForm.controls.entrepriseName.reset();
            this.signupForm.controls.addresse.reset();
            this.signupForm.controls.telephone.reset();
            this.signupForm.controls.entrepriseName.updateValueAndValidity();
            this.signupForm.controls.postal.updateValueAndValidity();
        }
        else {
            this.signupForm.controls.addresse.reset();
            this.signupForm.controls.telephone.reset();
        }
    }
    buildFormLogin() {
        this.connexion = this.fb.group({
            "email": ["", [Validators.required, Validators.email]],
            'password': ["", [Validators.required]],
        });
    }
    buildFormInscription() {
        this.signupForm = this.fb.group({
            "prenom": ["", [Validators.required]],
            "nom": ["", [Validators.required]],
            "username": ["", [Validators.required, Validators.maxLength(15), Validators.minLength(5)], [usernameValidator(this.afs)]],
            "email": ["", [Validators.required, Validators.email], [FormValidators.emailValidator(this.afs)]],
            "password": ["", [Validators.required,
                    Validators.pattern('(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*'),
                    Validators.minLength(6),
                    Validators.maxLength(25),
                ]],
            "addresse": ["", [Validators.required]],
            "telephone": ["", [Validators.required]],
            "entreprise": ["", [Validators.nullValidator]],
            "particulier": ["", [Validators.nullValidator]],
            "entrepriseName": ["", [Validators.nullValidator]],
            "postal": ["", [Validators.nullValidator]],
        });
    }
    forgotPassword() {
        this.modalSignin.hide();
        this.dialog.open(UserManagementComponent, {
            data: { changePassword: true }
        });
    }
    getUserType() {
        return new Promise(resolve => {
            if (this.USER_TYPE === "1") {
                this.selectOption = false;
                resolve("ok");
            }
            else if (this.USER_TYPE === "2") {
                this.selectOption = false;
                resolve("ok");
            }
            else {
                this.selectOption = true;
            }
        });
    }
    getSignupForm() {
        this.getUserType().then(res => {
            if (res === "ok") {
                this.progressSignup = true;
                if (this.signupForm.valid) {
                    if (this.USER_TYPE === "1") {
                        this.auth.emailSignUp(this.signupForm.value['prenom'], this.signupForm.value['nom'], this.signupForm.value['username'], this.signupForm.value['email'], this.signupForm.value['password'], this.signupForm.value['entrepriseName'], this.signupForm.value['addresse'], this.signupForm.value['telephone'], this.signupForm.value['postal']).then(res => {
                            if (res === "ok") {
                                this.modalSignup.hide();
                                this.signupForm.reset();
                                /*  this.auth.signOut()
                                 this.modalSignupSuccess.show() */
                                this.progressSignup = false;
                                this.islogged = true;
                                this.isNotlogged = false;
                                this.router.navigate(['/dashboard']);
                            }
                            else {
                                this.progressSignup = false;
                                this.islogged = false;
                                this.isNotlogged = true;
                                this.router.navigate(['/dashboard']);
                            }
                        });
                    }
                    else {
                        this.auth.emailSignUp(this.signupForm.value['prenom'], this.signupForm.value['nom'], this.signupForm.value['username'], this.signupForm.value['email'], this.signupForm.value['password'], "", this.signupForm.value['addresse'], this.signupForm.value['telephone'], "").then(res => {
                            if (res === "ok") {
                                this.signupForm.reset();
                                this.modalSignup.hide();
                                /*  this.auth.signOut() */
                                /* this.modalSignupSuccess.show() */
                                this.progressSignup = false;
                                this.islogged = true;
                                this.isNotlogged = false;
                            }
                            else {
                                this.progressSignup = false;
                                this.islogged = false;
                                this.isNotlogged = true;
                            }
                        });
                    }
                    this.signupError = false;
                }
                else {
                    this.progressSignup = false;
                    this.signupError = true;
                }
            }
            else {
                this.progressSignup = false;
            }
        });
    }
    checkConnection() {
        return new Promise(resolve => {
            this.auth.user.forEach(data => {
                if (data === null) {
                    resolve('not connected');
                }
                else {
                    resolve('connected');
                }
            });
        });
    }
    ngOnInit() {
        this.buildFormLogin();
        this.buildFormInscription();
        this.checkConnection().then(connection => {
            if (connection === "connected") {
                this.loader = false;
                this.islogged = true;
                this.isNotlogged = false;
                this.router.navigate(['/dashboard']);
            }
            else {
                this.loader = false;
                this.isNotlogged = true;
                this.islogged = false;
            }
        });
    }
    onEntrepriseChange(event) {
        if (event.checked === true) {
            this.particulierCheckbox.setDisabledState(true);
        }
        else {
            this.particulierCheckbox.setDisabledState(false);
        }
    }
    onParticulierChange(event) {
        if (event.checked === true) {
            this.entrepriseCheckbox.setDisabledState(true);
        }
        else {
            this.entrepriseCheckbox.setDisabledState(false);
        }
    }
    getEntrepriseChecked() {
        if (this.signupForm.controls['entreprise'].value === true) {
            this.particulierCheckbox.setDisabledState(true);
        }
        else {
            this.particulierCheckbox.setDisabledState(false);
        }
        return this.signupForm.controls['entreprise'].value;
    }
    getParticulierChecked() {
        if (this.signupForm.controls['particulier'].value === true) {
            this.entrepriseCheckbox.setDisabledState(true);
        }
        else {
            this.entrepriseCheckbox.setDisabledState(false);
        }
        return this.signupForm.controls['particulier'].value;
    }
    get username() {
        return this.signupForm.get('username');
    }
    get email() {
        return this.signupForm.get('email');
    }
    get password() {
        return this.signupForm.get('password');
    }
    get addresse() {
        return this.signupForm.get('addresse');
    }
    get telephone() {
        return this.signupForm.get('telephone');
    }
    get nom() {
        return this.signupForm.get('nom');
    }
    get prenom() {
        return this.signupForm.get('prenom');
    }
    get entreprise() {
        return this.signupForm.get('entreprise');
    }
    get particulier() {
        return this.signupForm.get('particulier');
    }
    get entrepriseName() {
        return this.signupForm.get('entrepriseName');
    }
    login() {
        if (this.connexion.valid) {
            this.progressSignin = true;
            this.auth.emailLogin(this.connexion.value['email'], this.connexion.value['password']).then(res => {
                if (res === "1") {
                    /* this.modalSignupSuccess.show() */
                    this.progressSignin = false;
                    this.connexion.reset();
                    this.modalSignin.hide();
                    this.loginErrorMessage = "";
                    this.islogged = true;
                    this.isNotlogged = false;
                    this.router.navigate(['/dashboard']);
                }
                else if (res === "2") {
                    /* document.getElementById('body').classList.add("background-yellow-adafri")
                   document.getElementById('body').classList.remove("white") */
                    this.connexion.reset();
                    this.progressSignin = false;
                    this.modalSignin.hide();
                    this.loginErrorMessage = "";
                    this.islogged = true;
                    this.isNotlogged = false;
                    this.router.navigate(['/dashboard']);
                    /* this.openSnackBar("Vous êtes maintenant connecté !", "") */
                    /* this.router.navigate(['/']) */
                }
                else {
                    this.loginErrorMessage = res;
                    this.progressSignin = false;
                    this.isNotlogged = true;
                    this.islogged = false;
                }
                /*  if (res.toString() != "") {
           
                   this.progressBarLogin=false
                   
               
                     
                 }else{
                    this.progressBarLogin=false
                 } */
            });
        }
    }
};
tslib_1.__decorate([
    ViewChild("entrepriseCheckBox", { static: false })
], HomePageComponent.prototype, "entrepriseCheckbox", void 0);
tslib_1.__decorate([
    ViewChild("particulierCheckBox", { static: false })
], HomePageComponent.prototype, "particulierCheckbox", void 0);
tslib_1.__decorate([
    ViewChild("group", { static: false })
], HomePageComponent.prototype, "buttonToggleGroup", void 0);
tslib_1.__decorate([
    ViewChild("modalSignup", { static: false })
], HomePageComponent.prototype, "modalSignup", void 0);
tslib_1.__decorate([
    ViewChild("modalSignin", { static: false })
], HomePageComponent.prototype, "modalSignin", void 0);
tslib_1.__decorate([
    ViewChild("modalSignupSuccess", { static: false })
], HomePageComponent.prototype, "modalSignupSuccess", void 0);
HomePageComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home-page',
        templateUrl: './home-page.component.html',
        styleUrls: ['./home-page.component.scss']
    })
], HomePageComponent);
export { HomePageComponent };
//# sourceMappingURL=home-page.component.js.map