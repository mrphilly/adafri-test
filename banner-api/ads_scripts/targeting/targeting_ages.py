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

"""This example adds demographic criteria to an ad group.

To get a list of ad groups, run get_ad_groups.py.

The LoadFromStorage method is pulling credentials and properties from a
"googleads.yaml" file. By default, it looks for this file in your home
directory. For more information, see the "Caching authentication information"
section of our README.

"""

from googleads import adwords




def TargetAge(client, ad_group_id, ages):
  result = []
  AGES = ['503001', '503002', '503003', '503004', '503005', '503006', '503999']
  ad_group_criteria = []
  ad_group_criterion_service = client.GetService(
        'AdGroupCriterionService', version='v201809')
  if len(ages) != len(AGES):
    for age in ages:
        if str(age) in AGES:
          AGES.remove(str(age)) 
    ad_group_criteria = [
        # Exclusion criterion.
        {
            'xsi_type': 'NegativeAdGroupCriterion',
            'adGroupId': ad_group_id,
            'criterion': {
                'xsi_type': 'AgeRange',
                'id': int(age)
            }
        }
    for age in AGES]
  else:
     ad_group_criteria = [
        # Exclusion criterion.
        {
            'xsi_type': 'BiddableAdGroupCriterion',
            'adGroupId': ad_group_id,
            'criterion': {
                'xsi_type': 'AgeRange',
                'id': age
            }
        }
    for age in AGES]


  # Create operations.
  operations = []
  for criterion in ad_group_criteria:
    operations.append({
        'operator': 'ADD',
        'operand': criterion
    })

  response = ad_group_criterion_service.mutate(operations)

  if response and response['value']:
    
    criteria = response['value']
    for ad_group_criterion in criteria:
      criterion = ad_group_criterion['criterion']
      result.append({
        "id": criterion['ageRangeType'],
          "criterion_id": criterion['id'],
          "citerion_type": criterion['type'],
          "type": ad_group_criterion['AdGroupCriterion.Type']
      })
  else:
    print('No criteria were returned.')
    
  return result