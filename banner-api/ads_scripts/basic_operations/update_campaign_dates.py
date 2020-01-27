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

"""This example updates a campaign by setting its status to PAUSED.

To get campaigns, run get_campaigns.py.

The LoadFromStorage method is pulling credentials and properties from a
"googleads.yaml" file. By default, it looks for this file in your home
directory. For more information, see the "Caching authentication information"
section of our README.

"""

from googleads import adwords



def UpdateCampaignStartDate(client, campaign_id, startDate):
  # Initialize appropriate service.
  campaign_service = client.GetService('CampaignService', version='v201809')
  result = []
  operations = [{
     'operator': 'SET',
          'operand': {
              'id': campaign_id,
              'startDate': startDate,
          }
  }]
  campaigns = campaign_service.mutate(operations)
  if campaigns and campaigns['value']:
    result.append({"status": "ok"})
  return result


def UpdateCampaignEndDate(client, campaign_id, endDate):
  # Initialize appropriate service.
  campaign_service = client.GetService('CampaignService', version='v201809')
  result = []
  operations = [{
     'operator': 'SET',
          'operand': {
              'id': campaign_id,
              'endDate': endDate,
          }
  }]
  campaigns = campaign_service.mutate(operations)
  if campaigns and campaigns['value']:
    result.append({"status": "ok"})
  return result

