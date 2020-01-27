#!/usr/bin/env python
#
# Copyright 2016 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""This example adds campaigns.

To get campaigns, run get_campaigns.py.

The LoadFromStorage method is pulling credentials and properties from a
"googleads.yaml" file. By default, it looks for this file in your home
directory. For more information, see the "Caching authentication information"
section of our README.

"""


import datetime
import uuid
from googleads import adwords


def CreatedBudget(client, name, budget_value):
  budget_service = client.GetService('BudgetService', version='v201809')
  budget = {
      'name': name,
      'amount': {
          'microAmount': budget_value
      },
      'deliveryMethod': 'ACCELERATED',
      'isExplicitlyShared': 'false'
  }
  operation = {
      'operator': 'ADD',
      'operand': budget
  }
  response = budget_service.mutate([operation])
  return response['value'][0]


def add_campaign(client, name, startDate, endDate, channel, strategie, budget_value):
  INFOS = []
  campaign_service = client.GetService('CampaignService', version='v201809')
  budget = CreatedBudget(client, name, budget_value)
  budget_id = budget['budgetId']


  operations = [{
      'operator': 'ADD',
      'operand': {
          'name': name,
          'status': 'PAUSED',
          'advertisingChannelType': channel,
          'biddingStrategyConfiguration': {
          'biddingStrategyType': strategie,   
          },
          'startDate':  startDate,
          'endDate':  endDate,
          'budget': {
          'budgetId': budget_id
          },
      }
  }]
  
  campaigns = campaign_service.mutate(operations)


  try:
    for campaign in campaigns['value']:
        INFOS.append({
            "statusAdd": "success",
            "id": campaign['id'],
            "name": campaign['name'],
            "status": campaign['status'],
            "startDate": campaign['startDate'],
            "endDate": campaign['endDate'],
            "startDateFrench": campaign['startDate'][-2:] + "/" + campaign['startDate'][-4:-2] + "/" + campaign['startDate'][:4],
            "endDateFrench": campaign['endDate'][-2:] + "/" + campaign['endDate'][-4:-2] + "/" + campaign['endDate'][:4],
            "biddingStrategyConfiguration": campaign['biddingStrategyConfiguration'],
            "servingStatus": campaign['servingStatus'],
            "budgetId": budget_id,
            })
        print ('Campaign with name "%s" and id "%s" was added.'
            % (campaign['name'], campaign['id']))
  except:
      INFOS.append({
          "statusAdd": "error"
      })


  return INFOS
