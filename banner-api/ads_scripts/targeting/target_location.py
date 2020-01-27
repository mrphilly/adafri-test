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

"""This example adds various types of targeting criteria to a given campaign.

To get campaigns, run get_campaigns.py.

The LoadFromStorage method is pulling credentials and properties from a
"googleads.yaml" file. By default, it looks for this file in your home
directory. For more information, see the "Caching authentication information"
section of our README.

"""

from googleads import adwords


def TargetLocation(client, campaign_id, location):
  # Initialize appropriate service.
  INFOS = []
  campaign_criterion_service = client.GetService(
      'CampaignCriterionService', version='v201809')
  criteria = []
  for loc in location:
    target = {
          'xsi_type': 'Location',
          'id': loc
    }
    criteria.append(target)
  
  operations = []
  for criterion in criteria:
    operations.append({
        'operator': 'ADD',
        'operand': {
            'campaignId': campaign_id,
            'criterion': criterion
        }
    })
  result = campaign_criterion_service.mutate(operations)
  print(result)
  for campaign_criterion in result['value']:
    INFOS.append({
      "id": campaign_criterion['criterion']['locationName'],
        "criterion_id": campaign_criterion['criterion']['id']
    })
    print ('Campaign criterion with campaign id "%s", criterion id "%s", '
           'and type "%s" was added.'
           % (campaign_criterion['campaignId'],
              campaign_criterion['criterion']['id'],
              campaign_criterion['criterion']['type']))
  return INFOS

