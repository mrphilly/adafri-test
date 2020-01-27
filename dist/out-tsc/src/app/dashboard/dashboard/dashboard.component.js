import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
let DashboardComponent = class DashboardComponent {
    constructor(translate, auth, connectionService, router, displayService, afs, youtubeService) {
        this.translate = translate;
        this.auth = auth;
        this.connectionService = connectionService;
        this.router = router;
        this.displayService = displayService;
        this.afs = afs;
        this.youtubeService = youtubeService;
        this.statusConn = '';
        this.isConnected = true;
        this.accountValue = 0;
        this.status = false;
        this.numberCampaignsAdwords = 0;
        this.numberCampaignsYoutube = 0;
        this.numberCampaignsFacebook = 0;
        this.numberCampaigns = 0;
        this.uid = "";
        this.numberNotifications = 0;
        this.date = new Date();
        this.displayName = "";
        this.stepString = "";
        this.termined = "";
        this.unpaidCampaignAdwords = [];
        this.unpaidCampaignYoutube = [];
        this.items = [
            {
                text: 'Cut'
            },
            {
                text: 'Copy'
            },
            {
                text: 'Paste'
            }
        ];
        this.auth.user.forEach(data => {
            this.username = data.displayName;
            this.email = data.email;
            this.accountValue = data.account_value;
            this.displayName = data.first_name + " " + data.last_name;
        });
        translate.addLangs(['en', 'fr']);
        if (localStorage.getItem('locale')) {
            const browserLang = localStorage.getItem('locale');
            translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        }
        else {
            localStorage.setItem('locale', 'fr');
            translate.setDefaultLang('fr');
        }
        this.translate.get(['step']).subscribe(translated => {
            this.stepString = translated['step'];
            this.termined = translated['termined'];
        });
        this.connectionService.monitor().subscribe(isConnected => {
            this.isConnected = isConnected;
            if (this.isConnected) {
                this.statusConn = "ONLINE";
            }
            else {
                this.statusConn = "OFFLINE";
            }
        });
    }
    goAddFunds() {
        this.router.navigate(['/dasboards/addFunds'], { queryParams: { id: 'popular' } });
    }
    getAdwordsCampaignLength() {
        return new Promise(resolve => {
            this.displayService.getListCampaign(this.uid).subscribe(campaigns => {
                this.numberCampaignsAdwords = campaigns.length;
                resolve('ok');
            });
        });
    }
    getYoutubeCampaignLength() {
        return new Promise(resolve => {
            this.youtubeService.getListCampaign(this.uid).subscribe(campaigns => {
                this.numberCampaignsYoutube = campaigns.length;
                resolve('ok');
            });
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
    ngOnInit() {
        this.getUserCredentials().then(credentialsResponse => {
            if (credentialsResponse === "ok") {
                this.getAdwordsCampaignLength().then(adwords_response => {
                    if (adwords_response === "ok") {
                        this.getYoutubeCampaignLength().then(youtube_response => {
                            if (youtube_response === "ok") {
                                this.getUnpaidGoogleCampaign().subscribe(unpaidsDisplayCampaign => {
                                    this.getUnpaidYoutubeCampaign().subscribe(unpaidsYoutubeCampaign => {
                                        this.unpaidCampaignAdwords = unpaidsDisplayCampaign;
                                        this.unpaidCampaignYoutube = unpaidsYoutubeCampaign;
                                        this.numberNotifications = unpaidsDisplayCampaign.length + unpaidsYoutubeCampaign.length;
                                        this.numberCampaigns = this.numberCampaignsAdwords + this.numberCampaignsYoutube + this.numberCampaignsFacebook;
                                    });
                                });
                            }
                        });
                        /*  */
                    }
                });
            }
        });
    }
    getUnpaidGoogleCampaign() {
        return this.afs.collection('adwords-display', (ref) => ref.where('owner', '==', `${this.uid}`).where('isPayed', '==', false)).snapshotChanges().pipe(map((actions) => {
            return actions.map((a) => {
                const data = a.payload.doc.data();
                return Object.assign({ id: a.payload.doc.id }, data);
            });
        }));
    }
    getUnpaidYoutubeCampaign() {
        return this.afs.collection('youtube-ads', (ref) => ref.where('owner', '==', `${this.uid}`).where('isPayed', '==', false)).snapshotChanges().pipe(map((actions) => {
            return actions.map((a) => {
                const data = a.payload.doc.data();
                return Object.assign({ id: a.payload.doc.id }, data);
            });
        }));
    }
    changeLang(language) {
        localStorage.setItem('locale', language);
        this.translate.use(language);
        window.location.reload();
    }
    clickEvent() {
        this.status = !this.status;
    }
    collapseSidebar() {
        if (document.getElementById('sideContent').classList.contains('sidebar-collapsed')) {
            document.getElementById('sideContent').classList.remove('sidebar-collapsed');
        }
        else {
            document.getElementById('sideContent').classList.add('sidebar-collapsed');
        }
        if (document.getElementById('google').classList.contains('opened')) {
            document.getElementById('google').classList.remove('opened');
            document.getElementById('googleChild').classList.remove('d-block');
        }
        if (document.getElementById('facebook').classList.contains('opened')) {
            document.getElementById('facebook').classList.remove('opened');
            document.getElementById('facebookChild').classList.remove('d-block');
        }
        if (document.getElementById('youtube').classList.contains('opened')) {
            document.getElementById('youtube').classList.remove('opened');
            document.getElementById('youtubeChild').classList.remove('d-block');
        }
    }
    collapseSidebarMobile() {
        if (document.getElementById('main-menu').classList.contains('d-block')) {
            document.getElementById('main-menu').classList.remove('d-block');
        }
        else {
            document.getElementById('main-menu').classList.add('d-block');
        }
        if (document.getElementById('google').classList.contains('opened')) {
            document.getElementById('google').classList.remove('opened');
            document.getElementById('googleChild').classList.remove('d-block');
        }
        if (document.getElementById('facebook').classList.contains('opened')) {
            document.getElementById('facebook').classList.remove('opened');
            document.getElementById('facebookChild').classList.remove('d-block');
        }
        if (document.getElementById('youtube').classList.contains('opened')) {
            document.getElementById('youtube').classList.remove('opened');
            document.getElementById('youtubeChild').classList.remove('d-block');
        }
    }
    toggleGoogleChild() {
        if (document.getElementById('google').classList.contains('opened')) {
            document.getElementById('google').classList.remove('opened');
            document.getElementById('googleChild').classList.remove('visible');
        }
        else {
            document.getElementById('google').classList.add('opened');
            document.getElementById('googleChild').classList.add('visible');
        }
    }
    toggleFacebookChild() {
        if (document.getElementById('facebook').classList.contains('opened')) {
            document.getElementById('facebook').classList.remove('opened');
            document.getElementById('facebookChild').classList.remove('visible');
        }
        else {
            document.getElementById('facebook').classList.add('opened');
            document.getElementById('facebookChild').classList.add('visible');
        }
    }
    toggleYoutubeChild() {
        if (document.getElementById('youtube').classList.contains('opened')) {
            document.getElementById('youtube').classList.remove('opened');
            document.getElementById('youtubeChild').classList.remove('visible');
        }
        else {
            document.getElementById('youtube').classList.add('opened');
            document.getElementById('youtubeChild').classList.add('visible');
        }
    }
};
DashboardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.scss']
    })
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map