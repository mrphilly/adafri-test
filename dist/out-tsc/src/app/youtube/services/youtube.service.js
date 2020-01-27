import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { SERVER } from 'src/environments/environment';
let YoutubeService = class YoutubeService {
    constructor(auth, afs, http) {
        this.auth = auth;
        this.afs = afs;
        this.http = http;
        this.uid = "";
        this.strategie = "";
        this.startegie_bid = "";
        this.channel = "";
        this.budget = 0;
        this.realBudget = 0;
        this.budgetToSend = 0;
        this.dailyBudget = 0;
        this.realDailyBudget = 0;
        this.microDollarValue = 1000000;
        this.currentCampaignId = 0;
        this.currentCampaignIfFirebase = "";
        this.currentAdGroupId = 0;
        this.currentAdGroupIdFirebase = "";
        this.newLocation = [];
        this.campaignYoutubeCollection = this.afs.collection('youtube-ads', (ref) => ref.where('owner', '==', this.uid));
        this.adGroupCollection = this.afs.collection('adgroup-youtube', (ref) => ref.where('campaign_id', '==', parseInt(`${this.campaign_id}`)));
    }
    getUserCredentials() {
        return new Promise(resolve => {
            this.auth.user.forEach(child => {
                console.log(child);
                this.uid = child.uid;
                resolve('ok');
            });
        });
    }
    createCampaign(uid, name, status, startDate, endDate, numberOfDays, budget, dailyBudget, realBudget, url, zones, placement, ages, genders, devices, strategie, bid, images, type, startDateFrench, endDateFrench, startDateFormattedGoogle, endDateFormattedGoogle, startDateEnglish, endDateEnglish, format) {
        return new Promise(resolve => {
            this.campaignYoutube = this.prepareSaveCampaign(uid, name, status, startDate, endDate, numberOfDays, budget, dailyBudget, realBudget, url, zones, placement, ages, genders, devices, strategie, bid, images, type, startDateFrench, endDateFrench, startDateFormattedGoogle, endDateFormattedGoogle, startDateEnglish, endDateEnglish, format);
            const docRef = this.campaignYoutubeCollection.add(this.campaignYoutube);
            docRef
                .then(() => {
                resolve("ok");
            })
                .catch(() => {
                resolve("error");
            });
        });
    }
    prepareSaveCampaign(uid, name, status, startDate, endDate, numberOfDays, budget, dailyBudget, realBudget, url, zones, youtubeChannels, ages, genders, devices, strategie, bid, images, type, startDateFrench, endDateFrench, startDateFormattedGoogle, endDateFormattedGoogle, startDateEnglish, endDateEnglish, format) {
        const userDoc = this.afs.doc(`users/${uid}`);
        const newCampaign = {
            id_campagne: 0,
            name: name,
            status: status,
            startDate: startDate,
            endDate: endDate,
            startDateFrench: startDateFrench,
            endDateFrench: endDateFrench,
            startDateFormattedGoogle: startDateFormattedGoogle,
            endDateFormattedGoogle: endDateFormattedGoogle,
            budget: budget,
            dailyBudget: dailyBudget,
            realBudget: realBudget,
            realDailyBudget: dailyBudget,
            numberOfDays: numberOfDays,
            budgetId: 0,
            ad_group_id_firebase: "",
            ad_group_id: 0,
            zones: zones,
            ages: ages,
            genders: genders,
            devices: devices,
            youtubeChannels: youtubeChannels,
            strategie: strategie,
            bid: bid,
            images: images,
            criterion_zones: [],
            criterion_ages: [],
            criterion_sexes: [],
            criterion_devices: [],
            criterion_youtube_channels: [],
            adsSchedules: [],
            adsSchedulesCriterion: [],
            impressions: 0,
            clicks: 0,
            costs: 0,
            servingStatus: "",
            urlPromote: url,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userDoc.ref,
            owner: uid,
            type: type,
            startDateEnglish: startDateEnglish,
            endDateEnglish: endDateEnglish,
            isEdited: false,
            isPayed: false,
            format: format
        };
        return Object.assign({}, newCampaign);
    }
    prepareSaveAdGroup(uid, campaign_id, name, status, ad_group_id) {
        const userDoc = this.afs.doc(`users/${uid}`);
        const newAdGroup = {
            campaign_id: campaign_id,
            ad_group_id: ad_group_id,
            name: name,
            status: status,
            ages: [],
            sexes: [],
            devices: [],
            youtubeChannels: [],
            criterion_youtube_channels: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userDoc.ref,
            owner: uid,
        };
        return Object.assign({}, newAdGroup);
    }
    getListCampaign(uid) {
        console.log(uid);
        return this.afs.collection('youtube-ads', (ref) => ref.where('owner', '==', `${uid}`)).snapshotChanges().pipe(map((actions) => {
            return actions.map((a) => {
                const data = a.payload.doc.data();
                return Object.assign({ id: a.payload.doc.id }, data);
            });
        }));
    }
    createAdGroup(uid, id_campagne, name, status, ad_group_id) {
        return new Promise(resolve => {
            this.adgroup = this.prepareSaveAdGroup(uid, id_campagne, name, status, ad_group_id);
            const docRef = this.afs.collection('adgroup-youtube').add(this.adgroup).then(res => {
                resolve("ok");
            });
        });
    }
    PromiseGetAdGroup(campaign_id, ad_group_id) {
        return new Promise(resolve => {
            this.getSingleAdGroupID(campaign_id, ad_group_id).subscribe(single => {
                ////console.log("getting adgroup")
                ////console.log(single)
                resolve(single[0]);
            });
        });
    }
    getSingleAdGroupID(campaign_id, ad_group_id) {
        // ////console.log(`campaign_id: ${campaign_id} ad_group_id: ${ad_group_id}`)
        return this.afs.collection('adgroup-youtube', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).snapshotChanges().pipe(map((actions) => {
            return actions.map((a) => {
                const data = a.payload.doc.data();
                return Object.assign({ id: a.payload.doc.id }, data);
            });
        }));
    }
    promiseGetListAdGroupId(campaign_id) {
        return this.afs.collection('adgroup-youtube', (ref) => ref.where('campaign_id', '==', parseInt(`${campaign_id}`))).snapshotChanges().pipe(map((actions) => {
            return actions.map((a) => {
                const data = a.payload.doc.data();
                return Object.assign({ id: a.payload.doc.id }, data);
            });
        }));
    }
    addAdGroup(campaign_id, uid, name, strategie_bid, bid) {
        return new Promise(resolve => {
            this.http.post(SERVER.url + '/addAdGroup', {
                'ad_group_name': name,
                'campaign_id': campaign_id,
                'strategie_bid': strategie_bid,
                'bid': (bid.toFixed(2) * 1000000).toFixed(0)
            })
                .subscribe(res => {
                console.log('res adgroup');
                console.log(res);
                if (res['status'] == "ok") {
                    var id = res['id'];
                    this.createAdGroup(uid, campaign_id, res['name'], res['status_adgroup'], res['id']).then(res => {
                        if (res == "ok") {
                            ////console.log(res)
                            this.PromiseGetAdGroup(campaign_id, id).then(adgroup => {
                                ////console.log(adgroup)
                                if (adgroup !== null) {
                                    var response = [];
                                    response.push({
                                        "id": adgroup['id'],
                                        "ad_group_id": id
                                    });
                                    console.log(response);
                                    resolve(response);
                                }
                            });
                        }
                    });
                }
            }, err => {
                resolve('error');
            });
        });
    }
    updateCampaign(id, data) {
        return new Promise(resolve => {
            this.getCampaign(id).update(data).then(res => {
                resolve("ok");
            });
        });
    }
    removeCampaign(id, id_campaign, ad_group_id_firebase) {
        return new Promise(resolve => {
            this.http.post(SERVER.url + "/deleteCampaign", {
                "id": id_campaign
            })
                .subscribe(res => {
                this.deleteCampaign(id).then(res => {
                    if (res == "ok") {
                        this.deleteCampaign(id).then(res_delete => {
                            if (res_delete === "ok") {
                                if (ad_group_id_firebase !== '') {
                                    this.deleteAdGroup(ad_group_id_firebase).then(res_delete_ad_group => {
                                        if (res_delete_ad_group === "ok") {
                                            resolve("ok");
                                        }
                                    });
                                }
                                else {
                                    resolve('ok');
                                }
                            }
                        });
                    }
                });
            }, err => {
            });
        });
    }
    deleteCampaign(id) {
        return new Promise((resolve) => {
            this.getCampaign(id).delete();
            resolve('ok');
        });
    }
    enableCampaign(id, id_campagne) {
        return new Promise(resolve => {
            this.http.post(SERVER.url + '/updateCampaignStatus', {
                'campaign_id': id_campagne,
                'status': 'ENABLED'
            })
                .subscribe(res => {
                if (res[0].status != "error") {
                    this.updateCampaign(id, {
                        status: res[0].status
                    }).then(res_update => {
                        if (res_update === "ok") {
                            resolve('ok');
                        }
                    });
                }
            }, err => {
            });
        });
    }
    disableCampaign(id, id_campagne) {
        return new Promise(resolve => {
            this.http.post(SERVER.url + '/updateCampaignStatus', {
                'campaign_id': id_campagne,
                'status': 'PAUSED'
            })
                .subscribe(res => {
                if (res[0].status != "error") {
                    this.updateCampaign(id, {
                        status: res[0].status
                    }).then(res_update => {
                        if (res_update === "ok") {
                            resolve('ok');
                        }
                    });
                }
            }, err => {
            });
        });
    }
    getCampaign(id) {
        return this.afs.doc(`youtube-ads/${id}`);
    }
    getAdGroup(id) {
        return this.afs.doc(`adgroup-youtube/${id}`);
    }
    updateAdgroup(id, data) {
        return new Promise(resolve => {
            this.getAdGroup(id).update(data).then(res => {
                resolve("ok");
            });
        });
    }
    deleteAdGroup(id) {
        return new Promise(resolve => {
            this.getAdGroup(id).delete();
            resolve("ok");
        });
    }
    setStrategie(strategie) {
        return new Promise(resolve => {
            if (strategie === "CPM") {
                this.strategie = "MANUAL_CPM";
                this.startegie_bid = "CpmBid";
                resolve('ok');
            }
            else if (strategie === "CPC") {
                this.strategie = "MANUAL_CPC";
                this.startegie_bid = "CpcBid";
                resolve('ok');
            }
        });
    }
    setBudgetValue(budget, dailyBudget, numberOfDays) {
        return new Promise(resolve => {
            var gain = (budget * 20) / 100;
            var new_budget = budget - gain;
            var new_daily_budget = new_budget / numberOfDays;
            this.budgetToSend = new_daily_budget * this.microDollarValue;
            this.budget = budget;
            this.realBudget = new_budget;
            this.dailyBudget = this.budget / numberOfDays;
            this.realDailyBudget = new_daily_budget;
            resolve('ok');
            /* this.updateCampaign(id, {budget: this.budget, dailyBudget: this.dailyBudget, realBudget: this.realBudget, realDailyBudget: this.realDailyBudget}) */
        });
    }
    setChannelType(type) {
        return new Promise(resolve => {
            if (type === "Display" || type === "Native") {
                this.channel = "DISPLAY";
                resolve('ok');
            }
            else if (type === "Youtube") {
                this.channel = "DISPLAY";
                resolve('ok');
            }
        });
    }
    publishYoutubeCampaignToGoogle(uid, id, email, name, startDateFormattedGoogle, endDateFormattedGoogle, budget, dailyBudget, numberOfDays, strategie, bid, type) {
        this.uid = uid;
        return new Promise(resolve => {
            this.setStrategie(strategie).then(strategie_response => {
                if (strategie_response === "ok") {
                    this.setChannelType(type).then(channel_response => {
                        if (channel_response === "ok") {
                            this.setBudgetValue(budget, dailyBudget, numberOfDays).then(budget_response => {
                                if (budget_response === "ok") {
                                    this.http.post(SERVER.url + '/addCampaign', {
                                        'email': email,
                                        'campaign_name': name,
                                        'startDate': startDateFormattedGoogle,
                                        'endDate': endDateFormattedGoogle,
                                        'budget': this.budgetToSend,
                                        'strategie': this.strategie,
                                        'channel': this.channel
                                    })
                                        .subscribe(res => {
                                        if (res['status'] == "ok") {
                                            this.currentCampaignId = res['id'];
                                            this.currentCampaignIfFirebase = id;
                                            this.updateCampaign(id, { id_campagne: res['id'], status: res['status_campaign'], servingStatus: res['servingStatus'], budgetId: res['budgetId'] }).then(update_campaign => {
                                                if (update_campaign === "ok") {
                                                    console.log(update_campaign + " update campaign");
                                                    this.addAdGroup(res['id'], uid, name, this.startegie_bid, bid).then(adgroup => {
                                                        if (adgroup !== "error") {
                                                            console.log('adgroup');
                                                            console.log(adgroup);
                                                            this.currentAdGroupId = adgroup[0]['ad_group_id'];
                                                            this.currentAdGroupIdFirebase = adgroup[0]['id'];
                                                            this.updateCampaign(id, { ad_group_id: adgroup[0]['ad_group_id'], ad_group_id_firebase: adgroup[0]['id'] }).then(update_again => {
                                                                if (update_again === "ok") {
                                                                    resolve('ok');
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                        else {
                                            resolve('error');
                                            console.log(res);
                                        }
                                    }, err => {
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    getAdGroupAge(campaign_id, ad_group_id) {
        return new Promise(resolve => {
            this.afs.collection('adgroup-youtube', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).valueChanges().subscribe(el => {
                resolve(el[0]['ages']);
            });
        });
    }
    targetAge(age) {
        return new Promise(resolve => {
            this.getAdGroupAge(this.currentCampaignId, this.currentAdGroupId).then(value => {
                this.http.post(SERVER.url + '/targetAge', {
                    'ad_group_id': this.currentAdGroupId,
                    'ages': age,
                    'last_ages': value
                })
                    .subscribe(res => {
                    this.updateAdgroup(this.currentAdGroupIdFirebase, { ages: age }).then(res => {
                        if (res == "ok") {
                            resolve('ok');
                        }
                        else {
                            resolve('error');
                        }
                    });
                }, err => {
                    resolve('error');
                });
            });
        });
    }
    getAdGroupGenre(campaign_id, ad_group_id) {
        return new Promise(resolve => {
            this.afs.collection('adgroup-youtube', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).valueChanges().subscribe(el => {
                resolve(el[0]['sexes']);
            });
        });
    }
    targetGenre(genre) {
        return new Promise(resolve => {
            this.getAdGroupGenre(this.currentCampaignId, this.currentAdGroupId).then(value => {
                this.http.post(SERVER.url + '/targetGender', {
                    'ad_group_id': this.currentAdGroupId,
                    'sexes': genre,
                    'last_genre': value
                })
                    .subscribe(res => {
                    // ////console.log(`res from location backend: ${res}`)
                    this.updateAdgroup(this.currentAdGroupIdFirebase, { sexes: genre }).then(res => {
                        if (res == "ok") {
                            resolve('ok');
                        }
                        else {
                            resolve('error');
                        }
                    });
                }, err => {
                    resolve('error');
                });
            });
        });
    }
    getAdGroupDevices(campaign_id, ad_group_id) {
        return new Promise(resolve => {
            this.afs.collection('adgroup-youtube', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).valueChanges().subscribe(el => {
                resolve(el[0]['devices']);
            });
        });
    }
    targetDevices(devices) {
        return new Promise(resolve => {
            this.getAdGroupDevices(this.currentCampaignId, this.currentAdGroupId).then(value => {
                this.http.post(SERVER.url + '/targetDevices', {
                    'ad_group_id': this.currentAdGroupId,
                    'devices': devices,
                    'last_devices': value
                })
                    .subscribe(res => {
                    this.updateAdgroup(this.currentAdGroupIdFirebase, { devices: devices }).then(res => {
                        if (res == "ok") {
                            resolve('ok');
                        }
                        else {
                            resolve('error');
                        }
                    });
                }, err => {
                    resolve('error');
                });
            });
        });
    }
    getAdGroupPlacement(campaign_id, ad_group_id) {
        return new Promise(resolve => {
            this.afs.collection('adgroup-youtube', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).valueChanges().forEach(el => {
                resolve(el[0]['criterion_placement']);
            });
        });
    }
    targetPlacement(placement) {
        return new Promise(resolve => {
            this.getAdGroupPlacement(this.currentCampaignId, this.currentAdGroupId).then(value => {
                this.http.post(SERVER.url + '/setPlacement', {
                    'ad_group_id': this.currentAdGroupId,
                    'placement': placement,
                    'last_placement': value
                })
                    .subscribe(res => {
                    this.updateAdgroup(this.currentAdGroupIdFirebase, { placement: placement, criterion_placement: res }).then(res => {
                        if (res == "ok") {
                            resolve('ok');
                        }
                        else {
                            resolve('error');
                        }
                    });
                }, err => {
                    resolve('error');
                });
            });
        });
    }
    getAdGroupYoutube(campaign_id, ad_group_id) {
        return new Promise(resolve => {
            this.afs.collection('adgroup-youtube', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).valueChanges().forEach(el => {
                resolve(el[0]['criterion_placement']);
            });
        });
    }
    targetYoutueChannels(youtubeChannels) {
        return new Promise(resolve => {
            this.getAdGroupYoutube(this.currentCampaignId, this.currentAdGroupId).then(value => {
                this.http.post(SERVER.url + '/targetYoutubeChannels', {
                    'ad_group_id': this.currentAdGroupId,
                    'channels': youtubeChannels,
                })
                    .subscribe(res => {
                    this.updateAdgroup(this.currentAdGroupIdFirebase, { youtubeChannels: youtubeChannels, criterion_youtube_channels: res }).then(res => {
                        if (res == "ok") {
                            resolve('ok');
                        }
                        else {
                            resolve('error');
                        }
                    });
                }, err => {
                    resolve('error');
                });
            });
        });
    }
    targetLocation(name, location) {
        return new Promise(resolve => {
            this.getCampaignZones(this.currentCampaignId, name).then(value => {
                //////console.log(`promise result: ${value}`)
                this.http.post(SERVER.url + '/targetLocation', {
                    'campaign_id': this.currentCampaignId,
                    'location_id': location
                })
                    .subscribe(res => {
                    //////console.log(`res from location backend: ${res}`)
                    this.updateCampaign(this.currentCampaignIfFirebase, { zones: location }).then(response => {
                        if (response == "ok") {
                            resolve('ok');
                        }
                    });
                }, err => {
                    resolve('error');
                });
            });
        });
    }
    concateLocation(previousLocation, location) {
        return new Promise(resolve => {
            if (previousLocation.length > 0) {
                this.newLocation = [...previousLocation, ...location];
                resolve("ok");
            }
            else {
                this.newLocation = location;
                resolve("ok");
            }
        });
    }
    getCampaignZones(campaign_id, name) {
        return new Promise(resolve => {
            console.log(this.currentCampaignId);
            setTimeout(() => {
                this.afs.collection('youtube-ads', (ref) => ref.where('name', '==', name).where('owner', '==', this.uid).where('id_campagne', '==', campaign_id)).valueChanges().subscribe(el => {
                    //////console.log(el[0]['zones'])
                    resolve(el[0]['zones']);
                });
            }, 2000);
        });
    }
};
YoutubeService = tslib_1.__decorate([
    Injectable()
], YoutubeService);
export { YoutubeService };
//# sourceMappingURL=youtube.service.js.map