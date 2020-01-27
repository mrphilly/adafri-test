import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { SERVER } from 'src/environments/environment';
let GoogleDisplayService = class GoogleDisplayService {
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
        this.currentAdGroupPlacement = [];
        this.currentAdGroupCriterionPlacement = [];
        this.currentAdGroupAge = [];
        this.currentAdGroupGenders = [];
        this.currentAdGroupDevices = [];
        this.currentAdGroupCriterionAge = [];
        this.currentLocation = [];
        this.currentCriterionLocation = [];
        this.campaignDisplayCollection = this.afs.collection('adwords-display', (ref) => ref.where('owner', '==', this.uid));
        this.adGroupCollection = this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', parseInt(`${this.campaign_id}`)));
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
            this.campaignDisplay = this.prepareSaveCampaign(uid, name, status, startDate, endDate, numberOfDays, budget, dailyBudget, realBudget, url, zones, placement, ages, genders, devices, strategie, bid, images, type, startDateFrench, endDateFrench, startDateFormattedGoogle, endDateFormattedGoogle, startDateEnglish, endDateEnglish, format);
            const docRef = this.campaignDisplayCollection.add(this.campaignDisplay);
            docRef
                .then(() => {
                resolve("ok");
            })
                .catch(() => {
                resolve("error");
            });
        });
    }
    prepareSaveCampaign(uid, name, status, startDate, endDate, numberOfDays, budget, dailyBudget, realBudget, url, zones, placement, ages, genders, devices, strategie, bid, images, type, startDateFrench, endDateFrench, startDateFormattedGoogle, endDateFormattedGoogle, startDateEnglish, endDateEnglish, format) {
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
            placement: placement,
            strategie: strategie,
            bid: bid,
            images: images,
            criterion_zones: [],
            criterion_ages: [],
            criterion_sexes: [],
            criterion_devices: [],
            criterion_placement: [],
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
            placement: [],
            criterion_placement: [],
            criterion_ages: [],
            criterion_sexes: [],
            criterion_devices: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userDoc.ref,
            owner: uid,
        };
        return Object.assign({}, newAdGroup);
    }
    getListCampaign(uid) {
        console.log(uid);
        return this.afs.collection('adwords-display', (ref) => ref.where('owner', '==', `${uid}`)).snapshotChanges().pipe(map((actions) => {
            return actions.map((a) => {
                const data = a.payload.doc.data();
                return Object.assign({ id: a.payload.doc.id }, data);
            });
        }));
    }
    createAdGroup(uid, id_campagne, name, status, ad_group_id) {
        return new Promise(resolve => {
            this.adgroup = this.prepareSaveAdGroup(uid, id_campagne, name, status, ad_group_id);
            const docRef = this.afs.collection('adgroup').add(this.adgroup).then(res => {
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
        return this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).snapshotChanges().pipe(map((actions) => {
            return actions.map((a) => {
                const data = a.payload.doc.data();
                return Object.assign({ id: a.payload.doc.id }, data);
            });
        }));
    }
    promiseGetListAdGroupId(campaign_id) {
        return this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', parseInt(`${campaign_id}`))).snapshotChanges().pipe(map((actions) => {
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
        return this.afs.doc(`adwords-display/${id}`);
    }
    getAdGroup(id) {
        return this.afs.doc(`adgroup/${id}`);
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
            if (type === "Display") {
                this.channel = "DISPLAY";
                resolve('ok');
            }
            else if (type === "Native") {
                this.channel = "DISPLAY";
                resolve('ok');
            }
        });
    }
    updateCampaignName(id, name, email, campaign_id, type) {
        return new Promise(resolve => {
            this.http.post(SERVER.url + '/updateCampaignName', {
                'email': email,
                'name': name,
                'campaign_id': campaign_id,
                'type': type
            })
                .subscribe(res => {
                if (res[0]['status'] === "ok") {
                    this.updateCampaign(id, { name: name }).then(res_update_campaign => {
                        if (res_update_campaign === "ok") {
                            resolve('ok');
                        }
                    });
                }
            }, err => {
                resolve('error');
            });
        });
    }
    updateCampaignEndDate(id, campaign_id, numberOfDays, endDateEnglish, endDateFrench, endDateFormattedGoogle, endDate) {
        return new Promise(resolve => {
            this.http.post(SERVER.url + '/updateCampaignEndDate', {
                'campaign_id': campaign_id,
                'endDate': endDateFormattedGoogle
            })
                .subscribe(res => {
                console.log(res);
                if (res[0]['status'] === "ok") {
                    this.updateCampaign(id, { numberOfDays: numberOfDays, endDateFrench: endDateFrench, endDateFormattedGoogle: endDateFormattedGoogle, endDateEnglish: endDateEnglish, endDate: endDate }).then(res_update_campaign => {
                        if (res_update_campaign === "ok") {
                            resolve('ok');
                        }
                    });
                }
            }, err => {
                resolve('error');
            });
        });
    }
    updateCampaignStartDate(id, campaign_id, numberOfDays, startDateEnglish, startDateFrench, startDateFormattedGoogle, startDate) {
        return new Promise(resolve => {
            this.http.post(SERVER.url + '/updateCampaignEndDate', {
                'campaign_id': campaign_id,
                'endDate': startDateFormattedGoogle
            })
                .subscribe(res => {
                console.log(res);
                if (res[0]['status'] === "ok") {
                    this.updateCampaign(id, { numberOfDays: numberOfDays, startDateFrench: startDateFrench, startDateFormattedGoogle: startDateFormattedGoogle, startDateEnglish: startDateEnglish, startDate: startDate }).then(res_update_campaign => {
                        if (res_update_campaign === "ok") {
                            resolve('ok');
                        }
                    });
                }
            }, err => {
                resolve('error');
            });
        });
    }
    publishCampaignToGoogle(uid, id, email, name, startDateFormattedGoogle, endDateFormattedGoogle, budget, dailyBudget, numberOfDays, strategie, bid, type) {
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
                                        'budget': this.budgetToSend.toFixed(0),
                                        'strategie': this.strategie,
                                        'channel': this.channel,
                                        'type': type
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
            this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).valueChanges().subscribe(el => {
                resolve(el[0]['ages']);
            });
        });
    }
    getNewCriterionAge(criterion) {
        console.log(criterion);
        return new Promise(resolve => {
            this.currentAdGroupCriterionAge.push({
                "criterion_type": "AGE_RANGE",
                "criterion_id": criterion,
                "id": ""
            });
            resolve('ok');
        });
    }
    getNewAge(age) {
        console.log(age);
        return new Promise(resolve => {
            this.currentAdGroupAge.splice(this.currentAdGroupAge.indexOf(age), 1);
            resolve('ok');
        });
    }
    getNewAgeAfterEnable(ages) {
        console.log(ages);
        return new Promise(resolve => {
            for (var i = 0; i < ages.length; i++) {
                this.currentAdGroupAge.push(ages[i]);
            }
            resolve('ok');
        });
    }
    removeAge(criterion, campaign_id, ad_group_id, ad_group_id_firebase) {
        return new Promise(resolve => {
            this.getAdGroupPlacementValue(campaign_id, ad_group_id).then(res_placement => {
                if (res_placement === "ok") {
                    this.http.post(SERVER.url + '/excludeAge', {
                        'ad_group_id': ad_group_id,
                        'criterion': criterion,
                    })
                        .subscribe(res => {
                        console.log(res);
                        if (res[0]['status'] === "ok") {
                            this.getNewAge(criterion).then(res_new_age => {
                                if (res_new_age === "ok") {
                                    this.updateAdgroup(ad_group_id_firebase, { ages: this.currentAdGroupAge, criterion_ages: this.currentAdGroupCriterionAge }).then(res => {
                                        if (res == "ok") {
                                            resolve('ok');
                                        }
                                    });
                                }
                            });
                        }
                    }, err => {
                        resolve('error');
                    });
                }
            });
        });
    }
    enableAge(criterion, campaign_id, ad_group_id, ad_group_id_firebase) {
        return new Promise(resolve => {
            this.getAdGroupPlacementValue(campaign_id, ad_group_id).then(res_placement => {
                if (res_placement === "ok") {
                    this.http.post(SERVER.url + '/enableAge', {
                        'ad_group_id': ad_group_id,
                        'criterion': criterion,
                    })
                        .subscribe(res => {
                        console.log(res);
                        if (res[0]['status'] === "ok") {
                            this.getNewAgeAfterEnable(criterion).then(res_new_age => {
                                if (res_new_age === "ok") {
                                    this.updateAdgroup(ad_group_id_firebase, { ages: this.currentAdGroupAge, criterion_ages: this.currentAdGroupCriterionAge }).then(res => {
                                        if (res == "ok") {
                                            resolve('ok');
                                        }
                                    });
                                }
                            });
                        }
                    }, err => {
                        resolve('error');
                    });
                }
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
                    if (res.toString().length > 0) {
                        this.updateAdgroup(this.currentAdGroupIdFirebase, { ages: age, criterion_ages: res }).then(res => {
                            if (res == "ok") {
                                resolve('ok');
                            }
                            else {
                                resolve('error');
                            }
                        });
                    }
                }, err => {
                    resolve('error');
                });
            });
        });
    }
    getAdGroupGenre(campaign_id, ad_group_id) {
        return new Promise(resolve => {
            this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).valueChanges().subscribe(el => {
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
                    if (res.toString().length > 0) {
                        this.updateAdgroup(this.currentAdGroupIdFirebase, { sexes: genre, criterion_sexes: res }).then(res => {
                            if (res == "ok") {
                                resolve('ok');
                            }
                            else {
                                resolve('error');
                            }
                        });
                    }
                }, err => {
                    resolve('error');
                });
            });
        });
    }
    getNewGender(gender) {
        console.log(gender);
        return new Promise(resolve => {
            this.currentAdGroupGenders.splice(this.currentAdGroupGenders.indexOf(gender), 1);
            resolve('ok');
        });
    }
    getNewGenderAfterEnable(genders) {
        console.log(genders);
        return new Promise(resolve => {
            for (var i = 0; i < genders.length; i++) {
                this.currentAdGroupGenders.push(genders[i]);
            }
            resolve('ok');
        });
    }
    removeGender(criterion, campaign_id, ad_group_id, ad_group_id_firebase) {
        return new Promise(resolve => {
            this.getAdGroupPlacementValue(campaign_id, ad_group_id).then(res_placement => {
                if (res_placement === "ok") {
                    this.http.post(SERVER.url + '/excludeGender', {
                        'ad_group_id': ad_group_id,
                        'criterion': criterion,
                    })
                        .subscribe(res => {
                        console.log(res);
                        if (res[0]['status'] === "ok") {
                            this.getNewGender(criterion).then(res_new_gender => {
                                if (res_new_gender === "ok") {
                                    this.updateAdgroup(ad_group_id_firebase, { sexes: this.currentAdGroupGenders }).then(res => {
                                        if (res == "ok") {
                                            resolve('ok');
                                        }
                                    });
                                }
                            });
                        }
                    }, err => {
                        resolve('error');
                    });
                }
            });
        });
    }
    enableGender(criterion, campaign_id, ad_group_id, ad_group_id_firebase) {
        return new Promise(resolve => {
            this.getAdGroupPlacementValue(campaign_id, ad_group_id).then(res_placement => {
                if (res_placement === "ok") {
                    this.http.post(SERVER.url + '/enableGender', {
                        'ad_group_id': ad_group_id,
                        'criterion': criterion,
                    })
                        .subscribe(res => {
                        console.log(res);
                        if (res[0]['status'] === "ok") {
                            this.getNewGenderAfterEnable(criterion).then(res_new_gender => {
                                if (res_new_gender === "ok") {
                                    this.updateAdgroup(ad_group_id_firebase, { sexes: this.currentAdGroupGenders }).then(res => {
                                        if (res == "ok") {
                                            resolve('ok');
                                        }
                                    });
                                }
                            });
                        }
                    }, err => {
                        resolve('error');
                    });
                }
            });
        });
    }
    getAdGroupDevices(campaign_id, ad_group_id) {
        return new Promise(resolve => {
            this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).valueChanges().subscribe(el => {
                resolve(el[0]['devices']);
            });
        });
    }
    getNewDevice(device) {
        console.log(device);
        return new Promise(resolve => {
            this.currentAdGroupDevices.splice(this.currentAdGroupDevices.indexOf(device), 1);
            resolve('ok');
        });
    }
    getNewDeviceAfterEnable(devices) {
        console.log(devices);
        return new Promise(resolve => {
            for (var i = 0; i < devices.length; i++) {
                this.currentAdGroupDevices.push(devices[i]);
            }
            resolve('ok');
        });
    }
    removeDevice(criterion, campaign_id, ad_group_id, ad_group_id_firebase) {
        return new Promise(resolve => {
            this.getAdGroupPlacementValue(campaign_id, ad_group_id).then(res_placement => {
                if (res_placement === "ok") {
                    this.http.post(SERVER.url + '/removeDevice', {
                        'ad_group_id': ad_group_id,
                        'criterion': criterion,
                    })
                        .subscribe(res => {
                        console.log(res);
                        if (res[0]['status'] === "ok") {
                            this.getNewDevice(criterion).then(res_new_device => {
                                if (res_new_device === "ok") {
                                    this.updateAdgroup(ad_group_id_firebase, { devices: this.currentAdGroupDevices }).then(res => {
                                        if (res == "ok") {
                                            resolve('ok');
                                        }
                                    });
                                }
                            });
                        }
                    }, err => {
                        resolve('error');
                    });
                }
            });
        });
    }
    enableDevice(criterion, campaign_id, ad_group_id, ad_group_id_firebase) {
        return new Promise(resolve => {
            this.getAdGroupPlacementValue(campaign_id, ad_group_id).then(res_placement => {
                if (res_placement === "ok") {
                    this.http.post(SERVER.url + '/enableDevice', {
                        'ad_group_id': ad_group_id,
                        'criterion': criterion,
                    })
                        .subscribe(res => {
                        console.log(res);
                        if (res[0]['status'] === "ok") {
                            this.getNewDeviceAfterEnable(criterion).then(res_new_device => {
                                if (res_new_device === "ok") {
                                    this.updateAdgroup(ad_group_id_firebase, { devices: this.currentAdGroupDevices }).then(res => {
                                        if (res == "ok") {
                                            resolve('ok');
                                        }
                                    });
                                }
                            });
                        }
                    }, err => {
                        resolve('error');
                    });
                }
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
                    if (res.toString().length > 0) {
                        this.updateAdgroup(this.currentAdGroupIdFirebase, { devices: devices, criterion_devices: res }).then(res => {
                            if (res == "ok") {
                                resolve('ok');
                            }
                            else {
                                resolve('error');
                            }
                        });
                    }
                }, err => {
                    resolve('error');
                });
            });
        });
    }
    getAdGroupPlacementValue(campaign_id, ad_group_id) {
        return new Promise(resolve => {
            this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).valueChanges().forEach(el => {
                this.currentAdGroupCriterionPlacement = el[0]['criterion_placement'];
                this.currentAdGroupPlacement = el[0]['placement'];
                this.currentAdGroupCriterionAge = el[0]['criterion_ages'];
                this.currentAdGroupAge = el[0]['ages'];
                this.currentAdGroupGenders = el[0]['sexes'];
                this.currentAdGroupDevices = el[0]['devices'];
                resolve('ok');
            });
        });
    }
    getAdGroupPlacement(campaign_id, ad_group_id) {
        return new Promise(resolve => {
            this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', campaign_id).where('ad_group_id', '==', ad_group_id)).valueChanges().forEach(el => {
                this.currentAdGroupCriterionPlacement = el[0]['criterion_placement'];
                resolve(el[0]['criterion_placement']);
            });
        });
    }
    targetPlacement(placement) {
        return new Promise(resolve => {
            this.getAdGroupPlacement(this.currentCampaignId, this.currentAdGroupId).then(criterion_value => {
                this.http.post(SERVER.url + '/setPlacement', {
                    'ad_group_id': this.currentAdGroupId,
                    'placement': placement,
                    'last_placement': criterion_value
                })
                    .subscribe(res => {
                    if (res.toString().length > 0) {
                        this.updateAdgroup(this.currentAdGroupIdFirebase, { placement: placement, criterion_placement: res }).then(res => {
                            if (res == "ok") {
                                resolve('ok');
                            }
                            else {
                                resolve('error');
                            }
                        });
                    }
                }, err => {
                    resolve('error');
                });
            });
        });
    }
    addNewPlacement(placement, id, campaign_id, ad_group_id, ad_group_id_firebase) {
        return new Promise(resolve => {
            this.getAdGroupPlacementValue(campaign_id, ad_group_id).then(res_placement => {
                if (res_placement === "ok") {
                    this.http.post(SERVER.url + '/setPlacement', {
                        'ad_group_id': ad_group_id,
                        'placement': placement,
                        'last_placement': []
                    })
                        .subscribe(res => {
                        if (res.toString().length > 0) {
                            this.updateAdgroup(ad_group_id_firebase, { placement: this.currentAdGroupPlacement.concat(placement), criterion_placement: this.currentAdGroupCriterionPlacement.concat(res) }).then(res => {
                                if (res == "ok") {
                                    resolve('ok');
                                }
                                else {
                                    resolve('error');
                                }
                            });
                        }
                    }, err => {
                        resolve('error');
                    });
                }
            });
        });
    }
    getNewCriterionPlacement(criterion) {
        console.log(criterion);
        return new Promise(resolve => {
            for (var i = 0; i < this.currentAdGroupCriterionPlacement.length; i++) {
                if (this.currentAdGroupCriterionPlacement[i].criterion_id === criterion) {
                    this.currentAdGroupCriterionPlacement.splice(i, 1);
                }
            }
            resolve('ok');
        });
    }
    getNewPlacement(placement) {
        console.log(placement);
        return new Promise(resolve => {
            for (var i = 0; i < this.currentAdGroupPlacement.length; i++) {
                if (this.currentAdGroupPlacement[i] === placement) {
                    this.currentAdGroupPlacement.splice(i, 1);
                }
            }
            resolve('ok');
        });
    }
    removePlacement(criterion, placement, campaign_id, ad_group_id, ad_group_id_firebase) {
        return new Promise(resolve => {
            this.getAdGroupPlacementValue(campaign_id, ad_group_id).then(res_placement => {
                if (res_placement === "ok") {
                    this.http.post(SERVER.url + '/removeSinglePlacement', {
                        'ad_group_id': ad_group_id,
                        'criterion': criterion,
                    })
                        .subscribe(res => {
                        console.log(res);
                        if (res[0]['status'] === "ok") {
                            this.getNewPlacement(placement).then(res_new_placement => {
                                if (res_new_placement === "ok") {
                                    this.getNewCriterionPlacement(criterion).then(res_new_criterion => {
                                        if (res_new_criterion === "ok") {
                                            this.updateAdgroup(ad_group_id_firebase, { placement: this.currentAdGroupPlacement, criterion_placement: this.currentAdGroupCriterionPlacement }).then(res => {
                                                if (res == "ok") {
                                                    resolve('ok');
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }, err => {
                        resolve('error');
                    });
                }
            });
        });
    }
    targetYoutueChannels(youtubeChannels) {
        return new Promise(resolve => {
            this.getAdGroupPlacement(this.currentCampaignId, this.currentAdGroupId).then(value => {
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
    getNewCriterionLocation(criterion, currentCriterion) {
        console.log(criterion);
        return new Promise(resolve => {
            for (var i = 0; i < currentCriterion.length; i++) {
                if (currentCriterion[i].criterion_id === criterion) {
                    currentCriterion.splice(i, 1);
                    this.currentCriterionLocation = currentCriterion;
                }
            }
            resolve('ok');
        });
    }
    getNewLocation(location, currentLocation) {
        console.log(location);
        return new Promise(resolve => {
            for (var i = 0; i < currentLocation.length; i++) {
                if (currentLocation[i] === location) {
                    currentLocation.splice(i, 1);
                    this.currentLocation = currentLocation;
                }
            }
            resolve('ok');
        });
    }
    getCampaignData(id) {
        return new Promise(resolve => {
            this.getCampaign(id).valueChanges().forEach(data => {
                if (data.length > 0) {
                    this.currentLocation = data[0]['zones'];
                    this.currentCriterionLocation = data[0]['criterion_zones'];
                    resolve('ok');
                }
                else {
                    this.currentLocation = [];
                    this.currentCriterionLocation = [];
                    resolve('ok');
                }
            });
        });
    }
    removeLocation(criterion, location, id, campaign_id) {
        return new Promise(resolve => {
            this.getCampaignData(id).then(res_location => {
                if (res_location === "ok") {
                    this.http.post(SERVER.url + '/removeLocation', {
                        'campaign_id': campaign_id,
                        'location': criterion,
                    })
                        .subscribe(res => {
                        console.log(res);
                        if (res[0]['status'] === "ok") {
                            this.getNewLocation(location, this.currentLocation).then(res_new_placement => {
                                if (res_new_placement === "ok") {
                                    this.getNewCriterionLocation(criterion, this.currentCriterionLocation).then(res_new_criterion => {
                                        if (res_new_criterion === "ok") {
                                            this.updateCampaign(id, { zones: this.currentLocation, criterion_zones: this.currentCriterionLocation }).then(res => {
                                                if (res == "ok") {
                                                    resolve('ok');
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }, err => {
                        resolve('error');
                    });
                }
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
                    if (res.toString().length > 0) {
                        //////console.log(`res from location backend: ${res}`)
                        this.updateCampaign(this.currentCampaignIfFirebase, { zones: location, criterion_zones: res }).then(response => {
                            if (response == "ok") {
                                resolve('ok');
                            }
                        });
                    }
                }, err => {
                    resolve('error');
                });
            });
        });
    }
    addNewtargetLocation(id, location, campaign_id) {
        return new Promise(resolve => {
            this.getCampaignData(id).then(res_data => {
                //////console.log(`promise result: ${value}`)
                if (res_data === "ok") {
                    this.http.post(SERVER.url + '/targetLocation', {
                        'campaign_id': campaign_id,
                        'location_id': location
                    })
                        .subscribe(res => {
                        if (res.toString().length > 0) {
                            //////console.log(`res from location backend: ${res}`)
                            this.updateCampaign(id, { zones: this.currentLocation.concat(location), criterion_zones: this.currentCriterionLocation.concat(res) }).then(response => {
                                if (response == "ok") {
                                    resolve('ok');
                                }
                            });
                        }
                    }, err => {
                        resolve('error');
                    });
                }
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
                this.afs.collection('adwords-display', (ref) => ref.where('name', '==', name).where('owner', '==', this.uid).where('id_campagne', '==', campaign_id)).valueChanges().subscribe(el => {
                    //////console.log(el[0]['zones'])
                    resolve(el[0]['zones']);
                });
            }, 2000);
        });
    }
    prepareSaveAd(ad_id, ad_group_id, ad_name, status, url_image, image_content, displayUrl, finalUrls, finalMobileUrls, finalAppUrls, referenceId, automated, uid, size, ad_type) {
        const userDoc = this.afs.doc(`users/${uid}`);
        const newAd = {
            ad_id: ad_id,
            ad_name: ad_name,
            ad_group_id: ad_group_id,
            status: status,
            url_image: url_image,
            image_content: image_content,
            displayUrl: displayUrl,
            finalUrls: finalUrls,
            finalMobileUrls: finalMobileUrls,
            finalAppUrls: finalAppUrls,
            referenceId: referenceId,
            automated: automated,
            combinedApprovalStatus: "",
            policy: "",
            size: size,
            ad_type: ad_type,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userDoc.ref,
            owner: uid,
        };
        return Object.assign({}, newAd);
    }
    createAd(ad_id, ad_group_id, ad_name, status, url_image, image_content, displayUrl, finalUrls, finalMobileUrls, finalAppUrls, referenceId, automated, uid, size, ad_type) {
        return new Promise(resolve => {
            this.adsModel = this.prepareSaveAd(ad_id, ad_group_id, ad_name, status, url_image, image_content, displayUrl, finalUrls, finalMobileUrls, finalAppUrls, referenceId, automated, uid, size, ad_type);
            const docRef = this.afs.collection('ads').add(this.adsModel);
            resolve('ok');
        });
    }
    addAd(uid, ad_name, image_url, image_content, finalUrls, size, ad_type) {
        return new Promise(resolve => {
            this.http.post(SERVER.url + '/addAd', {
                'ad_group_id': this.currentAdGroupId,
                'url_image': image_url,
                'ad_name': ad_name,
                'finalUrls': [finalUrls],
                'finalAppUrls': [],
                'finalMobileUrls': [],
                'width': size[0]['width'].toString(),
                'height': size[0]['height'].toString(),
                "size": size
            })
                .subscribe(res => {
                if (res.toString().length > 0) {
                    var response = res['ad'][0];
                    this.createAd(response['ad_id'], this.currentAdGroupId, ad_name, response['status'], response['url_image'], image_content, response['displayUrl'], response['finalUrls'], response['finalMobileUrls'], response['finalAppUrls'], response['referenceId'], response['automated'], uid, size, ad_type).then(res_create => {
                        if (res_create == "ok") {
                            resolve('ok');
                        }
                    });
                }
            }, err => {
                resolve('error');
            });
        });
    }
    updateAd(id, data) {
        return new Promise(resolve => {
            this.getAd(id).update(data);
            resolve("ok");
        });
    }
    deleteAd(id) {
        return new Promise(resolve => {
            this.getAd(id).delete().then(() => {
                resolve('ok');
            });
        });
    }
    getAd(id) {
        return this.afs.doc(`ads/${id}`);
    }
};
GoogleDisplayService = tslib_1.__decorate([
    Injectable()
], GoogleDisplayService);
export { GoogleDisplayService };
//# sourceMappingURL=google-display.service.js.map