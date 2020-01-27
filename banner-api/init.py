# coding=utf-8
from flask import Flask, render_template, request, session, redirect, url_for,send_from_directory, jsonify
from urllib.parse import quote
import sys
import json
import cgi
import os
import googleads
from googleads import adwords
from ads import ads
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
import base64
from io import BytesIO
from PIL import Image
import suds
from flask_cors import CORS
import time
import requests
import sqlite3
from ads_scripts.basic_operations.add_campaigns import add_campaign
from ads_scripts.basic_operations.add_youtube_campaigns import add_youtube_campaign
from ads_scripts.basic_operations.get_campaigns_with_awql import get_campaign_with_email
from ads_scripts.basic_operations.add_ad_groups import add_ad_groups
from ads_scripts.basic_operations.get_ad_groups import get_ad_group
from ads_scripts.advanced_operations.add_responsive_display_ad import add_responsive_display_ad
from ads_scripts.basic_operations.remove_campaign import deleteCampaign
from ads_scripts.basic_operations.update_campaign_status import UpdateCampaignStatus
from ads_scripts.basic_operations.update_campaign_name import UpdateCampaignName
from ads_scripts.basic_operations.update_campaign_name_and_status import UpdateCampaignNameAndStatus
from ads_scripts.targeting.targeting_ages import TargetAge
from ads_scripts.targeting.targeting_sexe import TargetSexe
from ads_scripts.targeting.targeting_sexe_remove import TargetSexeRemove 
from ads_scripts.targeting.target_location import TargetLocation
from ads_scripts.targeting.target_youtube_channels import TargetYoutubeChannels, RemoveYoutubeChannels
from ads_scripts.targeting.update_location import UpdateLocation
from ads_scripts.basic_operations.update_ad_group_status import UpdateAdGroupStatus
from ads_scripts.basic_operations.remove_ad_group import DeleteAdGroup
""" from ads_scripts.basic_operations.update_campaign_start_date import UpdateCampaignStartDate """
from ads_scripts.basic_operations.update_campaign_dates import UpdateCampaignStartDate, UpdateCampaignEndDate

from ads_scripts.basic_operations.get_campaigns_data import get_campaigns_data
from ads_scripts.targeting.remove_ad_group_gender import RemoveTargetGender, EnableTargetGender
from ads_scripts.targeting.remove_ad_group_age import RemoveTargetAge, EnableTargetAge
from ads_scripts.targeting.target_devices import TargetDevices, EnableTargetDevice, RemoveTargetDevice
from ads_scripts.advanced_operations.add_display import add_display_ad
from ads_scripts.advanced_operations.add_responsive_display_ad import add_responsive_display_ad
from ads_scripts.basic_operations.change_ad_status import ChangeAdStatus
from ads_scripts.basic_operations.remove_ad import RemoveAd
from ads_scripts.basic_operations.update_budget import UpdateBudget

from ads_scripts.basic_operations.update_bid import UpdateBid
from ads_scripts.basic_operations.update_ad import UpdateAd
from ads_scripts.targeting.placement import SetPlacement

from ads_scripts.targeting.target_age_level_campaign import TargetAgeLevelCampaign
from ads_scripts.targeting.remove_single_placemnet import RemoveSinglePlacement
from ads_scripts.reporting.download_criteria_report_with_awql import get_campaign_report_performance
from ads_scripts.campaign_management.get_all_disapproved_ads import getPolicySummurry
from ads_scripts.targeting.target_adshedule import AdShedule
from ads_scripts.targeting.update_adshedule import UpdateAdShedule
from ads_scripts.targeting.delete_adshedule import DeleteAllAdShedule
from ads_scripts.targeting.remove_previous_targeting_location import RemoveLocation
from ads_scripts.reporting.download_criteria_report_with_awql import get_campaign_report_performance




app = Flask(__name__)
CORS(app)
REDIRECT_HTTPS = "http://"
#REDIRECT_HTTPS = "https://"
#URL_SERVER = "https://backend.adafri.com"
#FRONT_END_URL = "https://www.adafri.com"
FRONT_END_URL = "http://localhost:4200"
URL_SERVER = "http://127.0.0.1:5000"
UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
app.config['JSON_SORT_KEYS'] = False
NUMBER_OF_CAMPAIGNS_TO_ADD = 1
NUMBER_OF_ADGROUPS_TO_ADD = 1
NUMBER_OF_KEYWORDS_TO_ADD = 5
DESCRIPTION = ""
EMAIL = ""
TITRE = ""
IMG = ""
TAB = []
USER = ""
CAMPAGNE_NAME = ""




@app.route("/getPolicySummury", methods=["POST"])
def getPolicy():
    ad_group_id = request.json['ad_group_id']
    print(ad_group_id)
    adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    policy = getPolicySummurry(adwords_client, ad_group_id)
    return jsonify(policy)





@app.route("/changeAdStatus", methods=['POST'])
def changeStatusAd():
    ad_id = request.json['ad_id']
    ad_group_id = request.json['ad_group_id']
    last_status = request.json['last_status']
    print(last_status)
    adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    update = ChangeAdStatus(adwords_client, ad_group_id, ad_id, last_status)
    return jsonify(update)



@app.route('/removeAd', methods=['POST'])
def removeAd():
    ad_id = request.json['ad_id']
    ad_group_id = request.json['ad_group_id']
    print(ad_id)
    print(ad_group_id)
    adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    remove = RemoveAd(adwords_client, ad_group_id, ad_id)
    return jsonify(remove)




@app.route('/UpdateAd', methods=['POST'])
def updateAd():
     ad_group_id = request.json['ad_group_id']
     ad_id = request.json['ad_id']
     data = request.json['data']
     #print(data)
     adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
     update = UpdateAd(adwords_client, ad_group_id, ad_id, data)
     return jsonify(update)
     


