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

"""This example deletes an ad group criterion using the 'REMOVE' operator.

To get ad group criteria, run get_keywords.py.

The LoadFromStorage method is pulling credentials and properties from a
"googleads.yaml" file. By default, it looks for this file in your home
directory. For more information, see the "Caching authentication information"
section of our README.

"""

from googleads import adwords



def RemoveTargetAge(client, ad_group_id, criterion_id):
  print(criterion_id)

  """ AGES = ['503001', '503002', '503003', '503004', '503005', '503006', '503999']
  
  if len(criterions_id) < 7:
    print('last_age len inferieur')
    for age in criterions_id:
      if str(age) in AGES:
       AGES.remove(str(age))
    print('AGES')
    print(AGES) """
  ad_group_criterion_service = client.GetService('AdGroupCriterionService', version='v201809')
  # Construct operations and delete ad group criteria.
  operations = [
      {
          'operator': 'ADD',
          'operand': {
              'xsi_type': 'NegativeAdGroupCriterion',
              'adGroupId': ad_group_id,
              'criterion': {
                  'xsi_type': 'AgeRange',
                  'id': criterion_id
              }
          }
      }
  ]
  result = ad_group_criterion_service.mutate(operations)

  # Display results.
  response = []
  if result and result['value']:
    print(result)
    response.append({
        "status": "ok"
    })
    print(response)
    return response
    


def EnableTargetAge(client, ad_group_id, criterions):
  print(criterions)

  """ AGES = ['503001', '503002', '503003', '503004', '503005', '503006', '503999']
  
  if len(criterions_id) < 7:
    print('last_age len inferieur')
    for age in criterions_id:
      if str(age) in AGES:
       AGES.remove(str(age))
    print('AGES')
    print(AGES) """
  ad_group_criterion_service = client.GetService('AdGroupCriterionService', version='v201809')
  # Construct operations and delete ad group criteria.
  operations = [
      {
          'operator': 'REMOVE',
          'operand': {
              'xsi_type': 'NegativeAdGroupCriterion',
              'adGroupId': ad_group_id,
              'criterion': {
                  'xsi_type': 'AgeRange',
                  'id': criterion
              }
          }
      }
  for criterion in criterions]
  result = ad_group_criterion_service.mutate(operations)

  # Display results.
  response = []
  if result and result['value']:
    print(result)
    response.append({
        "status": "ok"
    })
    print(response)
    return response 

