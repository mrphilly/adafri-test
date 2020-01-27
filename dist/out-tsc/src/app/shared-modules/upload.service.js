import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
let UploadService = class UploadService {
    constructor(afs) {
        this.afs = afs;
        this.basePath = '/uploads';
        this.value_replace = "";
    }
    getValueReplace(src) {
        return new Promise(resolve => {
            if (src.includes('data:image/png;base64,')) {
                this.value_replace = "data:image/png;base64,";
                resolve('ok');
            }
            else if (src.includes('data:image/jpeg;base64,')) {
                this.value_replace = "data:image/jpeg;base64,";
                resolve('ok');
            }
        });
    }
    pushUpload(uid, name, image_ref, width, height, image_url, src) {
        let storageRef = firebase.storage().ref();
        let imageRefStorage = this.basePath + "/" + uid + " " + name + new Date().getTime().toString() + ".png";
        let value_replace = "";
        this.getValueReplace(src).then(res_replace => {
            if ()
                ;
        });
        if (src.includes('data:image/png;base64,')) {
            value_replace = "data:image/png;base64,";
        }
        let metadata = {
            contentType: 'image/png',
        };
        let uploadTask = storageRef.child(imageRefStorage).putString(src.replace(value_replace, ''), 'base64', metadata);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            // upload in progress
            /*  upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 */
        }, (error) => {
            // upload failed
            console.log(error);
        }, () => {
            // upload success
            firebase.storage().ref().child(imageRefStorage).getDownloadURL().then(url => {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function (event) {
                    var blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
                const image_content = "";
                this.createUpload(uid, name, image_ref, width, height, image_url, src);
            });
        });
    }
    createUpload(uid, name, image_ref, width, height, image_url, src) {
        return new Promise(resolve => {
            this.uploadModel = this.prepareSaveUpload(uid, name, image_ref, width, height, image_url, src);
            const docRef = this.afs.collection('ads').add(this.uploadModel);
            resolve('ok');
        });
    }
    prepareSaveUpload(uid, name, image_ref, width, height, image_url, src) {
        const userDoc = this.afs.doc(`users/${uid}`);
        const newUpload = {
            name: name,
            image_ref: image_ref,
            src: src,
            width: width,
            height: height,
            image_url: image_url,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userDoc.ref,
            owner: uid,
        };
        return Object.assign({}, newUpload);
    }
    // Writes the file details to the realtime db
    saveFileData(upload) {
        this.afs.collection('uploads').add(upload);
    }
    getUpload(id) {
        return this.afs.doc(`uploads/${id}`);
    }
    deleteUpload(upload) {
        this.deleteFileData(upload.$key)
            .then(() => {
            this.deleteFileStorage(upload.name);
        })
            .catch(error => console.log(error));
    }
    // Deletes the file details from the realtime db
    deleteFileData(id) {
        return this.getUpload(id).delete();
    }
    // Firebase files must have unique names in their respective storage dir
    // So the name serves as a unique key
    deleteFileStorage(name) {
        let storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete();
    }
};
UploadService = tslib_1.__decorate([
    Injectable()
], UploadService);
export { UploadService };
//# sourceMappingURL=upload.service.js.map