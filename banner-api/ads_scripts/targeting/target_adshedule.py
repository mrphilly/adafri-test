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


""" CAMPAIGN_ID = '2042348284' """
# Replace the value below with the ID of a feed that has been configured for
# location targeting, meaning it has an ENABLED FeedMapping with criterionType
# of 77. Feeds linked to a GMB account automatically have this FeedMapping.
# If you don't have such a feed, set this value to None.



def AdShedule(client, campaign_id, schedule):
  # Initialize appropriate service.
  INFOS = []
  print(schedule)
  campaign_criterion_service = client.GetService(
      'CampaignCriterionService', version='v201809')

  # Create locations. The IDs can be found in the documentation or retrieved
  # with the LocationCriterionService.
 
  

# Creates an operation to add an AdSchedule for each day of the week in the
# list.
  for day in schedule:
    operations = [{
        'operator': 'ADD',
        'operand': {
            'campaignId': campaign_id,
            'criterion': {
                'xsi_type': 'AdSchedule',
                'dayOfWeek': day['dayEN'],
                # Start at 8:45 A.M.
                'startHour': day['startHour'],
                'startMinute': day['startMinute'],
                # End at 7:45 P.M.
                'endHour': day['endHour'],
                'endMinute': day['endMinute'],
            },
            # Run at normal bid rates.
            'bidModifier': 1.0
        }
    }]
    print(operations)

    result = campaign_criterion_service.mutate(operations)

  # Display the resulting campaign criteria.
    for campaign_criterion in result['value']:
        INFOS.append({
        "id": day['id'],
        "dayEN": day['dayEN'],
        "dayFR": day['dayFR'],
        "startHour": day['startHour'],
        "startMinute": day['startMinute'],
        "endHour": day['endHour'],
        "endMinute": day['endMinute'],
        "start_hour_text": day["start_hour_text"],
        "end_hour_text": day["end_hour_text"],
        "criterion_id": campaign_criterion['criterion']['id'],
        "criterion_type":  campaign_criterion['criterion']['type']
        })
        print ('Campaign criterion with campaign id "%s", criterion id "%s", '
           'and type "%s" was added.'
           % (campaign_criterion['campaignId'],
              campaign_criterion['criterion']['id'],
              campaign_criterion['criterion']['type']))
  return INFOS

