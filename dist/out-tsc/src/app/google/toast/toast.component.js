import * as tslib_1 from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
let ToastAdafriComponent = class ToastAdafriComponent {
    constructor() {
        this.title = "";
        this.content = "";
        this.cssClass = "";
        this.playSong = "";
        this.position = { X: 'Right', Y: 'Bottom' };
        this.toasts = [
            { title: this.title, content: this.content, cssClass: this.cssClass }
        ];
        this.toastFlag = 0;
    }
    onCreate() {
        this.toast.show(this.toasts[this.toastFlag]);
        ++this.toastFlag;
    }
    /*  btnClick() {
       this.toastShow();
     } */
    onBeforeOpen() {
        if (this.playSong === "ok") {
            let audio = new Audio('https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7');
            audio.play();
        }
    }
    toastShow() {
        setTimeout(() => {
            /* this.element.title = this.title
            this.element.content = this.content
            this.element.cssClass = this.cssClass
            this.element.timeOut =
  
            this.element.show() */
            /* this.element.show(this.toasts[this.toastFlag]);
            ++this.toastFlag;
              if (this.toastFlag === (this.toasts.length)) {
                this.toastFlag = 0;
               } */
        }, 500);
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    ViewChild('element', { static: false })
], ToastAdafriComponent.prototype, "toast", void 0);
tslib_1.__decorate([
    Input()
], ToastAdafriComponent.prototype, "title", void 0);
tslib_1.__decorate([
    Input()
], ToastAdafriComponent.prototype, "content", void 0);
tslib_1.__decorate([
    Input()
], ToastAdafriComponent.prototype, "cssClass", void 0);
tslib_1.__decorate([
    Input()
], ToastAdafriComponent.prototype, "playSong", void 0);
ToastAdafriComponent = tslib_1.__decorate([
    Component({
        selector: 'app-toast',
        templateUrl: './toast.component.html',
        styleUrls: ['./toast.component.scss']
    })
], ToastAdafriComponent);
export { ToastAdafriComponent };
//# sourceMappingURL=toast.component.js.map