@app.route("/addAd", methods=["POST"])
def addAd():
    ad_group_id = request.json['ad_group_id']
    ad_name = request.json['ad_name']
    ad_image_ref = request.json['url_image']
    width = request.json['width']
    height = request.json['height']
    finalUrls =  request.json['finalUrls']
    finalMobileUrls =  request.json['finalMobileUrls']
    finalAppsUrls =  request.json['finalAppUrls']    
    adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    ad = add_display_ad(adwords_client, ad_group_id, ad_name, ad_image_ref, finalUrls, finalAppsUrls, finalMobileUrls, width, height)


    response = {
        "ad": ad
    }
    return jsonify(response)


@app.route("/addResponsiveDisplayAd", methods=["POST"])
def addResponsiveDisplayAd():
    ad_group_id = request.json['ad_group_id']
    ad_name = request.json['ad_name']
    ad_image_ref = request.json['url_image']
    width = request.json['width']
    height = request.json['height']
    description = request.json['description']
    brand = request.json['brand']
    finalUrls =  request.json['finalUrls']
    finalMobileUrls =  request.json['finalMobileUrls']
    finalAppsUrls =  request.json['finalAppUrls']    
    adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    ad = add_responsive_display_ad(adwords_client, ad_group_id, ad_image_ref, ad_name, description, brand, finalUrls, finalAppsUrls, finalMobileUrls, width, height)


    response = {
        "ad": ad
    }
    return jsonify(response)
    

   

@app.route("/updateBudget/<budgetId>/<amount>/<idC>/<dure>/<ad_name>/<idA>/<ad_group_id>/<campagne_id>/<id_ad_firebase>", methods=['POST', 'GET'])
def updateBudget(budgetId=None, amount=None, idC=None, dure=None, ad_name=None, idA=None, ad_group_id=None, campagne_id=None, id_ad_firebase=None):
    print(amount)
    adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    budget = UpdateBudget(adwords_client, budgetId, amount, dure)
    #return redirect(FRONT_END_URL+"/"+idC+"/"+amount+"/"+budget[0]['dailyBudget']+"/"+dure)

    return redirect(FRONT_END_URL+"/#/ads/"+ad_name+"/"+idC+"/"+idA+"/"+str(ad_group_id)+"/"+str(campagne_id)+"/"+str(amount)+"/"+str(budget[0]['dailyBudget'])+"/"+str(dure)+"/"+str(id_ad_firebase))


@app.route("/setBudgetFromAccount", methods=['POST', 'GET'])

def setBudgetFromAccount():

    adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    budgetId = request.json['budgetId']
    amount = request.json['amount']
    dure = request.json['dure']
    budget = UpdateBudget(adwords_client, budgetId, amount, dure)
    #return redirect(FRONT_END_URL+"/"+idC+"/"+amount+"/"+budget[0]['dailyBudget']+"/"+dure)

    return jsonify(budget)

    #URL_SERVER+/updateBudgetA/hDxHvCnoc5sgwKZclltG/2078906359/6446768384/10000/8000/10

@app.route("/updateBudgetA/<idC>/<campagne_id>/<budgetId>/<total>/<budget_to_place>/<dure>/<redirection>", methods=['POST', 'GET'])
def updateBudgetA(idC=None, campagne_id=None, budgetId=None, total=None, budget_to_place= None, dure=None, redirection=None):
    print('success')
    print(total)
    adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    budget = UpdateBudget(adwords_client, budgetId, budget_to_place, dure)
    print(type(budget[0]['dailyBudget']))
    redirection =FRONT_END_URL + "/#/" + idC + "/" + campagne_id + "/" + budget_to_place + "/" + budget[0]['dailyBudget'] + "/" + dure
    print(redirection)
    return redirect((redirection), code=302)






def method_waraper(self, record):
    def filter(self, record):
        if record.args:
            arg = record.args[0]
            if isinstance(arg, suds.transport.Request):
                new_arg = suds.transport.Request(arg.url)
                sanitized_headers = arg.headers.copy()
                if self._AUTHORIZATION_HEADER in sanitized_headers:
                    sanitized_headers[self._AUTHORIZATION_HEADER] = self._REDACTED
                new_arg.headers = sanitized_headers
                msg = arg.message
                if sys.version_info.major < 3:
                    msg = msg.decode('utf-8')
                new_arg.message = self._DEVELOPER_TOKEN_SUB.sub(
                    self._REDACTED, str(msg, encoding='utf-8'))
                record.args = (new_arg,)
    return filter(self, record)


@app.route("/")
def main():
    
    return "ok"


@app.route('/upload', methods=['POST','GET'])
def upload():
     if request.method == 'POST':
        _result = request.form.to_dict()
        email = _result['email']
        file = _result['input-image']
        description = _result['description']
        titre = _result['titre']
        print(description)
        print(email)
        print(titre)
        starter = file.find(',')
        image_data = file[starter+1:]
        image_data = bytes(image_data, encoding="ascii")
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        print(im.save('uploads/image.png'))
        url = url_for('uploaded_file', filename='image.png', _external=True)
        googleads.util._SudsTransportFilter.filter = method_waraper
        adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
        print(ads.ads(adwords_client, NUMBER_OF_CAMPAIGNS_TO_ADD, NUMBER_OF_ADGROUPS_TO_ADD,NUMBER_OF_KEYWORDS_TO_ADD, url, description, titre, email))

     return  url



# configs
UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])



# extension checker
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.errorhandler(RequestEntityTooLarge)
def handle_file_size_exception(error):
    '''Return a custom message and 413 status code'''
    return jsonify({'message': 'File is too big'}), 413

# check size


# image compressor

