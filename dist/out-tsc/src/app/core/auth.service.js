import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { SERVER } from '../../environments/environment.prod';
import { of } from 'rxjs';
import { auth } from 'firebase';
import { switchMap, map } from 'rxjs/operators';
let AuthService = class AuthService {
    constructor(afAuth, afs, router, notify, ngZone, dialog) {
        this.afAuth = afAuth;
        this.afs = afs;
        this.router = router;
        this.notify = notify;
        this.ngZone = ngZone;
        this.dialog = dialog;
        this.loginResponse = "";
        this.user = this.afAuth.authState.pipe(switchMap(user => {
            if (user) {
                return this.afs.doc(`users/${user.uid}`).valueChanges();
            }
            else {
                return of(null);
            }
        })
        // tap(user => localStorage.setItem('user', JSON.stringify(user))),
        // startWith(JSON.parse(localStorage.getItem('user')))
        );
        this.notificationAccount = this.afAuth.authState.pipe(switchMap(amount => {
            if (amount) {
                return this.afs.doc(`notifications_account_value/${amount.uid}`).valueChanges();
            }
            else {
                return of(null);
            }
        })
        // tap(user => localStorage.setItem('user', JSON.stringify(user))),
        // startWith(JSON.parse(localStorage.getItem('user')))
        );
    }
    getAuth() {
        return this.afAuth;
    }
    // dalog
    // showDialog(){
    //   const dialogRef = this.dialog.open(InscriptionMailConfirmationComponent, {
    //     width: '450px',
    //     height: '200px'
    //   }); 
    //   setTimeout(() => {
    //     dialogRef.close();
    //   }, 100000);
    // }
    // end dialog
    ////// OAuth Methods /////
    googleLogin() {
        const provider = new auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }
    githubLogin() {
        const provider = new auth.GithubAuthProvider();
        return this.oAuthLogin(provider);
    }
    facebookLogin() {
        const provider = new auth.FacebookAuthProvider();
        return this.oAuthLogin(provider);
    }
    twitterLogin() {
        const provider = new auth.TwitterAuthProvider();
        return this.oAuthLogin(provider);
    }
    oAuthLogin(provider) {
        return new Promise(resolve => {
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(credential => {
                console.log(credential);
            })
                .catch(error => this.handleError(error));
        });
    }
    SendVerificationMail() {
        return new Promise(resolve => {
            this.afAuth.auth.currentUser.sendEmailVerification({ url: SERVER.url_redirect })
                .then(() => {
                resolve('ok');
            });
        });
    }
    resetPasswordInit(email) {
        return this.afAuth.auth.sendPasswordResetEmail(email, { url: SERVER.url_redirect });
    }
    emailSignUp(prenom, nom, username, email, password, entrepriseName, addresse, telephone, postal) {
        console.log(email);
        var self = this;
        return new Promise(resolve => {
            this.afAuth.auth
                .createUserWithEmailAndPassword(email, password)
                .then(credential => {
                console.log(credential);
                //envoi une notification de verification de mail quand un user est cree
                self.updateUserData(credential.user, prenom, nom, username, entrepriseName, addresse, telephone, postal, true).then(res => {
                    if (res == "ok") {
                        // $('#exampleModalCenter').modal('show');
                        resolve("ok");
                    }
                    else {
                        resolve("error");
                    }
                });
                /* this.SendVerificationMail().then(verify =>{
                  if(verify=="ok"){
                   
                }
                }) */
            })
                .catch(error => this.handleError(error));
        });
    }
    getUserCredential(email) {
        return new Promise(resolve => {
            this.afs.collection('users', (ref) => ref.where('email', '==', email)).valueChanges().forEach(data => {
                resolve(data[0]);
            });
        });
    }
    getUsername(username) {
        return new Promise(resolve => {
            this.afs.collection('users', (ref) => ref.where('displayName', '==', username)).valueChanges().forEach(data => {
                console.log(data);
                resolve(data);
            });
        });
    }
    /*   showDialog():void{
        let dialog = this.dialog.open(InscriptionConfirmComponent ,{
          width: '300px',
         
        });
    
        dialog.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.signOut()
        });
      } */
    emailLogin(email, password) {
        return new Promise(resolve => {
            this.afAuth.auth
                .signInWithEmailAndPassword(email, password)
                .then(credential => {
                console.log(credential.user.emailVerified);
                // on verifie si l'utilisateur a verifie son mail
                if (credential.user.emailVerified !== true) {
                    /**  si il ne l'a pas verifie on lui dit de le faire et le deconnecter ,
                     * lamethode showdialog contient une fonction
                     qui permet de deconnecter l'utilisateur*/
                    this.loginResponse = "1";
                    resolve("1");
                }
                else {
                    this.loginResponse = "2";
                    resolve("2");
                }
            }).catch(error => { this.handleError(error).then(res => { resolve(res); }); });
        });
    }
    afterSignIn() {
        // Do after login stuff here, such router redirects, toast messages, etc.
        return this.router.navigate(['/']);
    }
    // Sends email allowing user to reset password
    // resetPassword(email: string) {
    //   const fbAuth = auth();
    //   return fbAuth
    //     .sendPasswordResetEmail(email)
    //     .then(() => this.notify.update('Password update email sent', 'info'))
    //     .catch(error => this.handleError(error));
    // }
    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        });
    }
    // If error, console log and notify user
    handleError(error) {
        return new Promise(resolve => {
            var error_to_show = "";
            if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
                error_to_show = "Cet utilisateur n'éxiste pas";
            }
            else if (error.message == "The password is invalid or the user does not have a password.") {
                error_to_show = "Indentifiants invalides";
            }
            else if (error.message == "The email address is badly formatted.") {
                error_to_show = "Adresse email invalide";
            }
            else if (error.message == "Password should be at least 6 characters") {
                error_to_show = "Mot de passe invalide";
            }
            else if (error.message == "The email address is already in use by another account.") {
                error_to_show = "Adresse email déjà utilisée";
            }
            else if (error.message == "Too many unsuccessful login attempts. Please try again later.") {
                error_to_show = "Trop de tentatives de connexion infructueuses. Veuillez réessayer plus tard.";
            }
            else {
                error_to_show = "Une erreur s'est produite";
            }
            resolve(error_to_show);
        });
    }
    // Sets user data to firestore after succesful login
    updateUserData(user, prenom, nom, username, entrepriseName, addresse, telephone, postal, connectionType) {
        return new Promise(resolve => {
            const userRef = this.afs.doc(`users/${user.uid}`);
            const notificationRef = this.afs.doc(`notifications_account_value/${user.uid}`);
            const data_notification = {
                uid: user.uid,
                notification: "Veuillez définir vos paramètres de facturation en cliquant ici"
            };
            notificationRef.set(data_notification);
            const data = {
                uid: user.uid,
                first_name: prenom,
                last_name: nom,
                email: user.email || null,
                displayName: user.displayName || username,
                photoURL: user.photoURL || 'assets/img/images/user.png',
                account_value: 0,
                paymentKey: "",
                entrepriseName: entrepriseName,
                addresse: addresse,
                telephone: telephone,
                postal: postal,
                isConnectWithMailAndPassword: connectionType
                // emailVerified: user.emailVerified
            };
            userRef.set(data);
            resolve("ok");
        });
    }
    getUser(id) {
        return this.afs.doc(`users/${id}`);
    }
    updateUser(id, data) {
        return new Promise(resolve => {
            this.getUser(id).update(data);
            console.log(id);
            console.log(data);
            resolve('ok');
        });
    }
    getNotification(id) {
        return this.afs.doc(`notifications_account_value/${id}`);
    }
    updateNotification(id, data) {
        return this.getNotification(id).update(data);
    }
    updateValueAccount(uid, email, account_value) {
        return new Promise(resolve => {
            const userRef = this.afs.doc(`users/${uid}`);
            const data = {
                uid: uid,
                account_value: account_value,
                email: email,
            };
            const notificationRef = this.afs.doc(`notifications_account_value/${uid}`);
            const data_notification = {
                uid: uid,
                notification: ""
            };
            userRef.set(data).then(() => {
                notificationRef.set(data_notification).then(() => {
                    resolve("ok");
                });
            });
        });
    }
    getNotificationData(user_id) {
        return this.afs.collection('notifications_account_value', (ref) => ref.where('uid', '==', `${user_id}`)).snapshotChanges().pipe(map((actions) => {
            return actions.map((a) => {
                const data = a.payload.doc.data();
                return Object.assign({ id: a.payload.doc.id }, data);
            });
        }));
    }
    FacebookAuth() {
        return this.AuthLogin(new auth.FacebookAuthProvider());
    }
    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
            console.log('You have been successfully logged in!');
        }).catch((error) => {
            console.log(error);
        });
    }
};
AuthService = tslib_1.__decorate([
    Injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map