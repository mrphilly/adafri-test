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

"""This example adds ad groups to a given campaign.

To get ad groups, run get_ad_groups.py.

The LoadFromStorage method is pulling credentials and properties from a
"googleads.yaml" file. By default, it looks for this file in your home
directory. For more information, see the "Caching authentication information"
section of our README.

"""


import uuid
from googleads import adwords

""" 'CpmBid' """

def add_ad_groups(client, campaign_id, name, strategie_bid, bid):
  INFOS = []
  # Initialize appropriate service.
  ad_group_service = client.GetService('AdGroupService', version='v201809')

  # Construct operations and add ad groups.
  operations = [{
      'operator': 'ADD',
      'operand': {
          'campaignId': campaign_id,
          'name': name,
          'status': 'ENABLED',
          'biddingStrategyConfiguration': {
              'bids': [
                  {
                      'xsi_type': strategie_bid,
                      'bid': {
                          'microAmount': bid
                      },
                  }
              ]
          },
          'settings': [
              {
                  'xsi_type': 'TargetingSetting',
                  'details': [
                      {
                          'xsi_type': 'TargetingSettingDetail',
                          'criterionTypeGroup': 'PLACEMENT',
                          'targetAll': 'true',
                      },
                      {
                          'xsi_type': 'TargetingSettingDetail',
                          'criterionTypeGroup': 'VERTICAL',
                          'targetAll': 'ftrue',
                      },
                      {
                          'xsi_type': 'TargetingSettingDetail',
                          'criterionTypeGroup': 'AGE_RANGE',
                          'targetAll': 'true',
                      },
                      {
                          'xsi_type': 'TargetingSettingDetail',
                          'criterionTypeGroup': 'GENDER',
                          'targetAll': 'true',
                      },
                  ]
              }
          ]
      }
  }]
  ad_groups = ad_group_service.mutate(operations)

  # Display results.
  for ad_group in ad_groups['value']:
    INFOS.append({
          "id": ad_group['id'],
          "name": ad_group['name'],
          "ad_service": ad_group_service,
          "status": ad_group['status'],
        })
    print(ad_group['adGroupType'])
    print(ad_group['settings'])
    print(ad_group['contentBidCriterionTypeGroup'])
    print( ad_group['biddingStrategyConfiguration'])
    print ('Ad group with name "%s" and id "%s" was added.'
           % (ad_group['name'], ad_group['id']))
  return INFOS