# upload handler
@app.route('/', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        file_url = url_for('uploaded_file', filename=filename, _external=True)
        data = {
            'success':True,
            'message': 'File successfully uploaded',
            'data': {
                'file_url': file_url
            }
        }
        return jsonify(data)

    else:
        data = {
            'success':False,
            'message': 'Please provide a correct extension',
        }
        return jsonify(data), 404



@app.route('/callback', methods=['POST'])
def callback():
    # les données retournées par intouch seront du genre:
    # Libre à vous de les manipuler comme il vous semble
    '''
        {  
        "service_id":"String",
        "gu_transaction_id":"String",
        "status":"String",
        "partner_transaction_id":"String",
        "call_back_url":"String",
        "commission":"Double"
        }
    '''
    return jsonify({'data': request.json}), 201



@app.route("/getCampaignData", methods=["POST"])
def getData():
    campaign_id = request.json['campaign_id']
    adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
    update = get_campaigns_data(adwords_client, campaign_id)
    return jsonify(update)


@app.route("/getSummuryReport", methods=["POST"])
def getSummuryReport():
    campaign_id = request.json['campaign_id']
    startDate = request.json['startDate']
    endDate = request.json['endDate']
    adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
    report = get_campaign_report_performance(adwords_client, campaign_id, startDate, endDate)
    return jsonify(report)


@app.route("/deleteCampaign", methods=["POST"])
def delete_campaign():
    response = []
    id_campaign = request.json['id']
    adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
    deleteCampaign(adwords_client, id_campaign)
    response.append({
        "status": "ok",
        "handler": "campagne supprimée avec succès"
    })
    return jsonify(response)




@app.route('/updateCampaignStartDate', methods=['POST'])
def updateCampaignStartDate():
    campaign_id = request.json['campaign_id']
    startDate = (request.json['startDate'])
    print(startDate)
    print(campaign_id)
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    update = UpdateCampaignStartDate(adwords_client, campaign_id, startDate)
    return jsonify(update)


@app.route('/updateCampaignEndDate', methods=['POST'])
def updateCampaignEndDate():
    campaign_id = request.json['campaign_id']
    endDate = (request.json['endDate'])
    print(endDate)
    print(campaign_id)
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    update = UpdateCampaignEndDate(adwords_client, campaign_id, endDate)
    print(update)
    return jsonify(update)



""" @app.route('/upDateCampaignDates', methods=['POST'])
def updateCampaignDates():
    campaign_id = request.json['campaign_id']
    startDate = (request.json['startDate'])
    endDate = (request.json['endDate'])
    print(startDate)
    print(endDate)
    print(campaign_id)
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    update = UpdateCampaignDates(adwords_client, campaign_id, startDate, endDate)
    return jsonify(update)
 """


@app.route("/updateCampaignStatus", methods=["POST"])
def updateCamapaignStatus():
    response = []
    campaign_id = request.json['campaign_id']
    status = request.json['status']
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    update = UpdateCampaignStatus(adwords_client, campaign_id, status)
    response.append({
            
                "status": update[0]['status'],
    })
    return jsonify(response)

@app.route("/updateCampaignName", methods=["POST"])
def updateCampaignName():
    new_name = request.json['name'] +" "+ request.json['type']+" " +request.json['email']
    id_campaign = request.json['campaign_id']
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    update = UpdateCampaignName(adwords_client, id_campaign, new_name)
    return jsonify(update)




@app.route("/updateCampaign", methods=["POST"])
def updateCampaign():
        response = []

        
        name= request.json[0]['name']
        new_name = request.json[0]['name'] +" "+request.json[0]['email']
        id_campaign = request.json[0]['id']
        status = request.json[0]['status']
        state = request.json[0]['state']  
        adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
        if state == "1":
            campagne = UpdateCampaignStatus(adwords_client, id_campaign, status)
            response.append({
                "id": campagne[0]['id'],
                "name": name,
                "status": campagne[0]['status'],
            })
        elif state == "2":
            campagne = UpdateCampaignName(adwords_client, id_campaign, new_name)
            response.append({
                "id": campagne[0]['id'],
                "name": name,
                "status": campagne[0]['status'],
            })
        elif state == "3":
            campagne = UpdateCampaignNameAndStatus(adwords_client, id_campaign, new_name, status)
            response.append({
                "id": campagne[0]['id'],
                "name": name,
                "status": campagne[0]['status'],
            })
  
        response.append({
            "status": "error"
        })
       
    
        return jsonify(response)



@app.route("/addCampaign", methods=["POST"])
def campagne():
    response = {}
    try:
        adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
        campagne = add_campaign(adwords_client, request.json['campaign_name'] + " " +request.json['type']+ " "+ request.json['email'], request.json['startDate'],request.json['endDate'], request.json['channel'], request.json['strategie'],request.json['budget'])
        print(campagne)
       
        response = {
                "status": "ok",
                "id":  campagne[0]['id'],
                "name": campagne[0]['name'],
                "status_campaign": campagne[0]["status"],
                "startDate": campagne[0]["startDate"],
                "endDate": campagne[0]["endDate"],
                "startDateFrench": campagne[0]["startDateFrench"],
                "endDateFrench": campagne[0]["endDateFrench"],
                "servingStatus": campagne[0]["servingStatus"],
                "budgetId": campagne[0]["budgetId"]         
                }
    except:
        response = {
            "status": "not_ok"
        }    
   
    return jsonify(response)


@app.route("/addYoutubeCampaign", methods=["POST"])
def addYoutubeCampagaign():
    response = {}
    try:
        adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
        print(request.json['campaign_name'])
        print(request.json['email'])
        print(request.json['startDate'])
        print(request.json['endDate'])
        print(request.json['strategie'])
        print(request.json['channel'])
        print(request.json['budget'])
        campagne = add_youtube_campaign(adwords_client, request.json['campaign_name'] + " " + request.json['email'], request.json['startDate'],request.json['endDate'], request.json['channel'], request.json['strategie'],request.json['budget'])
        print(campagne)
       
        response = {
                "status": "ok",
                "id":  campagne[0]['id'],
                "name": campagne[0]['name'],
                "status_campaign": campagne[0]["status"],
                "startDate": campagne[0]["startDate"],
                "endDate": campagne[0]["endDate"],
                "startDateFrench": campagne[0]["startDateFrench"],
                "endDateFrench": campagne[0]["endDateFrench"],
                "servingStatus": campagne[0]["servingStatus"],
                "budgetId": campagne[0]["budgetId"]         
                }
    except:
        response = {
            "status": "not_ok"
        }    
   
    return jsonify(response)

@app.route("/addAdGroup", methods=["POST"])
def addAdGroup():
    response = {}
    try:
        name = request.json['ad_group_name']
        campaign_id = request.json['campaign_id']
        strategie_bid = request.json['strategie_bid']
        bid=request.json['bid']
        adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
        groupe_annonce = add_ad_groups(adwords_client, campaign_id, name, strategie_bid, bid)
        response = {
            "status": "ok",
            "id": groupe_annonce[0]["id"],
            "name": groupe_annonce[0]["name"],
            "status_adgroup": groupe_annonce[0]["status"],
        }
    except:
        response = {
            "status": "not_ok"
        }
    return jsonify(response)


@app.route('/updateBid', methods=['POST'])
def updateBid():
    bidType = request.json['bidType']
    ad_group_id = request.json['ad_group_id']
    bid = request.json['bid']
    adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    update = UpdateBid(adwords_client, ad_group_id, bidType, bid)
    return jsonify(update)

@app.route("/updateAdGroupStatus", methods=["POST"])
def update():
    response = {}
    try:
        print(request.json['adgroup_id'])
        ad_group_id = request.json['adgroup_id']
        last_status = request.json['last_status']
        adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
        update = UpdateAdGroupStatus(adwords_client, ad_group_id, last_status)
        response = {
            "status": "ok",
            "status_adgroup": update[0]['adgroup_status']
        }
    except:
        response = {
            "status": "not_ok"
        }
    return jsonify(response)



@app.route("/deleteAdGroup", methods=['POST'])
def deleteAdGroup():
    response = {}
    try:
        adgroup_id = request.json['adgroup_id']
        adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
        delete = DeleteAdGroup(adwords_client, adgroup_id)
        response.append({
            "status": "ok",
            "handler": "groupe d'annonce supprimée avec succès"
        })
    except:
        response = response
    return jsonify(response)

@app.route("/targetAge", methods=["POST"])
def targetAge():
    print('targeting ages')
    target = []
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    if len(request.json['last_ages'])>0:
        remove = RemoveTargetAge(adwords_client, request.json['ad_group_id'], request.json['last_ages'])
        target = TargetAge(adwords_client, request.json['ad_group_id'], request.json['ages'])
    else:
        target = TargetAge(adwords_client, request.json['ad_group_id'], request.json['ages'])
   
    return jsonify(target)


@app.route("/excludeAge", methods=["POST"])
def removeAge():
    print('targeting ages')
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    remove = RemoveTargetAge(adwords_client, request.json['ad_group_id'], request.json['criterion'])
    
    return jsonify(remove)

@app.route("/enableAge", methods=["POST"])
def enableAge():
    print('targeting ages')
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    enable = EnableTargetAge(adwords_client, request.json['ad_group_id'], request.json['criterion'])
    
    return jsonify(enable)





@app.route("/excludeGender", methods=["POST"])
def removeGender():
    print('targeting genders')
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    remove = RemoveTargetGender(adwords_client, request.json['ad_group_id'], request.json['criterion'])
    
    return jsonify(remove)

@app.route("/enableGender", methods=["POST"])
def enableGender():
    print('targeting genders')
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    enable = EnableTargetGender(adwords_client, request.json['ad_group_id'], request.json['criterion'])
    
    return jsonify(enable)




   
   


@app.route("/targetGender", methods=["POST"])
def targetGender():
    print('targeting genders')
    target = []
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    if len(request.json['last_genre'])>0:
        print('last_genre not null')
        remove = RemoveTargetGender(adwords_client, request.json['ad_group_id'], request.json['last_genre'])
        if remove[0]["status"]=="ok":
            target = TargetSexe(adwords_client, request.json['ad_group_id'], request.json['sexes'])
    else:
        target = TargetSexe(adwords_client, request.json['ad_group_id'], request.json['sexes'])
    
    return jsonify(target)


@app.route("/targetYoutubeChannels", methods=["POST"])
def targetYoutubeChannels():
    ad_group_id= request.json['ad_group_id']
    channels = request.json['channels']
    print(channels)
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    channel_target = TargetYoutubeChannels(adwords_client, ad_group_id, channels)
    return jsonify(channel_target)


@app.route("/targetLocation", methods=["POST"])
def targetLocation():
    campaign_id = request.json['campaign_id']
    location = request.json['location_id']
    print(location)
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    location = TargetLocation(adwords_client, campaign_id, location)
    return jsonify(location)

@app.route("/removeLocation", methods=["POST"])
def removeLocation():
    campaign_id = request.json['campaign_id']
    location = request.json['location']
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    location = RemoveLocation(adwords_client, campaign_id, location)
    return jsonify(location)

@app.route("/adsShedule", methods=["POST"])
def adsSheduleTarget():
    campaign_id = request.json['campaign_id']
    schedule = request.json['schedule']
    
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    schedule_result = AdShedule(adwords_client, campaign_id, schedule)
    return jsonify(schedule_result)

@app.route("/removeAdsSchedule", methods=["POST"])
def removeAdsSheduleTarget():
    campaign_id = request.json['campaign_id']
    schedule = request.json['schedule']
    
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    remove = DeleteAllAdShedule(adwords_client, campaign_id, schedule)
    return jsonify(remove)

@app.route("/removeSingleAdsSchedule", methods=["POST"])
def removeSingleAdsSheduleTarget():
    campaign_id = request.json['campaign_id']
    schedule = request.json['schedule']
    
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    remove = DeleteAllAdShedule(adwords_client, campaign_id, schedule)
    return jsonify(remove)

@app.route("/setPlacement", methods=["POST"])
def setPlacement():
    ad_group_id = request.json['ad_group_id']
    placement = request.json['placement']
    last_placement = request.json['last_placement']
    #print(placement)
  
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    placement = SetPlacement(adwords_client, ad_group_id, placement, last_placement)
    return jsonify(placement)


@app.route("/updateAdsShedule", methods=["POST"])
def updateAdsSheduleTarget():
    campaign_id = request.json['campaign_id']
    schedule = request.json['schedule']
    last_criterion = request.json['last_criterion']
    print(schedule)
    print(last_criterion)
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    update_schedule_result = UpdateAdShedule(adwords_client, campaign_id, schedule, last_criterion)
    return jsonify(update_schedule_result)




@app.route("/enableDevice", methods=["POST"])
def enableDevice():
    print('targeting devices')
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    enable = EnableTargetDevice(adwords_client, request.json['ad_group_id'], request.json['criterion'])
    
    return jsonify(enable)


@app.route("/removeDevice", methods=["POST"])
def removeDevice():
    print('targeting devices')
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    remove = RemoveTargetDevice(adwords_client, request.json['ad_group_id'], request.json['criterion'])
    
    return jsonify(remove)

@app.route("/targetDevices", methods=["POST"])
def targetDevices():
    print('targeting devices')
    ad_group_id = request.json['ad_group_id']
    devices_request = request.json['devices']
    last_devices_request = request.json['last_devices']
    devices = []
    last_devices = []
    for device in devices_request:
        devices.append(device)
    if len(last_devices) == 0:
        last_devices = last_devices
    else:
        for last_devices_item in last_devices_request:
            last_devices.append(last_devices_item)

    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    device_request = TargetDevices(adwords_client, ad_group_id, devices, last_devices )
    return jsonify(device_request)



@app.route("/updateLocation", methods=["POST"])
def updateLocation():
    campaign_id = request.json['campaign_id']
    previous_location = request.json['previous_location']
    location = request.json['location_id']
    print(location)
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    location = UpdateLocation(adwords_client, campaign_id, previous_location, location)
    print(location)
    return jsonify(location)

@app.route("/targetAgeLevelCampaign", methods=["POST"])
def targetAgeLevelCampaign():
    campaign_id = request.json['campaign_id']
    previous_age = request.json['previous_ages']
    ages = request.json['ages']
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    target = TargetAgeLevelCampaign(adwords_client, campaign_id, ages, previous_age)
    return jsonify(target)


@app.route("/removeSinglePlacement", methods=["POST"])
def removeSinglePlacement():
    ad_group_id = request.json['ad_group_id']
    criterion = request.json['criterion']
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    target = RemoveSinglePlacement(adwords_client, ad_group_id, criterion)
    print(target)
    return jsonify(target)


@app.route("/removeSingleChannel", methods=["POST"])
def removeSingleChannel():
    ad_group_id = request.json['ad_group_id']
    criterion = request.json['criterion']
    adwords_client = adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    remove = RemoveYoutubeChannels(adwords_client, ad_group_id, criterion)
    return jsonify(remove)

@app.route("/addUser", methods=["POST"])
def user():
    USER = request.json['email']
    session['user']=USER
    return "Current user: " + USER



@app.route("/session", methods=["POST"])
def session_save():
    result = request
    file = result.json['img']
    session['description'] = result.json['description']
    session['email'] = result.json["email"]
    session["titre"] = result.json["titre"]
    """     print(result.json['email']) """
    starter = file.find(',')
    image_data = file[starter+1:]
    image_data = bytes(image_data, encoding="ascii")
    im = Image.open(BytesIO(base64.b64decode(image_data)))
    print(im.save('uploads/image.png'))
    url = url_for('uploaded_file', filename='image.png', _external=True)
    session['img'] = url
    DESCRIPTION = session.get('description')
    EMAIL = session.get('email')
    TITRE = session.get('titre')
    IMG = session['img']
    if TAB==[]:
        TAB.append({
            "email": EMAIL,
            "titre": TITRE,
            "description": DESCRIPTION,
            "img": IMG
        })
    else:
        TAB.pop()
        TAB.append({
            "email": EMAIL,
            "titre": TITRE,
            "description": DESCRIPTION,
            "img": IMG
        })
    #print(session['img'])
    print(session)
    return "ok"


@app.route("/ads", methods = ['GET', 'POST'] )
def makeAds():
                final = ""            
              
            #try:
                campagne = []
                adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
                CAMPAIGN = get_campaign_with_email(adwords_client, TAB[0]['email'])
                if CAMPAIGN == []:
                    #campagne = add_campaign(adwords_client, TAB[0]['email'])
                    groupe_annonce = add_ad_groups(adwords_client, campagne[0]['id'], campagne[0]['name'])
                    add_responsive_display_ad(adwords_client, str(groupe_annonce[0]['id']), TAB[0]['img'], TAB[0]['titre'], TAB[0]['description'], "Comparateur")
                    

                else:

                    groupe_annonce = get_ad_group(adwords_client, CAMPAIGN[0]['name'])
                   
                    print("Campagne du nom de " + CAMPAIGN[0]['name'] + " contenant le groupe d'annonce " + groupe_annonce[0]['name'] + " ayant pour id " + str(groupe_annonce[0]['id']) + " existe déjà")
                    add_responsive_display_ad(adwords_client, str(groupe_annonce[0]['id']), TAB[0]['img'], TAB[0]['titre'], TAB[0]['description'], "Comparateur")
                    
                """   print(ads.ads(adwords_client, NUMBER_OF_CAMPAIGNS_TO_ADD, NUMBER_OF_ADGROUPS_TO_ADD,NUMBER_OF_KEYWORDS_TO_ADD, TAB[0]['img'], TAB[0]['description'], TAB[0]['titre'], TAB[0]['email'])) """
                final = "ok"
            #except:
                #print('Stop')
       


                return final

@app.route('/pay',  methods=['POST'])
def pay():
        """
        Get payexpress token
        """
        req = ""

        url = 'https://payexpresse.com/api/payment/request-payment'
        cancel_url = "http://www.google.com"
        success_url = URL_SERVER+"/ads"
        #cancel_url = "http://0.0.0.0:5009"
        #success_url = "http://0.0.0.0:5009/?pay=ok"

        amount_due = round(2000)

        infos = {
            'item_name':'Mon achat',
            'item_price':amount_due,
            'currency':'XOF',
            'ref_command':time.time(),
            'command_name':'Mon achat',
            'env':'test',
            'success_url':success_url,
            'cancel_url':cancel_url
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'API_KEY':"b6596452396c074cd2e89d39f39ba44b9dcc4d39f950fc0eef92e7892bb34f27",
            'API_SECRET':"3bb0ca8b4c0946a0c17a1a96a0887b9280e83f3e34750841c05a90c39f628f39",
        }

        req = requests.post(url, data=infos, headers=headers)

        req = req.json()
        print(req['success'])
        
        req['redirect_url'] = 'https://payexpresse.com/payment/checkout/' +req['token']



        return jsonify(req)
@app.route('/campaignReport/<idC>', methods=['POST', 'GET'])


def campaignReport(idC=None):
    adwords_client = adwords.AdWordsClient.LoadFromStorage("./googleads.yaml")
    print(idC)
    report = get_campaign_report_performance(adwords_client, str(idC))

    return jsonify(report)


@app.route('/getSchemaReportCampaign', methods=['POST', 'GET'])
def getSchemaReportCampaign():
  
    report = {"clicks":"clicks" ,"impressions": "impressions", "coûts": "couts"}
    
    return jsonify(report)

@app.route('/payBudget/<money>/<budget_to_place>/<budgetId>/<idC>/<dure>/<ad_name>/<idA>/<ad_group_id>/<campagne_id>/<id_ad_firebase>', methods=['POST'])


def payBudget(money=None, budget_to_place=None, budgetId=None, idC=None, dure=None, ad_name=None, idA=None, ad_group_id=None, campagne_id=None, id_ad_firebase=None):
        """
        Get payexpress token
        """
        print(dure)
        print(money)
        print(budgetId)
        print(ad_name)
       
        url = 'https://payexpresse.com/api/payment/request-payment'
        cancel_url = "http://www.google.com"
        success_url = URL_SERVER+"/updateBudget/"+budgetId + "/" + budget_to_place+ "/"+idC+"/"+dure+"/"+ad_name+"/"+idA+"/"+ad_group_id+"/"+campagne_id+"/"+id_ad_firebase
        #cancel_url = "http://0.0.0.0:5009"
        #success_url = "http://0.0.0.0:5009/?pay=ok"

        #success_url = UpdateBudget(adwords_client, budgetId, money)
        
        amount_due = round(int(money))
        print(money)
        infos = {
            'item_name':'Placement de budget',
            'item_price':amount_due,
            'currency':'XOF',
            'ref_command':time.time(),
            'command_name':'Mon achat',
            'env':'test',
            'success_url': success_url,
            'cancel_url':cancel_url
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'API_KEY':"b6596452396c074cd2e89d39f39ba44b9dcc4d39f950fc0eef92e7892bb34f27",
            'API_SECRET':"3bb0ca8b4c0946a0c17a1a96a0887b9280e83f3e34750841c05a90c39f628f39",
        }
        req = requests.post(url, data=infos, headers=headers)

        req = req.json()
    
        print(req)
        
        req['redirect_url'] = 'https://payexpresse.com/payment/checkout/' +req['token']
        


        return jsonify(req)


@app.route('/Budget/<idC>/<campagne_id>/<budgetId>/<money>/<budget_to_place>/<dure>/<redirect>', methods=['POST'])
def payBudgetFromSettings(idC = None, campagne_id=None,budgetId=None, money=None, budget_to_place=None,  dure=None, redirect=None):
        """
        Get payexpress token
        """
        print(dure)
        print(money)
        print(budgetId)
        
        url = 'https://payexpresse.com/api/payment/request-payment'
        cancel_url = "http://www.google.com"
        success_url = URL_SERVER+"/updateBudgetA/"+idC+"/"+campagne_id+"/"+budgetId + "/" +money+"/"+ budget_to_place+"/"+dure+"/"+redirect
        #cancel_url = "http://0.0.0.0:5009"
        #success_url = "http://0.0.0.0:5009/?pay=ok"

        #success_url = UpdateBudget(adwords_client, budgetId, money)
        
        amount_due = round(int(money))
        print(money)
        infos = {
            'item_name':'Mon achat',
            'item_price':amount_due,
            'currency':'XOF',
            'ref_command':time.time(),
            'command_name':'Mon achat',
            'env':'test',
            'success_url': success_url,
            'cancel_url':cancel_url
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'API_KEY':"b6596452396c074cd2e89d39f39ba44b9dcc4d39f950fc0eef92e7892bb34f27",
            'API_SECRET':"3bb0ca8b4c0946a0c17a1a96a0887b9280e83f3e34750841c05a90c39f628f39",
        }

        req = requests.post(url, data=infos, headers=headers)

        req = req.json()
    
        print(req['success'])
        
        req['redirect_url'] = 'https://payexpresse.com/payment/checkout/' +req['token']
        


        return jsonify(req)


@app.route('/rechargeAmount',  methods=['POST'])

@app.route('/rechargeAmount/<money>/<key>/<redirect>', methods=['POST'])

def rechargeAmount(money=None, key=None, redirect=None):
        """
        Get payexpress token
        """
        print(money)
       
     
        url = 'https://payexpresse.com/api/payment/request-payment'
        cancel_url = "http://www.google.com"
        success_url = REDIRECT_HTTPS+redirect+"/#/adwords/success/solde"
        #cancel_url = "http://0.0.0.0:5009"
        #success_url = "http://0.0.0.0:5009/?pay=ok"

        #success_url = UpdateBudget(adwords_client, budgetId, money)
        
        amount_due = round(int(money))
        print(money)
        infos = {
            'item_name':'Mon achat',
            'item_price':amount_due,
            'currency':'XOF',
            'ref_command':time.time(),
            'command_name':'Mon achat',
            'env':'test',
            'success_url': success_url,
            'cancel_url':cancel_url
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'API_KEY':"b6596452396c074cd2e89d39f39ba44b9dcc4d39f950fc0eef92e7892bb34f27",
            'API_SECRET':"3bb0ca8b4c0946a0c17a1a96a0887b9280e83f3e34750841c05a90c39f628f39",
        }

        req = requests.post(url, data=infos, headers=headers)

        req = req.json()
    
        print(req['success'])
        
        
        req['redirect_url'] = 'https://payexpresse.com/payment/checkout/' +req['token']
        


        return jsonify(req)



@app.route('/rechargeAmountBeforeBudget',  methods=['POST'])

@app.route('/rechargeAmountBeforeBudget/<money>/<key>/<redirect>', methods=['POST'])

def rechargeAmountBeforeBudget(money=None, key=None, redirect=None):
        """
        Get payexpress token
        """
        print(money)
    
        success_url = ""
        url = 'https://payexpresse.com/api/payment/request-payment'
        cancel_url = "http://www.google.com"
        success_url = REDIRECT_HTTPS + redirect + "/dashboard/payments/"+key
        
        print(money)
        amount_due = round(int(money))
        print(success_url)
        infos = {
            'item_name':'Mon achat',
            'item_price':amount_due,
            'currency':'XOF',
            'ref_command':time.time(),
            'command_name':'Mon achat',
            'env':'test',
            'success_url': success_url,
            'cancel_url':cancel_url
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'API_KEY':"b6596452396c074cd2e89d39f39ba44b9dcc4d39f950fc0eef92e7892bb34f27",
            'API_SECRET':"3bb0ca8b4c0946a0c17a1a96a0887b9280e83f3e34750841c05a90c39f628f39",
        }

        req = requests.post(url, data=infos, headers=headers)

        req = req.json()
    
        print(req)
        
        
        req['redirect_url'] = 'https://payexpresse.com/payment/checkout/' +req['token']
        


        return jsonify(req)



@app.route('/setBudgetTraceCampaign',  methods=['POST'])

@app.route('/setBudgetTraceCampaign/<money>/<key>/<id>/<redirect>', methods=['POST'])

def setBudgetTraceCampaign(money=None, key=None,  id=None, redirect=None):
        """
        Get payexpress token
        """
        print(money)
        print(id)
        success_url = ""
        url = 'https://payexpresse.com/api/payment/request-payment'
        cancel_url = "http://www.google.com"
        success_url = REDIRECT_HTTPS + redirect + "/#/tracefm/" + id + "/"+key+"/success"
        
        amount_due = round(int(money))
        print(success_url)
        infos = {
            'item_name':'Mon achat',
            'item_price':amount_due,
            'currency':'XOF',
            'ref_command':time.time(),
            'command_name':'Mon achat',
            'env':'test',
            'success_url': success_url,
            'cancel_url':cancel_url
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'API_KEY':"b6596452396c074cd2e89d39f39ba44b9dcc4d39f950fc0eef92e7892bb34f27",
            'API_SECRET':"3bb0ca8b4c0946a0c17a1a96a0887b9280e83f3e34750841c05a90c39f628f39",
        }

        req = requests.post(url, data=infos, headers=headers)

        req = req.json()
    
        print(req)
        
        
        req['redirect_url'] = 'https://payexpresse.com/payment/checkout/' +req['token']
        


        return jsonify(req)




@app.route("/updateBudgetAds/<budgetId>/<money>/<budget_to_place>/<dure>/<ad_name>/<idC>/<idA>/<ad_group_id>/<campaign_id>/<domain>", methods=['POST', 'GET'])
def updateBudgetAds(budgetId=None, money=None,budget_to_place= None, dure=None, ad_name=None,  idC=None, idA=None, ad_group_id=None, campaign_id=None, domain=None):
    print('success')
    print(money)
    adwords_client = googleads.adwords.AdWordsClient.LoadFromStorage('./googleads.yaml')
    budget = UpdateBudget(adwords_client, budgetId, budget_to_place, dure)
    return redirect(REDIRECT_HTTPS+domain+"/#/ads/"+ad_name+"/"+idC+"/"+idA+"/"+ad_group_id+"/"+campaign_id+"/"+str(budget_to_place)+"/"+str(budget[0]['dailyBudget'])+"/"+str(dure))
    """  return redirect(redirect+"/#/"+idC+"/"+str(campaign_id)+"/"+str(budget_to_place)+"/"+str(budget[0]['dailyBudget'])+"/"+str(dure)) """



@app.route('/BudgetAds/<budgetId>/<money>/<budget_to_place>/<dure>/<ad_name>/<idC>/<idA>/<ad_group_id>/<campaign_id>/<domain>', methods=['POST'])
def payBudgetAds(budgetId=None, money=None, budget_to_place=None,  dure=None, ad_name=None, idC=None, idA=None, ad_group_id=None, campaign_id=None, domain=None):
        """
        Get payexpress token
        """
        print(dure)
        print(money)
        print(budgetId)
        print(idC)
        print("campaign firebase")
        
        url = 'https://payexpresse.com/api/payment/request-payment'
        cancel_url = "http://www.google.com"
        success_url = URL_SERVER+"/updateBudgetAds/"+budgetId + "/" +money+"/"+ budget_to_place+"/"+dure+"/"+ad_name+"/"+idC+"/"+idA+"/"+ad_group_id+"/"+campaign_id+"/"+domain
        #cancel_url = "http://0.0.0.0:5009"
        #success_url = "http://0.0.0.0:5009/?pay=ok"

        #success_url = UpdateBudget(adwords_client, budgetId, money)
        
        amount_due = round(int(money))
        print(money)
        infos = {
            'item_name':'Mon achat',
            'item_price':amount_due,
            'currency':'XOF',
            'ref_command':time.time(),
            'command_name':'Mon achat',
            'env':'test',
            'success_url': success_url,
            'cancel_url':cancel_url
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'API_KEY':"b6596452396c074cd2e89d39f39ba44b9dcc4d39f950fc0eef92e7892bb34f27",
            'API_SECRET':"3bb0ca8b4c0946a0c17a1a96a0887b9280e83f3e34750841c05a90c39f628f39",
        }

        req = requests.post(url, data=infos, headers=headers)

        req = req.json()
    
        print(req['success'])
        
        req['redirect_url'] = 'https://payexpresse.com/payment/checkout/' +req['token']
        


        return jsonify(req)




@app.route('/rechargeAmountBeforeBudgetAds/<money>/<ad_name>/<idC>/<idA>/<ad_group_id>/<campaign_id>/<domain>', methods=['POST'])

def rechargeAmountBeforeBudgetAds(money=None, ad_name=None, idC=None, idA=None, ad_group_id=None, campaign_id=None, domain=None):
        """
        Get payexpress token
        """
        print(money)
       
     
        url = 'https://payexpresse.com/api/payment/request-payment'
        cancel_url = "http://www.google.com"
        success_url =REDIRECT_HTTPS+domain+"/#/ads/"+ad_name+"/"+idC+"/"+idA+"/"+ad_group_id+"/"+campaign_id+"/rechargement"
        #cancel_url = "http://0.0.0.0:5009"
        #success_url = "http://0.0.0.0:5009/?pay=ok"

        #success_url = UpdateBudget(adwords_client, budgetId, money)
        
        amount_due = round(int(money))
        print(success_url)
        infos = {
            'item_name':'Mon achat',
            'item_price':amount_due,
            'currency':'XOF',
            'ref_command':time.time(),
            'command_name':'Mon achat',
            'env':'test',
            'success_url': success_url,
            'cancel_url':cancel_url
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'API_KEY':"b6596452396c074cd2e89d39f39ba44b9dcc4d39f950fc0eef92e7892bb34f27",
            'API_SECRET':"3bb0ca8b4c0946a0c17a1a96a0887b9280e83f3e34750841c05a90c39f628f39",
        }

        req = requests.post(url, data=infos, headers=headers)

        req = req.json()
    
        print(req['success'])
        
        
        req['redirect_url'] = 'https://payexpresse.com/payment/checkout/' +req['token']
        


        return jsonify(req)




@app.route('/rechargeAmountBeforeBudgetFromAd',  methods=['POST'])

@app.route('/rechargeAmountBeforeBudgetFromAd/<ad_name>/<idC>/<idA>/<ad_group_id>/<campaign_id>/<money>/<id_ad_firebase>', methods=['POST'])

def rechargeAmountBeforeBudgetFromAd(ad_name=None, idC=None, idA=None, ad_group_id=None, campaign_id=None, money=None, id_ad_firebase =None):
        """
        Get payexpress token
        """
        print(money)
       
     
        url = 'https://payexpresse.com/api/payment/request-payment'
        cancel_url = "http://www.google.com"
        success_url = FRONT_END_URL+"/#/ads"+ad_name+"/"+idC+"/"+idA+"/"+ad_group_id+"/"+campaign_id+"/"+money+"/"+id_ad_firebase
        #cancel_url = "http://0.0.0.0:5009"
        #success_url = "http://0.0.0.0:5009/?pay=ok"

        #success_url = UpdateBudget(adwords_client, budgetId, money)
        
        amount_due = round(int(money))
        print(money)
        infos = {
            'item_name':'Mon achat',
            'item_price':amount_due,
            'currency':'XOF',
            'ref_command':time.time(),
            'command_name':'Mon achat',
            'env':'test',
            'success_url': success_url,
            'cancel_url':cancel_url
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'API_KEY':"b6596452396c074cd2e89d39f39ba44b9dcc4d39f950fc0eef92e7892bb34f27",
            'API_SECRET':"3bb0ca8b4c0946a0c17a1a96a0887b9280e83f3e34750841c05a90c39f628f39",
        }

        req = requests.post(url, data=infos, headers=headers)

        req = req.json()
    
        print(req['success'])
        
        
        req['redirect_url'] = 'https://payexpresse.com/payment/checkout/' +req['token']
        


        return jsonify(req)


# download handler
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)
if __name__ == "__main__":
    app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
    app.run(debug=True)
    
    